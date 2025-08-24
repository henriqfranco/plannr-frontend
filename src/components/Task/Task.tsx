import styles from './Task.module.scss';
import {Checkbox, FormControlLabel} from "@mui/material";
import * as React from "react";

interface TaskProps {
    title: React.ReactNode;
    completed?: boolean;
}

function Task({title, completed = false}: TaskProps) {
    const [isCompleted, setIsCompleted] = React.useState(completed);

    return (
        <div className={styles.taskBody}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isCompleted}
                        onChange={(e) => setIsCompleted(e.target.checked)}
                    />
                }
                label={title}
            />
        </div>
    );
}

export default Task;