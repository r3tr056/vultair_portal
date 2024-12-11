import { Input } from "@/components/ui/input"
import { NodeData } from "@/stores/workflow_store/workflow_editor_store"
import { Node } from "@xyflow/react"
import { BaseNode } from "./base_node"

export function DelayNode({ data, id }: Node<NodeData>) {
    return (
        <BaseNode expanded={data.expanded} onExpand={() => { }} label="DELAY">
            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Delay Time (seconds)</label>
                    <Input
                        type="number"
                        placeholder="Enter delay time in seconds"
                        defaultValue={data.delayTime || 0}
                    />
                </div>
                <div className="pt-2 text-xs text-muted-foreground">
                    This node will pause the workflow execution for the specified time.
                </div>
                <div className="text-xs text-muted-foreground">
                    Node: #{id}
                </div>
            </div>
        </BaseNode>
    )
}

