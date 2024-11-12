import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/api';

const AuthForm = ({ isLogin = true, onAuthSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = isLogin ? await loginUser({ email, password }) : await registerUser({ email, password });
            onAuthSuccess(response.data.token);
        } catch (err) {
            setError('Authentication failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            {error && <p>{error}</p>}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        </form>
    );
};

export default AuthForm;
