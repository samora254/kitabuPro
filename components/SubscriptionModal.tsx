import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { X, Check, CreditCard, Calendar, Shield, Zap, Clock } from 'lucide-react-native';
import { SUBSCRIPTION_PLANS, initiateSTKPush } from '@/lib/mpesa';
import { useAuth } from '@/contexts/AuthContext';

interface SubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SubscriptionModal({
  visible,
  onClose,
  onSuccess,
}: SubscriptionModalProps) {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'select-plan' | 'payment'>('select-plan');

  // Reset state when modal is opened
  useEffect(() => {
    if (visible) {
      setSelectedPlan('monthly');
      setPhoneNumber('');
      setError(null);
      setStep('select-plan');
      setIsProcessing(false);
    }
  }, [visible]);

  const handlePlanSelect = (plan: 'monthly' | 'annual') => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    setStep('payment');
  };

  const handlePayment = async () => {
    try {
      setError(null);
      
      // Validate phone number
      if (!phoneNumber.trim()) {
        setError('Please enter your phone number');
        return;
      }
      
      // Simple validation for Kenyan phone numbers
      const phoneRegex = /^(?:(?:\+254)|(?:0))?[17]\d{8}$/;
      if (!phoneRegex.test(phoneNumber.trim())) {
        setError('Please enter a valid Kenyan phone number');
        return;
      }
      
      setIsProcessing(true);
      
      // Get plan details
      const plan = selectedPlan === 'monthly' ? SUBSCRIPTION_PLANS.MONTHLY : SUBSCRIPTION_PLANS.ANNUAL;
      
      // Initiate STK Push
      await initiateSTKPush(
        phoneNumber,
        plan.amount,
        user.id,
        selectedPlan
      );
      
      // Show success message
      Alert.alert(
        'Payment Initiated',
        'Please check your phone and enter your M-PESA PIN to complete the payment.',
        [
          {
            text: 'OK',
            onPress: () => {
              onClose();
              if (onSuccess) onSuccess();
            },
          },
        ]
      );
    } catch (error: any) {
      console.error('Payment error:', error);
      setError(error.message || 'Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderSelectPlanStep = () => (
    <View style={styles.planSelectionContainer}>
      <Text style={styles.planSelectionTitle}>Choose Your Plan</Text>
      <Text style={styles.planSelectionSubtitle}>Select the plan that works best for you. All plans renew on the 1st of the month.</Text>
      
      <View style={styles.plansContainer}>
        <TouchableOpacity
          style={[
            styles.planCard,
            selectedPlan === 'monthly' && styles.selectedPlanCard,
          ]}
          onPress={() => handlePlanSelect('monthly')}
        >
          <View style={styles.planHeader}>
            <Text style={styles.planName}>Monthly Plan</Text>
            <Text style={styles.billingCycleText}>Renews 1st of each month</Text>
            {selectedPlan === 'monthly' && (
              <View style={styles.selectedBadge}>
                <Check size={16} color="white" />
              </View>
            )}
          </View>
          
          <Text style={styles.planPrice}>KES 250</Text>
          <Text style={styles.planDuration}>per month</Text>
          
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
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.planCard,
            selectedPlan === 'annual' && styles.selectedPlanCard,
            styles.bestValueCard,
          ]}
          onPress={() => handlePlanSelect('annual')}
        >
          <View style={styles.bestValueBadge}>
            <Text style={styles.bestValueText}>Best Value</Text>
          </View>
          
          <View style={styles.planHeader}>
            <Text style={styles.planName}>Annual Plan</Text>
            <Text style={styles.billingCycleText}>Renews January 1st</Text>
            {selectedPlan === 'annual' && (
              <View style={styles.selectedBadge}>
                <Check size={16} color="white" />
              </View>
            )}
          </View>
          
          <Text style={styles.planPrice}>KES 1,000</Text>
          <Text style={styles.planDuration}>per year</Text>
          
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
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPaymentStep = () => (
    <View style={styles.paymentContainer}>
      <Text style={styles.paymentTitle}>Complete Your Payment</Text>
      <Text style={styles.paymentSubtitle}>
        You've selected the {selectedPlan === 'monthly' ? 'Monthly' : 'Annual'} Plan
      </Text>
      
      <View style={styles.planSummary}>
        <View style={styles.planSummaryRow}>
          <Text style={styles.planSummaryLabel}>Plan:</Text>
          <Text style={styles.planSummaryValue}>
            {selectedPlan === 'monthly' ? 'Monthly Plan' : 'Annual Plan'}
          </Text>
        </View>
        <View style={styles.planSummaryRow}>
          <Text style={styles.planSummaryLabel}>Amount:</Text>
          <Text style={styles.planSummaryValue}>
            KES {selectedPlan === 'monthly' ? '250' : '1,000'}
          </Text>
        </View>
        <View style={styles.planSummaryRow}>
          <Text style={styles.planSummaryLabel}>Duration:</Text>
          <Text style={styles.planSummaryValue}>
            {selectedPlan === 'monthly' ? '30 days' : '365 days'}
          </Text>
        </View>
      </View>
      
      <View style={styles.paymentMethod}>
        <Text style={styles.paymentMethodTitle}>Payment Method</Text>
        <View style={styles.mpesaOption}>
          <View style={styles.mpesaLogo}>
            <Text style={styles.mpesaLogoText}>M-PESA</Text>
          </View>
          <Text style={styles.mpesaText}>Pay with M-PESA</Text>
        </View>
      </View>
      
      <View style={styles.phoneInputContainer}>
        <Text style={styles.phoneInputLabel}>Enter M-PESA Phone Number</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="e.g., 0712345678"
          placeholderTextColor="#A0AEC0"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          editable={!isProcessing}
        />
        <Text style={styles.phoneInputHint}>
          Enter the phone number registered with M-PESA
        </Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      
      <TouchableOpacity
        style={[styles.payButton, isProcessing && styles.disabledButton]}
        onPress={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.payButtonText}>Pay Now</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setStep('select-plan')}
        disabled={isProcessing}
      >
        <Text style={styles.backButtonText}>Back to Plans</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            disabled={isProcessing}
          >
            <X size={24} color="#718096" />
          </TouchableOpacity>
          
          {step === 'select-plan' ? renderSelectPlanStep() : renderPaymentStep()}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  planSelectionContainer: {
    paddingTop: 20,
  },
  planSelectionTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  planSelectionSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
  },
  plansContainer: {
    gap: 16,
    marginBottom: 24,
  },
  planCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  selectedPlanCard: {
    borderColor: '#4299E1',
    backgroundColor: '#EBF8FF',
  },
  bestValueCard: {
    position: 'relative',
    paddingTop: 36,
  },
  bestValueBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: [{ translateX: -60 }],
    backgroundColor: '#48BB78',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bestValueText: {
    color: 'white',
    fontSize: 14,
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
    marginBottom: 4,
  },
  billingCycleText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginBottom: 8,
  },
  selectedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4299E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planPrice: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  planDuration: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginBottom: 16,
  },
  planFeatures: {
    gap: 12,
  },
  planFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  planFeatureText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
  },
  continueButton: {
    backgroundColor: '#4299E1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  paymentContainer: {
    paddingTop: 20,
  },
  paymentTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  paymentSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
  },
  planSummary: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  planSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  planSummaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  planSummaryValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
  },
  paymentMethod: {
    marginBottom: 24,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 12,
  },
  mpesaOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#4CD964',
  },
  mpesaLogo: {
    backgroundColor: '#4CD964',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
  },
  mpesaLogoText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  mpesaText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
  },
  phoneInputContainer: {
    marginBottom: 24,
  },
  phoneInputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
    marginBottom: 8,
  },
  phoneInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    marginBottom: 8,
  },
  phoneInputHint: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E53E3E',
    marginTop: 8,
  },
  payButton: {
    backgroundColor: '#4CD964',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    opacity: 0.7,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  backButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#718096',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});