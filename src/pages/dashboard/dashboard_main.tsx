import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart2, Clock, Folder, Plus, Smartphone } from 'lucide-react'

export default function DashboardPage() {
    return (
        <>
            <div>
                <h1 className="text-3xl font-semibold">Dashboard</h1>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                        <Folder className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">7</div>
                        <p className="text-xs text-muted-foreground">+1 from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recent Apps Analyzed</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">134</div>
                        <p className="text-xs text-muted-foreground">+22 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Data Processed</CardTitle>
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">246 GB</div>
                        <p className="text-xs text-muted-foreground">+14% from last month</p>
                    </CardContent>
                </Card>
            </div>


            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Active Devices</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Device</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {['Samsung Galaxy S21', 'Google Pixel 6', 'OnePlus 9 Pro'].map((device, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{device}</TableCell>
                                        <TableCell className="text-green-500">Connected</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {['Project Alpha', 'Digital Evidence 22-B', 'Malware Analysis 7'].map((project, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{project}</TableCell>
                                        <TableCell className="text-gray-500 text-sm">2 days ago</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Apps</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>App</TableHead>
                                    <TableHead>Instances</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {['WhatsApp', 'Facebook', 'Gmail', 'Chrome', 'Instagram'].map((app, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{app}</TableCell>
                                        <TableCell className="text-gray-500 text-sm">12</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Create New Project
                </Button>
            </div>
        </>
    )
}

