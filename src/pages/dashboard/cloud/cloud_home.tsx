
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { BarChart, Box, BrainCircuit, Database, ExternalLink, HardDrive, Lock, Plus, Search, Shield, Terminal } from 'lucide-react'
import { Link } from "react-router-dom"

const categories = [
    { name: "Devices", to: "/cloud/cms", icon: Box },
    { name: "Databases", to: "/cloud/databases", icon: Database },
    { name: "Storage", to: "/cloud/storage", icon: HardDrive },
    { name: "AI", to: "/cloud/ai", icon: BrainCircuit },
    { name: "Analytics", to: "/cloud/analytics", icon: BarChart },
    { name: "Authentication", to: "/cloud/auth", icon: Lock },
    { name: "DevTools", to: "/cloud/devtools", icon: Terminal },
    { name: "Searching", to: "/cloud/searching", icon: Search },
    { name: "Security", to: "/cloud/security", icon: Shield },
]

const integrations = [
    {
        name: "Android Device",
        description: "Connect and analyze Android devices",
        icon: <Box className="h-12 w-12 text-white" />,
        to: "/cloud/android",
        bgColor: "bg-green-600",
        price: "Free"
    },
    {
        name: "iOS Device",
        description: "Connect and analyze iOS devices",
        icon: <Box className="h-12 w-12 text-white" />,
        to: "/marketplace/ios-device",
        bgColor: "bg-blue-600",
        price: "$10"
    },
    {
        name: "Analyze DB",
        description: "Reliable database for forensic findings",
        icon: <Database className="h-12 w-12 text-white" />,
        to: "/marketplace/analyze-db",
        bgColor: "bg-yellow-600",
        price: "Free for for 100 Projects"
    },
    {
        name: "Vultair Storage",
        description: "Secure cloud storage for forensic data",
        icon: <HardDrive className="h-12 w-12 text-white" />,
        to: "/marketplace/aws-storage",
        bgColor: "bg-orange-600",
        price: "Free for first 10GB"
    },
    {
        name: "Security Suite",
        description: "Advanced security tools for forensic analysis",
        icon: <Shield className="h-12 w-12 text-white" />,
        to: "/marketplace/security-suite",
        bgColor: "bg-purple-600",
        price: "$0"
    },
    {
        name: "AI Intel",
        description: "Advanced security tools for forensic analysis",
        icon: <BrainCircuit className="h-12 w-12 text-white" />,
        to: "/marketplace/ai-intel",
        bgColor: "bg-indigo-600",
        price: "$0"
    },
]

export default function MarketplacePage() {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 border-r">
                <ScrollArea className="h-full py-6">
                    <div className="space-y-4">
                        <div className="px-3 py-2">
                            <h2 className="mb-2 px-4 text-lg font-semibold">Categories</h2>
                            <div className="space-y-1">
                                {categories.map((category) => (
                                    <Link
                                        key={category.name}
                                        to={category.to}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <category.icon className="h-4 w-4" />
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <Separator />
                        <div className="px-7 py-2">
                            <Link
                                to="/marketplace/browse"
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Browse All
                            </Link>
                        </div>
                    </div>
                </ScrollArea>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4 justify-between">
                        <h1 className="text-2xl font-semibold">Marketplace</h1>
                        <div className="space-x-4">
                            <Button variant="outline">Installed Services</Button>
                            <Button>Cloud Console</Button>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Native Services</h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            A collection of first-party services you can easily add to your Vultair project.{" "}
                            <Link to="/docs" className="text-blue-500 hover:underline inline-flex items-center gap-1">
                                Learn more <ExternalLink className="h-3 w-3" />
                            </Link>
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {integrations.map((integration) => (
                                <Link
                                    key={integration.name}
                                    to={integration.to}
                                    className="group relative overflow-hidden rounded-lg border p-6 hover:border-foreground transition-colors"
                                >
                                    <div className={`absolute right-4 top-4 rounded-full p-2 ${integration.bgColor}`}>
                                        <Plus className="h-4 w-4 text-white" />
                                    </div>
                                    <div className={`inline-flex items-center justify-center rounded-lg ${integration.bgColor} p-4 mb-4`}>
                                        {integration.icon}
                                    </div>
                                    <h3 className="font-semibold mb-2">{integration.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                                    <p className="text-sm">Plans starting at {integration.price}</p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg border p-6 flex flex-col items-center justify-center text-center">
                        <Database className="h-12 w-12 mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">Join the Vultair Marketplace</h3>
                        <p className="text-sm text-muted-foreground mb-4 max-w-md">
                            to reach developers in the Vultair ecosystem, and offer your solution to millions of users.
                        </p>
                        <Button>Become a Provider</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

