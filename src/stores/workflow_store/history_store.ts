import { Edge, Node } from '@xyflow/react'
import { create } from 'zustand'
import { NodeData } from './workflow_editor_store'

type WorkflowData = {
    nodes: Node<NodeData>[]
    edges: Edge[]
}

type HistoryState = {
    past: WorkflowData[]
    present: WorkflowData
    future: WorkflowData[]
    canUndo: boolean
    canRedo: boolean
    pushState: (state: WorkflowData) => void
    undo: () => WorkflowData | null
    redo: () => WorkflowData | null
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
    past: [],
    present: { nodes: [], edges: [] },
    future: [],
    canUndo: false,
    canRedo: false,
    pushState: (newPresent) => {
        set((state) => ({
            past: [...state.past, state.present],
            present: newPresent,
            future: [],
            canUndo: true,
            canRedo: false,
        }))
    },
    undo: () => {
        const { past, present, future } = get()
        if (past.length === 0) return null

        const newPresent = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)

        set({
            past: newPast,
            present: newPresent,
            future: [present, ...future],
            canUndo: newPast.length > 0,
            canRedo: true,
        })

        return newPresent
    },
    redo: () => {
        const { past, present, future } = get()
        if (future.length === 0) return null

        const newPresent = future[0]
        const newFuture = future.slice(1)

        set({
            past: [...past, present],
            present: newPresent,
            future: newFuture,
            canUndo: true,
            canRedo: newFuture.length > 0,
        })

        return newPresent
    },
}))

