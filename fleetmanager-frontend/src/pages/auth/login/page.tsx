import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../../context/AuthContext';
import type { LoginParams } from '../../../types/Auth';
import Button from '../../../components/ui/button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, loading, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            navigate('/panel/dashboard', { replace: true });
        }
    }, [loading, user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const params: LoginParams = { email, password }
            await login(params);
            toast.success('Successfully signed in');
            navigate('/panel/dashboard');
        } catch (err: any) {
            if (err.response?.status === 401) {
                toast.error('Invalid credentials');
            } else {
                toast.error('Unexpected error. Please try again.');
            }
        }
    };

    if (loading)
        return (
            <div className="text-center mt-8 text-gray-500 dark:text-gray-400">
                Loading...
            </div>
        );

    return (
        <div className="w-full flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-md w-full max-w-md"
                aria-label="login form"
            >
                <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">
                    Welcome back
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                    Sign in to your FleetManager account
                </p>

                <div className="space-y-5">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        aria-label="email"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        aria-label="password"
                    />

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-full py-3 rounded-md font-semibold"
                        size='lg'
                    >
                        Sign in
                    </Button>
                </div>

                <div className="mt-6 text-center">
                    <span className="text-gray-600 dark:text-gray-400">Don't have an account?</span>{' '}
                    <Link
                        to="/auth/register"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Create one
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;