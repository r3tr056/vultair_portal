import { BarChart2, Clock, Folder, Home, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Sidebar() {
    return (
        <aside className="bg-white w-64 min-h-screen border-r border-gray-200">
            <nav className="mt-5 px-2 space-y-4">
                <Link to="/dashboard" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-50">
                    <Home className="mr-4 h-6 w-6" />
                    Dashboard
                </Link>
                <Link to="/projects" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-50">
                    <Folder className="mr-4 h-6 w-6" />
                    Projects
                </Link>
                <Link to="/devices" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-50">
                    <Smartphone className="mr-4 h-6 w-6" />
                    Devices
                </Link>
                <Link to="/recent-apps" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-50">
                    <Clock className="mr-4 h-6 w-6" />
                    Apps Library
                </Link>
                <Link to="/statistics" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-50">
                    <BarChart2 className="mr-4 h-6 w-6" />
                    Statistics
                </Link>
            </nav>
        </aside>
    )
}

