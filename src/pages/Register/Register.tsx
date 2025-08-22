import { TextField, Button } from '@mui/material';

import logo from '../../assets/LogoPlannr.png'
import bgVideo from '../../assets/bgvideo.mp4'

import styles from './Register.module.scss';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <main className={styles.mainPage}>
            <video className={styles.backgroundVideo} autoPlay muted loop>
                <source src={bgVideo} type="video/mp4" />
            </video>
            <form className={styles.card}>
                <img className={styles.logo} src={logo} alt="Plannr Logo" />
                <h1>Register</h1>
                <TextField label='Full Name' variant='outlined' type='text' required />
                <TextField label='Email' variant='outlined' type='email' required />
                <TextField label='Password' variant='outlined' type='password' required />
                <TextField label='Confirm Password' variant='outlined' type='password' required />
                <Button variant="contained">Create Account</Button>
                <p className={styles.hasAccount}>Already have an account? Login <Link to='/login'>Here</Link></p>
            </form>
        </main>
    )
}

export default Register;