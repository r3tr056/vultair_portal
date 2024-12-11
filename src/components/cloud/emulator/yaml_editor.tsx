
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react'

interface YamlEditorProps {
    yaml: string
    onChange: (yaml: string) => void
}

export function YamlEditor({ yaml, onChange }: YamlEditorProps) {
    const [activeTab, setActiveTab] = useState('editor')

    return (
        <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={70}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                    <TabsList className="w-full justify-start">
                        <TabsTrigger value="editor">Editor</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="editor" className="flex-grow">
                        <textarea
                            value={yaml}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-full h-full p-4 font-mono text-sm bg-gray-50 resize-none focus:outline-none"
                            placeholder="Enter your YAML here..."
                        />
                    </TabsContent>
                    <TabsContent value="preview" className="flex-grow">
                        <pre className="w-full h-full p-4 font-mono text-sm bg-gray-50 overflow-auto">
                            {yaml}
                        </pre>
                    </TabsContent>
                </Tabs>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30}>
                <div className="h-full p-4 bg-white">
                    <h3 className="text-lg font-semibold mb-2">Console Output</h3>
                    <pre className="bg-gray-100 p-2 rounded text-sm">
                        Waiting for YAML execution...
                    </pre>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

