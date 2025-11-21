import React, {useEffect, useState} from 'react';
import {GlobalContext, type NavLink} from '../hooks/useGlobal';
import usersJson from '../assets/data/users.json';
import type {User} from "../types/User.ts";

interface GlobalProviderProps {
    children: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const storedUser = sessionStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [screenWidth, setScreenWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'));

    const [users, setUsers] = useState<User[]>(() => {
        try {
            const localUsers = localStorage.getItem('connecTechUsers');
            if (localUsers) return JSON.parse(localUsers);
            localStorage.setItem('connecTechUsers', JSON.stringify(usersJson));
            return usersJson as User[];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        try {
            if (user) {
                sessionStorage.setItem('user', JSON.stringify(user));
            } else {
                sessionStorage.removeItem('user');
            }
        } catch (e) {
            console.error('Failed to persist user', e);
        }
    }, [user]);

    const addUser = (newUser: User) => {
        if (newUser) {
            const newUsers = [...users, newUser];
            setUsers(newUsers);
            localStorage.setItem('connecTechUsers', JSON.stringify(newUsers));
        }
    };

    const getUserById = (id: string): User | null => {
        const foundUser = users.find((u) => u.id === Number(id));
        return foundUser || null;
    }
    const links: NavLink[] = [];

    const globalValue = {
        user,
        setUser,
        addUser,
        theme,
        setTheme,
        users,
        setUsers,
        screenWidth,
        setLoading,
        loading,
        links,
        getUserById
    };

    return <GlobalContext.Provider value={globalValue}>{children}</GlobalContext.Provider>;
};
