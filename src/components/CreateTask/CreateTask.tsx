import styles from './CreateTask.module.scss';
import AddIcon from "@mui/icons-material/Add";

function CreateTask() {
    return (
        <button className={styles.createTaskBtn}>
            <AddIcon fontSize='medium' />
        </button>
    )
}

export default CreateTask;