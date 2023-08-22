import prismabd from "@/lib/prismadb"
import { DudeForm } from "./components/DudeForm"
import { auth, redirectToSignIn } from "@clerk/nextjs"

interface DudePageProps {
    params: {
        dudeId: string
    }
}

const DudePage = async ({
    params
}: DudePageProps) => {

    const { userId } = auth()
    // Todo : Revisar subscripción

    if (!userId) return redirectToSignIn()

    const dude = await prismabd.dude.findUnique({
        where: {
            id: params.dudeId,
            userId
        }
    })

    const categories = await prismabd.category.findMany()

    return (
        <DudeForm
            initialData={dude}
            categories={categories}
        />
    )
}

export default DudePage