import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Download, Receipt, Calendar, Clock } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Payment {
  id: string;
  plan_type: string;
  amount: number;
  status: string;
  transaction_id: string;
  start_date: string;
  end_date: string;
  created_at: string;
  prorated_amount: boolean;
}

export default function BillingHistoryScreen() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadPaymentHistory();
    }
  }, [user]);

  const loadPaymentHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'success')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setPayments(data || []);
    } catch (err: any) {
      console.error('Error loading payment history:', err);
      setError(err.message || 'Failed to load payment history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getPlanName = (planType: string) => {
    switch (planType) {
      case 'monthly': return 'Monthly Plan';
      case 'annual': return 'Annual Plan';
      case 'trial': return 'Free Trial';
      default: return planType;
    }
  };

  const renderPaymentItem = ({ item }: { item: Payment }) => (
    <View style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentPlan}>{getPlanName(item.plan_type)}</Text>
          <Text style={styles.paymentDate}>Paid on {formatDate(item.created_at)}</Text>
        </View>
        <Text style={styles.paymentAmount}>
          KES {item.amount}
          {item.prorated_amount && <Text style={styles.proratedText}> (Prorated)</Text>}
        </Text>
      </View>
      
      <View style={styles.paymentDetails}>
        <View style={styles.paymentDetail}>
          <Receipt size={16} color="#718096" />
          <Text style={styles.paymentDetailText}>
            Transaction ID: {item.transaction_id || 'N/A'}
          </Text>
        </View>
        
        <View style={styles.paymentDetail}>
          <Calendar size={16} color="#718096" />
          <Text style={styles.paymentDetailText}>
            Period: {formatDate(item.start_date)} - {formatDate(item.end_date)}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.receiptButton}>
        <Download size={16} color="#4299E1" />
        <Text style={styles.receiptButtonText}>Download Receipt</Text>
      </TouchableOpacity>
    </View>
  );

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
          <Text style={styles.headerTitle}>Billing History</Text>
          <View style={styles.headerSpacer} />
        </View>
        
        <View style={styles.content}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4299E1" />
              <Text style={styles.loadingText}>Loading payment history...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={loadPaymentHistory}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : payments.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Receipt size={64} color="#A0AEC0" />
              <Text style={styles.emptyTitle}>No payment history</Text>
              <Text style={styles.emptyDescription}>
                You haven't made any payments yet.
              </Text>
            </View>
          ) : (
            <FlatList
              data={payments}
              renderItem={renderPaymentItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.paymentsList}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
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
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#E53E3E',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#4299E1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
  },
  paymentsList: {
    paddingBottom: 20,
  },
  paymentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentPlan: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  paymentAmount: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#48BB78',
  },
  proratedText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  paymentDetails: {
    marginBottom: 16,
  },
  paymentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentDetailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    marginLeft: 8,
  },
  receiptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBF8FF',
    paddingVertical: 10,
    borderRadius: 8,
  },
  receiptButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
    marginLeft: 8,
  },
});