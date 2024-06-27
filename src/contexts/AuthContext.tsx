import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface AuthContextType {
    assos: Assos | null;
    isAuthenticated: boolean;
    login: (assosData: Assos) => void;
    logout: () => void;
}

interface Assos {
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
    const [assos, setAssos] = useState<Assos | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const savedSession = localStorage.getItem('sessionID');
        if (savedSession) {
            setAssos({ id: savedSession });
            setIsAuthenticated(true);
        }
    }, [])

    const login = (assosData: Assos) => {
        // Authenticate assos and set assos information and authentication status
        setAssos(assosData);
        setIsAuthenticated(true);
        localStorage.setItem('sessionID', assosData.id);
    };

    const logout = () => {
        // Remove assos information and set authentication status to false
        setAssos(null);
        setIsAuthenticated(false);
        localStorage.setItem('sessionID', '');
    };

    return (
        <AuthContext.Provider value={{ assos, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};