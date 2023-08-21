import prismabd from "@/lib/prismadb"
import { DudeForm } from "./components/DudeForm"

interface DudePageProps {
    params: {
        dudeId: string
    }
}

const DudePage = async ({
    params
}: DudePageProps) => {

    // Todo : Revisar subscripción

    const dude = await prismabd.dude.findUnique({
        where: {
            id: params.dudeId
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