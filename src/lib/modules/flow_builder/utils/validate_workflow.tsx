import { NodeType } from '@/stores/workflow_store/workflow_editor_store'
import { Edge, Node } from '@xyflow/react'

type NodeData = {
    label: string
    type: NodeType
    action?: string
}

export function validateWorkflow(nodes: Node<NodeData>[], edges: Edge[]) {
    const errors: string[] = []

    // Check if there's exactly one start node
    const startNodes = nodes.filter((node) => node.type === 'start')
    if (startNodes.length !== 1) {
        errors.push('There must be exactly one Start node')
    }

    // Check if there's at least one end node
    const endNodes = nodes.filter((node) => node.type === 'end')
    if (endNodes.length === 0) {
        errors.push('There must be at least one End node')
    }

    // Check if all device action nodes have an action selected
    const deviceActionNodes = nodes.filter((node) => node.type === 'deviceAction')
    deviceActionNodes.forEach((node) => {
        if (!node.data.action || node.data.action === 'Select an action') {
            errors.push(`Node "${node.data.label}" must have an action selected`)
        }
    })

    // Check if all nodes are connected
    const connectedNodeIds = new Set<string>()
    edges.forEach((edge) => {
        connectedNodeIds.add(edge.source)
        connectedNodeIds.add(edge.target)
    })
    nodes.forEach((node) => {
        if (!connectedNodeIds.has(node.id)) {
            errors.push(`Node "${node.data.label}" is not connected to the workflow`)
        }
    })

    // Check if there are any cycles in the workflow
    const visited = new Set<string>()
    const recursionStack = new Set<string>()

    function dfs(nodeId: string): boolean {
        visited.add(nodeId)
        recursionStack.add(nodeId)

        const outgoingEdges = edges.filter((edge) => edge.source === nodeId)
        for (const edge of outgoingEdges) {
            if (!visited.has(edge.target)) {
                if (dfs(edge.target)) {
                    return true
                }
            } else if (recursionStack.has(edge.target)) {
                return true
            }
        }

        recursionStack.delete(nodeId)
        return false
    }

    if (startNodes.length === 1) {
        if (dfs(startNodes[0].id)) {
            errors.push('The workflow contains a cycle')
        }
    }

    return errors
}

