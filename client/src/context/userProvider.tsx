import { createContext, useContext, useState, ReactNode, useEffect, SetStateAction } from 'react';
import { AlertType, BoardInfo, User } from '../utils/types';
import { useNavigate, NavigateFunction, useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';

interface UserContextProps {
    user: User | null;
    boards: BoardInfo[] | null;
    setAlert: React.Dispatch<SetStateAction<AlertType>>;
    setUserState: (user: User) => void;
    setUserBoards: (boards: BoardInfo[]) => void;
    navigateTo: NavigateFunction;
    logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const location = useLocation();
    const navigateTo = useNavigate()
    const [user, setUser] = useState<User | null>(null);
    const [boards, setBoards] = useState<BoardInfo[] | null>(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const boards = localStorage.getItem('boards');
        if (user) {
            setUser(JSON.parse(user))
        }
        if (boards) {
            setBoards(JSON.parse(boards).board)
        }
    }, [location.pathname])

    const setUserState = (user: User) => {
        localStorage.setItem('user', JSON.stringify(user))
    };

    const setUserBoards = (board: BoardInfo[]) => {
        localStorage.setItem('boards', JSON.stringify({ board }))
    };

    const logout = () => {
        setUser(null);
        localStorage.clear()
        navigateTo('/')
    };

    const [alert, setAlert] = useState<AlertType>({
        state: false,
        content: "",
        type: undefined
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAlert({
                state: false,
                content: "",
                type: undefined
            })
        }, 4000);

        return () => clearTimeout(timeout)
    }, [alert])

    return (
        <UserContext.Provider value={{ user, setUserState, navigateTo, logout, boards, setUserBoards, setAlert }}>
            {
                alert.state ?
                    < Alert variant="filled" severity={alert.type} className="absolute right-5 bottom-5 !pe-20"> {alert.content} </Alert>
                    : null
            }
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