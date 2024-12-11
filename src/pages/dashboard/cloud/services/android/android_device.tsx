import { AddDeviceDialog } from "@/components/projects/devices/add_device_dialog"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Smartphone } from 'lucide-react'
import { Link } from "react-router-dom"

export default function AndroidDevicePage() {
    return (
        <div className="py-6">


            <div className="mb-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Vultair Cloud</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Android Devices</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-3">
                        <Smartphone className="h-8 w-8 text-green-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Android Device</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="text-xs font-semibold px-2 py-0.5 bg-gray-200 rounded-sm">Devices</div>
                            <span className="text-sm text-muted-foreground">
                                Connect and analyze Android devices
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline">Install</Button>
                    <AddDeviceDialog />
                </div>
            </div>

            {/* Image Gallery */}
            <Card className="mb-8">
                <CardContent className="p-0">
                    <Tabs defaultValue="overview" className="w-full">
                        <div className="flex items-center justify-between border-b px-4">
                            <TabsList className="h-14 bg-transparent">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                                <TabsTrigger value="quickstart">Quickstart</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="overview" className="mt-0">
                            <div className="aspect-video bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                                <Smartphone className="h-32 w-32 text-green-500" />
                            </div>
                        </TabsContent>
                        <TabsContent value="dashboard" className="mt-0">
                            <div className="aspect-video bg-muted p-6">
                                <img
                                    src="/placeholder.svg?height=400&width=800"
                                    alt="Android Device Dashboard"
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="quickstart" className="mt-0">
                            <div className="aspect-video bg-muted p-6">
                                <img
                                    src="/placeholder.svg?height=400&width=800"
                                    alt="Android Device Quickstart Guide"
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr,300px] gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Similar Service by Vultair Cloud</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-start space-x-4">
                                <div className="rounded-lg bg-muted p-2">
                                    <Smartphone className="h-6 w-6" />
                                </div>
                                <div className="space-y-1 flex-1">
                                    <h4 className="text-sm font-semibold">iOS Device</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Connect and analyze iOS devices
                                    </p>
                                    <p className="text-sm text-muted-foreground">Plans starting at $10/mo</p>
                                </div>
                                <Button>View</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <h3 className="text-xl font-semibold">
                                Advanced Android Device Analysis for Digital Forensics
                            </h3>
                            <p className="text-muted-foreground">
                                Our Android Device integration provides comprehensive tools for forensic analysis
                                of Android devices. Connect, extract, and analyze data with enterprise-grade
                                security and reliability.
                            </p>
                            <div className="space-y-2">
                                <h4 className="font-medium">Key Features:</h4>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    <li>Secure device connection and authentication</li>
                                    <li>Real-time data extraction and analysis</li>
                                    <li>Advanced file system exploration</li>
                                    <li>Automated evidence collection</li>
                                    <li>Detailed activity logging and reporting</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <Card>
                    <CardHeader>
                        <CardTitle>Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between py-1">
                            <span className="text-muted-foreground">Installs</span>
                            <span>more than 500</span>
                        </div>
                        <div className="flex justify-between py-1">
                            <span className="text-muted-foreground">Developer</span>
                            <span>Vultair Inc.</span>
                        </div>
                        <div className="flex justify-between py-1">
                            <span className="text-muted-foreground">Website</span>
                            <Link
                                to="#"
                                className="text-blue-500 hover:underline flex items-center gap-1"
                            >
                                vultair.com <ExternalLink className="h-3 w-3" />
                            </Link>
                        </div>
                        <div className="flex justify-between py-1">
                            <span className="text-muted-foreground">Documentation</span>
                            <Link
                                to="#"
                                className="text-blue-500 hover:underline flex items-center gap-1"
                            >
                                Read <ExternalLink className="h-3 w-3" />
                            </Link>
                        </div>
                        <div className="flex justify-between py-1">
                            <span className="text-muted-foreground">EULA</span>
                            <Link
                                to="#"
                                className="text-blue-500 hover:underline flex items-center gap-1"
                            >
                                Read <ExternalLink className="h-3 w-3" />
                            </Link>
                        </div>
                        <div className="flex justify-between py-1">
                            <span className="text-muted-foreground">Privacy Policy</span>
                            <Link
                                to="#"
                                className="text-blue-500 hover:underline flex items-center gap-1"
                            >
                                Read <ExternalLink className="h-3 w-3" />
                            </Link>
                        </div>
                        <div className="flex justify-between py-1">
                            <span className="text-muted-foreground">Support</span>
                            <Link
                                to="#"
                                className="text-blue-500 hover:underline flex items-center gap-1"
                            >
                                Open in Vultair <ExternalLink className="h-3 w-3" />
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

