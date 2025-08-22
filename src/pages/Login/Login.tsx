import { TextField, Button } from '@mui/material';

import styles from './Login.module.scss';

function Login() {
    return (
        <main className={styles.mainPage}>
            <div className={styles.card}>
                <TextField label='Email' variant='outlined' />
                <TextField label='Email' variant='outlined' />
                <Button variant="contained">Login</Button>
            </div>
        </main>
    )
}

export default Login;