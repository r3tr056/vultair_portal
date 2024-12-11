import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface ProjectFormProps {
    onSubmit: (name: string, description: string) => void
    initialName?: string
    initialDescription?: string
}

export function ProjectForm({ onSubmit, initialName = '', initialDescription = '' }: ProjectFormProps) {
    const [name, setName] = useState(initialName)
    const [description, setDescription] = useState(initialDescription)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(name, description)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <Button type="submit">Save Project</Button>
        </form>
    )
}

