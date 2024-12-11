import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Handle, Position } from "@xyflow/react"
import { ChevronDown, ChevronUp } from 'lucide-react'
import * as React from "react"

interface BaseNodeProps {
    children: React.ReactNode
    className?: string
    showInputHandle?: boolean
    showOutputHandle?: boolean
    expanded: boolean
    onExpand: () => void
    label: string
}

export function BaseNode({
    children,
    className,
    showInputHandle = true,
    showOutputHandle = true,
    expanded,
    onExpand,
    label
}: BaseNodeProps) {
    return (
        <Card className={cn("w-[200px] shadow-md", className)}>
            {showInputHandle && (
                <Handle
                    type="target"
                    position={Position.Top}
                    className="!bg-muted-foreground !w-3 !h-3 !border-2 !border-background"
                />
            )}
            <div className="flex items-center justify-between py-1 px-2 border-b">
                <span className="font-medium text-sm">{label}</span>
                <Button variant="ghost" size="sm" onClick={onExpand}>
                    {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
            </div>
            {expanded && children}
            {showOutputHandle && (
                <Handle
                    type="source"
                    position={Position.Bottom}
                    className="!bg-muted-foreground !w-3 !h-3 !border-2 !border-background"
                />
            )}
        </Card>
    )
}

