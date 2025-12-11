"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "company";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, surname?: string, role?: "student" | "company") => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Kullanıcı oturumunu kontrol et
  useEffect(() => {
    // Mevcut oturumu kontrol et
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Auth state değişikliklerini dinle
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadUserProfile(session.user.id);
        
        // Email onaylandığında profiles tablosunu güncelle
        if (event === 'SIGNED_IN' && session.user.email_confirmed_at) {
          await supabase
            .from("profiles")
            .update({ email_confirmed: true })
            .eq("id", session.user.id);
        }
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Kullanıcı profilini yükle
  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, name, role")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Profil yükleme hatası:", error);
        setIsLoading(false);
        return;
      }

      if (data) {
        setUser({
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role as "student" | "company",
        });
      }
    } catch (error) {
      console.error("Profil yükleme hatası:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Giriş hatası:", error);
        return false;
      }

      if (data.user) {
        await loadUserProfile(data.user.id);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Giriş hatası:", error);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    surname?: string,
    role: "student" | "company" = "student"
  ): Promise<boolean> => {
    try {
      // Supabase Auth ile kullanıcı oluştur
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            surname,
            role,
          },
        },
      });

      if (authError) {
        console.error("Kayıt hatası:", authError);
        return false;
      }

      if (authData.user) {
        // Profil tablosuna kayıt ekle
        const profileData: any = {
          id: authData.user.id,
          email,
          name,
          role,
          email_confirmed: authData.user.email_confirmed_at ? true : false, // Email onay durumu
        };
        
        // Surname varsa ekle
        if (surname) {
          profileData.surname = surname;
        }

        const { error: profileError } = await supabase
          .from("profiles")
          .insert(profileData);

        if (profileError) {
          console.error("Profil oluşturma hatası:", profileError);
          // Kullanıcı oluşturuldu ama profil oluşturulamadı
          // Auth kullanıcısını sil (opsiyonel)
          return false;
        }

        // Kullanıcı profilini yükle
        await loadUserProfile(authData.user.id);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Kayıt hatası:", error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Çıkış hatası:", error);
    }
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


























