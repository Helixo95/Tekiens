import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import Api from "../Tools/Api";

interface AuthContextType {
    session: Session | null;
    isAuthenticated: boolean;
    login: (infos: Session, password: string) => void;
    logout: () => void;
}

interface Session {
    id: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const savedSession = localStorage.getItem('sessionID');
        if (savedSession) {
            setSession({ id: savedSession });
            setIsAuthenticated(true);
        }
    }, [])

    const login = async (infos: Session, password: string) => {
        try {
            // Authenticate session and set session information and authentication status
            await Api.sessions.create(infos.id, password);

            setSession(infos);
            setIsAuthenticated(true);
            localStorage.setItem('sessionID', infos.id);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        // Remove session information and set authentication status to false
        setSession(null);
        setIsAuthenticated(false);
        localStorage.setItem('sessionID', '');
    };

    return (
        <AuthContext.Provider value={{ session, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};