
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronUp } from 'lucide-react'
import React from 'react'


interface LogsPanelProps {
    messages: string[]
    isCollapsed: boolean
    onToggleCollapse: () => void
}

export const LogsPanel: React.FC<LogsPanelProps> = ({ messages, isCollapsed, onToggleCollapse }) => {
    return (
        <Card className={`w-full transition-all duration-300 ease-in-out ${isCollapsed ? 'h-12' : 'h-64'}`}>
            <CardHeader className="p-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Workflow Messages</CardTitle>
                <Button variant="ghost" size="sm" onClick={onToggleCollapse}>
                    {isCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
            </CardHeader>
            {!isCollapsed && (
                <CardContent className="p-2">
                    <ScrollArea className="h-48">
                        {messages.map((message, index) => (
                            <div key={index} className="mb-2">
                                <span className="text-sm text-muted-foreground">{new Date().toLocaleTimeString()}: </span>
                                <span className="text-sm">{message}</span>
                            </div>
                        ))}
                    </ScrollArea>
                </CardContent>
            )}
        </Card>
    )
}
