import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  View,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Calendar, X } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

interface RenewSubscriptionButtonProps {
  planType: 'monthly' | 'annual';
  onSuccess?: () => void;
  style?: any;
}

export default function RenewSubscriptionButton({
  planType,
  onSuccess,
  style,
}: RenewSubscriptionButtonProps) {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRenew = async () => {
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
      
      // Call the renew subscription API
      const response = await fetch('/api/renew-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          phoneNumber,
          planType,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to renew subscription');
      }
      
      // Show success message
      Alert.alert(
        'Renewal Initiated',
        'Please check your phone and enter your M-PESA PIN to complete the payment.',
        [
          {
            text: 'OK',
            onPress: () => {
              setShowModal(false);
              if (onSuccess) onSuccess();
            },
          },
        ]
      );
    } catch (error: any) {
      console.error('Renewal error:', error);
      setError(error.message || 'Failed to renew subscription. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={() => setShowModal(true)}
      >
        <Calendar size={16} color="white" />
        <Text style={styles.buttonText}>Renew Subscription</Text>
      </TouchableOpacity>
      
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
              disabled={isProcessing}
            >
              <X size={24} color="#718096" />
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Renew Your Subscription</Text>
            <Text style={styles.modalSubtitle}>
              You're renewing your {planType === 'monthly' ? 'Monthly' : 'Annual'} Plan
            </Text>
            
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
              style={[styles.renewButton, isProcessing && styles.disabledButton]}
              onPress={handleRenew}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.renewButtonText}>Renew Now</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#48BB78',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
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
    maxWidth: 400,
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
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
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
  renewButton: {
    backgroundColor: '#48BB78',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  renewButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});