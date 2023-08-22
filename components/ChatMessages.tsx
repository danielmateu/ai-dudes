"use client"

import { Dude } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "./ChatMessage";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
    messages: ChatMessageProps[];
    isLoading: boolean;
    dude: Dude
}

export const ChatMessages = ({
    messages = [],
    isLoading,
    dude
}: ChatMessagesProps) => {

    const scrollRef = useRef<ElementRef<'div'>>(null)

    const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false)
        }, 1000)

        return () => clearTimeout(timeout)

    }, [])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages.length])

    return (
        <div className="flex-1 overflow-y-auto pr-4">
            <ChatMessage
                isLoading={fakeLoading}
                src={dude.src}
                role="system"
                content={`Hola, soy ${dude.name}, ${dude.description}. En qué puedo ayudarte?`}
            />
            {messages.map((message) => (
                <ChatMessage
                    key={message.content}
                    role={message.role}
                    content={message.content}
                    src={dude.src}
                />
            ))}
            {isLoading && (
                <ChatMessage
                    role="system"
                    src={dude.src}
                    isLoading
                />
            )}
            <div ref={scrollRef} />
        </div>
    )
}
