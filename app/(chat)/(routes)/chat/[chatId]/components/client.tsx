"use client"

import { ChatHeader } from "@/components/ChatHeader"
import { Dude, Message } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCompletion } from 'ai/react'
import { ChatForm } from "@/components/ChatForm";
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

    const router = useRouter()
    const [messages, setMessages] = useState<any[]>(dude.messages)

    const { input, isLoading, handleInputChange, handleSubmit, setInput } = useCompletion({
        api: `/api/chat/${dude.id}`,
        onFinish(promp, completion) {
            const systemMessage = {
                role: "system",
                content: completion,
            };

            setMessages((current) => [...current, systemMessage]);
            setInput("")

            router.refresh()
        }
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault()
        const userMessage = {
            role: "user",
            content: input,
        }

        setMessages((current) => [...current, userMessage])

        handleSubmit(e)
    }

    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader dude={dude} />
            <div>
                Mensajes TODO
            </div>
            <ChatForm
                isLoading={isLoading}
                input={input}
                handleInputChange={handleInputChange}
                onSubmit={onSubmit}
            />
        </div>
    )
}
