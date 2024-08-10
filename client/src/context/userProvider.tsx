import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../utils/types';
import { useNavigate, NavigateFunction } from 'react-router-dom';

interface UserContextProps {
    user: User | null;
    setUserState: (user: User) => void;
    navigateTo: NavigateFunction;
    logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const navigateTo = useNavigate()
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user))
        }
    }, [])

    const setUserState = (user: User) => {
        localStorage.setItem('user', JSON.stringify(user))
    };

    const logout = () => {
        setUser(null);
        localStorage.clear()
        navigateTo('/')
    };

    return (
        <UserContext.Provider value={{ user, setUserState, navigateTo, logout }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};