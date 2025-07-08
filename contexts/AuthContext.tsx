import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase, getCurrentUser, getUserRole, signIn, signUp, signOut } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

// Define the shape of the auth context
interface AuthContextType {
  session: Session | null;
  user: any | null;
  userRole: 'student' | 'teacher' | 'agent' | 'admin' | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'agent' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth changes
  useEffect(() => {
    let isMounted = true;
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!isMounted) return;
        
        setSession(session);
        setLoading(true);
        
        if (session) {
          try {
            const currentUser = await getCurrentUser();
            if (isMounted) setUser(currentUser);
            const role = await getUserRole();
            if (isMounted) setUserRole(role);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        } else {
          if (isMounted) {
            setUser(null);
            setUserRole(null);
          }
        }
        
        if (isMounted) setLoading(false);
      }
    );

    // Initial session check
    const initializeAuth = async () => {
      if (!isMounted) return;
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (isMounted) setSession(session);
        
        if (session) {
          const currentUser = await getCurrentUser();
          if (isMounted) setUser(currentUser);
          const role = await getUserRole();
          if (isMounted) setUserRole(role);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Refresh user data
  const refreshUser = async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      const role = await getUserRole();
      setUserRole(role);
    } catch (error) {
      console.error('Error refreshing user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auth context value
  const value = {
    session,
    user,
    userRole,
    loading,
    signUp,
    signIn,
    signOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}