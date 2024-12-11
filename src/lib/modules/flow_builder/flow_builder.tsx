
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useProjects } from "@/context/ProjectsContext"
import { useToast } from '@/hooks/use-toast'
import { useHistoryStore } from "@/stores/workflow_store/history_store"
import { NodeData, NodeType, useStore } from "@/stores/workflow_store/workflow_editor_store"
import { Background, Controls, MiniMap, Node, ReactFlow, useReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Box, Check, Play } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { ApiNode } from "./components/nodes/api_node"
import { ConditionNode } from "./components/nodes/condition_node"
import { DeviceActionNode } from "./components/nodes/device_action_node"
import { EndNode } from "./components/nodes/end_node"
import { LoopNode } from "./components/nodes/loop_node"
import { MessageNode } from "./components/nodes/message_node"
import { StartNode } from "./components/nodes/start_node"
import { Sidebar } from "./components/sidebar/workflow_actions"
import { Toolbar } from "./components/toolbar/toolbar"
import { validateWorkflow } from "./utils/validate_workflow"

const nodeTypes = {
    start: StartNode,
    end: EndNode,
    deviceAction: DeviceActionNode,
    message: MessageNode,
    api: ApiNode,
    condition: ConditionNode,
    delay: DelayNode,
    loop: LoopNode,
}

