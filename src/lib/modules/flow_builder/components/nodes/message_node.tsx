import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { NodeData } from "@/stores/workflow_store/workflow_editor_store"
import { Node } from "@xyflow/react"
import { BaseNode } from "./base_node"

const messageServices = [
    { value: "telegram", label: "Telegram" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "slack", label: "Slack" },
    { value: "discord", label: "Discord" },
]
export function MessageNode({ data, id }: Node<NodeData>) {
    return (
        <BaseNode expanded={data.expanded} onExpand={() => { }} label="TEXT MESSAGE">
            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Message Content</label>
                    <Textarea
                        placeholder="Enter your message here..."
                        className="resize-none h-24"
                        defaultValue={data.message || ""}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Service</label>
                    <Select defaultValue={data.service || "telegram"}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                            {messageServices.map((service) => (
                                <SelectItem key={service.value} value={service.value}>
                                    {service.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="pt-2 text-xs text-muted-foreground">
                    This message will be sent to the user using the
                    <span className="font-medium"> "{data.service || 'Telegram'}"</span> channel.
                </div>
                <div className="text-xs text-muted-foreground">
                    Node: #{id}
                </div>
            </div>
        </BaseNode>
    )
}

