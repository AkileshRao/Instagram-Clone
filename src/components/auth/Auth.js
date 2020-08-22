import React, { useState, useEffect } from 'react';
import './Auth.scss';
import { auth } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';

function Auth() {
    const history = useHistory();
    const [authMode, setAuthMode] = useState('signIn');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setLoading(true);
        auth.onAuthStateChanged((user) => {
            if (user) history.push('/');
            setLoading(false);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((authMode === 'signIn' && (email === '' || password === '')) || (authMode === 'signUp' && (email === '' || password === '' || username === ''))) {
            toast.warning("Please fill the form properly.");
        } else {
            setLoading(true);
            if (authMode === 'signUp') {
                auth.createUserWithEmailAndPassword(email, password).then(res => {
                    setLoading(false);
                    toast.success("User created successfully!");
                    setAuthMode('signIn');
                }).catch(err => {
                    toast.error(err.message);
                    setLoading(false);
                })
            } else {
                auth.signInWithEmailAndPassword(email, password).then(res => {
                    setLoading(false);
                    toast.success("Welcome back!");
                    history.push('/main');
                }).catch(err => {
                    toast.error(err.message);
                    setLoading(false);
                })
            }
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.currentTarget;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        if (name === 'username') setUsername(value)
    }

    const resetForm = () => {
        setEmail(''); setUsername(''); setPassword('');
    }

    return (
        <div className='auth'>
            <Loader
                visible={loading}
                type="Grid"
                color="#00BFFF"
                height={60}
                width={60}
                className='loader'
            />
            <form className='form' onSubmit={(event) => handleSubmit(event)}>
                <img src='/inst.png' alt="logo" />
                {authMode === 'signUp' ? <p className='signup-text'>Sign up to see photos and videos from your friends.</p> : null}
                <input type="text" name='email' value={email} placeholder='Enter your email' onChange={(event) => handleInputChange(event)} />
                {authMode === 'signUp' ? <input type="text" name='username' value={username} placeholder='Username' onChange={(event) => handleInputChange(event)} /> : null}
                <input type="password" name='password' value={password} placeholder='Password' onChange={(event) => handleInputChange(event)} />
                <button>{authMode === 'signUp' ? "Sign Up" : "Log in"}</button>
                {authMode === 'signUp' ?
                    <p className='tnc'>By signing up, you agree to our <span>Terms, Data Policy</span> and <span>Cookies Policy.</span></p>
                    :
                    <p className='forgot-password'>Forgot password?</p>
                }
            </form>
            <div className="auth-type">
                {authMode === 'signUp' ?
                    <p>Have an account? <span onClick={() => { resetForm(); setAuthMode('signIn') }}>Log In</span></p>
                    :
                    <p>Don't have an account? <span onClick={() => { resetForm(); setAuthMode('signUp') }}>Sign Up</span></p>
                }
            </div>
            <ToastContainer position="top-center" />
        </div>
    )
}

export default Auth
