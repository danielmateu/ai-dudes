// "use client"

import prismadb from "@/lib/prismadb"
import { auth, redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { ChatClient } from "./components/client"

interface ChatPIdPageProps {
    params: {
        chatId: string
    }
}

const ChatIdPage = async ({
    params
}: ChatPIdPageProps) => {

    const { userId } = auth()

    if (!userId) {
        return redirectToSignIn()
    }

    const dude = await prismadb.dude.findUnique({
        where: {
            id: params.chatId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc"
                },
                where: {
                    userId,
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    })

    if (!dude) {
        return redirect('/')
    }

    return (
        <ChatClient dude={dude} />

    )
}

export default ChatIdPage