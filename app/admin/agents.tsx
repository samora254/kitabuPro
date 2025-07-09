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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('This Month');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<SalesAgent | null>(null);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showTimeFrameDropdown, setShowTimeFrameDropdown] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'sales' | 'performance'>('sales');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [refreshing, setRefreshing] = useState(false);
  
  // Loading and error states
  const [loading, setLoading] = useState<LoadingState>({
    agents: true,
    details: false,
    refresh: false,
  });
  
  const [errors, setErrors] = useState<ErrorState>({
    agents: null,
    details: null,
    network: null,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, active: false },
    { id: 'schools', label: 'Schools', icon: School, active: false },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, active: false },
    { id: 'users', label: 'Users', icon: Users, active: false },
    { id: 'agents', label: 'Sales Agents', icon: UserCheck, active: true },
    { id: 'teachers', label: "Teacher's Portal", icon: GraduationCap, active: false },
    { id: 'parents', label: "Parents' Portal", icon: Users, active: false },
    { id: 'quiz', label: 'Quiz Arena', icon: HelpCircle, active: false },
    { id: 'settings', label: 'Settings', icon: Settings, active: false },
  ];

  // Mock data with comprehensive agent information
  const salesAgents: SalesAgent[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@kitabu.ai',
      phone: '+254 712 345 678',
      region: 'Nairobi',
      totalSales: 2450000,
      monthlyTarget: 2000000,
      schoolsOnboarded: 15,
      studentsAcquired: 4500,
      conversionRate: 85,
      status: 'online',
      lastActive: '2 minutes ago',
      joinDate: '2023-01-15',
      avatar: '👩‍💼',
      performance: {
        thisMonth: 2450000,
        lastMonth: 2100000,
        growth: 16.7,
      },
      recentActivity: [
        {
          id: '1',
          action: 'Onboarded new school',
          timestamp: '2 hours ago',
          details: 'Successfully onboarded Nairobi Academy with 300 students',
        },
        {
          id: '2',
          action: 'Meeting scheduled',
          timestamp: '4 hours ago',
          details: 'Scheduled demo with Westlands Primary School',
        },
        {
          id: '3',
          action: 'Follow-up call',
          timestamp: '1 day ago',
          details: 'Follow-up call with Karen Secondary School',
        },
      ],
      schools: [
        { name: 'Nairobi Academy', students: 300, revenue: 450000 },
        { name: 'Westlands Primary', students: 250, revenue: 375000 },
        { name: 'Karen Secondary', students: 400, revenue: 600000 },
      ],
    },
    {
      id: '2',
      name: 'John Kiprotich',
      email: 'john.kiprotich@kitabu.ai',
      phone: '+254 723 456 789',
      region: 'Mombasa',
      totalSales: 1980000,
      monthlyTarget: 1800000,
      schoolsOnboarded: 12,
      studentsAcquired: 3600,
      conversionRate: 78,
      status: 'busy',
      lastActive: '15 minutes ago',
      joinDate: '2023-02-20',
      avatar: '👨‍💼',
      performance: {
        thisMonth: 1980000,
        lastMonth: 1750000,
        growth: 13.1,
      },
      recentActivity: [
        {
          id: '1',
          action: 'Demo completed',
          timestamp: '1 hour ago',
          details: 'Completed product demo for Mombasa Girls High School',
        },
        {
          id: '2',
          action: 'Proposal sent',
          timestamp: '3 hours ago',
          details: 'Sent pricing proposal to Coast Academy',
        },
      ],
      schools: [
        { name: 'Mombasa Girls High', students: 280, revenue: 420000 },
        { name: 'Coast Academy', students: 320, revenue: 480000 },
      ],
    },
    {
      id: '3',
      name: 'Grace Wanjiku',
      email: 'grace.wanjiku@kitabu.ai',
      phone: '+254 734 567 890',
      region: 'Kisumu',
      totalSales: 1650000,
      monthlyTarget: 1500000,
      schoolsOnboarded: 10,
      studentsAcquired: 2800,
      conversionRate: 72,
      status: 'offline',
      lastActive: '2 hours ago',
      joinDate: '2023-03-10',
      avatar: '👩‍💼',
      performance: {
        thisMonth: 1650000,
        lastMonth: 1400000,
        growth: 17.9,
      },
      recentActivity: [
        {
          id: '1',
          action: 'Contract signed',
          timestamp: '3 hours ago',
          details: 'Kisumu Boys High School signed annual contract',
        },
      ],
      schools: [
        { name: 'Kisumu Boys High', students: 350, revenue: 525000 },
        { name: 'Lakeside Primary', students: 200, revenue: 300000 },
      ],
    },
    {
      id: '4',
      name: 'David Mwangi',
      email: 'david.mwangi@kitabu.ai',
      phone: '+254 745 678 901',
      region: 'Nakuru',
      totalSales: 1420000,
      monthlyTarget: 1600000,
      schoolsOnboarded: 8,
      studentsAcquired: 2400,
      conversionRate: 65,
      status: 'online',
      lastActive: '5 minutes ago',
      joinDate: '2023-04-05',
      avatar: '👨‍💼',
      performance: {
        thisMonth: 1420000,
        lastMonth: 1380000,
        growth: 2.9,
      },
      recentActivity: [
        {
          id: '1',
          action: 'Lead qualification',
          timestamp: '30 minutes ago',
          details: 'Qualified new lead from Nakuru Technical Institute',
        },
      ],
      schools: [
        { name: 'Nakuru Technical', students: 180, revenue: 270000 },
        { name: 'Rift Valley Academy', students: 220, revenue: 330000 },
      ],
    },
  ];

  const timeFrames = ['This Week', 'This Month', 'This Quarter', 'This Year'];
  const regions = ['All Regions', 'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'];

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const initializeData = async () => {
    try {
      setLoading(prev => ({ ...prev, agents: true }));
      setErrors(prev => ({ ...prev, agents: null }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoading(prev => ({ ...prev, agents: false }));
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        agents: 'Failed to load sales agents. Please try again.' 
      }));
      setLoading(prev => ({ ...prev, agents: false }));
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setErrors(prev => ({ ...prev, network: null }));
      
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRefreshing(false);
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        network: 'Network error. Please check your connection.' 
      }));
      setRefreshing(false);
    }
  };

  const handleAgentSelect = async (agent: SalesAgent) => {
    try {
      setLoading(prev => ({ ...prev, details: true }));
      setErrors(prev => ({ ...prev, details: null }));
      setSelectedAgent(agent);
      setShowAgentModal(true);
      
      // Simulate loading agent details
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setLoading(prev => ({ ...prev, details: false }));
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        details: 'Failed to load agent details. Please try again.' 
      }));
      setLoading(prev => ({ ...prev, details: false }));
    }
  };

  const handleSidebarNavigation = (itemId: string) => {
    if (itemId === 'dashboard') {
      router.push('/admin');
    } else if (itemId === 'schools') {
      router.push('/admin/schools');
    } else if (itemId === 'subjects') {
      router.push('/admin/subjects');
    } else if (itemId === 'users') {
      router.push('/admin/users');
    } else if (itemId === 'agents') {
      router.push('/admin/agents');
    } else if (itemId === 'teachers') {
      router.push('/admin/teachers');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#10B981';
      case 'offline': return '#EF4444';
      case 'busy': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return CheckCircle;
      case 'offline': return XCircle;
      case 'busy': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const filteredAgents = salesAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'All Regions' || agent.region === selectedRegion;
    return matchesSearch && matchesRegion;
  }).sort((a, b) => {
    const multiplier = sortOrder === 'desc' ? -1 : 1;
    switch (sortBy) {
      case 'name':
        return multiplier * a.name.localeCompare(b.name);
      case 'sales':
        return multiplier * (a.totalSales - b.totalSales);
      case 'performance':
        return multiplier * (a.performance.growth - b.performance.growth);
      default:
        return 0;
    }
  });

  const totalSales = salesAgents.reduce((sum, agent) => sum + agent.totalSales, 0);
  const totalTarget = salesAgents.reduce((sum, agent) => sum + agent.monthlyTarget, 0);
  const averageConversion = salesAgents.reduce((sum, agent) => sum + agent.conversionRate, 0) / salesAgents.length;
  const onlineAgents = salesAgents.filter(agent => agent.status === 'online').length;

  const renderSidebar = () => (
    <View style={[styles.sidebar, sidebarCollapsed && styles.sidebarCollapsed]}>
      <View style={styles.sidebarHeader}>
        <Text style={[styles.sidebarTitle, sidebarCollapsed && styles.hidden]}>Admin Panel</Text>
        <TouchableOpacity
          style={styles.collapseButton}
          onPress={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <Menu size={20} color="#94A3B8" /> : <X size={20} color="#94A3B8" />}
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.sidebarContent} showsVerticalScrollIndicator={false}>
        {sidebarItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.sidebarItem, item.active && styles.sidebarItemActive]}
            onPress={() => handleSidebarNavigation(item.id)}
          >
            <item.icon 
              size={20} 
              color={item.active ? '#3B82F6' : '#94A3B8'} 
            />
            {!sidebarCollapsed && (
              <Text style={[
                styles.sidebarItemText,
                item.active && styles.sidebarItemTextActive
              ]}>
                {item.label}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderMetricsCards = () => (
    <View style={styles.metricsSection}>
      <View style={[styles.metricCard, { borderLeftColor: '#4299E1' }]}>
        <View style={styles.metricHeader}>
          <View style={[styles.metricIcon, { backgroundColor: '#4299E115' }]}>
            <DollarSign size={24} color="#4299E1" />
          </View>
          <Text style={[styles.metricChange, { color: '#10B981' }]}>
            +{((totalSales / totalTarget) * 100 - 100).toFixed(1)}%
          </Text>
        </View>
        <Text style={styles.metricValue}>KES {(totalSales / 1000000).toFixed(1)}M</Text>
        <Text style={styles.metricTitle}>Total Sales</Text>
      </View>

      <View style={[styles.metricCard, { borderLeftColor: '#10B981' }]}>
        <View style={styles.metricHeader}>
          <View style={[styles.metricIcon, { backgroundColor: '#10B98115' }]}>
            <Target size={24} color="#10B981" />
          </View>
          <Text style={[styles.metricChange, { color: '#10B981' }]}>
            {((totalSales / totalTarget) * 100).toFixed(0)}%
          </Text>
        </View>
        <Text style={styles.metricValue}>{averageConversion.toFixed(0)}%</Text>
        <Text style={styles.metricTitle}>Avg Conversion</Text>
      </View>

      <View style={[styles.metricCard, { borderLeftColor: '#F59E0B' }]}>
        <View style={styles.metricHeader}>
          <View style={[styles.metricIcon, { backgroundColor: '#F59E0B15' }]}>
            <Users size={24} color="#F59E0B" />
          </View>
          <Text style={[styles.metricChange, { color: '#10B981' }]}>
            {onlineAgents}/{salesAgents.length}
          </Text>
        </View>
        <Text style={styles.metricValue}>{salesAgents.length}</Text>
        <Text style={styles.metricTitle}>Active Agents</Text>
      </View>

      <View style={[styles.metricCard, { borderLeftColor: '#8B5CF6' }]}>
        <View style={styles.metricHeader}>
          <View style={[styles.metricIcon, { backgroundColor: '#8B5CF615' }]}>
            <School size={24} color="#8B5CF6" />
          </View>
          <Text style={[styles.metricChange, { color: '#10B981' }]}>
            +12%
          </Text>
        </View>
        <Text style={styles.metricValue}>{salesAgents.reduce((sum, agent) => sum + agent.schoolsOnboarded, 0)}</Text>
        <Text style={styles.metricTitle}>Schools Onboarded</Text>
      </View>
    </View>
  );

  const renderAgentModal = () => (
    <Modal
      visible={showAgentModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowAgentModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{selectedAgent?.name}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAgentModal(false)}
            >
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {loading.details ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4299E1" />
              <Text style={styles.loadingText}>Loading agent details...</Text>
            </View>
          ) : errors.details ? (
            <View style={styles.errorContainer}>
              <AlertCircle size={48} color="#EF4444" />
              <Text style={styles.errorTitle}>Failed to Load Details</Text>
              <Text style={styles.errorText}>{errors.details}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={() => selectedAgent && handleAgentSelect(selectedAgent)}
              >
                <RefreshCw size={16} color="white" />
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {/* Agent Info */}
              <View style={styles.agentInfoSection}>
                <View style={styles.agentHeader}>
                  <Text style={styles.agentAvatar}>{selectedAgent?.avatar}</Text>
                  <View style={styles.agentDetails}>
                    <Text style={styles.agentName}>{selectedAgent?.name}</Text>
                    <View style={styles.agentStatus}>
                      {selectedAgent && (() => {
                        const StatusIcon = getStatusIcon(selectedAgent.status);
                        return <StatusIcon size={16} color={getStatusColor(selectedAgent.status)} />;
                      })()}
                      <Text style={[styles.statusText, { color: getStatusColor(selectedAgent?.status || '') }]}>
                        {selectedAgent?.status}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.contactInfo}>
                  <View style={styles.contactItem}>
                    <Mail size={16} color="#6B7280" />
                    <Text style={styles.contactText}>{selectedAgent?.email}</Text>
                  </View>
                  <View style={styles.contactItem}>
                    <Phone size={16} color="#6B7280" />
                    <Text style={styles.contactText}>{selectedAgent?.phone}</Text>
                  </View>
                  <View style={styles.contactItem}>
                    <MapPin size={16} color="#6B7280" />
                    <Text style={styles.contactText}>{selectedAgent?.region}</Text>
                  </View>
                </View>
              </View>

              {/* Performance Metrics */}
              <View style={styles.performanceSection}>
                <Text style={styles.sectionTitle}>Performance Metrics</Text>
                <View style={styles.performanceGrid}>
                  <View style={styles.performanceCard}>
                    <DollarSign size={20} color="#10B981" />
                    <Text style={styles.performanceValue}>
                      KES {((selectedAgent?.totalSales || 0) / 1000000).toFixed(1)}M
                    </Text>
                    <Text style={styles.performanceLabel}>Total Sales</Text>
                  </View>
                  <View style={styles.performanceCard}>
                    <Target size={20} color="#4299E1" />
                    <Text style={styles.performanceValue}>
                      {(((selectedAgent?.totalSales || 0) / (selectedAgent?.monthlyTarget || 1)) * 100).toFixed(0)}%
                    </Text>
                    <Text style={styles.performanceLabel}>Target Achievement</Text>
                  </View>
                  <View style={styles.performanceCard}>
                    <TrendingUp size={20} color="#8B5CF6" />
                    <Text style={styles.performanceValue}>
                      +{selectedAgent?.performance.growth.toFixed(1)}%
                    </Text>
                    <Text style={styles.performanceLabel}>Growth Rate</Text>
                  </View>
                  <View style={styles.performanceCard}>
                    <School size={20} color="#F59E0B" />
                    <Text style={styles.performanceValue}>{selectedAgent?.schoolsOnboarded}</Text>
                    <Text style={styles.performanceLabel}>Schools</Text>
                  </View>
                </View>
              </View>

              {/* Recent Activity */}
              <View style={styles.activitySection}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                {selectedAgent?.recentActivity.map((activity) => (
                  <View key={activity.id} style={styles.activityItem}>
                    <View style={styles.activityDot} />
                    <View style={styles.activityContent}>
                      <Text style={styles.activityAction}>{activity.action}</Text>
                      <Text style={styles.activityDetails}>{activity.details}</Text>
                      <Text style={styles.activityTime}>{activity.timestamp}</Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Schools Managed */}
              <View style={styles.schoolsSection}>
                <Text style={styles.sectionTitle}>Schools Managed</Text>
                {selectedAgent?.schools.map((school, index) => (
                  <View key={index} style={styles.schoolItem}>
                    <View style={styles.schoolInfo}>
                      <Text style={styles.schoolName}>{school.name}</Text>
                      <Text style={styles.schoolStats}>
                        {school.students} students • KES {(school.revenue / 1000).toFixed(0)}K revenue
                      </Text>
                    </View>
                    <ChevronDown size={16} color="#A0AEC0" />
                  </View>
                ))}
              </View>
            </ScrollView>
          )}

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={() => setShowAgentModal(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Check if we're on desktop
  const isDesktop = width >= 768;

  return (
    <View style={styles.container}>
      <DevModeIndicator />
      
      {renderSidebar()}
      
      <View style={[styles.mainContent, sidebarCollapsed && styles.mainContentExpanded]}>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.headerLeft}>
            <Text style={styles.pageTitle}>Sales Agents</Text>
          </View>
          
          <View style={styles.headerRight}>
            <View style={styles.headerControls}>
              <View style={styles.dropdownContainer}>
                <TouchableOpacity 
                  style={styles.dropdown}
                  onPress={() => setShowTimeFrameDropdown(!showTimeFrameDropdown)}
                >
                  <Text style={styles.dropdownLabel}>{selectedTimeFrame}</Text>
                  <ChevronDown size={16} color="#6B7280" />
                </TouchableOpacity>
                {showTimeFrameDropdown && (
                  <View style={styles.dropdownMenu}>
                    {timeFrames.map((timeFrame) => (
                      <TouchableOpacity
                        key={timeFrame}
                        style={styles.dropdownOption}
                        onPress={() => {
                          setSelectedTimeFrame(timeFrame);
                          setShowTimeFrameDropdown(false);
                        }}
                      >
                        <Text style={[
                          styles.dropdownOptionText,
                          selectedTimeFrame === timeFrame && styles.selectedOptionText
                        ]}>
                          {timeFrame}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              <View style={styles.dropdownContainer}>
                <TouchableOpacity 
                  style={styles.dropdown}
                  onPress={() => setShowRegionDropdown(!showRegionDropdown)}
                >
                  <Text style={styles.dropdownLabel}>{selectedRegion}</Text>
                  <ChevronDown size={16} color="#6B7280" />
                </TouchableOpacity>
                {showRegionDropdown && (
                  <View style={styles.dropdownMenu}>
                    {regions.map((region) => (
                      <TouchableOpacity
                        key={region}
                        style={styles.dropdownOption}
                        onPress={() => {
                          setSelectedRegion(region);
                          setShowRegionDropdown(false);
                        }}
                      >
                        <Text style={[
                          styles.dropdownOptionText,
                          selectedRegion === region && styles.selectedOptionText
                        ]}>
                          {region}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw size={20} color={refreshing ? "#A0AEC0" : "#6B7280"} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => setShowFilters(!showFilters)}
              >
                <Filter size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Error Banner */}
        {errors.network && (
          <View style={styles.errorBanner}>
            <AlertCircle size={16} color="#EF4444" />
            <Text style={styles.errorBannerText}>{errors.network}</Text>
            <TouchableOpacity onPress={() => setErrors(prev => ({ ...prev, network: null }))}>
              <X size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        )}

        {/* Metrics Cards */}
        <Animated.View
          style={[
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {renderMetricsCards()}
        </Animated.View>

        {/* Search and Filters */}
        <Animated.View
          style={[
            styles.searchSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.searchContainer}>
            <Search size={16} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search agents..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </Animated.View>

        {/* Content */}
        <Animated.View
          style={[
            styles.contentSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {loading.agents ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4299E1" />
              <Text style={styles.loadingText}>Loading sales agents...</Text>
            </View>
          ) : errors.agents ? (
            <View style={styles.errorContainer}>
              <AlertCircle size={48} color="#EF4444" />
              <Text style={styles.errorTitle}>Failed to Load Agents</Text>
              <Text style={styles.errorText}>{errors.agents}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={initializeData}>
                <RefreshCw size={16} color="white" />
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView 
              style={styles.agentsList}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={['#4299E1']}
                />
              }
            >
              {filteredAgents.length === 0 ? (
                <View style={styles.emptyState}>
                  <Users size={48} color="#A0AEC0" />
                  <Text style={styles.emptyTitle}>No agents found</Text>
                  <Text style={styles.emptyDescription}>
                    Try adjusting your search or filters
                  </Text>
                </View>
              ) : (
                filteredAgents.map((agent) => (
                  <TouchableOpacity
                    key={agent.id}
                    style={styles.agentCard}
                    onPress={() => handleAgentSelect(agent)}
                  >
                    <View style={styles.agentCardHeader}>
                      <View style={styles.agentAvatar}>
                        <Text style={styles.avatarText}>{agent.avatar}</Text>
                        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(agent.status) }]} />
                      </View>
                      <View style={styles.agentInfo}>
                        <Text style={styles.agentName}>{agent.name}</Text>
                        <Text style={styles.agentRegion}>{agent.region}</Text>
                      </View>
                      <View style={styles.agentMetrics}>
                        <Text style={styles.salesAmount}>
                          KES {(agent.totalSales / 1000000).toFixed(1)}M
                        </Text>
                        <Text style={[
                          styles.growthRate,
                          { color: agent.performance.growth >= 0 ? '#10B981' : '#EF4444' }
                        ]}>
                          {agent.performance.growth >= 0 ? '+' : ''}{agent.performance.growth.toFixed(1)}%
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.agentStats}>
                      <View style={styles.statItem}>
                        <School size={14} color="#6B7280" />
                        <Text style={styles.statText}>{agent.schoolsOnboarded} schools</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Users size={14} color="#6B7280" />
                        <Text style={styles.statText}>{agent.studentsAcquired} students</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Target size={14} color="#6B7280" />
                        <Text style={styles.statText}>{agent.conversionRate}% conversion</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Clock size={14} color="#6B7280" />
                        <Text style={styles.statText}>{agent.lastActive}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          )}
        </Animated.View>

        {renderAgentModal()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: width >= 768 ? 'row' : 'column',
    backgroundColor: '#F8FAFC',
  },
  sidebar: {
    width: width >= 768 ? 250 : '100%',
    backgroundColor: '#1E293B',
    borderRightWidth: 1,
    borderRightColor: '#334155',
    paddingVertical: 20,
    ...(width >= 768 ? {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 10,
    } : {
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
    }),
  },
  sidebarCollapsed: {
    width: width >= 768 ? 70 : '100%',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width >= 768 ? 20 : 0,
    marginBottom: width >= 768 ? 30 : 0,
  },
  sidebarTitle: {
    fontSize: width >= 768 ? 18 : 16,
    fontFamily: 'Poppins-Bold',
    color: '#F1F5F9',
  },
  hidden: {
    display: 'none',
  },
  collapseButton: {
    padding: 5,
  },
  sidebarContent: {
    flex: 1,
    ...(width < 768 && {
      flexDirection: 'row',
      overflow: 'hidden',
    }),
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width >= 768 ? 20 : 8,
    paddingVertical: width >= 768 ? 12 : 8,
    marginHorizontal: width >= 768 ? 10 : 4,
    borderRadius: 8,
  },
  sidebarItemActive: {
    backgroundColor: '#1E40AF',
  },
  sidebarItemText: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-Medium',
    color: '#94A3B8',
    marginLeft: width >= 768 ? 12 : 8,
  },
  sidebarItemTextActive: {
    color: '#F1F5F9',
  },
  mainContent: {
    flex: 1,
    padding: width >= 768 ? 24 : 16,
    ...(width >= 768 && {
      marginLeft: 250,
    }),
  },
  mainContentExpanded: {
    ...(width >= 768 && {
      marginLeft: 70,
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width >= 768 ? 24 : 16,
    paddingBottom: width >= 768 ? 16 : 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerLeft: {
    flex: 1,
  },
  pageTitle: {
    fontSize: width >= 768 ? 28 : 24,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width >= 768 ? 20 : 12,
  },
  headerControls: {
    flexDirection: 'row',
    gap: width >= 768 ? 12 : 8,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: width >= 768 ? 12 : 10,
    paddingVertical: width >= 768 ? 8 : 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: width >= 768 ? 8 : 6,
  },
  dropdownLabel: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 4,
    maxHeight: 200,
  },
  dropdownOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
  },
  selectedOptionText: {
    color: '#4299E1',
    fontFamily: 'Inter-SemiBold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: width >= 768 ? 8 : 4,
  },
  headerButton: {
    width: width >= 768 ? 40 : 32,
    height: width >= 768 ? 40 : 32,
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  errorBannerText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#DC2626',
  },
  metricsSection: {
    flexDirection: width >= 768 ? 'row' : 'column',
    gap: width >= 768 ? 20 : 12,
    marginBottom: width >= 768 ? 24 : 16,
  },
  metricCard: {
    flex: width >= 768 ? 1 : 0,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: width >= 768 ? 20 : 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: width >= 768 ? 0 : 12,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width >= 768 ? 12 : 8,
  },
  metricIcon: {
    width: width >= 768 ? 48 : 40,
    height: width >= 768 ? 48 : 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricChange: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-SemiBold',
  },
  metricValue: {
    fontSize: width >= 768 ? 32 : 24,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
    marginBottom: width >= 768 ? 4 : 2,
  },
  metricTitle: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  searchSection: {
    marginBottom: width >= 768 ? 24 : 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: width >= 768 ? 16 : 12,
    paddingVertical: width >= 768 ? 12 : 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: width >= 768 ? 16 : 14,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
    marginLeft: width >= 768 ? 12 : 8,
  },
  contentSection: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  errorTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4299E1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  retryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  agentsList: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
  },
  agentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: width >= 768 ? 20 : 16,
    marginBottom: width >= 768 ? 16 : 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  agentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  agentAvatar: {
    width: width >= 768 ? 56 : 48,
    height: width >= 768 ? 56 : 48,
    borderRadius: 28,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  avatarText: {
    fontSize: width >= 768 ? 24 : 20,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: width >= 768 ? 18 : 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  agentRegion: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  agentMetrics: {
    alignItems: 'flex-end',
  },
  salesAmount: {
    fontSize: width >= 768 ? 20 : 18,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
    marginBottom: 2,
  },
  growthRate: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-SemiBold',
  },
  agentStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: width >= 768 ? 16 : 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: width >= 768 ? 12 : 10,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    maxWidth: width >= 768 ? 600 : '95%',
    maxHeight: width >= 768 ? '90%' : '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 25,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width >= 768 ? 24 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: width >= 768 ? 24 : 20,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
  },
  closeButton: {
    width: width >= 768 ? 40 : 32,
    height: width >= 768 ? 40 : 32,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    flex: 1,
    padding: width >= 768 ? 24 : 16,
  },
  agentInfoSection: {
    marginBottom: 24,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  agentDetails: {
    flex: 1,
    marginLeft: 16,
  },
  agentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'capitalize',
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
  },
  performanceSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 16,
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  performanceCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  performanceValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4,
  },
  performanceLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    textAlign: 'center',
  },
  activitySection: {
    marginBottom: 24,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4299E1',
    marginTop: 6,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 2,
  },
  activityDetails: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
  },
  schoolsSection: {
    marginBottom: 24,
  },
  schoolItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  schoolInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 2,
  },
  schoolStats: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  modalActions: {
    padding: width >= 768 ? 24 : 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  closeModalButton: {
    backgroundColor: '#1E293B',
    paddingVertical: width >= 768 ? 12 : 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeModalButtonText: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
});