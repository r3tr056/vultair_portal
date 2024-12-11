import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

export interface Project {
    id: string;
    name: string;
    description: string;
    lastUpdated: string;
    devices: string[];
    apkPath: string | null;
    runningInstances: {
        [deviceId: string]: { process: any; runId: string; webSocket?: WebSocket };
    };
}

interface ProjectsContextType {
    projects: Project[];
    currentProject: Project | null;
    setCurrentProject: (projectId: string) => void;
    getProjects: () => Promise<void>;
    createProject: (name: string, description: string) => Promise<void>;
    updateProject: (id: string, name: string, description: string) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    searchProjects: (query: string) => Project[];
    addDevice: (projectId: string, deviceId: string) => Promise<void>;
    uploadApk: (projectId: string, file: File) => Promise<any>;
    runScooper: (projectId: string, deviceId: string, workflowJson: string, apkPath: string) => Promise<string | null>;
    stopScooper: (projectId: string, deviceId: string) => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export const ProjectsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProjectState] = useState<Project | null>(null);
    const { user } = useAuth();

    const axiosClient = axios.create({
        baseURL: "http://localhost:8000",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': user?.apiKey ? `Bearer ${user.apiKey}` : undefined,
        }
    });

    useEffect(() => {
        if (user) {
            getProjects();
        }
    }, [user]);

    const setCurrentProject = (projectId: string) => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            setCurrentProjectState(project);
        } else {
            console.error(`Project with id ${projectId} not found`);
        }
    };

    const getProjects = async () => {
        try {
            const response = await axiosClient.get('/projects/');
            setProjects(response.data);
        } catch (error) {
            console.error("Failed to retrieve projects:", error);
        }
    };

    const createProject = async (name: string, description: string) => {
        try {
            await axiosClient.post(`/projects/`, { project_name: name, project_description: description });
            await getProjects();
        } catch (error) {
            console.error('Failed to create project:', error);
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.detail || 'An error occurred while creating the project');
            }
        }
    };

    const updateProject = async (id: string, name: string, description: string) => {
        try {
            await axiosClient.put(`/projects/${id}`, { project_name: name, project_description: description });
            await getProjects();
        } catch (error) {
            console.error("Failed to update project:", error);
        }
    };

    const deleteProject = async (id: string) => {
        try {
            await axiosClient.delete(`/projects/${id}`);
            await getProjects();
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };

    const searchProjects = (query: string) => {
        return projects.filter(project =>
            project.name.toLowerCase().includes(query.toLowerCase()) ||
            project.description.toLowerCase().includes(query.toLowerCase())
        );
    };

    const addDevice = async (projectId: string, deviceId: string) => {
        try {
            await axiosClient.post(`/projects/${projectId}/devices/`, { device_id: deviceId });
            await getProjects();
        } catch (error) {
            console.error("Failed to add device:", error);
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.detail || 'An error occurred while adding the device');
            }
        }
    };

    const uploadApk = async (projectId: string, file: File) => {
        try {
            const formData = new FormData();
            formData.append('apk_file', file);
            const response = await axiosClient.post(`/projects/${projectId}/upload_apk/`, formData);
            await getProjects();
            return response.data;
        } catch (error) {
            console.error("Failed to upload APK:", error);
            throw error;
        }
    };

    const runScooper = async (projectId: string, deviceId: string, workflowJson: string, apkPath: string) => {
        try {
            const response = await axiosClient.post(`/projects/${projectId}/run/${deviceId}/`, {
                device_id: deviceId,
                workflow_json: workflowJson,
                apk_path: apkPath
            });
            const runId = response.data.run_id;
            if (runId) {
                console.log("Run id", runId);
                setProjects((prevProjects) => prevProjects.map((project) =>
                    project.id === projectId
                        ? {
                            ...project,
                            runningInstances: {
                                ...(project.runningInstances || {}), // Ensure runningInstances is defined
                                [deviceId]: {
                                    ...(project.runningInstances?.[deviceId] || {}), // Ensure deviceId is defined
                                    runId
                                }
                            }
                        }
                        : project
                ));
            }
            return runId;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.detail || 'An error occurred while running Scooper');
            }
            console.error("Failed to start Scooper:", error);
            return null;
        }
    };

    const stopScooper = async (projectId: string, deviceId: string) => {
        try {
            await axiosClient.post(`/projects/${projectId}/stop/${deviceId}/`, null);
            setProjects((prevProjects) =>
                prevProjects.map((project) => {
                    if (project.id === projectId && project.runningInstances[deviceId]?.webSocket) {
                        project.runningInstances[deviceId].webSocket!.close();
                        return {
                            ...project,
                            runningInstances: {
                                ...project.runningInstances,
                                [deviceId]: {
                                    ...project.runningInstances[deviceId],
                                    webSocket: undefined,
                                },
                            },
                        };
                    }
                    return project;
                })
            );
            await getProjects();
        } catch (error) {
            console.error("Failed to stop Scooper:", error);
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.detail || 'An error occurred while stopping Scooper');
            }
        }
    };

    return (
        <ProjectsContext.Provider value={{
            projects,
            createProject,
            updateProject,
            deleteProject,
            searchProjects,
            runScooper,
            stopScooper,
            addDevice,
            uploadApk,
            getProjects,
            setCurrentProject,
            currentProject
        }}>
            {children}
        </ProjectsContext.Provider>
    );
};

export const useProjects = () => {
    const context = useContext(ProjectsContext);
    if (!context) {
        throw new Error('useProjects must be used within a ProjectsProvider');
    }
    return context;
};
