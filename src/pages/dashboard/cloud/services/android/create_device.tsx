
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, HardDrive, MemoryStick, Smartphone } from 'lucide-react'
import { useState } from 'react'

export default function AVDCreatorPage() {
    const [avdName, setAvdName] = useState('')
    const [deviceDefinition, setDeviceDefinition] = useState('')
    const [systemImage, setSystemImage] = useState('')
    const [awsInstanceType, setAwsInstanceType] = useState('')
    const [orientation, setOrientation] = useState('portrait')
    const [ramSize, setRamSize] = useState(2048)
    const [internalStorage, setInternalStorage] = useState(8)
    const [sdCard, setSdCard] = useState(false)
    const [sdCardSize, setSdCardSize] = useState(2048)

    const handleCreateAVD = () => {
        // Here you would typically send the AVD configuration to your backend
        console.log('Creating AVD with configuration:', {
            avdName,
            deviceDefinition,
            systemImage,
            awsInstanceType,
            orientation,
            ramSize,
            internalStorage,
            sdCard,
            sdCardSize
        })
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Create Android Virtual Device (AVD)</h1>
            <Card>
                <CardHeader>
                    <CardTitle>AVD Configuration</CardTitle>
                    <CardDescription>Configure your Android Virtual Device</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="device" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-4">
                            <TabsTrigger value="device">Device</TabsTrigger>
                            <TabsTrigger value="system">System Image</TabsTrigger>
                            <TabsTrigger value="hardware">Hardware</TabsTrigger>
                            <TabsTrigger value="aws">Provider</TabsTrigger>
                        </TabsList>
                        <TabsContent value="device">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="avd-name">AVD Name</Label>
                                    <Input id="avd-name" value={avdName} onChange={(e) => setAvdName(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="device-definition">Device Definition</Label>
                                    <Select value={deviceDefinition} onValueChange={setDeviceDefinition}>
                                        <SelectTrigger id="device-definition">
                                            <SelectValue placeholder="Select a device" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pixel_5">Pixel 5</SelectItem>
                                            <SelectItem value="pixel_4">Pixel 4</SelectItem>
                                            <SelectItem value="nexus_5x">Nexus 5X</SelectItem>
                                            <SelectItem value="nexus_6p">Nexus 6P</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="orientation">Screen Orientation</Label>
                                    <Select value={orientation} onValueChange={setOrientation}>
                                        <SelectTrigger id="orientation">
                                            <SelectValue placeholder="Select orientation" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="portrait">Portrait</SelectItem>
                                            <SelectItem value="landscape">Landscape</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="system">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="system-image">System Image</Label>
                                    <Select value={systemImage} onValueChange={setSystemImage}>
                                        <SelectTrigger id="system-image">
                                            <SelectValue placeholder="Select a system image" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="android_11">Android 11.0 (R)</SelectItem>
                                            <SelectItem value="android_10">Android 10.0 (Q)</SelectItem>
                                            <SelectItem value="android_9">Android 9.0 (Pie)</SelectItem>
                                            <SelectItem value="android_8_1">Android 8.1 (Oreo)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="hardware">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="ram-size">RAM Size (MB)</Label>
                                    <div className="flex items-center space-x-2">
                                        <Slider
                                            id="ram-size"
                                            min={1024}
                                            max={8192}
                                            step={1024}
                                            value={[ramSize]}
                                            onValueChange={(value: any) => setRamSize(value[0])}
                                        />
                                        <span>{ramSize} MB</span>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="internal-storage">Internal Storage (GB)</Label>
                                    <div className="flex items-center space-x-2">
                                        <Slider
                                            id="internal-storage"
                                            min={2}
                                            max={64}
                                            step={2}
                                            value={[internalStorage]}
                                            onValueChange={(value: any) => setInternalStorage(value[0])}
                                        />
                                        <span>{internalStorage} GB</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="sd-card" checked={sdCard} onCheckedChange={setSdCard} />
                                    <Label htmlFor="sd-card">SD Card</Label>
                                </div>
                                {sdCard && (
                                    <div>
                                        <Label htmlFor="sd-card-size">SD Card Size (MB)</Label>
                                        <div className="flex items-center space-x-2">
                                            <Slider
                                                id="sd-card-size"
                                                min={1024}
                                                max={8192}
                                                step={1024}
                                                value={[sdCardSize]}
                                                onValueChange={(value: any) => setSdCardSize(value[0])}
                                            />
                                            <span>{sdCardSize} MB</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="aws">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="aws-instance-type">AWS Instance Type</Label>
                                    <Select value={awsInstanceType} onValueChange={setAwsInstanceType}>
                                        <SelectTrigger id="aws-instance-type">
                                            <SelectValue placeholder="Select an instance type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="t2.micro">t2.micro</SelectItem>
                                            <SelectItem value="t2.small">t2.small</SelectItem>
                                            <SelectItem value="t2.medium">t2.medium</SelectItem>
                                            <SelectItem value="t3.medium">t3.medium</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleCreateAVD}>Create AVD</Button>
                </CardFooter>
            </Card>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>AVD Summary</CardTitle>
                    <CardDescription>Overview of your AVD configuration</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                            <Smartphone className="h-4 w-4" />
                            <span>Device: {deviceDefinition || 'Not selected'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <HardDrive className="h-4 w-4" />
                            <span>System Image: {systemImage || 'Not selected'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MemoryStick className="h-4 w-4" />
                            <span>RAM: {ramSize} MB</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <HardDrive className="h-4 w-4" />
                            <span>Storage: {internalStorage} GB</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Cpu className="h-4 w-4" />
                            <span>AWS Instance: {awsInstanceType || 'Not selected'}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
