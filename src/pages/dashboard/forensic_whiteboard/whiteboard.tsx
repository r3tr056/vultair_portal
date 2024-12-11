
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Background,
    Connection,
    Controls,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    ReactFlow,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useCallback, useState } from 'react'
import { ConclusionNode } from "./editor/nodes/conclusion_node"
import { EvidenceNode } from './editor/nodes/evidence_node'
import { InferenceNode } from './editor/nodes/inference_node'

const nodeTypes = {
    evidenceNode: EvidenceNode,
    inferenceNode: InferenceNode,
    conclusionNode: ConclusionNode,
}

export function ForensicWhiteboard() {
    const [nodes, setNodes] = useState<Node[]>([])
    const [edges, setEdges] = useState<Edge[]>([])
    const [nodeName, setNodeName] = useState('')
    const [nodeContent, setNodeContent] = useState('')

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    )
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    )
    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        []
    )

    const addNode = (type: 'evidenceNode' | 'inferenceNode' | 'conclusionNode') => {
        const newNode: Node = {
            id: `${type}-${nodes.length + 1}`,
            type: type,
            position: { x: Math.random() * 500, y: Math.random() * 300 },
            data: { label: nodeName, content: nodeContent },
        }
        setNodes((nds) => [...nds, newNode])
        setNodeName('')
        setNodeContent('')
    }

    const generateReport = () => {
        let report = "Forensic Analysis Report\n\n"

        report += "Evidence:\n"
        nodes.filter(node => node.type === 'evidenceNode').forEach(node => {
            report += `- ${node.data.label}: ${node.data.content}\n`
        })

        report += "\nInferences:\n"
        nodes.filter(node => node.type === 'inferenceNode').forEach(node => {
            report += `- ${node.data.label}: ${node.data.content}\n`
        })

        report += "\nConclusions:\n"
        nodes.filter(node => node.type === 'conclusionNode').forEach(node => {
            report += `- ${node.data.label}: ${node.data.content}\n`
        })

        console.log(report)
        alert("Report generated! Check the console for details.")
    }

    return (
        <div className="h-[800px] w-full">
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
            >
                <Background />
                <Controls />
            </ReactFlow>
            <div className="mt-4 space-y-4">
                <div className="flex space-x-4">
                    <div className="space-y-2">
                        <Label htmlFor="node-name">Node Name</Label>
                        <Input
                            id="node-name"
                            value={nodeName}
                            onChange={(e) => setNodeName(e.target.value)}
                            placeholder="Enter node name"
                        />
                    </div>
                    <div className="space-y-2 flex-grow">
                        <Label htmlFor="node-content">Node Content</Label>
                        <Textarea
                            id="node-content"
                            value={nodeContent}
                            onChange={(e) => setNodeContent(e.target.value)}
                            placeholder="Enter node content"
                        />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <Button onClick={() => addNode('evidenceNode')}>Add Evidence</Button>
                    <Button onClick={() => addNode('inferenceNode')}>Add Inference</Button>
                    <Button onClick={() => addNode('conclusionNode')}>Add Conclusion</Button>
                    <Button onClick={generateReport}>Generate Report</Button>
                </div>
            </div>
        </div>
    )
}

