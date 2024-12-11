
import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Battery, ChevronDown, ChevronRight, Smartphone, Wifi } from 'lucide-react'
import * as React from 'react'

interface Device {
    id: string
    name: string
    model: string
    osVersion: string
    status: 'online' | 'offline' | 'busy'
    batteryLevel: number
    storage: {
        total: number
        used: number
    }
    lastSeen: string
    ipAddress: string
    wifiStatus: 'connected' | 'disconnected'
    serialNumber: string
    imei: string
}

const devices: Device[] = [
    {
        id: '1',
        name: 'Pixel 4',
        model: 'Google Pixel 4',
        osVersion: 'Android 12',
        status: 'online',
        batteryLevel: 85,
        storage: {
            total: 128,
            used: 64
        },
        lastSeen: '2023-11-23T12:34:56Z',
        ipAddress: '192.168.1.101',
        wifiStatus: 'connected',
        serialNumber: 'GP4X123456',
        imei: '990000862471854'
    },
]

export function DeviceList() {
    const [expandedDevices, setExpandedDevices] = React.useState<string[]>([])

    const toggleExpand = (deviceId: string) => {
        setExpandedDevices(prev =>
            prev.includes(deviceId)
                ? prev.filter(id => id !== deviceId)
                : [...prev, deviceId]
        )
    }

    const formatStorage = (used: number, total: number) => {
        return `${used} GB / ${total} GB`
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString()
    }

    const getStatusColor = (status: Device['status']) => {
        switch (status) {
            case 'online':
                return 'bg-green-500'
            case 'offline':
                return 'bg-gray-500'
            case 'busy':
                return 'bg-yellow-500'
        }
    }

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-semibold mb-8">Connected Devices</h2>
            <div className="bg-white rounded-lg">
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>OS Version</TableHead>
                            <TableHead>Battery</TableHead>
                            <TableHead>Storage</TableHead>
                            <TableHead>Last Seen</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {devices.map((device) => (
                            <React.Fragment key={device.id}>
                                <TableRow className="border-none">
                                    <TableCell>
                                        <Collapsible>
                                            <CollapsibleTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => toggleExpand(device.id)}
                                                >
                                                    {expandedDevices.includes(device.id) ? (
                                                        <ChevronDown className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronRight className="h-4 w-4" />
                                                    )}
                                                    <span className="sr-only">Toggle details</span>
                                                </Button>
                                            </CollapsibleTrigger>
                                        </Collapsible>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center space-x-2">
                                            <Smartphone className="h-4 w-4" />
                                            <span>{device.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={`${getStatusColor(device.status)} rounded-md w-min px-2 text-white`}>
                                            {device.status}
                                        </div>
                                    </TableCell>
                                    <TableCell>{device.osVersion}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Battery className="h-4 w-4" />
                                            <span>{device.batteryLevel}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{formatStorage(device.storage.used, device.storage.total)}</TableCell>
                                    <TableCell>{formatDate(device.lastSeen)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={7} className="p-0">
                                        <Collapsible open={expandedDevices.includes(device.id)}>
                                            <CollapsibleContent className="px-14 py-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="font-semibold">Model:</p>
                                                        <p>{device.model}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">IP Address:</p>
                                                        <p>{device.ipAddress}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">Wi-Fi Status:</p>
                                                        <div className="flex items-center space-x-2">
                                                            <Wifi className="h-4 w-4" />
                                                            <span>{device.wifiStatus}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">Serial Number:</p>
                                                        <p>{device.serialNumber}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">IMEI:</p>
                                                        <p>{device.imei}</p>
                                                    </div>
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table >
            </div >
        </div >
    )
}

