import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { absoluteUrl } from '../../../lib/utils';

const settingsUrl = absoluteUrl('/settings')

export async function GET() {
    try {
        const { userId } = auth()
        const user = await currentUser()

        if (!userId || !user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId: userId
            },
        })

        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            })
            return new NextResponse(JSON.stringify({ url: stripeSession.url }))
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ['card', "paypal"],
            mode: 'subscription',
            billing_address_collection: 'auto',
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Dude Pro',
                            description: 'Crea colegas customizados con IA',
                        },
                        unit_amount: 999,
                        recurring: {
                            interval: 'month',
                        }
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId
            }
        })

        return new NextResponse(JSON.stringify({ url: stripeSession.url }))


    } catch (error) {
        console.log('[STRIPE_GET]', error);
        return new NextResponse('Internal Error', { status: 500 })
    }
}
