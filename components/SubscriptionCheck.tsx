import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Zap, Lock } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { checkSubscriptionStatus } from '@/lib/mpesa';
import SubscriptionModal from './SubscriptionModal';

interface SubscriptionCheckProps {
  children: React.ReactNode;
  featureType: 'chat' | 'homework' | 'revision';
}

export default function SubscriptionCheck({ children, featureType }: SubscriptionCheckProps) {
  const { user } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    isActive: boolean;
    endDate?: Date;
    planType?: string;
    daysRemaining?: number;
    isInTrial?: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  useEffect(() => {
    if (user) {
      loadSubscriptionStatus();
    }
  }, [user]);

  const loadSubscriptionStatus = async () => {
    try {
      setLoading(true);
      const status = await checkSubscriptionStatus(user.id);
      setSubscriptionStatus(status);
    } catch (error) {
      console.error('Error loading subscription status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = () => {
    setShowSubscriptionModal(true);
  };

  const handleSubscriptionSuccess = () => {
    // Reload subscription status after successful payment
    loadSubscriptionStatus();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4299E1" />
        <Text style={styles.loadingText}>Checking subscription...</Text>
      </View>
    );
  }

  // If subscription is active or user is in trial, show the children
  if (subscriptionStatus?.isActive) {
    return <>{children}</>;
  }

  // Otherwise, show the locked content screen
  return (
    <>
      <View style={styles.container}>
        <View style={styles.lockedContent}>
          <View style={styles.lockIconContainer}>
            <Lock size={48} color="#E53E3E" />
          </View>
          
          <Text style={styles.lockedTitle}>Premium Feature</Text>
          <Text style={styles.lockedDescription}>
            {featureType === 'chat' && 'Chat with our AI Tutor is a premium feature.'}
            {featureType === 'homework' && 'Homework assignments are a premium feature.'} 
            {featureType === 'revision' && 'Revision papers are a premium feature.'}
            {' '}Subscribe to unlock unlimited access. We offer calendar-based billing with prorated charges for your first month.
          </Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Zap size={16} color="#4299E1" />
              <Text style={styles.featureText}>Unlimited AI Tutor Chat</Text>
            </View>
            <View style={styles.featureItem}>
              <Zap size={16} color="#4299E1" />
              <Text style={styles.featureText}>Unlimited Homework Assignments</Text>
            </View>
            <View style={styles.featureItem}>
              <Zap size={16} color="#4299E1" />
              <Text style={styles.featureText}>Unlimited Revision Papers</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={handleSubscribe}
          >
            <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <SubscriptionModal
        visible={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSuccess={handleSubscriptionSuccess}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    padding: 20,
  },
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
  lockedContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  lockIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  lockedTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 12,
    textAlign: 'center',
  },
  lockedDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  featuresList: {
    width: '100%',
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginLeft: 12,
  },
  subscribeButton: {
    backgroundColor: '#4299E1',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});