"use client";

import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const font = Poppins({
    weight: "600",
    subsets: ["latin"],

})

export const Navbar = () => {
    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary">
            <div className="flex items-center">
                <Menu className="block md:hidden" />
                <Link href="/">
                    <h1 className={cn("hidden md:block text-xl md:text-3xl font-semibold text-primary",
                        font.className
                    )}>ai dudes</h1>
                </Link>
            </div>
            <div className="flex items-cener gap-x-3">
                <Button size='sm' variant='premium'>
                    Upgrade
                    <Sparkles className="inline-block ml-2 h-4 w-4 fill-white" />
                </Button>
                <UserButton />
            </div>
        </div>
    )
}
