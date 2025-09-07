import styles from './Bucket.module.scss';
import Task from '../Task/Task.tsx';
import * as React from "react";
import CreateIcon from '@mui/icons-material/Create';
import CreateTask from '../CreateTask/CreateTask.tsx'

interface TaskData {
    id: string;
    title: string;
    completed?: boolean;
}

interface BucketProps {
    id: number;
    name: React.ReactNode;
    tasks: TaskData[];
    onTaskCreated: () => void;
}

function Bucket({id, name, tasks, onTaskCreated}: BucketProps) {
    return (
        <div className={styles.bucketArea}>
            <div className={styles.titleLine}>
                <h3>{name}</h3>
                <button className={styles.editTaskBtn}>
                    <CreateIcon fontSize='small' />
                </button>
            </div>
            <hr />
            <CreateTask bucketId={id} onTaskCreated={onTaskCreated}/>
            {tasks.map(task => (
                <Task
                    key={task.id}
                    title={task.title}
                    completed={task.completed}
                />
            ))}
        </div>
    );
}

export default Bucket;