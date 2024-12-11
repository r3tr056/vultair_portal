import axios from 'axios';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

interface User {
    username: string;
    apiKey: string | null;
}

interface AuthContextType {
    user: User | null;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    signup: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const axiosClient = axios.create({
        baseURL: "http://localhost:8000",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Error parsing user from local storage:", e);
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: { username: string; password: string }) => {
        try {
            const response = await axiosClient.post('/login/', credentials);
            const { api_key } = response.data;
            const loggedInUser: User = { username: credentials.username, apiKey: api_key };
            setUser(loggedInUser);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            navigate('/projects');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.detail || 'An error occurred during login');
            }
            console.error("Login failed:", error);
        }
    };

    const signup = async (credentials: { username: string; password: string }) => {
        try {
            const response = await axiosClient.post('/signup/', credentials);
            const { api_key } = response.data;
            const loggedInUser: User = { username: credentials.username, apiKey: api_key };
            setUser(loggedInUser);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            navigate('/projects');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.detail || 'An error occurred during signup');
            }
            console.error("Signup failed:", error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    const contextValue: AuthContextType = {
        user,
        login,
        signup,
        logout,
        isLoading
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
