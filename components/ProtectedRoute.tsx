import React, { ReactNode, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ('student' | 'teacher' | 'agent' | 'admin')[];
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles 
}: ProtectedRouteProps) {
  const { user, userRole, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // User is not authenticated, redirect to sign in
        router.replace('/auth/signin');
      } else if (allowedRoles && !allowedRoles.includes(userRole!)) {
        // User doesn't have the required role, redirect to dashboard
        router.replace('/dashboard');
      }
    }
  }, [user, userRole, loading, allowedRoles]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4299E1" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  if (allowedRoles && !allowedRoles.includes(userRole!)) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
  },
});