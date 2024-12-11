'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Project, useProjects } from "@/context/ProjectsContext"
import { Edit, LayoutGrid, List, Plus, Search, Trash2, Upload } from 'lucide-react'
import { useState } from 'react'
import { Link } from "react-router-dom"
import { ProjectForm } from "./project_form"

export default function ProjectsPage() {
    const { projects, createProject, updateProject, deleteProject, searchProjects, uploadApk } = useProjects();
    const [searchQuery, setSearchQuery] = useState('')
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [editingProject, setEditingProject] = useState<Project | null>(null)

    const filteredProjects = searchProjects(searchQuery);

    const handleCreateProject = async (name: string, description: string) => {
        await createProject(name, description)
        setIsCreateDialogOpen(false)
    }

    const handleUpdateProject = (id: string, name: string, description: string) => {
        updateProject(id, name, description)
        setEditingProject(null)
    }

    const handleDeleteProject = (id: string) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            deleteProject(id)
        }
    }

    const handleUploadApk = async (projectId: string, file: File) => {
        try {
            await uploadApk(projectId, file)
        } catch (error) {
            console.error("Failed to upload APK:", error)
        }
    }

    const ProjectCard = ({ project }: { project: Project }) => (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <Link to={`/projects/${project.id}`} className="hover:underline">
                        {project.name}
                    </Link>
                    <div>
                        <Button variant="ghost" size="icon" onClick={() => setEditingProject(project)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <h3 className="font-semibold mb-2">Target App: {project.apkPath || 'Not set'}</h3>
                <div className="mb-2">
                    <h3 className="font-semibold">Connected Devices:</h3>
                    {project.devices.length > 0 ? (
                        project.devices.map((device, index) => (
                            <p key={index} className="text-sm">{device}</p>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">No devices connected</p>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        Last updated: {new Date(project.lastUpdated).toLocaleDateString()}
                    </p>
                    <Button variant="outline" size="sm" onClick={() => document.getElementById(`fileInput-${project.id}`)?.click()}>
                        <Upload className="h-4 w-4 mr-2" /> Upload APK
                    </Button>
                    <input
                        id={`fileInput-${project.id}`}
                        type="file"
                        accept=".apk"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleUploadApk(project.id, file)
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    )

    return (
        <div className="container mx-auto py-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Projects</h1>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> New Project
                </Button>
            </div>

            <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            {projects.length === 0 ? (
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>No projects yet</CardTitle>
                        <CardDescription>Create your first project to get started.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => setIsCreateDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" /> Create Project
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Tabs defaultValue="grid" className="w-full">
                    <div className="flex justify-between items-center mb-4">
                        <TabsList>
                            <TabsTrigger value="grid"><LayoutGrid className="h-4 w-4" /></TabsTrigger>
                            <TabsTrigger value="list"><List className="h-4 w-4" /></TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="grid">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="list">
                        <div className="space-y-4">
                            {filteredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            )}

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Project</DialogTitle>
                        <DialogDescription>
                            Enter the details for your new project.
                        </DialogDescription>
                    </DialogHeader>
                    <ProjectForm onSubmit={handleCreateProject} />
                </DialogContent>
            </Dialog>

            <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                        <DialogDescription>
                            Update the details of your project.
                        </DialogDescription>
                    </DialogHeader>
                    {editingProject && (
                        <ProjectForm
                            onSubmit={(name, description) => handleUpdateProject(editingProject.id, name, description)}
                            initialName={editingProject.name}
                            initialDescription={editingProject.description}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

