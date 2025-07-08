import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Calendar, Shield, Zap, Check, Clock, X } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
import { useAuth } from '@/contexts/AuthContext';
import { checkSubscriptionStatus } from '@/lib/mpesa';
import ProtectedRoute from '@/components/ProtectedRoute';
import SubscriptionModal from '@/components/SubscriptionModal';
import RenewSubscriptionButton from '@/components/RenewSubscriptionButton';

export default function SubscriptionScreen() {
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

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <DevModeIndicator />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#2D3748" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Subscription</Text>
          <View style={styles.headerSpacer} />
        </View>
        
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4299E1" />
              <Text style={styles.loadingText}>Loading subscription details...</Text>
            </View>
          ) : (
            <>
              {/* Subscription Status */}
              <View style={styles.statusCard}>
                <View style={styles.statusHeader}>
                  <View style={[
                    styles.statusBadge,
                    {
                      backgroundColor: subscriptionStatus?.isActive 
                        ? subscriptionStatus.isInTrial 
                          ? '#FEF3C7' 
                          : '#F0FFF4'
                        : '#FEF2F2'
                    }
                  ]}>
                    <Text style={[
                      styles.statusBadgeText,
                      {
                        color: subscriptionStatus?.isActive 
                          ? subscriptionStatus.isInTrial 
                            ? '#D97706' 
                            : '#10B981'
                          : '#E53E3E'
                      }
                    ]}>
                      {subscriptionStatus?.isActive 
                        ? subscriptionStatus.isInTrial 
                          ? 'Trial Active' 
                          : 'Subscription Active'
                        : 'Subscription Inactive'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.statusDetails}>
                  {subscriptionStatus?.isActive ? (
                    <>
                      <Text style={styles.statusTitle}>
                        {subscriptionStatus.isInTrial 
                          ? 'Your Free Trial' 
                          : subscriptionStatus.planType === 'monthly' 
                            ? 'Monthly Subscription' 
                            : 'Annual Subscription'}
                      </Text>
                      
                      <View style={styles.statusInfo}>
                        <Clock size={16} color="#718096" />
                        <Text style={styles.statusInfoText}>
                          {subscriptionStatus.isInTrial 
                            ? `Expires on ${subscriptionStatus.endDate?.toLocaleDateString()}` 
                            : `Renews on ${subscriptionStatus.endDate?.toLocaleDateString()}`}
                        </Text>
                      </View>
                      
                      {subscriptionStatus.daysRemaining !== undefined && (
                        <View style={styles.daysRemainingContainer}>
                          <Text style={styles.daysRemainingText}>
                            {subscriptionStatus.daysRemaining} days remaining
                          </Text>
                          <View style={styles.progressBar}>
                            <View 
                              style={[
                                styles.progressFill, 
                                { 
                                  width: `${subscriptionStatus.isInTrial 
                                    ? (subscriptionStatus.daysRemaining / 7) * 100 
                                    : (subscriptionStatus.daysRemaining / 30) * 100
                                  }%`,
                                  backgroundColor: subscriptionStatus.isInTrial 
                                    ? '#F59E0B' 
                                    : '#48BB78'
                                }
                              ]} 
                            />
                          </View>
                        </View>
                      )}
                    </>
                  ) : (
                    <>
                      <Text style={styles.statusTitle}>
                        Your subscription has expired
                      </Text>
                      
                      <Text style={styles.statusDescription}>
                        Subscribe now to access premium features. We offer calendar-based billing with prorated charges for your first month.
                      </Text>
                    </>
                  )}
                </View>
                
                <View style={styles.statusActions}>
                  {subscriptionStatus?.isActive && !subscriptionStatus.isInTrial ? (
                    <RenewSubscriptionButton 
                      planType={subscriptionStatus.planType as 'monthly' | 'annual'} 
                      onSuccess={loadSubscriptionStatus}
                      style={styles.renewButton}
                    />
                  ) : (
                    <TouchableOpacity
                      style={styles.subscribeButton}
                      onPress={handleSubscribe}
                    >
                      <Text style={styles.subscribeButtonText}>
                        {subscriptionStatus?.isActive && subscriptionStatus.isInTrial 
                          ? 'Upgrade to Premium' 
                          : 'Subscribe Now'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              
              {/* Subscription Plans */}
              <View style={styles.plansSection}>
                <Text style={styles.sectionTitle}>Subscription Plans</Text>
                <Text style={styles.sectionDescription}>
                  Choose the plan that works best for you. All plans renew on the 1st of the month.
                </Text>
                
                <View style={styles.plansContainer}>
                  <View style={styles.planCard}>
                    <View style={styles.planHeader}>
                      <Text style={styles.planName}>Monthly Plan</Text>
                      <Text style={styles.planPrice}>KES 250</Text>
                    </View>
                    
                    <Text style={styles.planDescription}>
                      Billed monthly on the 1st of each month. First payment prorated based on days remaining in the current month.
                    </Text>
                    
                    <View style={styles.planFeatures}>
                      <View style={styles.planFeature}>
                        <Check size={16} color="#48BB78" />
                        <Text style={styles.planFeatureText}>Unlimited Chat with AI Tutor</Text>
                      </View>
                      <View style={styles.planFeature}>
                        <Check size={16} color="#48BB78" />
                        <Text style={styles.planFeatureText}>Unlimited Revision Papers</Text>
                      </View>
                      <View style={styles.planFeature}>
                        <Check size={16} color="#48BB78" />
                        <Text style={styles.planFeatureText}>Unlimited Homework Assignments</Text>
                      </View>
                    </View>
                    
                    <TouchableOpacity
                      style={styles.planButton}
                      onPress={handleSubscribe}
                    >
                      <Text style={styles.planButtonText}>Select Plan</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={[styles.planCard, styles.bestValueCard]}>
                    <View style={styles.bestValueBadge}>
                      <Text style={styles.bestValueText}>Best Value</Text>
                    </View>
                    
                    <View style={styles.planHeader}>
                      <Text style={styles.planName}>Annual Plan</Text>
                      <Text style={styles.planPrice}>KES 1,000</Text>
                    </View>
                    
                    <Text style={styles.planDescription}>
                      Billed annually on January 1st. First payment prorated based on days remaining in the current year.
                    </Text>
                    
                    <View style={styles.planFeatures}>
                      <View style={styles.planFeature}>
                        <Check size={16} color="#48BB78" />
                        <Text style={styles.planFeatureText}>Unlimited Chat with AI Tutor</Text>
                      </View>
                      <View style={styles.planFeature}>
                        <Check size={16} color="#48BB78" />
                        <Text style={styles.planFeatureText}>Unlimited Revision Papers</Text>
                      </View>
                      <View style={styles.planFeature}>
                        <Check size={16} color="#48BB78" />
                        <Text style={styles.planFeatureText}>Unlimited Homework Assignments</Text>
                      </View>
                      <View style={styles.planFeature}>
                        <Check size={16} color="#48BB78" />
                        <Text style={styles.planFeatureText}>Priority Access to New Features</Text>
                      </View>
                      <View style={styles.planFeature}>
                        <Check size={16} color="#48BB78" />
                        <Text style={styles.planFeatureText}>Save 67% compared to monthly plan</Text>
                      </View>
                    </View>
                    
                    <TouchableOpacity
                      style={[styles.planButton, styles.bestValueButton]}
                      onPress={handleSubscribe}
                    >
                      <Text style={styles.planButtonText}>Select Plan</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
              {/* Features Section */}
              <View style={styles.featuresSection}>
                <Text style={styles.sectionTitle}>Premium Features</Text>
                
                <View style={styles.featureCard}>
                  <View style={styles.featureIcon}>
                    <Zap size={24} color="#4299E1" />
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>AI Tutor Chat</Text>
                    <Text style={styles.featureDescription}>
                      Get personalized help with your studies anytime, anywhere. Our AI tutor can answer questions, explain concepts, and help you prepare for exams.
                    </Text>
                  </View>
                </View>
                
                <View style={styles.featureCard}>
                  <View style={styles.featureIcon}>
                    <Calendar size={24} color="#48BB78" />
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>Homework Assignments</Text>
                    <Text style={styles.featureDescription}>
                      Access and complete homework assignments from your teachers. Get instant feedback and track your progress.
                    </Text>
                  </View>
                </View>
                
                <View style={styles.featureCard}>
                  <View style={styles.featureIcon}>
                    <Shield size={24} color="#F59E0B" />
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>Revision Papers</Text>
                    <Text style={styles.featureDescription}>
                      Practice with past papers and revision materials to prepare for exams and improve your grades.
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </ScrollView>
        
        <SubscriptionModal
          visible={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          onSuccess={handleSubscriptionSuccess}
        />
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
  },
  statusCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statusHeader: {
    marginBottom: 16,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  statusDetails: {
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 12,
  },
  statusDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    lineHeight: 20,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusInfoText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginLeft: 8,
  },
  daysRemainingContainer: {
    marginTop: 8,
  },
  daysRemainingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#48BB78',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  statusActions: {
    marginTop: 8,
  },
  renewButton: {
    backgroundColor: '#48BB78',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  subscribeButton: {
    backgroundColor: '#4299E1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  plansSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginBottom: 16,
    lineHeight: 20,
  },
  plansContainer: {
    gap: 16,
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bestValueCard: {
    borderColor: '#48BB78',
    borderWidth: 2,
    position: 'relative',
    paddingTop: 36,
  },
  bestValueBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#48BB78',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bestValueText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
  },
  planPrice: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#4299E1',
  },
  planDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginBottom: 16,
    lineHeight: 20,
  },
  planFeatures: {
    marginBottom: 20,
  },
  planFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  planFeatureText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    marginLeft: 8,
  },
  planButton: {
    backgroundColor: '#4299E1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bestValueButton: {
    backgroundColor: '#48BB78',
  },
  planButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  featuresSection: {
    marginBottom: 24,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    lineHeight: 20,
  },
});