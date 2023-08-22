"use client";

import { useCompletion } from "ai/react";
import { FormEvent, useState } from "react";
import { Dude, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChatMessageProps } from "@/components/ChatMessage";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatForm } from "@/components/ChatForm";

// import { ChatForm } from "@/components/chat-form";
// import { ChatHeader } from "@/components/chat-header";
// import { ChatMessages } from "@/components/chat-messages";
// import { ChatMessageProps } from "@/components/chat-message";

interface ChatClientProps {
    dude: Dude & {
        messages: Message[];
        _count: {
            messages: number;
        }
    };
};

export const ChatClient = ({
    dude,
}: ChatClientProps) => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatMessageProps[]>(dude.messages);

    const {
        input,
        isLoading,
        handleInputChange,
        handleSubmit,
        setInput,
    } = useCompletion({
        api: `/api/chat/${dude.id}`,
        onFinish(_prompt, completion) {
            const systemMessage: ChatMessageProps = {
                role: "system",
                content: completion
            };

            setMessages((current) => [...current, systemMessage]);
            setInput("");

            router.refresh();
        },
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        const userMessage: ChatMessageProps = {
            role: "user",
            content: input
        };

        setMessages((current) => [...current, userMessage]);

        handleSubmit(e);
    }

    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader dude={dude} />
            <ChatMessages
                dude={dude}
                isLoading={isLoading}
                messages={messages}
            />
            <ChatForm
                isLoading={isLoading}
                input={input}
                handleInputChange={handleInputChange}
                onSubmit={onSubmit}
            />
        </div>
    );
}
