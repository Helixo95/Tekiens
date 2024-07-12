import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import Api from "../Tools/Api";

interface AuthContextType {
    session: Session | null;
    login: (assoID: string, password: string) => void;
    logout: () => void;
}

interface Session {
    id: string;
    asso_id: string;
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

    // We get the session and the correspond asso from the local storage
    useEffect(() => {
        const savedSession = localStorage.getItem('session');
        const savedSessionAsso = localStorage.getItem('sessionAsso');

        if (savedSession && savedSessionAsso) {
            setSession({ id: savedSession, asso_id: savedSessionAsso });
        }
    }, [])

    /**
     * Function when an user want to login to the app
     * @param assoId the association id entered by the user
     * @param password the password entered by the user
     */
    const login = async (assoId: string, password: string) => {
        try {
            // Authenticate session and set session information and authentication status
            const response = await Api.sessions.create(assoId, password) as Session;

            setSession(response);
            localStorage.setItem('session', response.id);
            localStorage.setItem('sessionAsso', response.asso_id);
        } catch (error) {
            throw error;
        }
    };

    // Function when an user want to logout from the app
    const logout = () => {
        // Remove session information and set authentication status to false
        if (session) {
            try {
                Api.sessions.delete(session.id);

                setSession(null);
                localStorage.removeItem('session');
            } catch (error) {
                throw error;
            }
        }
    };

    return (
        <AuthContext.Provider value={{ session, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};