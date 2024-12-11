'use client'

import { AdbCommandLine } from "@/components/cloud/emulator/adb_command_line"
import { DeviceFrame } from "@/components/cloud/emulator/device_frame"
import { Button } from "@/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { StopIcon } from "@radix-ui/react-icons"

export default function EmulatorPage() {

    return (
        <div className=" flex flex-col container mx-auto">
            <header className="flex justify-between items-center p-4 border-b">
                <h1 className="text-2xl font-bold">Cloud Emulator</h1>
                <Button>
                    <StopIcon className="mr-2 h-4 w-4" /> Stop
                </Button>
            </header>
            <ResizablePanelGroup direction="horizontal" className="flex-grow m">
                <ResizablePanel defaultSize={40} minSize={40} className="">

                    <DeviceFrame />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={60} minSize={40}>
                    <AdbCommandLine />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

