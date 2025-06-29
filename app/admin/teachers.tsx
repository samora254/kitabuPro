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
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { router } from 'expo-router';
import { Users, BookOpen, ChartBar as BarChart3, Settings, MessageSquare, UserCheck, FileText, GraduationCap, School, Bot, CircleHelp as HelpCircle, Zap, Award, Target, ChevronDown, Menu, X, Search, Filter, Download, RefreshCw, Eye, CreditCard as Edit3, Trash2, Plus, Mail, Phone, MapPin, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Circle as XCircle, Calendar } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
import { AssignmentForm, AssignmentData } from '@/components/AssignmentForm';

const { width } = Dimensions.get('window');

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  school: string;
  subjects: string[];
  grades: string[];
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActive: string;
  avatar: string;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  grade: string;
  dueDate: string;
  status: 'draft' | 'published' | 'completed';
  submissionCount: number;
  totalStudents: number;
}

export default function TeachersPortal() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'teachers' | 'assignments'>('teachers');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, active: false },
    { id: 'schools', label: 'Schools', icon: School, active: false },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, active: false },
    { id: 'users', label: 'Users', icon: Users, active: false },
    { id: 'agents', label: 'Sales Agents', icon: UserCheck, active: false },
    { id: 'teachers', label: "Teacher's Portal", icon: GraduationCap, active: true },
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

  // Mock data for teachers
  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+254 712 345 678',
      school: 'Nairobi Academy',
      subjects: ['Mathematics', 'Science'],
      grades: ['Grade 7', 'Grade 8'],
      status: 'active',
      joinDate: '2023-01-15',
      lastActive: '2 hours ago',
      avatar: '👩‍🏫',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      phone: '+254 723 456 789',
      school: 'Westlands Primary',
      subjects: ['English', 'Social Studies'],
      grades: ['Grade 6', 'Grade 7'],
      status: 'active',
      joinDate: '2023-02-20',
      lastActive: '1 hour ago',
      avatar: '👨‍🏫',
    },
    {
      id: '3',
      name: 'Grace Wanjiku',
      email: 'grace.wanjiku@example.com',
      phone: '+254 734 567 890',
      school: 'Mombasa Girls High',
      subjects: ['Kiswahili', 'Religious Education'],
      grades: ['Grade 8'],
      status: 'inactive',
      joinDate: '2023-03-10',
      lastActive: '1 week ago',
      avatar: '👩‍🏫',
    },
    {
      id: '4',
      name: 'David Mwangi',
      email: 'david.mwangi@example.com',
      phone: '+254 745 678 901',
      school: 'Nakuru Boys High',
      subjects: ['Mathematics', 'Computer Science'],
      grades: ['Grade 7', 'Grade 8'],
      status: 'active',
      joinDate: '2023-04-05',
      lastActive: '3 hours ago',
      avatar: '👨‍🏫',
    },
  ];

  // Mock data for assignments
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Algebra Fundamentals',
      subject: 'Mathematics',
      grade: 'Grade 8',
      dueDate: '2025-03-15',
      status: 'published',
      submissionCount: 28,
      totalStudents: 35,
    },
    {
      id: '2',
      title: 'Essay on Climate Change',
      subject: 'English',
      grade: 'Grade 7',
      dueDate: '2025-03-18',
      status: 'published',
      submissionCount: 15,
      totalStudents: 32,
    },
    {
      id: '3',
      title: 'Chemical Reactions Lab Report',
      subject: 'Science',
      grade: 'Grade 8',
      dueDate: '2025-03-10',
      status: 'completed',
      submissionCount: 34,
      totalStudents: 35,
    },
    {
      id: '4',
      title: 'Kenyan History Quiz',
      subject: 'Social Studies',
      grade: 'Grade 6',
      dueDate: '2025-03-20',
      status: 'draft',
      submissionCount: 0,
      totalStudents: 30,
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

  const handleTeacherSelect = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowTeacherModal(true);
  };

  const handleCreateAssignment = (assignmentData: AssignmentData) => {
    console.log('Creating assignment:', assignmentData);
    setShowAssignmentModal(false);
    // In a real app, you would save the assignment to the database
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'inactive': return '#EF4444';
      case 'pending': return '#F59E0B';
      case 'published': return '#4299E1';
      case 'draft': return '#A0AEC0';
      case 'completed': return '#10B981';
      default: return '#6B7280';
    }
  };

  const filteredTeachers = teachers.filter(teacher => {
    return teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
           teacher.school.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredAssignments = assignments.filter(assignment => {
    return assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           assignment.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
           assignment.grade.toLowerCase().includes(searchQuery.toLowerCase());
  });

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

  const renderTeacherModal = () => (
    <Modal
      visible={showTeacherModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowTeacherModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{selectedTeacher?.name}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowTeacherModal(false)}
            >
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {/* Teacher Info */}
            <View style={styles.teacherInfoSection}>
              <View style={styles.teacherHeader}>
                <Text style={styles.teacherAvatar}>{selectedTeacher?.avatar}</Text>
                <View style={styles.teacherDetails}>
                  <Text style={styles.teacherName}>{selectedTeacher?.name}</Text>
                  <View style={styles.teacherStatus}>
                    <View style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(selectedTeacher?.status || '') }
                    ]} />
                    <Text style={[
                      styles.statusText,
                      { color: getStatusColor(selectedTeacher?.status || '') }
                    ]}>
                      {selectedTeacher?.status}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.contactInfo}>
                <View style={styles.contactItem}>
                  <Mail size={16} color="#6B7280" />
                  <Text style={styles.contactText}>{selectedTeacher?.email}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Phone size={16} color="#6B7280" />
                  <Text style={styles.contactText}>{selectedTeacher?.phone}</Text>
                </View>
                <View style={styles.contactItem}>
                  <School size={16} color="#6B7280" />
                  <Text style={styles.contactText}>{selectedTeacher?.school}</Text>
                </View>
              </View>
            </View>

            {/* Subjects and Grades */}
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Teaching Information</Text>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Subjects:</Text>
                <View style={styles.tagContainer}>
                  {selectedTeacher?.subjects.map((subject, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{subject}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Grades:</Text>
                <View style={styles.tagContainer}>
                  {selectedTeacher?.grades.map((grade, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{grade}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Join Date:</Text>
                <Text style={styles.infoValue}>{selectedTeacher?.joinDate}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Last Active:</Text>
                <Text style={styles.infoValue}>{selectedTeacher?.lastActive}</Text>
              </View>
            </View>

            {/* Recent Assignments */}
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Recent Assignments</Text>
              
              {assignments.slice(0, 3).map((assignment) => (
                <View key={assignment.id} style={styles.assignmentItem}>
                  <View style={styles.assignmentInfo}>
                    <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                    <Text style={styles.assignmentDetails}>
                      {assignment.subject} • {assignment.grade}
                    </Text>
                    <View style={styles.assignmentMeta}>
                      <View style={styles.metaItem}>
                        <Calendar size={12} color="#718096" />
                        <Text style={styles.metaText}>Due: {assignment.dueDate}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <FileText size={12} color="#718096" />
                        <Text style={styles.metaText}>
                          {assignment.submissionCount}/{assignment.totalStudents} submissions
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[
                    styles.assignmentStatus,
                    { backgroundColor: `${getStatusColor(assignment.status)}15` }
                  ]}>
                    <Text style={[
                      styles.assignmentStatusText,
                      { color: getStatusColor(assignment.status) }
                    ]}>
                      {assignment.status}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={() => setShowTeacherModal(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderAssignmentModal = () => (
    <Modal
      visible={showAssignmentModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowAssignmentModal(false)}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.assignmentModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Assignment</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowAssignmentModal(false)}
              >
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <AssignmentForm 
              onSubmit={handleCreateAssignment}
              onCancel={() => setShowAssignmentModal(false)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );

  const renderGradeDropdown = () => (
    <View style={styles.dropdown}>
      <Text style={styles.dropdownText}>All Grades</Text>
      <ChevronDown size={20} color="#A0AEC0" />
    </View>
  );

  const renderSubjectDropdown = () => (
    <View style={styles.dropdown}>
      <Text style={styles.dropdownText}>All Subjects</Text>
      <ChevronDown size={20} color="#A0AEC0" />
    </View>
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
            <Text style={styles.pageTitle}>Teacher's Portal</Text>
          </View>
          
          <View style={styles.headerRight}>
            <View style={styles.headerControls}>
              {renderGradeDropdown()}
              {renderSubjectDropdown()}
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <RefreshCw size={20} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Filter size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Tabs */}
        <Animated.View
          style={[
            styles.tabsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.tab, activeTab === 'teachers' && styles.activeTab]}
            onPress={() => setActiveTab('teachers')}
          >
            <GraduationCap size={20} color={activeTab === 'teachers' ? '#4299E1' : '#718096'} />
            <Text style={[
              styles.tabText,
              activeTab === 'teachers' && styles.activeTabText
            ]}>
              Teachers
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'assignments' && styles.activeTab]}
            onPress={() => setActiveTab('assignments')}
          >
            <FileText size={20} color={activeTab === 'assignments' ? '#4299E1' : '#718096'} />
            <Text style={[
              styles.tabText,
              activeTab === 'assignments' && styles.activeTabText
            ]}>
              Assignments
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Search */}
        <Animated.View
          style={[
            styles.searchContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#A0AEC0" />
            <TextInput
              style={styles.searchInput}
              placeholder={`Search ${activeTab}...`}
              placeholderTextColor="#A0AEC0"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          {activeTab === 'assignments' && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAssignmentModal(true)}
            >
              <Plus size={20} color="white" />
              <Text style={styles.addButtonText}>New Assignment</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Content */}
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {activeTab === 'teachers' ? (
            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
              {filteredTeachers.map((teacher) => (
                <TouchableOpacity
                  key={teacher.id}
                  style={styles.teacherCard}
                  onPress={() => handleTeacherSelect(teacher)}
                >
                  <View style={styles.teacherCardHeader}>
                    <Text style={styles.teacherCardAvatar}>{teacher.avatar}</Text>
                    <View style={styles.teacherCardInfo}>
                      <Text style={styles.teacherCardName}>{teacher.name}</Text>
                      <Text style={styles.teacherCardSchool}>{teacher.school}</Text>
                      <View style={styles.teacherCardSubjects}>
                        {teacher.subjects.map((subject, index) => (
                          <View key={index} style={styles.subjectTag}>
                            <Text style={styles.subjectTagText}>{subject}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: `${getStatusColor(teacher.status)}15` }
                    ]}>
                      <Text style={[
                        styles.statusBadgeText,
                        { color: getStatusColor(teacher.status) }
                      ]}>
                        {teacher.status}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.teacherCardFooter}>
                    <View style={styles.teacherCardMeta}>
                      <View style={styles.metaItem}>
                        <Mail size={14} color="#718096" />
                        <Text style={styles.metaText}>{teacher.email}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Clock size={14} color="#718096" />
                        <Text style={styles.metaText}>{teacher.lastActive}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.viewButton}>
                      <Eye size={16} color="#4299E1" />
                      <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
              {filteredAssignments.map((assignment) => (
                <View key={assignment.id} style={styles.assignmentCard}>
                  <View style={styles.assignmentCardHeader}>
                    <View style={styles.assignmentCardInfo}>
                      <Text style={styles.assignmentCardTitle}>{assignment.title}</Text>
                      <Text style={styles.assignmentCardDetails}>
                        {assignment.subject} • {assignment.grade}
                      </Text>
                    </View>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: `${getStatusColor(assignment.status)}15` }
                    ]}>
                      <Text style={[
                        styles.statusBadgeText,
                        { color: getStatusColor(assignment.status) }
                      ]}>
                        {assignment.status}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.assignmentCardBody}>
                    <View style={styles.assignmentCardMeta}>
                      <View style={styles.metaItem}>
                        <Calendar size={14} color="#718096" />
                        <Text style={styles.metaText}>Due: {assignment.dueDate}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Users size={14} color="#718096" />
                        <Text style={styles.metaText}>
                          {assignment.submissionCount}/{assignment.totalStudents} submissions
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.assignmentCardProgress}>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill, 
                            { 
                              width: `${(assignment.submissionCount / assignment.totalStudents) * 100}%`,
                              backgroundColor: getStatusColor(assignment.status)
                            }
                          ]} 
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {Math.round((assignment.submissionCount / assignment.totalStudents) * 100)}% completed
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.assignmentCardFooter}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Eye size={16} color="#4299E1" />
                      <Text style={styles.actionButtonText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Edit3 size={16} color="#8B5CF6" />
                      <Text style={styles.actionButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
                      <Trash2 size={16} color="#EF4444" />
                      <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </Animated.View>
      </View>

      {renderTeacherModal()}
      {renderAssignmentModal()}
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
  dropdownText: {
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#EBF8FF',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  activeTabText: {
    color: '#4299E1',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    marginLeft: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4299E1',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
  },
  contentScroll: {
    flex: 1,
  },
  teacherCard: {
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
    shadowRadius: 8,
    elevation: 3,
  },
  teacherCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  teacherCardAvatar: {
    fontSize: 32,
    marginRight: 16,
  },
  teacherCardInfo: {
    flex: 1,
  },
  teacherCardName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  teacherCardSchool: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginBottom: 8,
  },
  teacherCardSubjects: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subjectTag: {
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  subjectTagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'capitalize',
  },
  teacherCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F7FAFC',
    paddingTop: 12,
  },
  teacherCardMeta: {
    flex: 1,
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  viewButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
  },
  assignmentCard: {
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
    shadowRadius: 8,
    elevation: 3,
  },
  assignmentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  assignmentCardInfo: {
    flex: 1,
  },
  assignmentCardTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  assignmentCardDetails: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  assignmentCardBody: {
    marginBottom: 16,
  },
  assignmentCardMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  assignmentCardProgress: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  assignmentCardFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F7FAFC',
    paddingTop: 12,
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  deleteButton: {
    backgroundColor: '#FEF2F2',
  },
  deleteButtonText: {
    color: '#EF4444',
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
  assignmentModalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    maxWidth: width >= 768 ? 700 : '95%',
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
  teacherInfoSection: {
    marginBottom: 24,
  },
  teacherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  teacherAvatar: {
    fontSize: 48,
    marginRight: 16,
  },
  teacherDetails: {
    flex: 1,
  },
  teacherName: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  teacherStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 16,
  },
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
  },
  assignmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  assignmentDetails: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginBottom: 8,
  },
  assignmentMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  assignmentStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 12,
  },
  assignmentStatusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'capitalize',
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