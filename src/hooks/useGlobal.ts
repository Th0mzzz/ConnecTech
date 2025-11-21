import {createContext, useContext} from 'react';
import type {User} from "../types/User.ts";


export interface NavLink {
  name: string;
  url: string;
  icon?: React.ReactNode;
}

export interface GlobalContextValue {
  user: User | null;
  setUser: (u: User | null) => void;
  addUser: (u: User) => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  users: User[];
  setUsers: (users: User[]) => void;
  screenWidth: number;
  setLoading: (v: boolean) => void;
  loading: boolean;
  links: NavLink[];
  getUserById: (id: string) => User | null;
}

export const GlobalContext = createContext<GlobalContextValue | undefined>(undefined);

export function useGlobal(): GlobalContextValue {
  const ctx = useContext(GlobalContext);
  if (!ctx) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return ctx;
}

