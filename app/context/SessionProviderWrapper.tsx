// context/AuthContext.tsx
"use client";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
}

function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(^|;)\\s*${name}=([^;]*)`));
    return match ? decodeURIComponent(match[2]) : null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = getCookie("token");
        if (storedToken) setToken(storedToken);
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("this context error");
    }
    return context;
};
