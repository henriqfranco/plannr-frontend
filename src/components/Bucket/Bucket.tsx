import styles from './Bucket.module.scss';
import Task from '../Task/Task.tsx';
import * as React from "react";

interface TaskData {
    id: string;
    title: string;
    completed?: boolean;
}

interface BucketProps {
    name: React.ReactNode;
    tasks: TaskData[];
}

function Bucket({name, tasks}: BucketProps) {
    return (
        <div className={styles.bucketArea}>
            <h3>{name}</h3>
            <hr />
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