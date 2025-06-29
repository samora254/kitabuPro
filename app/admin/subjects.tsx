import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Users, BookOpen, ChartBar as BarChart3, Settings, Shield, Database, MessageSquare, UserCheck, FileText, GraduationCap, School, Bot, CircleHelp as HelpCircle, Zap, Award, Target, ChevronDown, Menu, X, Calculator, Globe, Beaker, Heart, Palette, Music, Monitor } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

const { width } = Dimensions.get('window');

interface SubjectData {
  id: string;
  name: string;
  engagement: number;
  hoursSpent: number;
  color: string;
  icon: any;
  improvement: number;
}

export default function SubjectsManagement() {
  const [selectedGrade, setSelectedGrade] = useState('Grade 4');
  const [selectedSubject, setSelectedSubject] = useState('Math');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('This Month');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, active: false },
    { id: 'schools', label: 'Schools', icon: School, active: false },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, active: true },
    { id: 'users', label: 'Users', icon: Users, active: false },
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

  const subjectsData: SubjectData[] = [
    { id: 'math', name: 'Math', engagement: 25, hoursSpent: 28, color: '#8B5CF6', icon: Calculator, improvement: 15 },
    { id: 'science', name: 'Science', engagement: 20, hoursSpent: 25, color: '#10B981', icon: Beaker, improvement: 8 },
    { id: 'english', name: 'English', engagement: 15, hoursSpent: 21, color: '#F59E0B', icon: BookOpen, improvement: 12 },
    { id: 'history', name: 'History', engagement: 12, hoursSpent: 18, color: '#EF4444', icon: FileText, improvement: 5 },
    { id: 'geography', name: 'Geography', engagement: 8, hoursSpent: 15, color: '#06B6D4', icon: Globe, improvement: -2 },
    { id: 'computer', name: 'Computer Science', engagement: 10, hoursSpent: 12, color: '#8B5CF6', icon: Monitor, improvement: 10 },
    { id: 'art', name: 'Art', engagement: 10, hoursSpent: 10, color: '#EC4899', icon: Palette, improvement: 3 },
  ];

  const grades = ['Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const subjects = ['Math', 'Science', 'English', 'History', 'Geography', 'Computer Science', 'Art'];
  const timeFrames = ['This Week', 'This Month', 'This Quarter', 'This Year'];

  // Find most active, least active, and most improved subjects
  const mostActiveSubject = subjectsData.reduce((prev, current) => 
    prev.engagement > current.engagement ? prev : current
  );
  const leastActiveSubject = subjectsData.reduce((prev, current) => 
    prev.engagement < current.engagement ? prev : current
  );
  const mostImprovedSubject = subjectsData.reduce((prev, current) => 
    prev.improvement > current.improvement ? prev : current
  );

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

  const renderPieChart = () => {
    const total = subjectsData.reduce((sum, subject) => sum + subject.engagement, 0);
    let currentAngle = 0;
    
    return (
      <View style={styles.pieChartContainer}>
        <View style={styles.pieChart}>
          {subjectsData.map((subject, index) => {
            const percentage = (subject.engagement / total) * 100;
            const angle = (subject.engagement / total) * 360;
            const startAngle = currentAngle;
            currentAngle += angle;
            
            return (
              <View
                key={subject.id}
                style={[
                  styles.pieSlice,
                  {
                    backgroundColor: subject.color,
                    transform: [
                      { rotate: `${startAngle}deg` }
                    ]
                  }
                ]}
              />
            );
          })}
        </View>
        <View style={styles.pieChartLegend}>
          {subjectsData.map((subject) => (
            <View key={subject.id} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: subject.color }]} />
              <Text style={styles.legendLabel}>{subject.name}</Text>
              <Text style={styles.legendValue}>{subject.engagement}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderBarChart = () => {
    const maxHours = Math.max(...subjectsData.map(s => s.hoursSpent));
    
    return (
      <View style={styles.barChartContainer}>
        <View style={styles.barChart}>
          <View style={styles.chartYAxis}>
            {[28, 21, 14, 7, 0].map((value) => (
              <Text key={value} style={styles.axisLabel}>{value}</Text>
            ))}
          </View>
          <View style={styles.barsContainer}>
            {subjectsData.slice(0, 5).map((subject) => (
              <View key={subject.id} style={styles.barColumn}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: `${(subject.hoursSpent / maxHours) * 100}%`,
                      backgroundColor: subject.color
                    }
                  ]} 
                />
                <Text style={styles.barLabel}>{subject.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

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
            <Text style={styles.pageTitle}>Subjects</Text>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownLabel}>Sort by Time Frame</Text>
              <ChevronDown size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Overview Cards */}
        <Animated.View
          style={[
            styles.overviewSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={[styles.overviewCard, { backgroundColor: '#4F46E5' }]}>
            <Text style={styles.cardTitle}>Most Active Subject</Text>
            <Text style={styles.cardSubjectName}>{mostActiveSubject.name}: {mostActiveSubject.engagement}%</Text>
          </View>
          
          <View style={[styles.overviewCard, { backgroundColor: '#10B981' }]}>
            <Text style={styles.cardTitle}>Least Active Subject</Text>
            <Text style={styles.cardSubjectName}>{leastActiveSubject.name}: {leastActiveSubject.engagement}%</Text>
          </View>
          
          <View style={[styles.overviewCard, { backgroundColor: '#EF4444' }]}>
            <Text style={styles.cardTitle}>Most Improved Subject</Text>
            <Text style={styles.cardSubjectName}>{mostImprovedSubject.name}: {mostImprovedSubject.improvement}%</Text>
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
              <Text style={styles.chartTitle}>Subject Engagement</Text>
              {renderPieChart()}
            </View>
            
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Hours Spent</Text>
              {renderBarChart()}
            </View>
          </View>
        </Animated.View>

        {/* Filter Controls */}
        <Animated.View
          style={[
            styles.filtersSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.filterRow}>
            <View style={styles.filterGroup}>
              <TouchableOpacity style={styles.filterDropdown}>
                <Text style={styles.filterLabel}>{selectedGrade}</Text>
                <ChevronDown size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.filterGroup}>
              <TouchableOpacity style={styles.filterDropdown}>
                <Text style={styles.filterLabel}>{selectedSubject}</Text>
                <ChevronDown size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>
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
  overviewSection: {
    flexDirection: width >= 768 ? 'row' : 'column',
    gap: width >= 768 ? 20 : 12,
    marginBottom: width >= 768 ? 32 : 20,
  },
  overviewCard: {
    flex: 1,
    borderRadius: 16,
    padding: width >= 768 ? 24 : 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  cardTitle: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: width >= 768 ? 8 : 6,
  },
  cardSubjectName: {
    fontSize: width >= 768 ? 18 : 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  chartsSection: {
    marginBottom: width >= 768 ? 32 : 20,
  },
  chartsRow: {
    flexDirection: width >= 768 ? 'row' : 'column',
    gap: width >= 768 ? 20 : 12,
    height: width >= 768 ? 400 : 'auto',
  },
  chartContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: width >= 768 ? 24 : 16,
    minHeight: width >= 768 ? 0 : 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: width >= 768 ? 18 : 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: width >= 768 ? 20 : 16,
  },
  pieChartContainer: {
    flex: 1,
    flexDirection: width >= 768 ? 'row' : 'column',
    alignItems: 'center',
  },
  pieChart: {
    width: width >= 768 ? 150 : 120,
    height: width >= 768 ? 150 : 120,
    borderRadius: 75,
    backgroundColor: '#8B5CF6',
    marginRight: width >= 768 ? 30 : 0,
    marginBottom: width >= 768 ? 0 : 20,
    position: 'relative',
    overflow: 'hidden',
  },
  pieSlice: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    top: '50%',
    left: '50%',
    transformOrigin: '0 0',
  },
  pieChartLegend: {
    flex: 1,
    gap: width >= 768 ? 8 : 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width >= 768 ? 8 : 6,
  },
  legendColor: {
    width: width >= 768 ? 12 : 10,
    height: width >= 768 ? 12 : 10,
    borderRadius: 6,
  },
  legendLabel: {
    flex: 1,
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  legendValue: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-SemiBold',
    color: '#64748B',
  },
  barChartContainer: {
    flex: 1,
  },
  barChart: {
    flex: 1,
    flexDirection: 'row',
  },
  chartYAxis: {
    width: width >= 768 ? 40 : 30,
    justifyContent: 'space-between',
    paddingRight: width >= 768 ? 10 : 8,
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
    fontSize: width >= 768 ? 10 : 8,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    textAlign: 'center',
    transform: [{ rotate: '-45deg' }],
  },
  filtersSection: {
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
  },
  filterRow: {
    flexDirection: 'row',
    gap: width >= 768 ? 20 : 12,
  },
  filterGroup: {
    flex: 1,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: width >= 768 ? 16 : 12,
    paddingVertical: width >= 768 ? 12 : 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterLabel: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
});