function FlowBuilder() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, updateNode, renameNode, deleteNode, saveWorkflow, loadWorkflow, toggleNodeExpansion } = useStore()
    const { pushState, undo, redo, canUndo, canRedo } = useHistoryStore()
    const { toast } = useToast()
    const [isValidating, setIsValidating] = useState(false)
    const [nodeToDelete, setNodeToDelete] = useState<string | null>(null)
    const [isRenaming, setIsRenaming] = useState(false)
    const [nodeToRename, setNodeToRename] = useState<string | null>(null)
    const [newNodeName, setNewNodeName] = useState('')
    const { fitView, screenToFlowPosition } = useReactFlow()
    const { runScooper, currentProject } = useProjects();
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
    const [apkPath, setApkPath] = useState<string>('')
    // const [messages, setMessages] = useState<string[]>([])
    const [isRunning, setIsRunning] = useState(false)
    // const [isMessagePanelCollapsed, setIsMessagePanelCollapsed] = useState(true)
    // const { user } = useAuth()

    useEffect(() => {
        pushState({ nodes, edges });
    }, [])

    useEffect(() => {
        if (currentProject && currentProject.devices.length > 0) {
            setSelectedDevice(currentProject.devices[0])
        }
        if (currentProject && currentProject.apkPath) {
            setApkPath(currentProject.apkPath)
        }
    }, [currentProject])

    useEffect(() => {
        return () => {
            // Clean up WebSocket connection when component unmounts
            if (currentProject && selectedDevice && currentProject.runningInstances[selectedDevice]?.webSocket) {
                currentProject.runningInstances[selectedDevice].webSocket?.close()
            }
        }
    }, [currentProject, selectedDevice])

    const handleAddNode = useCallback((type: NodeType) => {
        const newNode: Node<NodeData> = {
            id: `${type}-${nodes.length + 1}`,
            type,
            data: { label: `New ${type}`, type, expanded: false },
            position: { x: Math.random() * 300, y: Math.random() * 300 },
        }
        addNode(newNode)
        pushState({ nodes: [...nodes, newNode], edges })
    }, [nodes, edges, addNode, pushState])

    const handleDeleteNode = useCallback((id: string) => {
        setNodeToDelete(id)
    }, [])

    const confirmDeleteNode = useCallback(() => {
        if (nodeToDelete) {
            deleteNode(nodeToDelete)
            pushState({ nodes: nodes.filter(node => node.id !== nodeToDelete), edges })
            setNodeToDelete(null)
        }
    }, [nodeToDelete, deleteNode, nodes, edges, pushState])

    const handleRenameNode = useCallback((id: string, currentLabel: string) => {
        setNodeToRename(id)
        setNewNodeName(currentLabel)
        setIsRenaming(true)
    }, [])

    const confirmRenameNode = useCallback(() => {
        if (nodeToRename && newNodeName) {
            renameNode(nodeToRename, newNodeName)
            pushState({ nodes: nodes.map(node => node.id === nodeToRename ? { ...node, data: { ...node.data, label: newNodeName } } : node), edges })
            setIsRenaming(false)
            setNodeToRename(null)
            setNewNodeName('')
        }
    }, [nodeToRename, newNodeName, renameNode, nodes, edges, pushState])

    const handleToggleNodeExpansion = useCallback((id: string) => {
        toggleNodeExpansion(id)
        pushState({ nodes: nodes.map(node => node.id === id ? { ...node, data: { ...node.data, expanded: !node.data.expanded } } : node), edges })
    }, [toggleNodeExpansion, nodes, edges, pushState])

    const handleValidateFlow = useCallback(() => {
        setIsValidating(true)
        const errors = validateWorkflow(nodes, edges)
        if (errors.length === 0) {
            toast({
                title: "Workflow Validation",
                description: "The workflow is valid.",
                variant: "default",
            })
        } else {
            toast({
                title: "Workflow Validation",
                description: (
                    <ul className="mt-2 list-disc pl-4">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                ),
                variant: "destructive",
            })
        }
        setIsValidating(false)
    }, [nodes, edges, toast])

    const handleSaveWorkflow = useCallback(() => {
        const workflowData = saveWorkflow()
        const dataStr = JSON.stringify(workflowData)
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
        const exportFileDefaultName = 'workflow.json'

        const linkElement = document.createElement('a')
        linkElement.setAttribute('href', dataUri)
        linkElement.setAttribute('download', exportFileDefaultName)
        linkElement.click()
    }, [saveWorkflow])

    const handleLoadWorkflow = useCallback(() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.json'
        input.onchange = (event: Event) => {
            const file = (event.target as HTMLInputElement).files?.[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    const content = e.target?.result
                    if (typeof content === 'string') {
                        try {
                            const workflowData = JSON.parse(content)
                            loadWorkflow(workflowData)
                            pushState(workflowData)
                            toast({
                                title: "Workflow Loaded",
                                description: "The workflow has been successfully loaded.",
                                variant: "default",
                            })
                        } catch (error) {
                            toast({
                                title: "Error",
                                description: "Failed to load the workflow. The file may be corrupted.",
                                variant: "destructive",
                            })
                        }
                    }
                }
                reader.readAsText(file)
            }
        }
        input.click()
    }, [loadWorkflow, pushState, toast])

    const handleRunWorkflow = useCallback(async () => {
        if (!currentProject || !selectedDevice || !apkPath) {
            toast({
                title: 'Error',
                description: "Please select a project, device, and provide an APK path",
                variant: "destructive"
            })
            return
        }

        setIsRunning(true);

        const workflowData = saveWorkflow()
        const workflowJson = JSON.stringify(workflowData)

        console.log("Workflow JSON", workflowJson)
        console.log("Device", selectedDevice)
        console.log("APK", apkPath)
        console.log("Project", currentProject)

        try {
            const runId = await runScooper(currentProject.id, selectedDevice, workflowJson, apkPath)
            if (runId) {
                toast({
                    title: "Workflow Started",
                    description: `Workflow is now running. Run ID: ${runId}`,
                    variant: "default",
                })

                // const ws = new WebSocket(`ws://localhost:8000/ws/${user?.username}/${runId}`)
                // ws.onmessage = (event) => {
                //     setMessages(prev => [...prev, event.data])
                // }
                // ws.onerror = (error) => {
                //     console.error('WebSocket error:', error)
                //     toast({
                //         title: "WebSocket Error",
                //         description: "Failed to establish WebSocket connection.",
                //         variant: "destructive",
                //     })
                // }
                // ws.onclose = () => {
                //     setIsRunning(false)
                //     toast({
                //         title: "Workflow Completed",
                //         description: "The workflow has finished running.",
                //         variant: "default",
                //     })
                // }

            } else {
                throw new Error("Failed to start workflow")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to start the workflow. Please try again.",
                variant: "destructive",
            })
            throw error
        } finally {
            setIsRunning(false)
        }
    }, [currentProject, selectedDevice, apkPath, saveWorkflow, runScooper, toast]);

    const handleCenterView = useCallback(() => {
        fitView({ padding: 0.2, includeHiddenNodes: false })
    }, [fitView])

    const handleUndo = useCallback(() => {
        const prevState = undo()
        if (prevState) {
            loadWorkflow(prevState)
        }
    }, [undo, loadWorkflow])

    const handleRedo = useCallback(() => {
        const nextState = redo()
        if (nextState) {
            loadWorkflow(nextState)
        }
    }, [redo, loadWorkflow])

    // const handleAutoLayout = useCallback(() => {
    //     const g = new dagre.graphlib.Graph()
    //     g.setGraph({ rankdir: 'TB', nodesep: 70, ranksep: 50 })
    //     g.setDefaultEdgeLabel(() => ({}))

    //     nodes.forEach((node) => {
    //         g.setNode(node.id, { width: 150, height: 40 })
    //     })

    //     edges.forEach((edge) => {
    //         g.setEdge(edge.source, edge.target)
    //     })

    //     dagre.layout(g)

    //     const layoutedNodes = nodes.map((node) => {
    //         const nodeWithPosition = g.node(node.id)
    //         return {
    //             ...node,
    //             position: {
    //                 x: nodeWithPosition.x - 75,
    //                 y: nodeWithPosition.y - 20,
    //             },
    //         }
    //     })

    //     onNodesChange(
    //         layoutedNodes.map((node) => ({
    //             id: node.id,
    //             type: 'position',
    //             position: node.position,
    //         }))
    //     )

    //     pushState({ nodes: layoutedNodes, edges })
    //     fitView({ padding: 0.2 })
    // }, [nodes, edges, onNodesChange, pushState, fitView])

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }, [])

    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault()

            const type: NodeType = event.dataTransfer.getData('application/reactflow') as NodeType;

            if (typeof type === 'string') {
                const position = screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY,
                })
                const newNode: Node<NodeData> = {
                    id: `node-${nodes.length + 1}`,
                    type,
                    position,
                    data: { label: `New ${type}`, type, action: 'Select an action', expanded: false },
                }
                addNode(newNode)
                pushState({ nodes: [...nodes, newNode], edges })
            }
        },
        [nodes, edges, addNode, pushState, screenToFlowPosition]
    )

    return (
        <div className="flex h-screen flex-col">
            {/* Header */}
            <header className="border-b bg-background">
                <div className="flex h-14 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Box className="h-6 w-6" />
                        <h1 className="text-lg font-semibold">Workflow Editor</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" onClick={handleValidateFlow} disabled={isValidating}>
                            <Check className="mr-2 h-4 w-4" />
                            {isValidating ? 'Validating...' : 'Validate Flow'}
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            onClick={handleRunWorkflow}
                            disabled={isRunning || !currentProject || !selectedDevice || !apkPath}
                        >
                            <Play className="mr-2 h-4 w-4" />
                            {isRunning ? 'Running...' : 'Run Workflow'}
                        </Button>
                        <Toolbar
                            onUndo={handleUndo}
                            onRedo={handleRedo}
                            onSave={handleSaveWorkflow}
                            onLoad={handleLoadWorkflow}
                            onCenterView={handleCenterView}
                            canUndo={canUndo}
                            canRedo={canRedo}
                        />
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Main Content */}
                <div className="relative flex-1">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                    >
                        <Background />
                        <Controls />
                        <MiniMap />
                    </ReactFlow>
                </div>

                {/* Right Sidebar */}
                <Sidebar
                    nodes={nodes}
                    onAddNode={handleAddNode}
                    onRenameNode={handleRenameNode}
                    onDeleteNode={handleDeleteNode}
                    onUpdateNode={updateNode}
                    onToggleNodeExpansion={handleToggleNodeExpansion}
                />
            </div>

            {/* Message Panel
            <div className="border-t">
                <LogsPanel
                    messages={messages}
                    isCollapsed={isMessagePanelCollapsed}
                    onToggleCollapse={() => setIsMessagePanelCollapsed(!isMessagePanelCollapsed)}
                />
            </div> */}

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!nodeToDelete} onOpenChange={() => setNodeToDelete(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this node? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setNodeToDelete(null)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDeleteNode}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Rename Dialog */}
            <Dialog open={isRenaming} onOpenChange={setIsRenaming}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rename Node</DialogTitle>
                        <DialogDescription>
                            Enter a new name for the node.
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        value={newNodeName}
                        onChange={(e) => setNewNodeName(e.target.value)}
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRenaming(false)}>Cancel</Button>
                        <Button onClick={confirmRenameNode}>Rename</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default FlowBuilder

