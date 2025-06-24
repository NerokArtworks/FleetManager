import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../api/axios';

interface AuthContextType {
    user: { email: string } | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<{ email: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Al montar, verificar si está autenticado llamando a backend
        const fetchUser = async () => {
            await api.get('/auth/me')
                .then(res => setUser(res.data))
                .catch(() => setUser(null))
                .finally(() => setLoading(false));
        }

        fetchUser()
    }, []);

    const login = async (email: string, password: string) => {
        console.log(email, password)
        await api.post('/auth/login', { email, password });
        // Si no lanza error, significa que cookie está puesta
        // Obtener info usuario
        const res = await api.get('/auth/me');
        setUser(res.data);
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used inside AuthProvider');
    return context;
};