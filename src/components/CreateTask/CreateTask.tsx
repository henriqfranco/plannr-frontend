import { useState } from 'react';
import axios from 'axios';
import styles from './CreateTask.module.scss';
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface CreateTaskProps {
    bucketId: number;
    onTaskCreated: () => void;
}

function CreateTask({ bucketId, onTaskCreated }: CreateTaskProps) {
    const [isCreating, setIsCreating] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateTask = async () => {
        if (!taskTitle.trim()) return;

        setIsLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            
            const response = await axios.post(
                `http://localhost:3000/tasks/create/${bucketId}`,
                {
                    taskTitle: taskTitle.trim(),
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                setTaskTitle('');
                setIsCreating(false);
                onTaskCreated();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error creating task:', error.response?.data || error.message);
            } else {
                console.error('Error creating task:', error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setTaskTitle('');
        setIsCreating(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCreateTask();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    if (isCreating) {
        return (
            <div className={styles.createTaskForm}>
                <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter task title..."
                    className={styles.taskTitleInput}
                    autoFocus
                    disabled={isLoading}
                />
                <div className={styles.actionButtons}>
                    <button
                        onClick={handleCreateTask}
                        className={styles.confirmButton}
                        disabled={!taskTitle.trim() || isLoading}
                    >
                        <CheckIcon fontSize="small" />
                    </button>
                    <button
                        onClick={handleCancel}
                        className={styles.cancelButton}
                        disabled={isLoading}
                    >
                        <CloseIcon fontSize="small" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <button 
            className={styles.createTaskBtn}
            onClick={() => setIsCreating(true)}
        >
            <AddIcon fontSize='medium' />
        </button>
    );
}

export default CreateTask;