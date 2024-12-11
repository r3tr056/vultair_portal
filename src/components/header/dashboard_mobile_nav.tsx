import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"

interface MobileNavProps {
    show: boolean
    onClose: () => void
}

export function MobileNav({ show, onClose }: MobileNavProps) {

    return (
        <div
            className={cn(
                "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden",
                show ? "block" : "hidden"
            )}
        >
            <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
                <Link to="/" className="flex items-center space-x-2" onClick={onClose}>
                    <Icons.logo />
                    <span className="font-bold">Acme Inc</span>
                </Link>
                <nav className="grid grid-flow-row auto-rows-max text-sm">
                    <Link
                        to="/docs"
                        className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                        onClick={onClose}
                    >
                        Docs
                    </Link>
                    <Link
                        to="/pricing"
                        className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                        onClick={onClose}
                    >
                        Pricing
                    </Link>
                    <Link
                        to="/blog"
                        className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                        onClick={onClose}
                    >
                        Blog
                    </Link>
                    <Link
                        to="/about"
                        className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                        onClick={onClose}
                    >
                        About
                    </Link>
                </nav>
            </div>
        </div>
    )
}

