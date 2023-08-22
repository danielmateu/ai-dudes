"use client";

import axios from "axios";
import { ChevronLeft, Edit, MessagesSquare, MoreVertical, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dude, Message } from "@prisma/client";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
// import { BotAvatar } from "@/components/bot-avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { BotAvatar } from "./BotAvatar";

interface ChatHeaderProps {
    dude: Dude & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };
};

export const ChatHeader = ({
    dude,
}: ChatHeaderProps) => {
    const router = useRouter();
    const { user } = useUser();
    const { toast } = useToast();

    const onDelete = async () => {
        try {
            await axios.delete(`/api/dude/${dude.id}`);
            toast({
                description: "Success."
            });
            router.refresh();
            router.push("/");
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Something went wrong."
            })
        }
    }

    return (
        <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
            <div className="flex gap-x-2 items-center">
                <Button onClick={() => router.back()} size="icon" variant="ghost">
                    <ChevronLeft className="h-8 w-8" />
                </Button>
                <BotAvatar src={dude.src} />
                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold">{dude.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <MessagesSquare className="w-3 h-3 mr-1" />
                            {dude._count.messages}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Created by {dude.userName}
                    </p>
                </div>
            </div>
            {user?.id === dude.userId && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/dude/${dude.id}`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete}>
                            <Trash className="w-4 h-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
};
