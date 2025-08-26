import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  initAuth: () => void;
}

// Simulate JWT token generation
const generateToken = (user: User) => {
  return btoa(JSON.stringify({ 
    user: user.email, 
    exp: Date.now() + 86400000, // 24 hours
    userId: user.id 
  }));
};

// Simulate user storage
const getUsers = (): User[] => {
  const users = localStorage.getItem('quiz-users');
  return users ? JSON.parse(users) : [];
};

const saveUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('quiz-users', JSON.stringify(users));
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  setToken: (token) => {
    set({ token, isAuthenticated: !!token });
    if (token) {
      localStorage.setItem('quiz-token', token);
    } else {
      localStorage.removeItem('quiz-token');
    }
  },

  setUser: (user) => set({ user }),

  login: async (email: string, password: string) => {
    // Simulate login
    const users = getUsers();
    const user = users.find(u => u.email === email);
    
    if (user) {
      const token = generateToken(user);
      get().setToken(token);
      get().setUser(user);
      return true;
    }
    return false;
  },

  register: async (email: string, password: string, name: string) => {
    // Check if user already exists
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toISOString()
    };

    saveUser(newUser);
    const token = generateToken(newUser);
    get().setToken(token);
    get().setUser(newUser);
    return true;
  },

  logout: () => {
    get().setToken(null);
    get().setUser(null);
  },

  initAuth: () => {
    const token = localStorage.getItem('quiz-token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        if (decoded.exp > Date.now()) {
          const users = getUsers();
          const user = users.find(u => u.id === decoded.userId);
          if (user) {
            get().setToken(token);
            get().setUser(user);
          }
        }
      } catch (error) {
        localStorage.removeItem('quiz-token');
      }
    }
  }
}));
