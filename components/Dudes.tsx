import { Dude } from "@prisma/client"
import Image from "next/image"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"
import Link from "next/link"
import { MessageSquare } from "lucide-react"

interface DudesProps {
    data: (Dude & {
        _count: {
            messages: number
        }
    })[]
}

export const Dudes = ({
    data
}: DudesProps) => {

    if (data.length === 0) {
        return (
            <div className='flex items-center justify-center pt-10 flex-col space-y-3'>
                <div className="relative w-60 h-60">
                    <Image src="/empty.png" fill objectFit="contain" alt="Empty" className="" />
                </div>
                <p className='text-3xl font-bold '>No hemos encontrado ningún colega</p>
                <p className='text-xl  text-muted-foreground'>Intenta buscar a otro...</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pb-10 gap-4">
            {
                data.map((dude) => (
                    <Card
                        key={dude.id}
                        className="bg-primary/10 rounded-xl cursor-pointer shadow-sm hover:shadow-md hover:opacity-75 transition border-0"
                    >
                        <Link
                            href={`/chat/${dude.id}`}
                        >
                            <CardHeader
                                className="flex items-center justify-center text-center text-muted-foreground"
                            >
                                <div className="relative w-32 h-32">
                                    <Image
                                        src={dude.src}
                                        alt={dude.name}
                                        className="rounded-xl object-cover"
                                        fill
                                    />
                                </div>
                                <p className="font-semibold">
                                    {dude.name}
                                </p>
                                <p className="text-xs">
                                    {dude.description}
                                </p>
                            </CardHeader>
                            <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                                <p className="lowercase">
                                    @{dude.userName}
                                </p>
                                <div className="flex otems-center">
                                    <MessageSquare className="w-3 h-3 mr-1" />
                                    {dude._count.messages}
                                </div>
                            </CardFooter>

                        </Link>

                    </Card>
                ))
            }
        </div>
    )
}
