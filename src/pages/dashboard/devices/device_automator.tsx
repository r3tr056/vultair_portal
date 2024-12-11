'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import HorizontalFlow from "@/lib/modules/flow_builder/flow_builder"
import { ReactFlowProvider } from "@xyflow/react"
import { Box, Check, Copy, Maximize, MessageSquare, PlayCircle, Settings, Square, ZoomIn, ZoomOut } from 'lucide-react'

export default function DeviceAutomator() {
    return (
        <div className="flex h-screen flex-col">
            {/* Header */}
            <header className="border-b bg-background">
                <div className="flex h-14 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Box className="h-6 w-6" />
                        <h1 className="text-lg font-semibold">Device Automator</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="default" size="sm">
                            <Check className="mr-2 h-4 w-4" />
                            Validate Flow
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Main Content */}
                <ReactFlowProvider>
                    <div className="relative flex-1 bg-muted/10">
                        {/* Placeholder for graph */}
                        <div>
                            <HorizontalFlow />
                        </div>

                        {/* Zoom controls */}
                        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                            <Button variant="outline" size="icon">
                                <ZoomIn className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <ZoomOut className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Maximize className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </ReactFlowProvider>

                {/* Right Sidebar */}
                <div className="w-80 border-l bg-background">
                    <div className="flex h-14 items-center justify-between border-b px-4">
                        <h2 className="text-sm font-semibold">Nodes in Flow</h2>
                    </div>
                    <ScrollArea className="h-[calc(50vh-3.5rem)] border-b">
                        <div className="space-y-2 p-4">
                            <Card>
                                <CardContent className="flex items-center gap-2 p-2">
                                    <PlayCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">START</span>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center gap-2 p-2">
                                    <MessageSquare className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm">TEXT MESSAGE</span>
                                    <code className="ml-auto text-xs text-muted-foreground bg-gray-100 px-1 rounded-md">@8DLC...d0012D</code>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center gap-2 p-2">
                                    <MessageSquare className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm">TEXT MESSAGE</span>
                                    <code className="ml-auto text-xs text-muted-foreground">cgMyg...tGm6p</code>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center gap-2 p-2">
                                    <Square className="h-4 w-4 text-red-500" />
                                    <span className="text-sm">END</span>
                                </CardContent>
                            </Card>
                        </div>
                    </ScrollArea>

                    <div className="p-4">
                        <h2 className="mb-4 text-sm font-semibold">Properties</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="identifier">Unique Identifier</Label>
                                <Input
                                    id="identifier"
                                    value="_cgMygrMm8UeOw4tG1m6p"
                                    readOnly
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="channel">Channel</Label>
                                <Select defaultValue="sms">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sms">SMS</SelectItem>
                                        <SelectItem value="email">Email</SelectItem>
                                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Enter your message here"
                                    className="min-h-[100px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

