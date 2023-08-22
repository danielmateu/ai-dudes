import { SubscriptionButton } from "@/components/SubscriptionButton"
import { checkSubscription } from "@/lib/subscription"


const SettingsPage = async () => {

    const isPro = await checkSubscription()

    return (
        <div className="h-full p-4 space-y-2">
            <h3 className="text-lg font-medium">Ajustes</h3>
            <div className="text-muted-foreground text-sm">
                {
                    isPro ? "Tienes una suscripción activa" : "No tienes una suscripción activa"
                }
            </div>
            <SubscriptionButton isPro={isPro} />

        </div>
    )
}

export default SettingsPage