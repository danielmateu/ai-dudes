import prismadb from "@/lib/prismadb"
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

    const dude = await prismadb.dude.findUnique({
        where: {
            id: params.dudeId,
            userId
        }
    })

    const categories = await prismadb.category.findMany()

    return (
        <DudeForm
            initialData={dude}
            categories={categories}
        />
    )
}

export default DudePage