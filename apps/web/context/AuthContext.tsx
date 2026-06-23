// app/context/AuthContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

// 1. Define the Nested Entities matching your Database Schema
export interface AddressModel {
  id: string;
  label: string;      // e.g., "Casa", "Trabajo"
  street: string;     // e.g., "882 West Side Ave"
  subAddress?: string; // e.g., "Apto 4B"
}

export interface PaymentMethodModel {
  id: string;
  provider: string;   // e.g., "Visa", "MasterCard"
  lastFour: string;   // e.g., "4321"
  methodType: string; // e.g., "credit_card"
}

// 2. Expand the User Interface with your rich data arrays
export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: AddressModel[];
  payments?: PaymentMethodModel[];
  userRoles?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user from localStorage:", error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    localStorage.setItem(
      'user',
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
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