'use client'

import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState
} from '@xyflow/react'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import 'reactflow/dist/style.css'
import { UTGNode } from './utg_node'

interface Run {
  id: string
  timestamp: number
}

const nodeTypes = {
  utgNode: UTGNode,
}

export function UTGViewer() {
  const [runs, setRuns] = useState<Run[]>([])
  const [selectedRun, setSelectedRun] = useState<string>('')
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [loading, setLoading] = useState(false)

  const fetchRuns = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/runs')
      const data = await response.json()
      setRuns(data)
      if (data.length > 0) {
        setSelectedRun(data[0].id)
      }
    } catch (error) {
      console.error('Error fetching runs:', error)
    }
  }, [])

  const fetchUTG = useCallback(async (runId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8000/api/runs/${runId}/utg`)
      const data = await response.json()

      // Transform nodes to react-flow format
      const flowNodes = data.nodes.map((node: any) => ({
        id: node.id,
        type: 'utgNode',
        position: { x: 0, y: 0 }, // Will be laid out automatically
        data: {
          ...node,
          imageUrl: node.image,
        },
      }))

      // Transform edges to react-flow format
      const flowEdges = data.edges.map((edge: any) => ({
        id: edge.id,
        source: edge.from,
        target: edge.to,
        label: edge.label,
        data: edge.events,
      }))

      setNodes(flowNodes)
      setEdges(flowEdges)
    } catch (error) {
      console.error('Error fetching UTG:', error)
    } finally {
      setLoading(false)
    }
  }, [setNodes, setEdges])

  useEffect(() => {
    fetchRuns()
  }, [fetchRuns])

  useEffect(() => {
    if (selectedRun) {
      fetchUTG(selectedRun)
    }
  }, [selectedRun, fetchUTG])

  return (
    <Card className="w-full h-[800px] relative">
      <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-lg">
        <Select value={selectedRun} onValueChange={setSelectedRun}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a run" />
          </SelectTrigger>
          <SelectContent>
            {runs.map((run) => (
              <SelectItem key={run.id} value={run.id}>
                {new Date(run.timestamp * 1000).toLocaleString()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-50">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        className="bg-muted"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Card>
  )
}

