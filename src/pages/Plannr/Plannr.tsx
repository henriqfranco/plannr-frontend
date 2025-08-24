import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Bucket from "../../components/Bucket/Bucket.tsx";
import {useNavigate} from "react-router-dom";

import styles from './Plannr.module.scss';

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
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkspaces = async () => {
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
                const data: ApiResponse = await response.json();
                setWorkspaces(data.workspaces);
            } catch (error) {
                console.error('Error fetching workspaces:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkspaces().then();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.mainPlannr}>
            <Header />
            <main className={styles.workspacesArea}>
                {workspaces.map(workspace =>
                    workspace.buckets.map(bucket => (
                        <Bucket
                            key={bucket.id}
                            name={bucket.name}
                            tasks={bucket.tasks.map(task => ({ ...task, id: task.id.toString() }))}
                        />
                    ))
                )}
            </main>
        </div>
    );
}

export default Plannr;