"use client"

import { useTheme } from "next-themes"
import { useToast } from "./ui/use-toast"
import { cn } from "@/lib/utils"
import { BotAvatar } from "./BotAvatar"

import { BeatLoader } from 'react-spinners'
import { UserAvatar } from "./UserAvatar"
import { Button } from "./ui/button"
import { Copy } from "lucide-react"

export interface ChatMessageProps {
    role: "user" | "system"
    content?: string
    isLoading?: boolean
    src?: string
}

export const ChatMessage = ({
    role,
    content,
    isLoading,
    src
}: ChatMessageProps) => {

    const { toast } = useToast()
    const { theme } = useTheme()

    const onCopy = () => {
        if (!content) return

        navigator.clipboard.writeText(content)

        toast({
            description: "Mensaje copiado en el clipboard",
        })
    }

    return (
        <div className={cn(`
        group
        flex
        items-start
        gap-x-3
        py-4
        w-full
        `,
            role === 'user' && 'justify-end',
        )}>
            {role !== 'user' && src && <BotAvatar src={src} />}
            <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
                {isLoading ?
                    <BeatLoader
                        size={8}
                        color={theme === 'light' ? 'black' : 'white'} /> :
                    content}

            </div>
            {role === 'user' && <UserAvatar />}
            {
                role !== 'user' && !isLoading && (
                    <Button
                        onClick={onCopy}
                        className="opacity-0 group-hover:opacity-100 transition"
                        size={'icon'}
                        variant={'ghost'}
                    >
                        <Copy size={16} />
                    </Button>
                )
            }
        </div>
    )
}
