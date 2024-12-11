import { Button } from "@/components/ui/button"
import { Redo, Save, Settings, Undo, Upload, ZoomIn } from 'lucide-react'

interface ToolbarProps {
    onUndo: () => void
    onRedo: () => void
    onSave: () => void
    onLoad: () => void
    onCenterView: () => void
    canUndo: boolean
    canRedo: boolean
}

export function Toolbar({
    onUndo,
    onRedo,
    onSave,
    onLoad,
    onCenterView,
    canUndo,
    canRedo
}: ToolbarProps) {
    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onUndo} disabled={!canUndo}>
                <Undo className="mr-2 h-4 w-4" />
                Undo
            </Button>
            <Button variant="outline" size="sm" onClick={onRedo} disabled={!canRedo}>
                <Redo className="mr-2 h-4 w-4" />
                Redo
            </Button>
            <Button variant="outline" size="sm" onClick={onSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Workflow
            </Button>
            <Button variant="outline" size="sm" onClick={onLoad}>
                <Upload className="mr-2 h-4 w-4" />
                Load Workflow
            </Button>
            <Button variant="outline" size="sm" onClick={onCenterView}>
                <ZoomIn className="mr-2 h-4 w-4" />
                Center View
            </Button>
            <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
            </Button>
        </div>
    )
}
