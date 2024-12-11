import { Toaster } from "@/components/ui/toaster"
import { Outlet } from "react-router-dom"

export default function AutomatorLayout() {
    return (
        <div className="min-h-screen">
            <Outlet />
            <Toaster />
        </div>
    )
}

