import React, {createContext, useState, ReactNode, useContext} from 'react';
import {IUserLoginResponse}                                    from "../interface/UserInterface";

interface AuthContextData {
    user: IUserLoginResponse | null;
    login: (userData: IUserLoginResponse) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUserLoginResponse | null>(null);

    const login = (userData: IUserLoginResponse) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
