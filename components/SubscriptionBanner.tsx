import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Zap, Clock, Shield, X } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { checkSubscriptionStatus } from '@/lib/mpesa';
import SubscriptionModal from './SubscriptionModal';

interface SubscriptionBannerProps {
  onDismiss?: () => void;
}

export default function SubscriptionBanner({ onDismiss }: SubscriptionBannerProps) {
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
  const [dismissed, setDismissed] = useState(false);

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

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) onDismiss();
  };

  const handleSubscribe = () => {
    setShowSubscriptionModal(true);
  };

  const handleSubscriptionSuccess = () => {
    // Reload subscription status after successful payment
    loadSubscriptionStatus();
  };

  if (dismissed || loading || !subscriptionStatus || subscriptionStatus.isActive) {
    return null;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          {subscriptionStatus.isInTrial ? (
            <>
              <View style={styles.iconContainer}>
                <Clock size={24} color="#F59E0B" /> 
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  {subscriptionStatus.daysRemaining && subscriptionStatus.daysRemaining > 0
                    ? `${subscriptionStatus.daysRemaining} days left in your free trial`
                    : 'Your free trial has ended'}
                </Text>
                <Text style={styles.description}>
                  {subscriptionStatus.daysRemaining && subscriptionStatus.daysRemaining > 0
                    ? 'Subscribe now to continue enjoying full access after your trial ends.'
                    : 'Subscribe now to regain access to premium features.'}
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.iconContainer}>
                <Calendar size={24} color="#E53E3E" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Your subscription has expired</Text> 
                <Text style={styles.description}>
                  Subscribe now to regain access to premium features. New subscriptions are prorated for the remaining days in the {new Date().getFullYear()}.
                </Text>
              </View>
            </>
          )}
          
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={handleSubscribe}
          >
            <Zap size={16} color="white" />
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.dismissButton}
          onPress={handleDismiss}
        >
          <X size={16} color="#718096" />
        </TouchableOpacity>
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
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEEBC8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  subscribeButton: {
    backgroundColor: '#4299E1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 6,
  },
  dismissButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});