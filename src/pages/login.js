import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/auth';

const Login = () => {
    const [error, setError] = useState('');
    const { setToken } = useAuth();
    const router = useRouter();

    const handleAuthSuccess = (token) => {
        setToken(token);
        router.push('/dashboard');  // Redirect to dashboard after successful login
    };

    return (
        <div>
            <h1>Login</h1>
            <AuthForm isLogin={true} onAuthSuccess={handleAuthSuccess} />
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
