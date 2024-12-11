import { Connection, Edge, Node, addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { create } from 'zustand';

export type NodeType = "start" | "end" | "deviceAction" | "message" | "api" | "condition" | "delay" | "loop";

export type NodeData = {
    label: string;
    type: NodeType;
    expanded: boolean;
    action?: string;
    message?: string;
    service?: string;
    method?: string;
    url?: string;
    condition?: string;
    delayTime?: number;
    loopCount?: number;
}

type WorkflowData = {
    nodes: Node<NodeData>[]
    edges: Edge[]
}

type RFState = {
    nodes: Node<NodeData>[]
    edges: Edge[]
    setNodes: (nodes: Node<NodeData>[]) => void
    setEdges: (edges: Edge[]) => void
    addNode: (node: Node<NodeData>) => void
    updateNode: (id: string, data: Partial<NodeData>) => void
    renameNode: (id: string, newLabel: string) => void
    deleteNode: (id: string) => void
    onNodesChange: (changes: any) => void
    onEdgesChange: (changes: any) => void
    onConnect: (connection: Connection) => void
    saveWorkflow: () => WorkflowData
    loadWorkflow: (data: WorkflowData) => void
    toggleNodeExpansion: (id: string) => void
}

export const useStore = create<RFState>((set, get) => ({
    nodes: [
        {
            id: 'start',
            type: 'start',
            data: { label: 'Start', type: 'start', expanded: false },
            position: { x: 0, y: 0 },
        },
        {
            id: 'end',
            type: 'end',
            data: { label: 'End', type: 'end', expanded: false },
            position: { x: 0, y: 200 },
        },
    ],
    edges: [],
    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),
    addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
    updateNode: (id, data) =>
        set((state) => ({
            nodes: state.nodes.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, ...data } } : node
            ),
        })),
    toggleNodeExpansion: (id: string) =>
        set((state) => ({
            nodes: state.nodes.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, expanded: !node.data.expanded } } : node
            ),
        })),
    renameNode: (id, newLabel) =>
        set((state) => ({
            nodes: state.nodes.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node
            ),
        })),
    deleteNode: (id) =>
        set((state) => ({
            nodes: state.nodes.filter((node) => node.id !== id),
            edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
        })),
    onNodesChange: (changes) => set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) })),
    onEdgesChange: (changes) => set((state) => ({ edges: applyEdgeChanges(changes, state.edges) })),
    onConnect: (connection) => set((state) => ({ edges: addEdge(connection, state.edges) })),
    saveWorkflow: () => {
        const { nodes, edges } = get()
        return { nodes, edges }
    },
    loadWorkflow: (data) => set(data),
}))

