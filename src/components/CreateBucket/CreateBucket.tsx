import { useState } from 'react';
import axios from 'axios';
import styles from "./CreateBucket.module.scss";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface CreateBucketProps {
    workspaceId: number | null;
    onBucketCreated: () => void;
}

function CreateBucket({ workspaceId, onBucketCreated }: CreateBucketProps) {
    const [isCreating, setIsCreating] = useState(false);
    const [bucketName, setBucketName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateBucket = async () => {
        if (!bucketName.trim() || !workspaceId) return;

        setIsLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            
            const response = await axios.post(
                `http://localhost:3000/buckets/create/${workspaceId}`,
                {
                    bucketName: bucketName.trim()
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                setBucketName('');
                setIsCreating(false);
                onBucketCreated();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error creating bucket:', error.response?.data || error.message);
            } else {
                console.error('Error creating bucket:', error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setBucketName('');
        setIsCreating(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCreateBucket();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    if (isCreating) {
        return (
            <div className={styles.createBucketForm}>
                <input
                    type="text"
                    value={bucketName}
                    onChange={(e) => setBucketName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter bucket name..."
                    className={styles.bucketNameInput}
                    autoFocus
                    disabled={isLoading}
                />
                <div className={styles.actionButtons}>
                    <button
                        onClick={handleCreateBucket}
                        className={styles.confirmButton}
                        disabled={!bucketName.trim() || isLoading}
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
            className={styles.newBucketButton}
            onClick={() => setIsCreating(true)}
            disabled={!workspaceId}
        >
            <AddIcon fontSize='large' />
        </button>
    );
}

export default CreateBucket;