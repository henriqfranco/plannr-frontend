import styles from './Bucket.module.scss';

function Bucket( {title}: {title: string} ) {
    return (
        <div className={styles.bucketArea}>
            <h3>{title}</h3>
            <hr />
        </div>
    )
}

export default Bucket;