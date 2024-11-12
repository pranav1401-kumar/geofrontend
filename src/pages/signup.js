import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/auth';

const Signup = () => {
    const [error, setError] = useState('');
    const { setToken } = useAuth();
    const router = useRouter();

    const handleAuthSuccess = (token) => {
        setToken(token);
        router.push('/dashboard');  // Redirect to dashboard after successful signup
    };

    return (
        <div>
            <h1>Signup</h1>
            <AuthForm isLogin={false} onAuthSuccess={handleAuthSuccess} />
            {error && <p>{error}</p>}
        </div>
    );
};

export default Signup;
