import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request,
    { params }: { params: { dudeId: string } }) {
    try {
        const body = await req.json()
        const user = await currentUser()
        const { src, name, description, instructions, seed, categoryId } = body

        if (!params.dudeId) {
            return new NextResponse('Dude ID is required', { status: 400 });
        }

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

        const dude = await prismadb.dude.update({
            where: {
                id: params.dudeId,
                userId: user.id
            },
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
        console.log('[DUDE_PATCH]');
        return new NextResponse('Internal Error', { status: 500 });
    } finally {

    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { dudeId: string } }
) {
    try {

        const { userId } = auth()

        if (!userId) {
            return new NextResponse('No tienes autorización para realizar esta acción', { status: 410 });
        }

        const dude = await prismadb.dude.delete({
            where: {
                id: params.dudeId,
                userId
            }
        })

        return NextResponse.json(dude);

    } catch (error) {
        console.log('[DUDE_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}