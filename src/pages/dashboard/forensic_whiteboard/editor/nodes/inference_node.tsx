
import { Handle, NodeResizer, Position } from '@xyflow/react'
import { memo } from 'react'

export const InferenceNode = memo(({ data, selected }: any) => {
    return (
        <>
            <NodeResizer minWidth={100} minHeight={30} isVisible={selected} />
            <Handle type="target" position={Position.Top} />
            <div className="p-2 rounded shadow-md bg-green-100 border-2 border-green-500">
                <div className="font-bold text-sm">{data.label}</div>
                <div className="text-xs">{data.content}</div>
            </div>
            <Handle type="source" position={Position.Bottom} />
        </>
    )
})

InferenceNode.displayName = 'InferenceNode'

