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
import { ArrowLeft, Search, Filter, Download, RefreshCw, School, Users, TrendingUp, MapPin, Phone, Mail, Calendar, ChevronDown, X, Eye, CreditCard as Edit, Trash2, Plus, ChartBar as BarChart3, Target, Award, Clock, Menu, UserCheck, FileText, Bot, CircleHelp as HelpCircle, Settings, GraduationCap, Zap } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

const { width, height } = Dimensions.get('window');

interface School {
  id: string;
  name: string;
  salesAgent: string;
  county: string;
  totalStudents: number;
  engagementRate: number;
  status: 'active' | 'inactive' | 'pending';
  address: string;
  phone: string;
  email: string;
  principal: string;
  dateJoined: string;
  gradeDistribution: {
    grade: string;
    students: number;
  }[];
  subjects: string[];
  lastActivity: string;
  monthlyGrowth: number;
  averageScore: number;
}

export default function SchoolsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [showSchoolModal, setShowSchoolModal] = useState(false);
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'students' | 'engagement'>('students');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, active: false },
    { id: 'schools', label: 'Schools', icon: School, active: true },
    { id: 'subjects', label: 'Subjects', icon: FileText, active: false },
    { id: 'users', label: 'Users', icon: Users, active: false },
    { id: 'agents', label: 'Sales Agents', icon: UserCheck, active: false },
    { id: 'teachers', label: "Teacher's Portal", icon: GraduationCap, active: false },
    { id: 'parents', label: "Parents' Portal", icon: Users, active: false },
    { id: 'quiz', label: 'Quiz Arena', icon: HelpCircle, active: false },
    { id: 'settings', label: 'Settings', icon: Settings, active: false },
  ];

  const schools: School[] = [
    {
      id: '1',
      name: 'School A',
      salesAgent: 'Agent 1',
      county: 'County X',
      totalStudents: 1200,
      engagementRate: 90,
      status: 'active',
      address: '123 Education Street, Nairobi',
      phone: '+254 700 123 456',
      email: 'info@schoola.ac.ke',
      principal: 'Dr. Sarah Wanjiku',
      dateJoined: '2023-01-15',
      gradeDistribution: [
        { grade: 'Grade 4', students: 100 },
        { grade: 'Grade 5', students: 120 },
        { grade: 'Grade 6', students: 140 },
        { grade: 'Grade 7', students: 160 },
        { grade: 'Grade 8', students: 180 },
        { grade: 'Grade 9', students: 200 },
        { grade: 'Grade 10', students: 120 },
        { grade: 'Grade 11', students: 80 },
        { grade: 'Grade 12', students: 100 },
      ],
      subjects: ['Mathematics', 'English', 'Science', 'Social Studies', 'Kiswahili'],
      lastActivity: '2 hours ago',
      monthlyGrowth: 12.5,
      averageScore: 85.4,
    },
    {
      id: '2',
      name: 'School B',
      salesAgent: 'Agent 2',
      county: 'County Y',
      totalStudents: 950,
      engagementRate: 85,
      status: 'active',
      address: '456 Learning Avenue, Mombasa',
      phone: '+254 700 234 567',
      email: 'admin@schoolb.ac.ke',
      principal: 'Mr. John Kiprotich',
      dateJoined: '2023-02-20',
      gradeDistribution: [
        { grade: 'Grade 4', students: 80 },
        { grade: 'Grade 5', students: 95 },
        { grade: 'Grade 6', students: 110 },
        { grade: 'Grade 7', students: 125 },
        { grade: 'Grade 8', students: 140 },
        { grade: 'Grade 9', students: 155 },
        { grade: 'Grade 10', students: 100 },
        { grade: 'Grade 11', students: 70 },
        { grade: 'Grade 12', students: 75 },
      ],
      subjects: ['Mathematics', 'English', 'Science', 'Geography', 'History'],
      lastActivity: '1 day ago',
      monthlyGrowth: 8.2,
      averageScore: 82.1,
    },
    {
      id: '3',
      name: 'School C',
      salesAgent: 'Agent 3',
      county: 'County Z',
      totalStudents: 800,
      engagementRate: 75,
      status: 'inactive',
      address: '789 Knowledge Road, Kisumu',
      phone: '+254 700 345 678',
      email: 'contact@schoolc.ac.ke',
      principal: 'Mrs. Grace Achieng',
      dateJoined: '2023-03-10',
      gradeDistribution: [
        { grade: 'Grade 4', students: 120 },
        { grade: 'Grade 5', students: 130 },
        { grade: 'Grade 6', students: 140 },
        { grade: 'Grade 7', students: 150 },
        { grade: 'Grade 8', students: 160 },
        { grade: 'Grade 9', students: 100 },
      ],
      subjects: ['Mathematics', 'English', 'Science', 'Social Studies'],
      lastActivity: '1 week ago',
      monthlyGrowth: -2.1,
      averageScore: 78.9,
    },
  ];

  const gradeOptions = [
    'All Grades',
    'Grade 4: 100 students',
    'Grade 5: 120 students', 
    'Grade 6: 140 students',
    'Grade 7: 160 students',
    'Grade 8: 180 students',
    'Grade 9: 200 students',
    'Grade 10: 120 students',
    'Grade 11: 80 students',
    'Grade 12: 100 students',
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'inactive': return '#EF4444';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getTopSchools = () => {
    const sorted = [...schools].sort((a, b) => {
      switch (sortBy) {
        case 'students': return sortOrder === 'desc' ? b.totalStudents - a.totalStudents : a.totalStudents - b.totalStudents;
        case 'engagement': return sortOrder === 'desc' ? b.engagementRate - a.engagementRate : a.engagementRate - b.engagementRate;
        default: return sortOrder === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
      }
    });
    return {
      mostActive: sorted.find(s => s.status === 'active' && s.engagementRate === Math.max(...sorted.filter(s => s.status === 'active').map(s => s.engagementRate))),
      highestEnrollment: sorted[0],
      leastActive: sorted.find(s => s.status === 'inactive') || sorted[sorted.length - 1],
    };
  };

  const topSchools = getTopSchools();

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.county.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade === 'All Grades' || 
                        school.gradeDistribution.some(g => selectedGrade.includes(g.grade));
    return matchesSearch && matchesGrade;
  });

  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school);
    setShowSchoolModal(true);
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

  const renderSchoolCard = (school: School, type: 'most-active' | 'highest-enrollment' | 'least-active') => {
    const colors = {
      'most-active': '#4F46E5',
      'highest-enrollment': '#10B981', 
      'least-active': '#EF4444',
    };

    const titles = {
      'most-active': 'Most Active School',
      'highest-enrollment': 'Highest Enrollment',
      'least-active': 'Least Active School',
    };

    const metrics = {
      'most-active': `Engagement Rate: ${school.engagementRate}%`,
      'highest-enrollment': `Total Students: ${school.totalStudents}`,
      'least-active': `Students: ${school.totalStudents}`,
    };

    return (
      <TouchableOpacity
        style={[styles.overviewCard, { backgroundColor: colors[type] }]}
        onPress={() => handleSchoolSelect(school)}
      >
        <Text style={styles.cardTitle}>{titles[type]}</Text>
        <Text style={styles.cardSchoolName}>{school.name}</Text>
        <Text style={styles.cardMetric}>{metrics[type]}</Text>
      </TouchableOpacity>
    );
  };

  const renderSchoolModal = () => (
    <Modal
      visible={showSchoolModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowSchoolModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{selectedSchool?.name}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowSchoolModal(false)}
            >
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {/* School Info */}
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Sales Agent:</Text>
                <Text style={styles.infoValue}>{selectedSchool?.salesAgent}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>County:</Text>
                <Text style={styles.infoValue}>{selectedSchool?.county}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Total Students:</Text>
                <Text style={styles.infoValue}>{selectedSchool?.totalStudents}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Engagement Rate:</Text>
                <Text style={[styles.infoValue, { color: '#10B981' }]}>
                  {selectedSchool?.engagementRate}%
                </Text>
              </View>
            </View>

            {/* Contact Info */}
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <View style={styles.contactItem}>
                <MapPin size={16} color="#6B7280" />
                <Text style={styles.contactText}>{selectedSchool?.address}</Text>
              </View>
              <View style={styles.contactItem}>
                <Phone size={16} color="#6B7280" />
                <Text style={styles.contactText}>{selectedSchool?.phone}</Text>
              </View>
              <View style={styles.contactItem}>
                <Mail size={16} color="#6B7280" />
                <Text style={styles.contactText}>{selectedSchool?.email}</Text>
              </View>
            </View>

            {/* Grade Distribution */}
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Sort by Grade:</Text>
              <TouchableOpacity
                style={styles.gradeDropdownButton}
                onPress={() => setShowGradeDropdown(!showGradeDropdown)}
              >
                <Text style={styles.gradeDropdownText}>{selectedGrade}</Text>
                <ChevronDown size={16} color="#6B7280" />
              </TouchableOpacity>
              
              {showGradeDropdown && (
                <View style={styles.gradeDropdownMenu}>
                  {gradeOptions.map((grade) => (
                    <TouchableOpacity
                      key={grade}
                      style={[
                        styles.gradeOption,
                        selectedGrade === grade && styles.selectedGradeOption
                      ]}
                      onPress={() => {
                        setSelectedGrade(grade);
                        setShowGradeDropdown(false);
                      }}
                    >
                      <Text style={[
                        styles.gradeOptionText,
                        selectedGrade === grade && styles.selectedGradeOptionText
                      ]}>
                        {grade}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Performance Metrics */}
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Performance</Text>
              <View style={styles.metricsGrid}>
                <View style={styles.metricCard}>
                  <TrendingUp size={20} color="#10B981" />
                  <Text style={styles.metricValue}>+{selectedSchool?.monthlyGrowth}%</Text>
                  <Text style={styles.metricLabel}>Monthly Growth</Text>
                </View>
                <View style={styles.metricCard}>
                  <Target size={20} color="#4F46E5" />
                  <Text style={styles.metricValue}>{selectedSchool?.averageScore}%</Text>
                  <Text style={styles.metricLabel}>Average Score</Text>
                </View>
                <View style={styles.metricCard}>
                  <Clock size={20} color="#F59E0B" />
                  <Text style={styles.metricValue}>{selectedSchool?.lastActivity}</Text>
                  <Text style={styles.metricLabel}>Last Activity</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={() => setShowSchoolModal(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Check if we're on desktop
  const isDesktop = width >= 768; // Lowered threshold for development

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
          <Text style={styles.pageTitle}>Schools</Text>
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
          {topSchools.mostActive && renderSchoolCard(topSchools.mostActive, 'most-active')}
          {topSchools.highestEnrollment && renderSchoolCard(topSchools.highestEnrollment, 'highest-enrollment')}
          {topSchools.leastActive && renderSchoolCard(topSchools.leastActive, 'least-active')}
        </Animated.View>

        {/* School List Section */}
        <Animated.View
          style={[
            styles.listSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>School List</Text>
          </View>

          <View style={styles.searchContainer}>
            <Search size={16} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a school..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView style={styles.schoolsList} showsVerticalScrollIndicator={false}>
            {filteredSchools.map((school) => (
              <View key={school.id} style={styles.schoolRow}>
                <View style={styles.schoolInfo}>
                  <Text style={styles.schoolName}>{school.name}</Text>
                </View>
                <TouchableOpacity
                  style={styles.viewDetailsButton}
                  onPress={() => handleSchoolSelect(school)}
                >
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </Animated.View>

        {renderSchoolModal()}
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
    marginBottom: width >= 768 ? 24 : 16,
    paddingBottom: width >= 768 ? 16 : 12,
  },
  pageTitle: {
    fontSize: width >= 768 ? 28 : 24,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
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
  cardSchoolName: {
    fontSize: width >= 768 ? 24 : 18,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: width >= 768 ? 8 : 6,
  },
  cardMetric: {
    fontSize: width >= 768 ? 16 : 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.9)',
  },
  listSection: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: width >= 768 ? 24 : 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  listHeader: {
    marginBottom: width >= 768 ? 24 : 16,
  },
  listTitle: {
    fontSize: width >= 768 ? 20 : 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: width >= 768 ? 12 : 10,
    paddingVertical: width >= 768 ? 8 : 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: width >= 768 ? 8 : 6,
    marginBottom: width >= 768 ? 24 : 16,
  },
  searchInput: {
    flex: 1,
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
  },
  schoolsList: {
    flex: 1,
  },
  schoolRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: width >= 768 ? 16 : 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  schoolInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: width >= 768 ? 16 : 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
  },
  viewDetailsButton: {
    backgroundColor: '#1E293B',
    paddingHorizontal: width >= 768 ? 16 : 12,
    paddingVertical: width >= 768 ? 8 : 6,
    borderRadius: 8,
  },
  viewDetailsText: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: width >= 768 ? 20 : 16,
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
  sectionTitle: {
    fontSize: width >= 768 ? 18 : 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: width >= 768 ? 16 : 12,
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
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: width >= 768 ? 8 : 6,
    gap: width >= 768 ? 12 : 8,
  },
  contactText: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-Regular',
    color: '#374151',
  },
  gradeDropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: width >= 768 ? 12 : 10,
    paddingVertical: width >= 768 ? 10 : 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  gradeDropdownText: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  gradeDropdownMenu: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: width >= 768 ? 8 : 6,
    maxHeight: width >= 768 ? 200 : 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gradeOption: {
    paddingHorizontal: width >= 768 ? 12 : 10,
    paddingVertical: width >= 768 ? 10 : 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  selectedGradeOption: {
    backgroundColor: '#3B82F6',
  },
  gradeOptionText: {
    fontSize: width >= 768 ? 14 : 12,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  selectedGradeOptionText: {
    color: 'white',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: width >= 768 ? 16 : 8,
  },
  metricCard: {
    flex: width >= 768 ? 1 : 0,
    minWidth: width >= 768 ? 0 : '48%',
    backgroundColor: '#F8FAFC',
    padding: width >= 768 ? 16 : 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metricValue: {
    fontSize: width >= 768 ? 18 : 16,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
    marginTop: width >= 768 ? 8 : 6,
    marginBottom: width >= 768 ? 4 : 2,
  },
  metricLabel: {
    fontSize: width >= 768 ? 12 : 10,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    textAlign: 'center',
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