import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as React from 'react';

import logo from '../../assets/LogoPlannr.png'
import bgVideo from '../../assets/bgvideo.mp4'

import styles from './Register.module.scss';

interface RegisterResponse {
    status: number;
    ok: boolean;
    message: string;
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post<RegisterResponse>('http://localhost:3000/auth/register', {
                name,
                email,
                password
            });

            if (response.data.ok) {
                navigate('/login');
            } else {
                setError(response.data.message || 'Registration failed');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Registration failed');
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
            <form className={styles.card} onSubmit={handleRegister}>
                <img className={styles.logo} src={logo} alt="Plannr Logo" />
                <h1>Register</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <TextField
                    label='Full Name'
                    variant='outlined'
                    type='text'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <TextField
                    label='Confirm Password'
                    variant='outlined'
                    type='password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
                <p className={styles.hasAccount}>Already have an account? Login <Link to='/login'>Here</Link></p>
            </form>
        </main>
    )
}

export default Register;