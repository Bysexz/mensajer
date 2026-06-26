import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('voxy_token'),
  user: null,
  setAuth: (token, user) => {
    localStorage.setItem('voxy_token', token);
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('voxy_token');
    set({ token: null, user: null });
  },
}));
