"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "company";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: "student" | "company") => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgisini al
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - gerçekte API çağrısı yapılacak
    const { validateUser } = await import("../lib/mockUsers");
    const foundUser = validateUser(email, password);
    
    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: "student" | "company"
  ): Promise<boolean> => {
    // Mock register - gerçekte API çağrısı yapılacak
    const { findUserByEmail } = await import("../lib/mockUsers");
    
    // Email zaten kullanılıyor mu kontrol et
    if (findUserByEmail(email)) {
      return false;
    }

    // Yeni kullanıcı oluştur
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    // Mock users'a ekle (sadece bu session için)
    const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
    mockUsers.push({
      ...newUser,
      password, // Gerçek uygulamada hash'lenmiş olmalı
    });
    localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

























