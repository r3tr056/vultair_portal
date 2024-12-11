import { Handle, Position } from '@xyflow/react'
import { PlayCircle } from 'lucide-react'
import { memo } from 'react'

export const StartNode = memo(() => {
  return (
    <>
      <div className="rounded-md border bg-background p-3 shadow-sm">
        <div className="flex items-center">
          <PlayCircle className="mr-2 h-4 w-4 text-green-500" />
          <div className="text-sm font-medium">Start</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </>
  )
})

StartNode.displayName = 'StartNode'
