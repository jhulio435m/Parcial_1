import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string, role: 'admin' | 'waiter' | 'customer') => {
    setIsLoading(true);
    setError(null);
    
    try {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => {
          if (role === 'admin' && !u.isAdmin) return false;
          if (role === 'waiter' && !u.isWaiter) return false;
          if (role === 'customer' && (u.isAdmin || u.isWaiter)) return false;
          return u.email === email;
        });
        
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('user', JSON.stringify(foundUser));
        } else {
          setError('Credenciales inválidas');
        }
        
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Ocurrió un error durante el inicio de sesión');
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          setError('El correo electrónico ya está en uso');
        } else {
          const newUser: User = {
            id: (mockUsers.length + 1).toString(),
            name,
            email,
            isAdmin: false,
            isWaiter: false,
          };
          
          mockUsers.push(newUser);
          
          setUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
        }
        
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Ocurrió un error durante el registro');
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
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