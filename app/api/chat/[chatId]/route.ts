import dotenv from "dotenv";
import { LangChainStream, StreamingTextResponse } from "ai";
import { auth, currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { Replicate } from 'langchain/llms/replicate'
import { CallbackManager } from 'langchain/callbacks'
import { NextResponse } from "next/server";

import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rate-limit";

dotenv.config({ path: `.env` });

export async function POST(
    request: Request,
    { params }: { params: { chatId: string } }
) {
    try {
        const { prompt } = await request.json()
        const user = await currentUser()

        if (!user || !user.firstName || !user.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const identifier = request.url + '-' + user.id
        const { success } = await rateLimit(identifier)

        if (!success) {
            return new NextResponse('Too many requests', { status: 429 })
        }

        const dude = await prismadb.dude.update({
            where: {
                id: params.chatId,
                // userId: user.id
            },
            data: {
                messages: {
                    create: {
                        content: prompt,
                        role: 'user',
                        userId: user.id
                    }
                }
            }
        })

        if (!dude) {
            return new NextResponse('Colega no encontrado', { status: 404 })
        }

        const name = dude.id
        const dude_file_name = name + '.txt';

        const dudeKey = {
            dudeName: name,
            userId: user.id,
            modelName: 'llama2-13b'
        }

        const memoryManager = await MemoryManager.getInstance()

        const records = await memoryManager.readLatestHistory(dudeKey)

        if (records.length === 0) {
            await memoryManager.seedChatHistory(dude.seed, '\n\n', dudeKey)
        }

        await memoryManager.writeToHistory("User: " + prompt + '\n\n', dudeKey)

        const recentChatHistory = await memoryManager.readLatestHistory(dudeKey)

        const similarDocs = await memoryManager.vectorSearch(recentChatHistory, dude_file_name)

        let relevantHistory = ''

        if (!!similarDocs && similarDocs.length !== 0) {
            relevantHistory = similarDocs.map((doc) => doc.pageContent).join('\n')
        }

        const { handlers } = LangChainStream()

        const model = new Replicate({
            model: "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
            input: {
                max_length: 2048,
            },
            apiKey: process.env.REPLICATE_API_TOKEN,
            callbackManager: CallbackManager.fromHandlers(handlers)
        })

        // Turn verbose on for debugging
        model.verbose = true;

        const resp = String(
            await model.call(`
        ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${dude.name}: prefix. 

        ${dude.instructions}

        Below are relevant details about ${dude.name}'s past and the conversation you are in.
        ${relevantHistory}

        ${recentChatHistory}\n${dude.name}:`).catch(console.error)
        );

        const cleaned = resp.replaceAll(",", "");
        const chunks = cleaned.split("\n");
        const response = chunks[0];

        await memoryManager.writeToHistory("" + response.trim(), dudeKey);
        var Readable = require("stream").Readable;

        let s = new Readable();
        s.push(response);
        s.push(null);
        if (response !== undefined && response.length > 1) {
            memoryManager.writeToHistory("" + response.trim(), dudeKey);

            await prismadb.dude.update({
                where: {
                    id: params.chatId
                },
                data: {
                    messages: {
                        create: {
                            content: response.trim(),
                            role: "system",
                            userId: user.id,
                        },
                    },
                }
            });
        }

        return new StreamingTextResponse(s);

    } catch (error) {
        console.log('[CHAT_POST]', error);
        return new NextResponse('Internal Error', { status: 500 })
    }
}