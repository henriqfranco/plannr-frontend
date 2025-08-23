import Header from '../../components/Header/Header';
import Bucket from "../../components/Bucket/Bucket.tsx";

import styles from './Plannr.module.scss';

function Plannr() {
    return (
        <div className={styles.mainPlannr}>
            <Header />
            <main className={styles.workspacesArea}>
                <Bucket title={'bucket'} />
                <Bucket title={'bucket'} />
                <Bucket title={'bucket'} />
                <Bucket title={'bucket'} />
                <Bucket title={'bucket'} />
                <Bucket title={'bucket'} />
            </main>
        </div>
    )
}

export default Plannr;