import { TextField, Button, Switch } from '@mui/material';

import logo from '../../assets/LogoPlannr.png'
import bgVideo from '../../assets/bgvideo.mp4'

import styles from './Login.module.scss';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <main className={styles.mainPage}>
            <video className={styles.backgroundVideo} autoPlay muted loop>
                <source src={bgVideo} type="video/mp4" />
            </video>
            <form className={styles.card}>
                <img className={styles.logo} src={logo} alt="Plannr Logo" />
                <h1>Login</h1>
                <TextField label='Email' variant='outlined' type='email' required />
                <TextField label='Password' variant='outlined' type='password' required />
                <div className={styles.helpLine}>
                    <div className={styles.rememberMe}>
                        <Switch />
                        <p>Remember Me</p>
                    </div>
                </div>
                <Button variant="contained">Login</Button>
                <p className={styles.noAccount}>Don't have an account? Create one <Link to='/register'>Here</Link></p>
            </form>
        </main>
    )
}

export default Login;