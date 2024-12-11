import { Handle, Position } from '@xyflow/react'
import { Square } from 'lucide-react'
import { memo } from 'react'

export const EndNode = memo(() => {
    return (
        <>
            <Handle type="target" position={Position.Top} className="w-3 h-3" />
            <div className="rounded-md border bg-background p-3 shadow-sm">
                <div className="flex items-center">
                    <Square className="mr-2 h-4 w-4 text-red-500" />
                    <div className="text-sm font-medium">End</div>
                </div>
            </div>
        </>
    )
})

EndNode.displayName = 'EndNode'

