'use client'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MobileIcon } from "@radix-ui/react-icons"
import { Bell, ChevronDown, Triangle } from 'lucide-react'
import { useState } from "react"
import { Link } from "react-router-dom"
import { Icons } from "../ui/icons"

export function Header() {

    const [showLevel2, setShowLevel2] = useState(true);

    return (
        <div className="flex flex-col">
            <header className="border-b bg-background">
                <div className="flex h-14 items-center px-4 md:px-6">
                    <Link to="/" className="mr-4">
                        <Triangle />
                        <span className="sr-only">Vultair</span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="px-2">
                                    <Icons.avatar className="h-6 w-6 rounded-full" />
                                    <span className="ml-2">Ankur Debnath's projects</span>
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-[180px]">
                                <DropdownMenuItem>New Project</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Project 1</DropdownMenuItem>
                                <DropdownMenuItem>Project 2</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="h-4 w-px bg-border" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="px-2">
                                    <MobileIcon className="h-4 w-4" />
                                    <span className="ml-2">test-project</span>
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-[180px]">
                                <DropdownMenuItem>Project Settings</DropdownMenuItem>
                                <DropdownMenuItem>View Documentation</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="ml-auto flex items-center space-x-4 text-gray-500">
                        <Button variant="ghost" >Feedback</Button>
                        <Button variant="ghost" >Help</Button>
                        <Button variant="ghost">Docs</Button>
                        <div className="h-4 w-px bg-border" />
                        <Button variant="ghost" size="icon">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Icons.avatar className="h-6 w-6 rounded-full" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Command Menu</DropdownMenuItem>
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
            {showLevel2 && (
                <nav className="border-b bg-background">
                    <div className="px-4 md:px-6">
                        <div className="h-10 flex items-center">
                            <Button variant="ghost" size="lg" className="border-b border-green-600 rounded-none">Project</Button>
                            <Button variant="ghost" size="lg" className="rounded-none">Devices</Button>
                            <Button variant="ghost" size="lg" className="rounded-none">Reports</Button>
                        </div>
                    </div>
                </nav>
            )}

        </div>
    )
}

