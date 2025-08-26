import { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header/Header.tsx';
import Bucket from "../../components/Bucket/Bucket.tsx";
import CreateBucket from "../../components/CreateBucket/CreateBucket.tsx";
import { useNavigate } from "react-router-dom";

import styles from './Plannr.module.scss';
import WorkspaceSelector from '../../components/WorkspaceSelector/WorkspaceSelector.tsx';

interface Task {
    id: number;
    title: string;
    completed: boolean;
    status: string;
    priority: string;
    notes: string | null;
    startDate: string | null;
    dueDate: string | null;
    createdAt: string;
    updatedAt: string;
    repeat: string;
}

interface Bucket {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    tasks: Task[];
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Workspace {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    buckets: Bucket[];
}

interface ApiResponse {
    status: number;
    ok: boolean;
    message: string;
    workspaces: Workspace[];
}

function Plannr() {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchWorkspaces = useCallback(async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                navigate('/login');
                return;
            }

            const response = await fetch('http://localhost:3000/workspaces', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('authToken');
                navigate('/login');
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ApiResponse = await response.json();
            setWorkspaces(data.workspaces);

            if (data.workspaces.length > 0 && !selectedWorkspaceId) {
                setSelectedWorkspaceId(data.workspaces[0].id);
            }
        } catch (error) {
            console.error('Error fetching workspaces:', error);
            localStorage.removeItem('authToken');
            navigate('/login');
        } finally {
            setLoading(false);
        }
    }, [navigate, selectedWorkspaceId]);

    useEffect(() => {
        fetchWorkspaces();
    }, [fetchWorkspaces]);

    const handleWorkspaceSelect = (workspaceId: number) => {
        setSelectedWorkspaceId(workspaceId);
    };

    const handleBucketCreated = () => {
        fetchWorkspaces();
    };

    const selectedWorkspace = workspaces.find(workspace => workspace.id === selectedWorkspaceId);

    if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.mainPlannr}>
            <Header />
            <main className={styles.workspacesArea}>
                {selectedWorkspace ? (
                    selectedWorkspace.buckets.map(bucket => (
                        <Bucket
                            key={bucket.id}
                            id={bucket.id}
                            name={bucket.name}
                            tasks={bucket.tasks.map(task => ({ ...task, id: task.id.toString() }))}
                            onTaskCreated={fetchWorkspaces}
                        />
                    ))
                ) : (
                    <div className={styles.noWorkspace}>
                        {workspaces.length === 0 ? 'No workspaces found' : 'Select a workspace to view its buckets'}
                    </div>
                )}
                <CreateBucket
                    workspaceId={selectedWorkspaceId}
                    onBucketCreated={handleBucketCreated}
                />
            </main>
            <WorkspaceSelector
                workspaces={workspaces}
                selectedWorkspaceId={selectedWorkspaceId}
                onWorkspaceSelect={handleWorkspaceSelect}
            />
        </div>
    );
}

export default Plannr;