import { TextField, Button, Switch, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as React from 'react';

import logo from '../../assets/LogoPlannr.png'
import bgVideo from '../../assets/bgvideo.mp4'

import styles from './Login.module.scss';

interface LoginResponse {
    status: number;
    ok: boolean;
    message: string;
    token?: string;
}

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post<LoginResponse>('http://localhost:3000/auth/login', {
                email,
                password
            });

            if (response.data.ok && response.data.token) {
                localStorage.setItem('authToken', response.data.token);

                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }

                navigate('/plannr');
            } else {
                setError(response.data.message || 'Login failed');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Login failed');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.mainPage}>
            <video className={styles.backgroundVideo} autoPlay muted loop>
                <source src={bgVideo} type="video/mp4" />
            </video>
            <form className={styles.card} onSubmit={handleLogin}>
                <img className={styles.logo} src={logo} alt="Plannr Logo" />
                <h1>Login</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <TextField
                    label='Email'
                    variant='outlined'
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label='Password'
                    variant='outlined'
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className={styles.helpLine}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                        }
                        label="Remember Me"
                    />
                    <Link to='/resetpassword'>Forgot Password?</Link>
                </div>
                <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
                <p className={styles.noAccount}>Don't have an account? Create one <Link to='/register'>Here</Link></p>
            </form>
        </main>
    )
}

export default Login;