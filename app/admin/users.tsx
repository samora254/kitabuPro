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
} from 'react-native';
import { router } from 'expo-router';
import { Users, BookOpen, ChartBar as BarChart3, Settings, MessageSquare, UserCheck, FileText, GraduationCap, School, Bot, CircleHelp as HelpCircle, Zap, Award, Target, ChevronDown, Menu, X, Search, Filter, Download, RefreshCw, Eye, Mail, Phone, User } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

const { width } = Dimensions.get('window');

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  school: string;
  grade: string;
  dateJoined: string;
  lastSeen: string;
  totalTimeSpent: string;
  assignmentsAttempted: number;
  status: 'active' | 'inactive' | 'pending';
}

export default function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('This Month');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, active: false },
    { id: 'schools', label: 'Schools', icon: School, active: false },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, active: false },
    { id: 'users', label: 'Users', icon: Users, active: true }, // Ensure this is marked as active
    { id: 'agents', label: 'Sales Agents', icon: UserCheck, active: false },
    { id: 'teachers', label: "Teacher's Portal", icon: GraduationCap, active: false },
    { id: 'parents', label: "Parents' Portal", icon: Users, active: false },
    { id: 'chatbot', label: 'Chatbot Agent', icon: Bot, active: false },
    { id: 'tutor', label: 'Tutor Agent', icon: MessageSquare, active: false },
    { id: 'quickfacts', label: 'QuickFacts Agent', icon: Zap, active: false },
    { id: 'homework', label: 'Homework Agent', icon: FileText, active: false },
    { id: 'assessment', label: 'Assessment Agent', icon: Award, active: false },
    { id: 'career', label: 'Career Coach Agent', icon: Target, active: false },
    { id: 'quiz', label: 'Quiz Arena', icon: HelpCircle, active: false },
    { id: 'settings', label: 'Settings', icon: Settings, active: false },
  ];

  const usersData: UserData[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      role: 'Admin',
      school: 'ABC High School',
      grade: 'Grade 8',
      dateJoined: '2024-01-15',
      lastSeen: '2025-03-03',
      totalTimeSpent: '15 hours',
      assignmentsAttempted: 25,
      status: 'active',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '234-567-8901',
      role: 'Student',
      school: 'XYZ Middle School',
      grade: 'Grade 7',
      dateJoined: '2024-02-10',
      lastSeen: '2025-03-02',
      totalTimeSpent: '22 hours',
      assignmentsAttempted: 32,
      status: 'active',
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@example.com',
      phone: '345-678-9012',
      role: 'Teacher',
      school: 'ABC High School',
      grade: 'Grade 9',
      dateJoined: '2024-01-05',
      lastSeen: '2025-02-28',
      totalTimeSpent: '30 hours',
      assignmentsAttempted: 0,
      status: 'active',
    },
    {
      id: '4',
      name: 'Emma Williams',
      email: 'emma@example.com',
      phone: '456-789-0123',
      role: 'Student',
      school: 'XYZ Middle School',
      grade: 'Grade 6',
      dateJoined: '2024-02-20',
      lastSeen: '2025-02-25',
      totalTimeSpent: '8 hours',
      assignmentsAttempted: 12,
      status: 'inactive',
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david@example.com',
      phone: '567-890-1234',
      role: 'Parent',
      school: 'ABC High School',
      grade: 'N/A',
      dateJoined: '2024-01-25',
      lastSeen: '2025-03-01',
      totalTimeSpent: '5 hours',
      assignmentsAttempted: 0,
      status: 'active',
    },
  ];

  // User acquisition data
  const userAcquisitionData = [
    { month: 'Jan', users: 500 },
    { month: 'Feb', users: 680 },
    { month: 'Mar', users: 950 },
    { month: 'Apr', users: 1200 },
  ];

  // Active users data
  const activeUsersData = [
    { month: 'Jan', users: 500 },
    { month: 'Feb', users: 680 },
    { month: 'Mar', users: 950 },
    { month: 'Apr', users: 1200 },
  ];

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

  const handleViewUserDetails = (user: UserData) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'inactive': return '#EF4444';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

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

  const renderBarChart = (data: any[], title: string, color: string) => (
    <View style={styles.barChartContainer}>
      <View style={styles.barChart}>
        <View style={styles.chartYAxis}>
          {[1200, 900, 600, 300, 0].map((value) => (
            <Text key={value} style={styles.axisLabel}>{value}</Text>
          ))}
        </View>
        <View style={styles.barsContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.barColumn}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: `${(item.users / 1200) * 100}%`,
                    backgroundColor: color
                  }
                ]} 
              />
              <Text style={styles.barLabel}>{item.month}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderLineChart = (data: any[], title: string, color: string) => (
    <View style={styles.lineChartContainer}>
      <View style={styles.lineChart}>
        <View style={styles.chartYAxis}>
          {[1200, 900, 600, 300, 0].map((value) => (
            <Text key={value} style={styles.axisLabel}>{value}</Text>
          ))}
        </View>
        <View style={styles.chartArea}>
          <View style={styles.chartGrid}>
            {[0, 1, 2, 3, 4].map((line) => (
              <View key={line} style={styles.gridLine} />
            ))}
          </View>
          <View style={styles.chartLine}>
            {data.map((point, index) => (
              <View key={index} style={styles.chartPoint}>
                <View style={[styles.dataPoint, { backgroundColor: color }]} />
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.chartXAxis}>
        {data.map((point) => (
          <Text key={point.month} style={styles.axisLabel}>{point.month}</Text>
        ))}
      </View>
    </View>
  );

  const renderUserModal = () => (
    <Modal
      visible={showUserModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowUserModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{selectedUser?.name}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowUserModal(false)}
            >
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {/* User Info */}
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>School:</Text>
                <Text style={styles.infoValue}>{selectedUser?.school}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Grade:</Text>
                <Text style={styles.infoValue}>{selectedUser?.grade}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Date Joined:</Text>
                <Text style={styles.infoValue}>{selectedUser?.dateJoined}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Last Seen:</Text>
                <Text style={styles.infoValue}>{selectedUser?.lastSeen}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Total Time Spent:</Text>
                <Text style={styles.infoValue}>{selectedUser?.totalTimeSpent}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Assignments Attempted:</Text>
                <Text style={styles.infoValue}>{selectedUser?.assignmentsAttempted}</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={() => setShowUserModal(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

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
            <Text style={styles.pageTitle}>Users</Text>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownLabel}>Select Grade</Text>
              <ChevronDown size={16} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownLabel}>Select Time Frame</Text>
              <ChevronDown size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Metrics Cards */}
        <Animated.View
          style={[
            styles.metricsSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={[styles.metricCard, { backgroundColor: '#4299E1' }]}>
            <Text style={styles.metricTitle}>Total Users</Text>
            <Text style={styles.metricValue}>5000</Text>
          </View>
          
          <View style={[styles.metricCard, { backgroundColor: '#10B981' }]}>
            <Text style={styles.metricTitle}>Active Users</Text>
            <Text style={styles.metricValue}>3200</Text>
          </View>
          
          <View style={[styles.metricCard, { backgroundColor: '#F59E0B' }]}>
            <Text style={styles.metricTitle}>New Users</Text>
            <Text style={styles.metricValue}>450</Text>
          </View>
        </Animated.View>

        {/* Charts Section */}
        <Animated.View
          style={[
            styles.chartsSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.chartsRow}>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>User Acquisition</Text>
              {renderBarChart(userAcquisitionData, 'User Acquisition', '#8B5CF6')}
            </View>
            
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Active Users</Text>
              {renderLineChart(activeUsersData, 'Active Users', '#10B981')}
            </View>
          </View>
        </Animated.View>

        {/* Users Table */}
        <Animated.View
          style={[
            styles.tableSection,
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
              placeholder="Search Users..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.tableHeaderCell}>
                <Text style={styles.tableHeaderText}>Name</Text>
              </View>
              <View style={styles.tableHeaderCell}>
                <Text style={styles.tableHeaderText}>Email</Text>
              </View>
              <View style={styles.tableHeaderCell}>
                <Text style={styles.tableHeaderText}>Phone</Text>
              </View>
              <View style={styles.tableHeaderCell}>
                <Text style={styles.tableHeaderText}>Role</Text>
              </View>
              <View style={styles.tableHeaderCell}>
                <Text style={styles.tableHeaderText}>Actions</Text>
              </View>
            </View>
            
            <ScrollView style={styles.tableBody} showsVerticalScrollIndicator={false}>
              {usersData.map((user) => (
                <View key={user.id} style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={styles.cellText}>{user.name}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.cellText}>{user.email}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.cellText}>{user.phone}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.cellText}>{user.role}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <TouchableOpacity 
                      style={styles.viewButton}
                      onPress={() => handleViewUserDetails(user)}
                    >
                      <Text style={styles.viewButtonText}>View More</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </Animated.View>

        {renderUserModal()}
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
    gap: width >= 768 ? 12 : 8,
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
  metricsSection: {
    flexDirection: width >= 768 ? 'row' : 'column',
    gap: width >= 768 ? 20 : 12,
    marginBottom: width >= 768 ? 24 : 16,
  },
  metricCard: {
    flex: 1,
    borderRadius: 16,
    padding: width >= 768 ? 24 : 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: width >= 768 ? 0 : 12,
  },
  metricTitle: {
    fontSize: width >= 768 ? 18 : 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: width >= 768 ? 8 : 6,
  },
  metricValue: {
    fontSize: width >= 768 ? 32 : 28,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  chartsSection: {
    marginBottom: width >= 768 ? 24 : 16,
  },
  chartsRow: {
    flexDirection: width >= 768 ? 'row' : 'column',
    gap: width >= 768 ? 20 : 12,
    height: width >= 768 ? 300 : 'auto',
  },
  chartContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: width >= 768 ? 20 : 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minHeight: width >= 768 ? 0 : 250,
    marginBottom: width >= 768 ? 0 : 12,
  },
  chartTitle: {
    fontSize: width >= 768 ? 18 : 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: width >= 768 ? 16 : 12,
  },
  barChartContainer: {
    flex: 1,
  },
  barChart: {
    flex: 1,
    flexDirection: 'row',
  },
  lineChartContainer: {
    flex: 1,
  },
  lineChart: {
    flex: 1,
    flexDirection: 'row',
  },
  chartYAxis: {
    width: width >= 768 ? 40 : 30,
    justifyContent: 'space-between',
    paddingRight: width >= 768 ? 10 : 8,
  },
  chartArea: {
    flex: 1,
    position: 'relative',
  },
  chartGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  gridLine: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  chartLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: width >= 768 ? 8 : 4,
  },
  chartPoint: {
    alignItems: 'center',
  },
  dataPoint: {
    width: width >= 768 ? 6 : 4,
    height: width >= 768 ? 6 : 4,
    borderRadius: 4,
  },
  chartXAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width >= 768 ? 40 : 20,
    paddingTop: width >= 768 ? 8 : 4,
  },
  axisLabel: {
    fontSize: width >= 768 ? 12 : 10,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: width >= 768 ? 10 : 8,
    paddingBottom: 20,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: width >= 768 ? 30 : 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: width >= 768 ? 12 : 10,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  tableSection: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: width >= 768 ? 16 : 12,
    paddingVertical: width >= 768 ? 12 : 10,
    borderRadius: 8,
    marginBottom: width >= 768 ? 16 : 12,
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
  tableContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    paddingVertical: width >= 768 ? 16 : 12,
    paddingHorizontal: width >= 768 ? 16 : 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableHeaderCell: {
    flex: 1,
  },
  tableHeaderText: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-SemiBold',
    color: '#64748B',
  },
  tableBody: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: width >= 768 ? 16 : 12,
    paddingHorizontal: width >= 768 ? 16 : 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tableCell: {
    flex: 1,
    justifyContent: 'center',
  },
  cellText: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
  },
  viewButton: {
    backgroundColor: '#1E293B',
    paddingHorizontal: width >= 768 ? 16 : 12,
    paddingVertical: width >= 768 ? 8 : 6,
    borderRadius: 8,
    alignItems: 'center',
    maxWidth: width >= 768 ? 120 : 100,
  },
  viewButtonText: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
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
  infoSection: {
    marginBottom: width >= 768 ? 24 : 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: width >= 768 ? 8 : 6,
  },
  infoLabel: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  infoValue: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
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