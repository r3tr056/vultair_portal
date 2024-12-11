import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NodeData } from "@/stores/workflow_store/workflow_editor_store"
import { Node } from "@xyflow/react"
import { BaseNode } from "./base_node"

const methods = [
    { value: "get", label: "GET" },
    { value: "post", label: "POST" },
    { value: "put", label: "PUT" },
    { value: "delete", label: "DELETE" },
]

export function ApiNode({ data, id }: Node<NodeData>) {
    return (
        <BaseNode expanded={data.expanded} onExpand={() => { }} label="API REQUEST">
            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Method</label>
                    <Select defaultValue={data.method || "get"}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a method" />
                        </SelectTrigger>
                        <SelectContent>
                            {methods.map((method) => (
                                <SelectItem key={method.value} value={method.value}>
                                    {method.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Endpoint URL</label>
                    <Input
                        placeholder="https://api.example.com/endpoint"
                        defaultValue={data.url || ""}
                    />
                </div>
                <div className="pt-2 text-xs text-muted-foreground">
                    This node will make an API request to the specified endpoint.
                </div>
                <div className="text-xs text-muted-foreground">
                    Node: #{id}
                </div>
            </div>
        </BaseNode>
    )
}

