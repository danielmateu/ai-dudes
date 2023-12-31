import prismabd from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const user = await currentUser()
        const { src, name, description, instructions, seed, categoryId } = body

        if (!user || !user.id || !user.firstName) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse('Bad Request', { status: 400 });
        }

        // TODO: Check for subscriptions
        const isPro = await checkSubscription()

        if (!isPro) {
            return new NextResponse('Se requiere suscripción', { status: 401 });
        }

        const dude = await prismabd.dude.create({
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed,
            }
        })

        return NextResponse.json(dude);

    } catch (error) {
        console.log('[DUDE_POST]');
        return new NextResponse('Internal Error', { status: 500 });
    } finally {

    }
}