import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { JSX } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // O un spinner, skeleton, lo que prefieras
    }

    return user ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;