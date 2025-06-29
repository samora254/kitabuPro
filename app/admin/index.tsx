import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Users, BookOpen, ChartBar as BarChart3, Settings, Shield, Database, MessageSquare, TrendingUp, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Clock, Eye, UserCheck, FileText, Activity, ChevronDown, Bell, Search, Filter, Download, RefreshCw, MoveHorizontal as MoreHorizontal, Calendar, DollarSign, Target, Zap, Award, GraduationCap, School, Bot, CircleHelp as HelpCircle, ChartBar as BarChart, ChartPie as PieChart, ChartLine as LineChart, Menu, X } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

const { width, height } = Dimensions.get('window');

interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: any;
  color: string;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface TableRow {
  id: string;
  name: string;
  grade: string;
  subject: string;
  score: number;
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
}

export default function DesktopAdminDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'week' | 'month' | 'year'>('month');
  const [selectedGrade, setSelectedGrade] = useState<'all' | 'grade6' | 'grade7' | 'grade8'>('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'lastActive'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, active: true },
    { id: 'schools', label: 'Schools', icon: School },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'agents', label: 'Sales Agents', icon: UserCheck },
    { id: 'teachers', label: "Teacher's Portal", icon: GraduationCap },
    { id: 'parents', label: "Parents' Portal", icon: Users },
    { id: 'chatbot', label: 'Chatbot Agent', icon: Bot },
    { id: 'tutor', label: 'Tutor Agent', icon: MessageSquare },
    { id: 'quickfacts', label: 'QuickFacts Agent', icon: Zap },
    { id: 'homework', label: 'Homework Agent', icon: FileText },
    { id: 'assessment', label: 'Assessment Agent', icon: Award },
    { id: 'career', label: 'Career Coach Agent', icon: Target },
    { id: 'quiz', label: 'Quiz Arena', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const metricCards: MetricCard[] = [
    {
      id: 'total-users',
      title: 'Total Users',
      value: '5000',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      color: '#4299E1',
    },
    {
      id: 'active-users',
      title: 'Active Users',
      value: '3200',
      change: '+8.2%',
      changeType: 'positive',
      icon: UserCheck,
      color: '#10B981',
    },
    {
      id: 'new-users',
      title: 'New Users',
      value: '450',
      change: '+15.3%',
      changeType: 'positive',
      icon: TrendingUp,
      color: '#F59E0B',
    },
    {
      id: 'revenue',
      title: 'Revenue',
      value: '$12,000',
      change: '+22.1%',
      changeType: 'positive',
      icon: DollarSign,
      color: '#EF4444',
    },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 500 },
    { month: 'Feb', users: 680 },
    { month: 'Mar', users: 950 },
    { month: 'Apr', users: 1200 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 1800 },
    { month: 'Feb', revenue: 2400 },
    { month: 'Mar', revenue: 2900 },
    { month: 'Apr', revenue: 3600 },
  ];

  const subjectUsageData: ChartData[] = [
    { label: 'Math', value: 25, color: '#8B5CF6' },
    { label: 'Science', value: 20, color: '#10B981' },
    { label: 'English', value: 15, color: '#F59E0B' },
    { label: 'History', value: 10, color: '#EF4444' },
    { label: 'Geography', value: 8, color: '#06B6D4' },
    { label: 'Business', value: 12, color: '#10B981' },
    { label: 'Computer Science', value: 10, color: '#F59E0B' },
  ];

  const recentStudents: TableRow[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      grade: 'Grade 8',
      subject: 'Mathematics',
      score: 95,
      status: 'active',
      lastActive: '2 hours ago',
    },
    {
      id: '2',
      name: 'Michael Chen',
      grade: 'Grade 7',
      subject: 'Science',
      score: 88,
      status: 'active',
      lastActive: '1 hour ago',
    },
    {
      id: '3',
      name: 'Emma Williams',
      grade: 'Grade 8',
      subject: 'English',
      score: 92,
      status: 'inactive',
      lastActive: '1 day ago',
    },
    {
      id: '4',
      name: 'David Brown',
      grade: 'Grade 6',
      subject: 'History',
      score: 78,
      status: 'pending',
      lastActive: '3 hours ago',
    },
    {
      id: '5',
      name: 'Lisa Garcia',
      grade: 'Grade 8',
      subject: 'Mathematics',
      score: 96,
      status: 'active',
      lastActive: '30 minutes ago',
    },
    {
      id: '6',
      name: 'James Wilson',
      grade: 'Grade 7',
      subject: 'Science',
      score: 84,
      status: 'active',
      lastActive: '45 minutes ago',
    },
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'inactive': return '#EF4444';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive': return '#10B981';
      case 'negative': return '#EF4444';
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

  const renderMetricCard = (metric: MetricCard) => (
    <View key={metric.id} style={[styles.metricCard, { borderLeftColor: metric.color }]}>
      <View style={styles.metricHeader}>
        <View style={[styles.metricIcon, { backgroundColor: `${metric.color}15` }]}>
          <metric.icon size={24} color={metric.color} />
        </View>
        <Text style={[styles.metricChange, { color: getChangeColor(metric.changeType) }]}>
          {metric.change}
        </Text>
      </View>
      <Text style={styles.metricValue}>{metric.value}</Text>
      <Text style={styles.metricTitle}>{metric.title}</Text>
    </View>
  );

  const renderLineChart = (data: any[], title: string, color: string) => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
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

  const renderBarChart = (data: any[], title: string) => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <View style={styles.barChart}>
        <View style={styles.chartYAxis}>
          {[3600, 2700, 1800, 900, 0].map((value) => (
            <Text key={value} style={styles.axisLabel}>{value}</Text>
          ))}
        </View>
        <View style={styles.barsContainer}>
          {data.map((bar, index) => (
            <View key={index} style={styles.barColumn}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: `${(bar.revenue / 3600) * 100}%`,
                    backgroundColor: '#10B981'
                  }
                ]} 
              />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.chartXAxis}>
        {data.map((point) => (
          <Text key={point.month} style={styles.axisLabel}>{point.month}</Text>
        ))}
      </View>
    </View>
  );

  const renderPieChart = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Subject Usage</Text>
      <View style={styles.pieChartContainer}>
        <View style={styles.pieChart}>
          <View style={styles.pieSlice} />
        </View>
        <View style={styles.pieChartLegend}>
          {subjectUsageData.map((item) => (
            <View key={item.label} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendLabel}>{item.label}</Text>
              <Text style={styles.legendValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderDataTable = () => (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableTitle}>Recent Student Activity</Text>
        <View style={styles.tableControls}>
          <View style={styles.searchContainer}>
            <Search size={16} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search students..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.tableButton}>
            <Filter size={16} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tableButton}>
            <Download size={16} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tableButton}>
            <RefreshCw size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeaderRow}>
          <TouchableOpacity style={[styles.tableHeaderCell, styles.nameColumn]}>
            <Text style={styles.tableHeaderText}>Name</Text>
            <ChevronDown size={12} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tableHeaderCell, styles.gradeColumn]}>
            <Text style={styles.tableHeaderText}>Grade</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tableHeaderCell, styles.subjectColumn]}>
            <Text style={styles.tableHeaderText}>Subject</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tableHeaderCell, styles.scoreColumn]}>
            <Text style={styles.tableHeaderText}>Score</Text>
            <ChevronDown size={12} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tableHeaderCell, styles.statusColumn]}>
            <Text style={styles.tableHeaderText}>Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tableHeaderCell, styles.lastActiveColumn]}>
            <Text style={styles.tableHeaderText}>Last Active</Text>
            <ChevronDown size={12} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.tableBody} showsVerticalScrollIndicator={false}>
          {recentStudents.map((student) => (
            <TouchableOpacity key={student.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.nameColumn]}>{student.name}</Text>
              <Text style={[styles.tableCell, styles.gradeColumn]}>{student.grade}</Text>
              <Text style={[styles.tableCell, styles.subjectColumn]}>{student.subject}</Text>
              <Text style={[styles.tableCell, styles.scoreColumn]}>{student.score}%</Text>
              <View style={[styles.tableCell, styles.statusColumn]}>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(student.status)}15` }]}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(student.status) }]} />
                  <Text style={[styles.statusText, { color: getStatusColor(student.status) }]}>
                    {student.status}
                  </Text>
                </View>
              </View>
              <Text style={[styles.tableCell, styles.lastActiveColumn]}>{student.lastActive}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  // Check if we're on desktop
  const isDesktop = width >= 768; // Lowered threshold for development

  return (
    <View style={styles.container}>
      <DevModeIndicator />

      {renderSidebar()}

      <View style={[styles.mainContent, sidebarCollapsed && styles.mainContentExpanded]}>
        {/* Top Header */}
        <Animated.View
          style={[
            styles.topHeader,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.headerLeft}>
            <Text style={styles.pageTitle}>Dashboard</Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.headerControls}>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownLabel}>Sort by Time Frame</Text>
                <ChevronDown size={16} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownLabel}>Sort by Grade</Text>
                <ChevronDown size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Bell size={20} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Settings size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
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
          {metricCards.map(renderMetricCard)}
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
            {renderLineChart(userGrowthData, 'User Growth', '#3B82F6')}
            {renderBarChart(revenueData, 'Revenue')}
          </View>

          <View style={styles.chartsRow}>
            {renderPieChart()}
            {renderDataTable()}
          </View>
        </Animated.View>
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
    padding: width >= 768 ? 16 : 12,
    ...(width >= 768 && {
      marginLeft: 250,
    }),
  },
  mainContentExpanded: {
    ...(width >= 768 && {
      marginLeft: 70,
    }),
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width >= 768 ? 16 : 12,
    paddingBottom: width >= 768 ? 12 : 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerLeft: {
    flex: 1,
  },
  pageTitle: {
    fontSize: width >= 768 ? 24 : 20,
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
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: width >= 768 ? 12 : 8,
    paddingVertical: width >= 768 ? 8 : 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: width >= 768 ? 8 : 4,
  },
  dropdownLabel: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
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
  metricsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: width >= 768 ? 12 : 8,
    marginBottom: width >= 768 ? 16 : 12,
  },
  metricCard: {
    flex: width >= 768 ? 1 : 0,
    minWidth: width >= 768 ? 0 : '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: width >= 768 ? 16 : 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width >= 768 ? 8 : 6,
  },
  metricIcon: {
    width: width >= 768 ? 40 : 32,
    height: width >= 768 ? 40 : 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricChange: {
    fontSize: width >= 768 ? 12 : 10,
    fontFamily: 'Inter-SemiBold',
  },
  metricValue: {
    fontSize: width >= 768 ? 24 : 18,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
    marginBottom: width >= 768 ? 2 : 1,
  },
  metricTitle: {
    fontSize: width >= 768 ? 12 : 10,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  chartsSection: {
    flex: 1,
    gap: width >= 768 ? 12 : 8,
    paddingBottom: width >= 768 ? 16 : 12,
  },
  chartsRow: {
    flexDirection: width >= 768 ? 'row' : 'column',
    gap: width >= 768 ? 12 : 8,
    height: width >= 768 ? 240 : 'auto',
    marginBottom: width >= 768 ? 12 : 8,
  },
  chartContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: width >= 768 ? 16 : 12,
    minHeight: width >= 768 ? 0 : 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartTitle: {
    fontSize: width >= 768 ? 16 : 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: width >= 768 ? 12 : 8,
  },
  lineChart: {
    flex: 1,
    flexDirection: 'row',
  },
  barChart: {
    flex: 1,
    flexDirection: 'row',
  },
  chartYAxis: {
    width: width >= 768 ? 35 : 25,
    justifyContent: 'space-between',
    paddingRight: width >= 768 ? 8 : 4,
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
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: width >= 768 ? 8 : 4,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: width >= 768 ? 24 : 16,
    borderRadius: 4,
  },
  chartXAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width >= 768 ? 40 : 20,
    paddingTop: width >= 768 ? 8 : 4,
  },
  axisLabel: {
    fontSize: width >= 768 ? 10 : 8,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  pieChartContainer: {
    flex: 1,
    flexDirection: width >= 768 ? 'row' : 'column',
    alignItems: 'center',
  },
  pieChart: {
    width: width >= 768 ? 100 : 80,
    height: width >= 768 ? 100 : 80,
    borderRadius: 60,
    backgroundColor: '#8B5CF6',
    marginRight: width >= 768 ? 20 : 0,
    marginBottom: width >= 768 ? 0 : 12,
  },
  pieSlice: {
    // Simplified pie chart representation
  },
  pieChartLegend: {
    flex: 1,
    gap: width >= 768 ? 6 : 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width >= 768 ? 6 : 4,
  },
  legendColor: {
    width: width >= 768 ? 10 : 8,
    height: width >= 768 ? 10 : 8,
    borderRadius: 6,
  },
  legendLabel: {
    flex: 1,
    fontSize: width >= 768 ? 12 : 10,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  legendValue: {
    fontSize: width >= 768 ? 12 : 10,
    fontFamily: 'Inter-SemiBold',
    color: '#64748B',
  },
  tableContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: width >= 768 ? 16 : 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width >= 768 ? 12 : 8,
  },
  tableTitle: {
    fontSize: width >= 768 ? 16 : 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
  },
  tableControls: {
    flexDirection: 'row',
    gap: width >= 768 ? 6 : 4,
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: width >= 768 ? 10 : 8,
    paddingVertical: width >= 768 ? 6 : 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: width >= 768 ? 6 : 4,
  },
  searchInput: {
    fontSize: width >= 768 ? 12 : 10,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
    width: width >= 768 ? 120 : 80,
  },
  tableButton: {
    width: width >= 768 ? 28 : 24,
    height: width >= 768 ? 28 : 24,
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  table: {
    flex: 1,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingVertical: width >= 768 ? 8 : 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableBody: {
    flex: 1,
    maxHeight: width >= 768 ? 200 : 150,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: width >= 768 ? 8 : 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tableHeaderCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width >= 768 ? 2 : 1,
  },
  tableHeaderText: {
    fontSize: width >= 768 ? 10 : 8,
    fontFamily: 'Inter-SemiBold',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  tableCell: {
    fontSize: width >= 768 ? 12 : 10,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
    alignItems: 'center',
  },
  nameColumn: {
    flex: width >= 768 ? 2 : 1.5,
  },
  gradeColumn: {
    flex: 1,
  },
  subjectColumn: {
    flex: width >= 768 ? 1.5 : 1,
  },
  scoreColumn: {
    flex: 1,
    textAlign: 'center',
  },
  statusColumn: {
    flex: 1,
    alignItems: 'center',
  },
  lastActiveColumn: {
    flex: width >= 768 ? 1.5 : 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width >= 768 ? 6 : 4,
    paddingVertical: width >= 768 ? 2 : 1,
    borderRadius: 12,
    gap: width >= 768 ? 4 : 2,
  },
  statusDot: {
    width: width >= 768 ? 4 : 3,
    height: width >= 768 ? 4 : 3,
    borderRadius: 3,
  },
  statusText: {
    fontSize: width >= 768 ? 10 : 8,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'capitalize',
  },
});