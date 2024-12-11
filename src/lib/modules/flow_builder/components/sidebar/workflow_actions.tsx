import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NodeType } from '@/stores/workflow_store/workflow_editor_store'
import { Clock, GitBranch, Globe, MessageCircle, PanelBottomClose, PanelTopClose, Repeat, Smartphone, TextCursorInput, Trash2 } from 'lucide-react'

interface SidebarProps {
    nodes: any[];
    onAddNode: (type: NodeType) => void;
    onRenameNode: (id: string, name: string) => void;
    onDeleteNode: (id: string) => void;
    onUpdateNode: (id: string, updates: any) => void;
    onToggleNodeExpansion: (id: string) => void;
}

const nodeTypes: { type: NodeType; label: string; icon: React.ElementType }[] = [
    { type: 'deviceAction', label: 'Device Action', icon: Smartphone },
    { type: 'message', label: 'Message', icon: MessageCircle },
    { type: 'api', label: 'API Request', icon: Globe },
    { type: 'condition', label: 'Condition', icon: GitBranch },
    { type: 'delay', label: 'Delay', icon: Clock },
    { type: 'loop', label: 'Loop', icon: Repeat },
];

export function Sidebar({
    nodes,
    onAddNode,
    onRenameNode,
    onDeleteNode,
    onUpdateNode,
    onToggleNodeExpansion
}: SidebarProps) {
    const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    }

    return (
        <div className=" border-l bg-background">
            <div className="flex h-14 items-center justify-between border-b px-4">
                <h2 className="text-sm font-semibold">Workflow Actions</h2>
            </div>
            <ScrollArea className="h-[calc(100vh-3.5rem)]">
                <div className="space-y-4 p-4">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Drag to add</h3>
                        {nodeTypes.map((nodeType) => (
                            <Card
                                key={nodeType.type}
                                className="flex items-center p-2 cursor-move"
                                draggable
                                onDragStart={(event) => onDragStart(event, nodeType.type)}
                                onClick={() => onAddNode(nodeType.type)}
                            >
                                <nodeType.icon className="mr-2 h-4 w-4" />
                                <span className="text-sm">{nodeType.label}</span>
                            </Card>
                        ))}
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Existing Nodes</h3>
                        {nodes.map((node) => (
                            <div key={node.id}>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium p-2">{node.data.label}</span>
                                    <div className="flex">
                                        <Button variant="ghost" size="sm" onClick={() => onRenameNode(node.id, '')}>
                                            <TextCursorInput />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => onToggleNodeExpansion(node.id)}>
                                            {node.data.expanded ? <PanelTopClose /> : <PanelBottomClose />}
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => onDeleteNode(node.id)}>
                                            <Trash2 color="red" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
