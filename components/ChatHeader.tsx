"use client"

import { Dude } from "@prisma/client"
import { Message } from "postcss"
import { Button } from "./ui/button"
import { ChevronLeft, Edit, MessageSquare, MessagesSquare, MoreVertical, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { BotAvatar } from "./BotAvatar"
import { useUser } from "@clerk/nextjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useToast } from "./ui/use-toast"
import axios from "axios"



interface ChatHeaderProps {
    dude: Dude
    & {
        messages: Message[];
        _count: {
            messages: number
        }
    },

}

export const ChatHeader = ({
    dude
}: ChatHeaderProps) => {

    const router = useRouter()
    const { user } = useUser()
    const { toast } = useToast()

    const onDelete = async () => {
        try {
            await axios.delete(`/api/dude/${dude.id}`)

            toast({
                description: 'Bot eliminado',
            })

            router.refresh()

            router.push('/')

        } catch (error) {
            toast({
                description: 'No se pudo eliminar el bot',
                variant: 'destructive'
            })
        }
    }

    return (
        <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
            <div className="flex gap-x-2 items-center">
                <Button size={'icon'} variant={'ghost'} onClick={() => router.back()}>
                    <ChevronLeft size={24} />
                </Button>
                <BotAvatar src={dude.src} />
                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-semibold">{dude.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <MessagesSquare size={20} className="mr-2" />
                            {dude._count.messages}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Creado por {dude.userName}
                    </p>
                </div>
            </div>
            {user?.id === dude.userId && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'secondary'} size={'icon'}>
                            <MoreVertical size={24} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/dude/${dude.id}`)}>
                            <Edit size={16} className="mr-2" />
                            Edita
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete}>
                            <Trash size={16} className="mr-2" />
                            Elimina
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}
