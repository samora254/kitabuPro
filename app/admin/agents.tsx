import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  TextInput,
  Modal,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Users, BookOpen, ChartBar as BarChart3, Settings, MessageSquare, UserCheck, FileText, GraduationCap, School, Bot, CircleHelp as HelpCircle, Zap, Award, Target, ChevronDown, Menu, X, Search, Filter, Download, RefreshCw, MoveHorizontal as MoreHorizontal, TrendingUp, DollarSign, Calendar, Phone, Mail, MapPin, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Circle as XCircle, Eye, CreditCard as Edit3, Trash2, Plus, ChartBar as BarChart, ChartPie as PieChart, ChartLine as LineChart } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

const { width } = Dimensions.get('window');

interface SalesAgent {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  totalSales: number;
  monthlyTarget: number;
  schoolsOnboarded: number;
  studentsAcquired: number;
  conversionRate: number;
  status: 'online' | 'offline' | 'busy';
  lastActive: string;
  joinDate: string;
  avatar: string;
  performance: {
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
  recentActivity: {
    id: string;
    action: string;
    timestamp: string;
    details: string;
  }[];
  schools: {
    name: string;
    students: number;
    revenue: number;
  }[];
}

interface LoadingState {
  agents: boolean;
  details: boolean;
  refresh: boolean;
}

interface ErrorState {
  agents: string | null;
  details: string | null;
  network: string | null;
}

export default function SalesAgentsManagement() {
  // ... rest of the component code ...
  return (
    <ProtectedRoute allowedRoles={['admin', 'agent']}>
      <View style={styles.container}>
        <DevModeIndicator />
        
        {userRole === 'admin' && renderSidebar()}
        
        <View style={[styles.mainContent, sidebarCollapsed && styles.mainContentExpanded, userRole !== 'admin' && styles.agentView]}>
          {/* ... rest of the JSX ... */}
        </View>
        {renderAgentModal()}
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  // ... styles object ...
});