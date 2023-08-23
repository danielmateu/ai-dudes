import { Categories } from '@/components/Categories'
import { Dudes } from '@/components/Dudes'
import { SearchInput } from '@/components/SearchInput'
import prismabd from '@/lib/prismadb'

interface RootPageProps {
    searchParams: {
        categoryId: string
        name: string
    }
}

const RootPage = async ({
    searchParams
}: RootPageProps) => {

    const data = await prismabd.dude.findMany({
        where: {
            categoryId: searchParams.categoryId,
            name: {
                search: searchParams.name
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            _count: {
                select: {
                    messages: true
                }
            }
        }
    })

    const categories = await prismabd.category.findMany()

    return (
        <div className='h-full p-4 space-y-2'>
            <SearchInput />
            <Categories data={categories} />
            <Dudes data={data} />
        </div>
    )
}

export default RootPage