"use client"

import { cn } from "@/lib/utils"
import { Home, Plus, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
export const Sidebar = () => {

    const pathname = usePathname()
    const router = useRouter()


    const routes = [
        {
            icon: Home,
            href: "/",
            label: "Inicio",
            pro: false
        }, {
            icon: Plus,
            href: "/dude/new",
            label: "Crea",
            pro: true
        },
        {
            icon: Settings,
            href: "/settings",
            label: "Config",
            pro: false
        }
    ]

    const onNavigate = (url: string, pro: boolean) => {

        // TODO: Revisar si es pro

        return router.push(url)
    }

    return (
        <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
            <div className="p-3 flex justify-start">
                <div className="space-y-2">
                    {
                        routes.map((route, i) =>
                        (
                            <div
                                onClick={() => onNavigate(route.href, route.pro)}
                                key={route.href} className={cn(
                                    "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg:primary/10 rounded-lg transition",
                                    pathname === route.href && "bg-primary/10 text-primary"
                                )}>

                                <div className="flex flex-col gap-y-2 items-center flex-1">
                                    <route.icon className="h-5 w-5" />
                                    {route.label}
                                </div>
                            </div>
                        )
                        )
                    }
                </div>
            </div>
        </div>
    )
}
