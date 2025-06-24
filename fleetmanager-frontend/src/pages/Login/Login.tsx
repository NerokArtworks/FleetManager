import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, loading, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            navigate('/dashboard', { replace: true });
        }
    }, [loading, user, navigate]);

    if (loading) return <div>Loading...</div>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err: any) {
            if (err.response?.status === 401) {
                alert('Invalid credentials');
            } else {
                alert('Something went wrong, please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
                aria-label="login form"
            >
                <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800 dark:text-gray-100">
                    Sign in
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-6 p-3 rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    aria-label="email"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-8 p-3 rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    aria-label="password"
                />

                <button
                    type="submit"
                    className="w-full py-3 rounded bg-blue-700 text-white font-semibold hover:bg-blue-600 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-400"
                >
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default Login;