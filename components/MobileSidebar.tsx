import { Menu } from "lucide-react"
import { Sidebar } from "./Sidebar"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

interface MobileSidebarProps {
    isPro: boolean
}

export const MobileSidebar = ({
    isPro
}: MobileSidebarProps) => {

    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4">
                <Menu />
            </SheetTrigger>
            <SheetContent className="p-0 bg-secondary pt-10" side='left'>
                <Sidebar isPro={isPro} />
            </SheetContent>
        </Sheet>
    )
}
