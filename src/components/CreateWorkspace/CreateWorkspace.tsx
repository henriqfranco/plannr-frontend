import { useState } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import styles from './CreateWorkspace.module.scss';

interface CreateWorkspaceProps {
    onWorkspaceCreated: () => void;
}

function CreateWorkspace({ onWorkspaceCreated }: CreateWorkspaceProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [workspaceName, setWorkspaceName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCreateWorkspace = async () => {
        if (!workspaceName.trim()) {
            setError('Workspace name is required');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('authToken');

            const response = await axios.post(
                'http://localhost:3000/workspaces/create',
                {
                    workspaceName: workspaceName.trim()
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                setWorkspaceName('');
                setIsOpen(false);
                onWorkspaceCreated();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Failed to create workspace');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setWorkspaceName('');
        setError('');
        setIsOpen(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCreateWorkspace();
        } else if (e.key === 'Escape') {
            handleClose();
        }
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={() => setIsOpen(true)}
                className={styles.createWorkspaceButton}
                size="large"
            >
                <AddIcon />
            </Button>

            <Dialog
                open={isOpen}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                className={styles.dialog}
            >
                <DialogTitle className={styles.dialogTitle}>
                    Create New Workspace
                </DialogTitle>
                <DialogContent className={styles.dialogContent}>
                    <TextField
                        autoFocus
                        margin="normal"
                        label="Workspace Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        onKeyDown={handleKeyPress}
                        disabled={isLoading}
                        error={!!error}
                        helperText={error}
                        placeholder="Enter workspace name..."
                        className={styles.workspaceInput}
                    />
                </DialogContent>
                <DialogActions className={styles.dialogActions}>
                    <Button
                        onClick={handleClose}
                        disabled={isLoading}
                        color="inherit"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateWorkspace}
                        variant="contained"
                        disabled={!workspaceName.trim() || isLoading}
                        color="primary"
                    >
                        {isLoading ? 'Creating...' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CreateWorkspace;