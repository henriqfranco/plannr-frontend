import { useState } from 'react';
import { Menu, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import styles from './WorkspaceMenu.module.scss';

interface WorkspaceMenuProps {
    workspaceId: number;
    workspaceName: string;
    onWorkspaceUpdated: () => void;
    onWorkspaceDeleted: () => void;
}

function WorkspaceMenu({ workspaceId, workspaceName, onWorkspaceUpdated, onWorkspaceDeleted }: WorkspaceMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [newName, setNewName] = useState(workspaceName);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRenameClick = () => {
        setNewName(workspaceName);
        setError('');
        setRenameDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleRenameWorkspace = async () => {
        if (!newName.trim()) {
            setError('Workspace name is required');
            return;
        }

        if (newName.trim() === workspaceName) {
            setError('New name must be different from current name');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('authToken');
            
            const response = await axios.put(
                `http://localhost:3000/workspaces/update/${workspaceId}`,
                {
                    newName: newName.trim()
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setRenameDialogOpen(false);
                onWorkspaceUpdated();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Failed to rename workspace');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteWorkspace = async () => {
        setIsLoading(true);

        try {
            const token = localStorage.getItem('authToken');
            
            const response = await axios.delete(
                `http://localhost:3000/workspaces/delete/${workspaceId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setDeleteDialogOpen(false);
                onWorkspaceDeleted();
            }
        } catch (error) {
            console.error('Failed to delete workspace:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRenameDialogClose = () => {
        setRenameDialogOpen(false);
        setError('');
        setNewName(workspaceName);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleRenameWorkspace();
        } else if (e.key === 'Escape') {
            handleRenameDialogClose();
        }
    };

    return (
        <>
            <IconButton
                onClick={handleMenuOpen}
                className={styles.menuButton}
                size="small"
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                className={styles.menu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleRenameClick} className={styles.menuItem}>
                    <EditIcon fontSize="small" />
                    <span>Rename</span>
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} className={styles.menuItem}>
                    <DeleteIcon fontSize="small" />
                    <span>Delete</span>
                </MenuItem>
            </Menu>

            <Dialog
                open={renameDialogOpen}
                onClose={handleRenameDialogClose}
                maxWidth="sm"
                fullWidth
                className={styles.dialog}
            >
                <DialogTitle className={styles.dialogTitle}>
                    Rename Workspace
                </DialogTitle>
                <DialogContent className={styles.dialogContent}>
                    <TextField
                        autoFocus
                        margin="normal"
                        label="Workspace Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={handleKeyPress}
                        disabled={isLoading}
                        error={!!error}
                        helperText={error}
                        placeholder="Enter new workspace name..."
                        className={styles.workspaceInput}
                    />
                </DialogContent>
                <DialogActions className={styles.dialogActions}>
                    <Button
                        onClick={handleRenameDialogClose}
                        disabled={isLoading}
                        color="inherit"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleRenameWorkspace}
                        variant="contained"
                        disabled={!newName.trim() || isLoading}
                        color="primary"
                    >
                        {isLoading ? 'Renaming...' : 'Rename'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteDialogClose}
                maxWidth="sm"
                fullWidth
                className={styles.dialog}
            >
                <DialogTitle className={styles.dialogTitle}>
                    Delete Workspace
                </DialogTitle>
                <DialogContent className={styles.dialogContent}>
                    <p>
                        Are you sure you want to delete the workspace <strong>"{workspaceName}"</strong>? 
                        This action cannot be undone and will permanently delete all buckets and tasks within this workspace.
                    </p>
                </DialogContent>
                <DialogActions className={styles.dialogActions}>
                    <Button
                        onClick={handleDeleteDialogClose}
                        disabled={isLoading}
                        color="inherit"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteWorkspace}
                        variant="contained"
                        disabled={isLoading}
                        className={styles.deleteButton}
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default WorkspaceMenu;