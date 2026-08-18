import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthUser, AuthResponse } from '../types/auth';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSales: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (googleData: { email: string; name: string; picture?: string }) => Promise<void>;
  signup: (userData: { name: string; email: string; password: string; company?: string; phone?: string }) => Promise<void>;
  logout: () => void;
  authModalOpen: boolean;
  authModalTab: 'login' | 'signup';
  openAuthModal: (tab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'kinglift_auth_token_v1';
const USER_KEY = 'kinglift_auth_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  // Verify token on mount
  useEffect(() => {
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Token expired');
        })
        .then(data => {
          setUser(data.user);
          localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }

    const { token: jwtToken, user: authUser } = data as AuthResponse;
    setToken(jwtToken);
    setUser(authUser);
    localStorage.setItem(TOKEN_KEY, jwtToken);
    localStorage.setItem(USER_KEY, JSON.stringify(authUser));
    setAuthModalOpen(false);
  };

  const loginWithGoogle = async (googleData: { email: string; name: string; picture?: string }) => {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(googleData)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Google login failed');
    }

    const { token: jwtToken, user: authUser } = data as AuthResponse;
    setToken(jwtToken);
    setUser(authUser);
    localStorage.setItem(TOKEN_KEY, jwtToken);
    localStorage.setItem(USER_KEY, JSON.stringify(authUser));
    setAuthModalOpen(false);
  };

  const signup = async (userData: { name: string; email: string; password: string; company?: string; phone?: string }) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    const { token: jwtToken, user: authUser } = data as AuthResponse;
    setToken(jwtToken);
    setUser(authUser);
    localStorage.setItem(TOKEN_KEY, jwtToken);
    localStorage.setItem(USER_KEY, JSON.stringify(authUser));
    setAuthModalOpen(false);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const openAuthModal = (tab: 'login' | 'signup' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === 'admin';
  const isSales = user?.role === 'sales' || user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        isSales,
        login,
        loginWithGoogle,
        signup,
        logout,
        authModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
