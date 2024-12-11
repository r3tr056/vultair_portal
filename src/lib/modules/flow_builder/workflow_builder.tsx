

import { ReactFlowProvider } from '@xyflow/react'
import FlowBuilder from './flow_builder'

export default function WorkflowEditor() {
    return (
        <ReactFlowProvider>
            <FlowBuilder />
        </ReactFlowProvider>
    )
}

