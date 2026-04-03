import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (access: string, refresh: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // When the app initializes, we don't have a /me endpoint defined to fetch the user.
    // If the backend had one, we could verify the token here.
    // Since it's a phase 0 MVP, we'll assume the user is valid if the token exists.
    // In a real scenario, decode JWT or fetch /auth/me.
    // For now, if there's an accessToken, we will just parse basic details or wait for an explicit login to set user.
    const token = localStorage.getItem('accessToken');
    if (token) {
        // Mock user decoding just so protected routes consider us logged in
        setUser({ id: 'mock-user-id', email: 'user@example.com', role: 'user' });
    }
    
    setIsLoading(false);

    const handleLogoutEvent = () => {
      logout();
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
    };

    window.addEventListener('auth:logout', handleLogoutEvent);
    return () => window.removeEventListener('auth:logout', handleLogoutEvent);
  }, [navigate]);

  const login = (access: string, refresh: string, userData: User) => {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    setAccessToken(access);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
