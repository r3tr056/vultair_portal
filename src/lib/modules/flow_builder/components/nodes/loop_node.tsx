import { Input } from "@/components/ui/input"
import { NodeData } from "@/stores/workflow_store/workflow_editor_store"
import { Node } from "@xyflow/react"
import { BaseNode } from "./base_node"

export function LoopNode({ data, id }: Node<NodeData>) {
    return (
        <BaseNode expanded={data.expanded} onExpand={() => { }} label="LOOP">
            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Loop Count</label>
                    <Input
                        type="number"
                        placeholder="Enter number of iterations"
                        defaultValue={data.loopCount || 1}
                    />
                </div>
                <div className="pt-2 text-xs text-muted-foreground">
                    This node will repeat the subsequent actions for the specified number of times.
                </div>
                <div className="text-xs text-muted-foreground">
                    Node: #{id}
                </div>
            </div>
        </BaseNode>
    )
}

