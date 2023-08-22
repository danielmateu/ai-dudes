"use client"

import { ChatHeader } from "@/components/ChatHeader"
import { Dude, Message } from "@prisma/client"

interface ChatClientProps {
    dude: Dude
    & {
        messages: Message[];
        _count: {
            messages: number
        }
    },

}


export const ChatClient = ({ dude }: ChatClientProps) => {
    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader dude={dude} />
        </div>
    )
}
