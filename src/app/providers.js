"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "@/lib/supabase";

// Create context for authentication
const AuthContext = createContext(null);

/**
 * Authentication Provider Component
 * Manages user authentication state and provides auth methods
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if Supabase is configured
    if (!supabase) {
      setError("Supabase not configured. Please set environment variables.");
      setLoading(false);
      return;
    }

    // Get current session on mount
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error("Error checking user:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    // Cleanup subscription
    return () => subscription?.unsubscribe();
  }, []);

  // Sign in with Google OAuth
  const signInWithGoogle = async () => {
    if (!supabase) throw new Error("Supabase not configured");

    const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${redirectUrl}/auth/callback` },
    });

    if (error) throw error;
  };

  // Sign out
  const logout = async () => {
    if (!supabase) throw new Error("Supabase not configured");

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, signInWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use authentication context
 * Must be used within AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
