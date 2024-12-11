import { Header } from "@/components/header/header"
import { Outlet } from "react-router-dom"

export function DashboardLayout() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="flex">
                <main className="flex-1 p-6 container mx-auto">
                    {/* <Button variant={"ghost"} className="items-center">
                        <ArrowLeft />
                        <span className="ml-2">Back</span>
                    </Button> */}
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
