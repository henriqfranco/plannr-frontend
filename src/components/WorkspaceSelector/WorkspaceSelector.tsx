import styles from './WorkspaceSelector.module.scss';
import CreateWorkspace from '../CreateWorkspace/CreateWorkspace';

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

interface WorkspaceSelectorProps {
    workspaces: Workspace[];
    selectedWorkspaceId: number | null;
    onWorkspaceSelect: (workspaceId: number) => void;
    onWorkspaceCreated: () => void;
}

function WorkspaceSelector({ workspaces, selectedWorkspaceId, onWorkspaceSelect, onWorkspaceCreated }: WorkspaceSelectorProps) {
    return (
        <div className={styles.workspaceSelector}>
            <div className={styles.workspaceList}>
                {workspaces.map(workspace => (
                    <button
                        key={workspace.id}
                        className={`${styles.selectWorkspace} ${selectedWorkspaceId === workspace.id ? styles.active : ''
                            }`}
                        onClick={() => onWorkspaceSelect(workspace.id)}
                    >
                        <span className={styles.workspaceName}>{workspace.name}</span>
                        <span className={styles.bucketCount}>
                            {workspace.buckets.length} bucket{workspace.buckets.length !== 1 ? 's' : ''}
                        </span>
                    </button>
                ))}
                <CreateWorkspace onWorkspaceCreated={onWorkspaceCreated} />
            </div>
        </div>
    );
}

export default WorkspaceSelector;