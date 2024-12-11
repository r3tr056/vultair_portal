import { Textarea } from "@/components/ui/textarea"
import { NodeData } from "@/stores/workflow_store/workflow_editor_store"
import { Node } from "@xyflow/react"
import { BaseNode } from "./base_node"

export function ConditionNode({ data, id }: Node<NodeData>) {
    return (
        <BaseNode expanded={data.expanded} onExpand={() => { }} label="CONDITION">
            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Condition</label>
                    <Textarea
                        placeholder="Enter your condition here..."
                        className="resize-none h-24"
                        defaultValue={data.condition || ""}
                    />
                </div>
                <div className="pt-2 text-xs text-muted-foreground">
                    This node will evaluate the condition and determine the flow path.
                </div>
                <div className="text-xs text-muted-foreground">
                    Node: #{id}
                </div>
            </div>
        </BaseNode>
    )
}

