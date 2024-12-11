import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NodeData, useStore } from "@/stores/workflow_store/workflow_editor_store"
import { Node } from "@xyflow/react"
import { BaseNode } from "./base_node"

const deviceActions = [
    { value: "tap", label: "Tap" },
    { value: "swipe", label: "Swipe" },
    { value: "type", label: "Type" },
    { value: "wait", label: "Wait" },
]


export function DeviceActionNode({ data, id }: Node<NodeData>) {
    const updateNode = useStore(state => state.updateNode)
    const toggleNodeExpansion = useStore(state => state.toggleNodeExpansion)

    const handleActionChange = (value: string) => {
        updateNode(id, { action: value })
    }

    return (
        <BaseNode
            expanded={data.expanded}
            onExpand={() => toggleNodeExpansion(id)}
            label="DEVICE ACTION"
        >
            <div className="p-2 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Action Type</label>
                    <Select
                        value={data.action || "tap"}
                        onValueChange={handleActionChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select an action" />
                        </SelectTrigger>
                        <SelectContent>
                            {deviceActions.map((action) => (
                                <SelectItem key={action.value} value={action.value}>
                                    {action.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="pt-2 text-xs text-muted-foreground">
                    This action will be performed on the connected device.
                </div>
                <div className="text-xs text-muted-foreground">
                    Node: #{id}
                </div>
            </div>
        </BaseNode>
    )
}
