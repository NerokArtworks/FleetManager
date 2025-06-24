import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import api from '../api/axios';
import type { AuthContextType, LoginParams, RegisterParams, User } from '../types/Auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/auth/me');
                setUser(res.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async ( LoginParams: LoginParams) => {
        const params = {
            Email: LoginParams.email,
            Password: LoginParams.password
        }
        await api.post('/auth/login', params);
        const res = await api.get('/auth/me');
        setUser(res.data);
    };

    const register = async (registerParams: RegisterParams) => {
        const params = {
            FirstName: registerParams.firstname,
            LastName: registerParams.lastname,
            CompanyName: registerParams.companyName,
            Email: registerParams.email,
            Password: registerParams.password,
        };
        console.log(params)
        await api.post('/auth/register', params);
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used inside AuthProvider');
    return context;
};