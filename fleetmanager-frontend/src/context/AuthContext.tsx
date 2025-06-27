import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import api from '../api/axios';
import type { AuthContextType, LoginParams, RegisterParams } from '../types/Auth';
import type { User } from '../types/User';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await api.get('/auth/me');
            if (res.data && res.data.email) {
                setUser(res.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
            console.error("Fetch user failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (params: LoginParams) => {
        try {
            await api.post("/auth/login", {
                Email: params.email,
                Password: params.password,
            });
            await fetchUser();
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const register = async (params: RegisterParams) => {
        try {
            await api.post("/auth/register", {
                FirstName: params.firstname,
                LastName: params.lastname,
                CompanyName: params.companyName,
                Email: params.email,
                Password: params.password,
            });
        } catch (error) {
            console.error("Register failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
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