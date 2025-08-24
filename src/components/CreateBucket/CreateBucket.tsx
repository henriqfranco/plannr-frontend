import styles from "./CreateBucket.module.scss";
import AddIcon from '@mui/icons-material/Add';

function CreateBucket(){
    return (
        <button className={styles.newBucketButton}>
            <AddIcon fontSize='large' />
        </button>
    )
}

export default CreateBucket;