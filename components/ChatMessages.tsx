"use client"

import { Dude } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "./ChatMessage";

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
    return (
        <div className="flex-1 overflow-y-auto pr-4">
            <ChatMessage
                // isLoading
                src={dude.src}
                role="system"
                content={`Hola, soy ${dude.name}, ${dude.description}. En qué puedo ayudarte?`}
            />
            <ChatMessage

                role="user"
                content={`Hola, soy ${dude.name}, ${dude.description}. En qué puedo ayudarte?`}
            />
        </div>
    )
}
