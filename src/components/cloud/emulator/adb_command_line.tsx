
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from 'react'
import { ResizablePanel, ResizablePanelGroup } from "../../ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { DeviceControlPanel } from "./device_control_panel"
import { FileExplorer } from "./file_explorer"

export function AdbCommandLine() {
    const [command, setCommand] = useState('')
    const [output, setOutput] = useState<string[]>([])
    const [activeTab, setActiveTab] = useState('comandline')

    const handleCommand = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!command.trim()) return

        // In a real application, this would send the command to a backend service
        // that interfaces with the ADB
        setOutput(prev => [...prev, `$ ${command}`, 'Executing command...'])
        setCommand('')

        // Simulating a response from ADB
        setTimeout(() => {
            setOutput(prev => [...prev, 'Command executed successfully'])
        }, 1000)
    }

    return (
        <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={70} minSize={40}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col border">
                    <TabsList className="w-full justify-start">
                        <TabsTrigger value="comandline">Command Line</TabsTrigger>
                        <TabsTrigger value="controls">Controls</TabsTrigger>
                        <TabsTrigger value="explorer">File Explorer</TabsTrigger>
                    </TabsList>
                    <TabsContent value="comandline" className="flex-grow">
                        <div className="border-t p-4 pb-12 w-full h-full bg-gray-100 text-black font-mono">
                            <ScrollArea className="h-full">
                                {output.map((line, index) => (
                                    <div key={index}>{line}</div>
                                ))}
                            </ScrollArea>
                            <form onSubmit={handleCommand} className="flex space-x-2">
                                <Input
                                    type="text"
                                    value={command}
                                    onChange={(e) => setCommand(e.target.value)}
                                    placeholder="Enter ADB command"

                                />
                                <Button type="submit">Execute</Button>
                            </form>
                        </div>
                    </TabsContent>
                    <TabsContent value="controls" className="flex-grow">
                        <DeviceControlPanel />
                    </TabsContent>
                    <TabsContent value="explorer" className="flex-grow">
                        <FileExplorer />
                    </TabsContent>
                </Tabs>

            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

