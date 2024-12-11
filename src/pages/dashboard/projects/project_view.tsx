import { AddDeviceDialog } from "@/components/projects/devices/add_device_dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useProjects } from '@/context/ProjectsContext'
import { MagicWandIcon } from "@radix-ui/react-icons"
import { Box, Cloud, Database, Info, Shield } from 'lucide-react'
import { useEffect } from "react"
import { Link, useParams } from 'react-router-dom'

interface Integration {
    id: string
    name: string
    description: string
    icon: React.ReactNode
}

const availableIntegrations: Integration[] = [
    {
        id: 'android-devices',
        name: 'Android Devices',
        description: 'Connect and manage Android devices for forensic analysis',
        icon: <Box className="h-8 w-8 text-green-500" />,
    },
    {
        id: 'ios-devices',
        name: 'iOS Devices',
        description: 'Connect and analyze iOS devices securely',
        icon: <Box className="h-8 w-8 text-blue-500" />,
    },
    {
        id: 'vult-storage',
        name: 'Vultair Storage',
        description: 'Secure cloud storage for forensic data',
        icon: <Cloud className="h-8 w-8 text-orange-500" />,
    },
    {
        id: 'analyze-db',
        name: 'Analyze DB',
        description: 'Reliable database for forensic findings',
        icon: <Database className="h-8 w-8 text-blue-600" />,
    },
    {
        id: 'security-suite',
        name: 'Security Suite',
        description: 'Advanced security tools for forensic analysis',
        icon: <Shield className="h-8 w-8 text-purple-500" />,
    },
    {
        id: 'ai-intel',
        name: 'AI-Intel',
        description: 'AI powered Intelligence and Analysis Service',
        icon: <MagicWandIcon className="h-8 w-8 text-indigo-500" />,
    }
]

export default function ProjectPage() {
    const { projectId } = useParams<{ projectId: string }>()
    const { setCurrentProject, currentProject } = useProjects()

    useEffect(() => {
        if (projectId) {
            setCurrentProject(projectId)
        }
    }, [projectId, setCurrentProject])

    if (!currentProject) {
        return <div>Loading project...</div>;
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-semibold mb-2">{currentProject.name}</h1>
                    <h3 className="font-semibold text-sm text-muted-foreground">Description: {currentProject.description}</h3>
                    <h3 className="font-semibold text-sm text-muted-foreground">Target App: {currentProject.apkPath || 'Not set'}</h3>
                    <h3 className="font-semibold text-sm text-muted-foreground">Last Updated: {new Date(currentProject.lastUpdated).toLocaleString()}</h3>
                </div>
                <div className="space-x-4">
                    <AddDeviceDialog projectId={currentProject.id} />
                    <Button variant="outline">Browse Vultair Cloud</Button>
                    <Button>Cloud Console</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6">
                <Card>
                    <CardContent>
                        <div className="p-10">
                            <div className="text-xl font-semibold mb-4">Android Devices</div>
                            {currentProject.devices.length > 0 ? (
                                <div className="flex">
                                    {currentProject.devices.map((device, index) => (
                                        <Link to={'/workflow'} className="bg-gray-100 p-4 flex rounded-md shadow-sm mr-4">
                                            <Box className="h-10 w-10 text-green-500" />
                                            <div className="flex flex-col ml-2">
                                                <span className="font-semibold">Android Device</span>
                                                <span className="text-sm text-muted-foreground">{device}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
                                    <div className="rounded-full bg-muted p-6 mb-4">
                                        <Info className="h-12 w-12 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-muted-foreground">No Devices Added</h3>
                                    <p className="text-muted-foreground mb-4">
                                        You don't have any registered devices for this project
                                    </p>
                                    <AddDeviceDialog projectId={currentProject.id} />
                                </div>
                            )}
                        </div>

                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Vultair Integrations</CardTitle>
                            <CardDescription>
                                Explore more integrations to expand your forensic analysis capabilities.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {availableIntegrations.map((integration) => (
                                <div key={integration.id} className="hover:cursor-pointer">
                                    <div className="flex items-start space-x-4 py-2">
                                        <div className="rounded-lg bg-muted p-2">
                                            {integration.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-semibold">{integration.name}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {integration.description}
                                            </p>
                                        </div>
                                    </div>
                                    <Separator className="mt-2" />
                                </div>
                            ))}
                            <Button variant="outline" className="w-full mt-4">
                                Browse Cloud Services
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

