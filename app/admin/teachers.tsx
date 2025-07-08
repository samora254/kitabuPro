import React, { useState, useEffect, useRef } from 'react';
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
  ActivityIndicator,
  Image
} from 'react-native';
import { router } from 'expo-router';
import { X, ChevronDown, Save, LogOut, Lock, Bell, Shield, User, Mail, Phone, School, Users, GraduationCap, BookOpen, Wand as Wand2, MessageCircle, FileText, Target, Award, CircleHelp as HelpCircle, Settings, Calculator, Globe, Beaker, Palette, Music, Heart, Zap, Clock, Calendar, MapPin, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Circle as XCircle, ChartBar as BarChart, ChartPie as PieChart, TrendingUp, Filter, Search, Plus, CreditCard as Edit3, Trash2, Eye, ArrowUpDown, Calendar as CalendarIcon, Clock as ClockIcon, MessageSquare } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
import { AssignmentForm, AssignmentData } from '@/components/AssignmentForm';
import { LinearGradient } from 'expo-linear-gradient';

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

interface Student {
  id: string;
  name: string;
  grade: string;
  subjects: string[];
  performance: {
    assessmentScore: number;
    homeworkCompletion: number;
    trend: 'improving' | 'stable' | 'declining' | 'excellent';
  };
  lastActive: string;
}

interface PerformanceData {
  subject: string;
  score: number;
  classAverage: number;
  month: string;
}

interface SubjectPerformance {
  subject: string;
  averageScore: number;
  completionRate: number;
  trend: number; // percentage change
}

export default function TeachersPortal() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'assignments' | 'students'>('dashboard');
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [showAssignmentPreview, setShowAssignmentPreview] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGrade, setFilterGrade] = useState<string>('All Grades');
  const [filterSubject, setFilterSubject] = useState<string>('All Subjects');
  const [filterStatus, setFilterStatus] = useState<string>('All Status');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [assignmentFormData, setAssignmentFormData] = useState<AssignmentData>({
    grade: '',
    subject: '',
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
  });
  const [generatedAssignment, setGeneratedAssignment] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Mock data
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Algebra Fundamentals Quiz',
      subject: 'Mathematics',
      grade: 'Grade 8',
      dueDate: '2025-03-15',
      status: 'published',
      submissionCount: 18,
      totalStudents: 25,
    },
    {
      id: '2',
      title: 'Essay on Climate Change',
      subject: 'English',
      grade: 'Grade 7',
      dueDate: '2025-03-20',
      status: 'draft',
      submissionCount: 0,
      totalStudents: 30,
    },
    {
      id: '3',
      title: 'Chemical Reactions Lab Report',
      subject: 'Science',
      grade: 'Grade 8',
      dueDate: '2025-03-10',
      status: 'completed',
      submissionCount: 22,
      totalStudents: 25,
    },
    {
      id: '4',
      title: 'History of Kenya Research',
      subject: 'Social Studies',
      grade: 'Grade 6',
      dueDate: '2025-03-25',
      status: 'published',
      submissionCount: 12,
      totalStudents: 28,
    },
    {
      id: '5',
      title: 'Geometry Practice Problems',
      subject: 'Mathematics',
      grade: 'Grade 7',
      dueDate: '2025-03-18',
      status: 'draft',
      submissionCount: 0,
      totalStudents: 30,
    },
  ];

  const students: Student[] = [
    {
      id: '1',
      name: 'John Doe',
      grade: 'Grade 6',
      subjects: ['Mathematics', 'English', 'Science'],
      performance: {
        assessmentScore: 85,
        homeworkCompletion: 90,
        trend: 'improving',
      },
      lastActive: '2 days ago',
    },
    {
      id: '2',
      name: 'Jane Smith',
      grade: 'Grade 7',
      subjects: ['Mathematics', 'English', 'Social Studies'],
      performance: {
        assessmentScore: 78,
        homeworkCompletion: 85,
        trend: 'stable',
      },
      lastActive: '1 day ago',
    },
    {
      id: '3',
      name: 'Michael Brown',
      grade: 'Grade 8',
      subjects: ['Mathematics', 'Science', 'English'],
      performance: {
        assessmentScore: 92,
        homeworkCompletion: 95,
        trend: 'excellent',
      },
      lastActive: '3 hours ago',
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      grade: 'Grade 6',
      subjects: ['English', 'Social Studies', 'Art'],
      performance: {
        assessmentScore: 88,
        homeworkCompletion: 92,
        trend: 'improving',
      },
      lastActive: '5 hours ago',
    },
    {
      id: '5',
      name: 'David Wilson',
      grade: 'Grade 7',
      subjects: ['Science', 'Mathematics', 'Physical Education'],
      performance: {
        assessmentScore: 75,
        homeworkCompletion: 80,
        trend: 'declining',
      },
      lastActive: '1 day ago',
    },
  ];

  const performanceData: PerformanceData[] = [
    { subject: 'Mathematics', score: 85, classAverage: 78, month: 'Jan' },
    { subject: 'Mathematics', score: 82, classAverage: 76, month: 'Feb' },
    { subject: 'Mathematics', score: 88, classAverage: 80, month: 'Mar' },
    { subject: 'English', score: 75, classAverage: 72, month: 'Jan' },
    { subject: 'English', score: 78, classAverage: 74, month: 'Feb' },
    { subject: 'English', score: 80, classAverage: 75, month: 'Mar' },
    { subject: 'Science', score: 90, classAverage: 82, month: 'Jan' },
    { subject: 'Science', score: 92, classAverage: 84, month: 'Feb' },
    { subject: 'Science', score: 94, classAverage: 85, month: 'Mar' },
  ];

  const subjectPerformance: SubjectPerformance[] = [
    { subject: 'Mathematics', averageScore: 85, completionRate: 92, trend: 5 },
    { subject: 'English', averageScore: 78, completionRate: 88, trend: 3 },
    { subject: 'Science', averageScore: 92, completionRate: 95, trend: 7 },
    { subject: 'Social Studies', averageScore: 80, completionRate: 85, trend: 2 },
    { subject: 'Art', averageScore: 88, completionRate: 90, trend: 4 },
  ];

  const grades = ['All Grades', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9'];
  const subjects = ['All Subjects', 'Mathematics', 'English', 'Science', 'Social Studies', 'Art', 'Physical Education'];
  const statuses = ['All Status', 'draft', 'published', 'completed'];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart, active: false },
    { id: 'schools', label: 'Schools', icon: School, active: false },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, active: false },
    { id: 'users', label: 'Users', icon: Users, active: false },
    { id: 'agents', label: 'Sales Agents', icon: User, active: false },
    { id: 'teachers', label: "Teacher's Portal", icon: GraduationCap, active: true },
    { id: 'parents', label: "Parents' Portal", icon: Users, active: false },
    { id: 'chatbot', label: 'Chatbot Agent', icon: MessageCircle, active: false },
    { id: 'tutor', label: 'Tutor Agent', icon: BookOpen, active: false },
    { id: 'quickfacts', label: 'QuickFacts Agent', icon: Zap, active: false },
    { id: 'homework', label: 'Homework Agent', icon: FileText, active: false },
    { id: 'assessment', label: 'Assessment Agent', icon: Award, active: false },
    { id: 'career', label: 'Career Coach Agent', icon: Target, active: false },
    { id: 'quiz', label: 'Quiz Arena', icon: HelpCircle, active: false },
    { id: 'settings', label: 'Settings', icon: Settings, active: false },
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

  const handleCreateAssignment = () => {
    setAssignmentFormData({
      grade: '',
      subject: '',
      title: '',
      description: '',
      dueDate: '',
      dueTime: '',
    });
    setGeneratedAssignment('');
    setShowAssignmentForm(true);
  };

  const handleAssignmentSubmit = (data: AssignmentData) => {
    console.log('Assignment submitted:', data);
    setShowAssignmentForm(false);
    // In a real app, you would save the assignment to a database
  };

  const handleGenerateAssignment = () => {
    if (!assignmentFormData.grade || !assignmentFormData.subject) {
      // Show error or alert
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedText = `# ${assignmentFormData.subject} Assignment for ${assignmentFormData.grade}

## Learning Objectives
- Understand key concepts in ${assignmentFormData.subject}
- Apply knowledge to solve real-world problems
- Develop critical thinking skills

## Instructions
1. Read the provided materials carefully
2. Complete all questions in the worksheet
3. Show your work for all calculations
4. Submit your answers by the due date

## Assessment Criteria
- Accuracy of answers (60%)
- Showing work/reasoning (30%)
- Presentation and neatness (10%)

Good luck!`;
      
      setGeneratedAssignment(generatedText);
      setIsGenerating(false);
    }, 2000);
  };

  const handleViewAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowAssignmentPreview(true);
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = filterGrade === 'All Grades' || assignment.grade === filterGrade;
    const matchesSubject = filterSubject === 'All Subjects' || assignment.subject === filterSubject;
    const matchesStatus = filterStatus === 'All Status' || assignment.status === filterStatus;
    
    return matchesSearch && matchesGrade && matchesSubject && matchesStatus;
  }).sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === 'dueDate') {
      comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortBy === 'subject') {
      comparison = a.subject.localeCompare(b.subject);
    } else if (sortBy === 'grade') {
      comparison = a.grade.localeCompare(b.grade);
    } else if (sortBy === 'status') {
      comparison = a.status.localeCompare(b.status);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = filterGrade === 'All Grades' || student.grade === filterGrade;
    
    return matchesSearch && matchesGrade;
  }).sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'grade') {
      comparison = a.grade.localeCompare(b.grade);
    } else if (sortBy === 'assessmentScore') {
      comparison = a.performance.assessmentScore - b.performance.assessmentScore;
    } else if (sortBy === 'homeworkCompletion') {
      comparison = a.performance.homeworkCompletion - b.performance.homeworkCompletion;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
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

  const renderDashboard = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Performance Overview Cards */}
      <View style={styles.cardsContainer}>
        <View style={styles.overviewCard}>
          <View style={styles.overviewCardHeader}>
            <Text style={styles.overviewCardTitle}>Average Assessment Score</Text>
            <TrendingUp size={20} color="#10B981" />
          </View>
          <Text style={styles.overviewCardValue}>85%</Text>
          <Text style={styles.overviewCardTrend}>+5% from last month</Text>
        </View>
        
        <View style={styles.overviewCard}>
          <View style={styles.overviewCardHeader}>
            <Text style={styles.overviewCardTitle}>Homework Completion Rate</Text>
            <TrendingUp size={20} color="#10B981" />
          </View>
          <Text style={styles.overviewCardValue}>92%</Text>
          <Text style={styles.overviewCardTrend}>+3% from last month</Text>
        </View>
        
        <View style={styles.overviewCard}>
          <View style={styles.overviewCardHeader}>
            <Text style={styles.overviewCardTitle}>Active Students</Text>
            <Users size={20} color="#3B82F6" />
          </View>
          <Text style={styles.overviewCardValue}>145</Text>
          <Text style={styles.overviewCardTrend}>+12 new this month</Text>
        </View>
        
        <View style={styles.overviewCard}>
          <View style={styles.overviewCardHeader}>
            <Text style={styles.overviewCardTitle}>Pending Assignments</Text>
            <FileText size={20} color="#F59E0B" />
          </View>
          <Text style={styles.overviewCardValue}>8</Text>
          <Text style={styles.overviewCardTrend}>2 due this week</Text>
        </View>
      </View>

      {/* Performance Charts */}
      <View style={styles.chartsContainer}>
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Subject Performance</Text>
          <View style={styles.chartContent}>
            {subjectPerformance.map((subject, index) => (
              <View key={index} style={styles.subjectPerformanceItem}>
                <View style={styles.subjectPerformanceHeader}>
                  <Text style={styles.subjectName}>{subject.subject}</Text>
                  <Text style={[
                    styles.subjectTrend,
                    subject.trend > 0 ? styles.positiveChange : styles.negativeChange
                  ]}>
                    {subject.trend > 0 ? '+' : ''}{subject.trend}%
                  </Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${subject.averageScore}%` }]} />
                </View>
                <View style={styles.subjectPerformanceFooter}>
                  <Text style={styles.subjectScore}>Avg: {subject.averageScore}%</Text>
                  <Text style={styles.subjectCompletion}>Completion: {subject.completionRate}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Monthly Performance Trends</Text>
          <View style={styles.chartContent}>
            <View style={styles.monthlyTrendsContainer}>
              {/* This would be a line chart in a real implementation */}
              <View style={styles.monthlyTrendsChart}>
                <View style={styles.chartLabels}>
                  <Text style={styles.chartLabel}>100%</Text>
                  <Text style={styles.chartLabel}>75%</Text>
                  <Text style={styles.chartLabel}>50%</Text>
                  <Text style={styles.chartLabel}>25%</Text>
                  <Text style={styles.chartLabel}>0%</Text>
                </View>
                <View style={styles.chartLines}>
                  {['Jan', 'Feb', 'Mar'].map((month, index) => (
                    <View key={index} style={styles.monthColumn}>
                      <View style={styles.barGroup}>
                        <View style={[
                          styles.bar, 
                          styles.mathBar, 
                          { 
                            height: `${performanceData.find(d => d.subject === 'Mathematics' && d.month === month)?.score || 0}%` 
                          }
                        ]} />
                        <View style={[
                          styles.bar, 
                          styles.englishBar, 
                          { 
                            height: `${performanceData.find(d => d.subject === 'English' && d.month === month)?.score || 0}%` 
                          }
                        ]} />
                        <View style={[
                          styles.bar, 
                          styles.scienceBar, 
                          { 
                            height: `${performanceData.find(d => d.subject === 'Science' && d.month === month)?.score || 0}%` 
                          }
                        ]} />
                      </View>
                      <Text style={styles.monthLabel}>{month}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.mathLegend]} />
                  <Text style={styles.legendText}>Mathematics</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.englishLegend]} />
                  <Text style={styles.legendText}>English</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.scienceLegend]} />
                  <Text style={styles.legendText}>Science</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.recentActivityContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Student Activity</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.activityList}>
          {students.slice(0, 3).map((student, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.activityItem}
              onPress={() => handleViewStudent(student)}
            >
              <View style={styles.activityItemHeader}>
                <Text style={styles.activityItemTitle}>{student.name}</Text>
                <Text style={styles.activityItemTime}>{student.lastActive}</Text>
              </View>
              <Text style={styles.activityItemDescription}>
                Completed {student.performance.homeworkCompletion}% of assignments
              </Text>
              <View style={styles.activityItemFooter}>
                <View style={[
                  styles.activityItemBadge,
                  student.performance.trend === 'improving' ? styles.improvingBadge :
                  student.performance.trend === 'declining' ? styles.decliningBadge :
                  student.performance.trend === 'excellent' ? styles.excellentBadge :
                  styles.stableBadge
                ]}>
                  <Text style={styles.activityItemBadgeText}>
                    {student.performance.trend.charAt(0).toUpperCase() + student.performance.trend.slice(1)}
                  </Text>
                </View>
                <Text style={styles.activityItemGrade}>{student.grade}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderAssignments = () => (
    <View style={styles.tabContent}>
      <View style={styles.filterContainer}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#A0AEC0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search assignments..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filtersRow}>
          <View style={styles.filterDropdownContainer}>
            <TouchableOpacity 
              style={styles.filterDropdown}
              onPress={() => setShowGradeDropdown(!showGradeDropdown)}
            >
              <Text style={styles.filterDropdownText}>{filterGrade}</Text>
              <ChevronDown size={16} color="#718096" />
            </TouchableOpacity>
            {showGradeDropdown && (
              <View style={styles.dropdownMenu}>
                {grades.map((grade, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setFilterGrade(grade);
                      setShowGradeDropdown(false);
                    }}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      filterGrade === grade && styles.dropdownItemTextActive
                    ]}>
                      {grade}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          
          <View style={styles.filterDropdownContainer}>
            <TouchableOpacity 
              style={styles.filterDropdown}
              onPress={() => setShowSubjectDropdown(!showSubjectDropdown)}
            >
              <Text style={styles.filterDropdownText}>{filterSubject}</Text>
              <ChevronDown size={16} color="#718096" />
            </TouchableOpacity>
            {showSubjectDropdown && (
              <View style={styles.dropdownMenu}>
                {subjects.map((subject, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setFilterSubject(subject);
                      setShowSubjectDropdown(false);
                    }}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      filterSubject === subject && styles.dropdownItemTextActive
                    ]}>
                      {subject}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          
          <View style={styles.filterDropdownContainer}>
            <TouchableOpacity 
              style={styles.filterDropdown}
              onPress={() => setShowStatusDropdown(!showStatusDropdown)}
            >
              <Text style={styles.filterDropdownText}>{filterStatus}</Text>
              <ChevronDown size={16} color="#718096" />
            </TouchableOpacity>
            {showStatusDropdown && (
              <View style={styles.dropdownMenu}>
                {statuses.map((status, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setFilterStatus(status);
                      setShowStatusDropdown(false);
                    }}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      filterStatus === status && styles.dropdownItemTextActive
                    ]}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreateAssignment}
          >
            <Plus size={16} color="white" />
            <Text style={styles.createButtonText}>Create Assignment</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <TouchableOpacity 
            style={[styles.tableHeaderCell, styles.titleColumn]}
            onPress={() => handleSort('title')}
          >
            <Text style={styles.tableHeaderText}>Title</Text>
            {sortBy === 'title' && (
              <ArrowUpDown size={14} color="#718096" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tableHeaderCell, styles.subjectColumn]}
            onPress={() => handleSort('subject')}
          >
            <Text style={styles.tableHeaderText}>Subject</Text>
            {sortBy === 'subject' && (
              <ArrowUpDown size={14} color="#718096" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tableHeaderCell, styles.gradeColumn]}
            onPress={() => handleSort('grade')}
          >
            <Text style={styles.tableHeaderText}>Grade</Text>
            {sortBy === 'grade' && (
              <ArrowUpDown size={14} color="#718096" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tableHeaderCell, styles.dueDateColumn]}
            onPress={() => handleSort('dueDate')}
          >
            <Text style={styles.tableHeaderText}>Due Date</Text>
            {sortBy === 'dueDate' && (
              <ArrowUpDown size={14} color="#718096" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tableHeaderCell, styles.statusColumn]}
            onPress={() => handleSort('status')}
          >
            <Text style={styles.tableHeaderText}>Status</Text>
            {sortBy === 'status' && (
              <ArrowUpDown size={14} color="#718096" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tableHeaderCell, styles.submissionsColumn]}
          >
            <Text style={styles.tableHeaderText}>Submissions</Text>
          </TouchableOpacity>
          
          <View style={[styles.tableHeaderCell, styles.actionsColumn]}>
            <Text style={styles.tableHeaderText}>Actions</Text>
          </View>
        </View>
        
        <ScrollView style={styles.tableBody}>
          {filteredAssignments.length === 0 ? (
            <View style={styles.emptyState}>
              <FileText size={48} color="#A0AEC0" />
              <Text style={styles.emptyStateTitle}>No assignments found</Text>
              <Text style={styles.emptyStateDescription}>
                Try adjusting your filters or create a new assignment
              </Text>
            </View>
          ) : (
            filteredAssignments.map((assignment, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.titleColumn]} numberOfLines={2}>{assignment.title}</Text>
                <Text style={[styles.tableCell, styles.subjectColumn]}>{assignment.subject}</Text>
                <Text style={[styles.tableCell, styles.gradeColumn]}>{assignment.grade}</Text>
                <Text style={[styles.tableCell, styles.dueDateColumn]}>
                  {new Date(assignment.dueDate).toLocaleDateString()}
                </Text>
                <View style={[styles.tableCell, styles.statusColumn]}>
                  <View style={[
                    styles.statusBadge,
                    assignment.status === 'published' ? styles.publishedBadge :
                    assignment.status === 'draft' ? styles.draftBadge :
                    styles.completedBadge
                  ]}>
                    <Text style={styles.statusBadgeText}>
                      {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.tableCell, styles.submissionsColumn]}>
                  {assignment.submissionCount}/{assignment.totalStudents}
                </Text>
                <View style={[styles.tableCell, styles.actionsColumn]}>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleViewAssignment(assignment)}
                    >
                      <Eye size={16} color="#4A5568" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Edit3 size={16} color="#4A5568" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Trash2 size={16} color="#E53E3E" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );

  const renderStudents = () => (
    <View style={styles.tabContent}>
      <View style={styles.filterContainer}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#A0AEC0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filtersRow}>
          <View style={styles.filterDropdownContainer}>
            <TouchableOpacity 
              style={styles.filterDropdown}
              onPress={() => setShowGradeDropdown(!showGradeDropdown)}
            >
              <Text style={styles.filterDropdownText}>{filterGrade}</Text>
              <ChevronDown size={16} color="#718096" />
            </TouchableOpacity>
            {showGradeDropdown && (
              <View style={styles.dropdownMenu}>
                {grades.map((grade, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setFilterGrade(grade);
                      setShowGradeDropdown(false);
                    }}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      filterGrade === grade && styles.dropdownItemTextActive
                    ]}>
                      {grade}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
      
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <TouchableOpacity 
            style={[styles.tableHeaderCell, styles.nameColumn]}
            onPress={() => handleSort('name')}
          >
            <Text style={styles.tableHeaderText}>Name</Text>
            {sortBy === 'name' && (
              <ArrowUpDown size={14} color="#718096" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tableHeaderCell, styles.gradeColumn]}
            onPress={() => handleSort('grade')}
          >
            <Text style={styles.tableHeaderText}>Grade</Text>
            {sortBy === 'grade' && (
              <ArrowUpDown size={14} color="#718096" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tableHeaderCell, styles.assessmentColumn]}
            onPress={() => handleSort('assessmentScore')}
          >
            <Text style={styles.tableHeaderText}>Assessment Score</Text>
            {sortBy === 'assessmentScore' && (
              <ArrowUpDown size={14} color="#718096" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tableHeaderCell, styles.homeworkColumn]}
            onPress={() => handleSort('homeworkCompletion')}
          >
            <Text style={styles.tableHeaderText}>Homework Completion</Text>
            {sortBy === 'homeworkCompletion' && (
              <ArrowUpDown size={14} color="#718096" />
            )}
          </TouchableOpacity>
          
          <View style={[styles.tableHeaderCell, styles.lastActiveColumn]}>
            <Text style={styles.tableHeaderText}>Last Active</Text>
          </View>
          
          <View style={[styles.tableHeaderCell, styles.trendColumn]}>
            <Text style={styles.tableHeaderText}>Performance Trend</Text>
          </View>
          
          <View style={[styles.tableHeaderCell, styles.actionsColumn]}>
            <Text style={styles.tableHeaderText}>Actions</Text>
          </View>
        </View>
        
        <ScrollView style={styles.tableBody}>
          {filteredStudents.length === 0 ? (
            <View style={styles.emptyState}>
              <Users size={48} color="#A0AEC0" />
              <Text style={styles.emptyStateTitle}>No students found</Text>
              <Text style={styles.emptyStateDescription}>
                Try adjusting your filters or search query
              </Text>
            </View>
          ) : (
            filteredStudents.map((student, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.nameColumn]}>{student.name}</Text>
                <Text style={[styles.tableCell, styles.gradeColumn]}>{student.grade}</Text>
                <Text style={[styles.tableCell, styles.assessmentColumn]}>{student.performance.assessmentScore}%</Text>
                <Text style={[styles.tableCell, styles.homeworkColumn]}>{student.performance.homeworkCompletion}%</Text>
                <Text style={[styles.tableCell, styles.lastActiveColumn]}>{student.lastActive}</Text>
                <View style={[styles.tableCell, styles.trendColumn]}>
                  <View style={[
                    styles.trendBadge,
                    student.performance.trend === 'improving' ? styles.improvingBadge :
                    student.performance.trend === 'declining' ? styles.decliningBadge :
                    student.performance.trend === 'excellent' ? styles.excellentBadge :
                    styles.stableBadge
                  ]}>
                    <Text style={styles.trendBadgeText}>
                      {student.performance.trend.charAt(0).toUpperCase() + student.performance.trend.slice(1)}
                    </Text>
                  </View>
                </View>
                <View style={[styles.tableCell, styles.actionsColumn]}>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleViewStudent(student)}
                    >
                      <Eye size={16} color="#4A5568" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <FileText size={16} color="#4A5568" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
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
          <Text style={styles.pageTitle}>Teacher's Portal</Text>
          
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'dashboard' && styles.activeTab]}
              onPress={() => setActiveTab('dashboard')}
            >
              <BarChart size={16} color={activeTab === 'dashboard' ? '#3B82F6' : '#718096'} />
              <Text style={[styles.tabText, activeTab === 'dashboard' && styles.activeTabText]}>
                Dashboard
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tab, activeTab === 'assignments' && styles.activeTab]}
              onPress={() => setActiveTab('assignments')}
            >
              <FileText size={16} color={activeTab === 'assignments' ? '#3B82F6' : '#718096'} />
              <Text style={[styles.tabText, activeTab === 'assignments' && styles.activeTabText]}>
                Assignments
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tab, activeTab === 'students' && styles.activeTab]}
              onPress={() => setActiveTab('students')}
            >
              <Users size={16} color={activeTab === 'students' ? '#3B82F6' : '#718096'} />
              <Text style={[styles.tabText, activeTab === 'students' && styles.activeTabText]}>
                Students
              </Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={styles.createAssignmentButton}
            onPress={handleCreateAssignment}
          >
            <Plus size={16} color="white" />
            <Text style={styles.createAssignmentButtonText}>Set Assignment</Text>
          </TouchableOpacity>
        </Animated.View>
        
        {/* Content */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'assignments' && renderAssignments()}
          {activeTab === 'students' && renderStudents()}
        </Animated.View>
      </View>
      
      {/* Assignment Form Modal */}
      <Modal
        visible={showAssignmentForm}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAssignmentForm(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Set Assignment</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowAssignmentForm(false)}
              >
                <X size={24} color="#718096" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Grade</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowGradeDropdown(!showGradeDropdown)}
                >
                  <Text style={[styles.dropdownText, !assignmentFormData.grade && styles.placeholderText]}>
                    {assignmentFormData.grade || 'Select Grade'}
                  </Text>
                  <ChevronDown size={20} color="#A0AEC0" />
                </TouchableOpacity>
                {showGradeDropdown && (
                  <View style={styles.dropdownMenu}>
                    {grades.filter(g => g !== 'All Grades').map((grade, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setAssignmentFormData({...assignmentFormData, grade});
                          setShowGradeDropdown(false);
                        }}
                      >
                        <Text style={[
                          styles.dropdownItemText,
                          assignmentFormData.grade === grade && styles.dropdownItemTextActive
                        ]}>
                          {grade}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Subject</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowSubjectDropdown(!showSubjectDropdown)}
                >
                  <Text style={[styles.dropdownText, !assignmentFormData.subject && styles.placeholderText]}>
                    {assignmentFormData.subject || 'Select Subject'}
                  </Text>
                  <ChevronDown size={20} color="#A0AEC0" />
                </TouchableOpacity>
                {showSubjectDropdown && (
                  <View style={styles.dropdownMenu}>
                    {subjects.filter(s => s !== 'All Subjects').map((subject, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setAssignmentFormData({...assignmentFormData, subject});
                          setShowSubjectDropdown(false);
                        }}
                      >
                        <Text style={[
                          styles.dropdownItemText,
                          assignmentFormData.subject === subject && styles.dropdownItemTextActive
                        ]}>
                          {subject}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Upload Document (Optional)</Text>
                <TouchableOpacity style={styles.fileUploadButton}>
                  <FileText size={20} color="#4299E1" />
                  <Text style={styles.fileUploadText}>Choose File</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={styles.generateButton}
                onPress={handleGenerateAssignment}
                disabled={!assignmentFormData.grade || !assignmentFormData.subject || isGenerating}
              >
                {isGenerating ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Wand2 size={20} color="white" />
                    <Text style={styles.generateButtonText}>Generate with AI</Text>
                  </>
                )}
              </TouchableOpacity>
              
              {generatedAssignment ? (
                <View style={styles.generatedAssignmentContainer}>
                  <Text style={styles.generatedAssignmentTitle}>Generated Assignment</Text>
                  <View style={styles.generatedAssignmentContent}>
                    <Text style={styles.generatedAssignmentText}>{generatedAssignment}</Text>
                  </View>
                  <View style={styles.generatedAssignmentActions}>
                    <TouchableOpacity 
                      style={styles.regenerateButton}
                      onPress={handleGenerateAssignment}
                    >
                      <Text style={styles.regenerateButtonText}>Re-Generate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton}>
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.sendButton}
                      onPress={() => {
                        setShowAssignmentForm(false);
                        // In a real app, you would save and send the assignment
                      }}
                    >
                      <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Assignment Title</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter assignment title"
                      value={assignmentFormData.title}
                      onChangeText={(text) => setAssignmentFormData({...assignmentFormData, title: text})}
                    />
                  </View>
                  
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Assignment Description</Text>
                    <TextInput
                      style={styles.textArea}
                      placeholder="Enter assignment details and instructions"
                      value={assignmentFormData.description}
                      onChangeText={(text) => setAssignmentFormData({...assignmentFormData, description: text})}
                      multiline
                      numberOfLines={6}
                    />
                  </View>
                  
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Due Date</Text>
                    <View style={styles.dateTimeContainer}>
                      <View style={styles.dateContainer}>
                        <TextInput
                          style={styles.dateInput}
                          placeholder="YYYY-MM-DD"
                          value={assignmentFormData.dueDate}
                          onChangeText={(text) => setAssignmentFormData({...assignmentFormData, dueDate: text})}
                        />
                        <CalendarIcon size={20} color="#A0AEC0" style={styles.dateIcon} />
                      </View>
                      
                      <View style={styles.timeContainer}>
                        <TextInput
                          style={styles.timeInput}
                          placeholder="HH:MM"
                          value={assignmentFormData.dueTime}
                          onChangeText={(text) => setAssignmentFormData({...assignmentFormData, dueTime: text})}
                        />
                        <ClockIcon size={20} color="#A0AEC0" style={styles.timeIcon} />
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.modalActions}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => setShowAssignmentForm(false)}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={() => handleAssignmentSubmit(assignmentFormData)}
                    >
                      <Text style={styles.submitButtonText}>Create Assignment</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      
      {/* Assignment Preview Modal */}
      {selectedAssignment && (
        <Modal
          visible={showAssignmentPreview}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowAssignmentPreview(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedAssignment.title}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowAssignmentPreview(false)}
                >
                  <X size={24} color="#718096" />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.modalBody}>
                <View style={styles.assignmentDetails}>
                  <View style={styles.assignmentDetail}>
                    <Text style={styles.assignmentDetailLabel}>Subject:</Text>
                    <Text style={styles.assignmentDetailValue}>{selectedAssignment.subject}</Text>
                  </View>
                  
                  <View style={styles.assignmentDetail}>
                    <Text style={styles.assignmentDetailLabel}>Grade:</Text>
                    <Text style={styles.assignmentDetailValue}>{selectedAssignment.grade}</Text>
                  </View>
                  
                  <View style={styles.assignmentDetail}>
                    <Text style={styles.assignmentDetailLabel}>Due Date:</Text>
                    <Text style={styles.assignmentDetailValue}>
                      {new Date(selectedAssignment.dueDate).toLocaleDateString()}
                    </Text>
                  </View>
                  
                  <View style={styles.assignmentDetail}>
                    <Text style={styles.assignmentDetailLabel}>Status:</Text>
                    <View style={[
                      styles.statusBadge,
                      selectedAssignment.status === 'published' ? styles.publishedBadge :
                      selectedAssignment.status === 'draft' ? styles.draftBadge :
                      styles.completedBadge
                    ]}>
                      <Text style={styles.statusBadgeText}>
                        {selectedAssignment.status.charAt(0).toUpperCase() + selectedAssignment.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.assignmentDetail}>
                    <Text style={styles.assignmentDetailLabel}>Submissions:</Text>
                    <Text style={styles.assignmentDetailValue}>
                      {selectedAssignment.submissionCount}/{selectedAssignment.totalStudents}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.assignmentContent}>
                  <Text style={styles.assignmentContentTitle}>Assignment Content</Text>
                  <Text style={styles.assignmentContentText}>
                    This is a placeholder for the assignment content. In a real application, this would contain the full details, instructions, and resources for the assignment.
                  </Text>
                </View>
                
                <View style={styles.submissionStats}>
                  <Text style={styles.submissionStatsTitle}>Submission Statistics</Text>
                  
                  <View style={styles.submissionStatsItem}>
                    <Text style={styles.submissionStatsLabel}>Completion Rate:</Text>
                    <View style={styles.submissionStatsProgressContainer}>
                      <View 
                        style={[
                          styles.submissionStatsProgress, 
                          { width: `${(selectedAssignment.submissionCount / selectedAssignment.totalStudents) * 100}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.submissionStatsValue}>
                      {Math.round((selectedAssignment.submissionCount / selectedAssignment.totalStudents) * 100)}%
                    </Text>
                  </View>
                  
                  <View style={styles.submissionStatsItem}>
                    <Text style={styles.submissionStatsLabel}>Average Score:</Text>
                    <View style={styles.submissionStatsProgressContainer}>
                      <View 
                        style={[
                          styles.submissionStatsProgress, 
                          { width: '85%' }
                        ]} 
                      />
                    </View>
                    <Text style={styles.submissionStatsValue}>85%</Text>
                  </View>
                  
                  <View style={styles.submissionStatsItem}>
                    <Text style={styles.submissionStatsLabel}>On-Time Submissions:</Text>
                    <View style={styles.submissionStatsProgressContainer}>
                      <View 
                        style={[
                          styles.submissionStatsProgress, 
                          { width: '90%' }
                        ]} 
                      />
                    </View>
                    <Text style={styles.submissionStatsValue}>90%</Text>
                  </View>
                </View>
              </ScrollView>
              
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowAssignmentPreview(false)}
                >
                  <Text style={styles.cancelButtonText}>Close</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.editAssignmentButton}>
                  <Edit3 size={16} color="white" />
                  <Text style={styles.editAssignmentButtonText}>Edit Assignment</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      
      {/* Student Details Modal */}
      {selectedStudent && (
        <Modal
          visible={showStudentDetails}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowStudentDetails(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedStudent.name}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowStudentDetails(false)}
                >
                  <X size={24} color="#718096" />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.modalBody}>
                <View style={styles.studentProfile}>
                  <View style={styles.studentAvatar}>
                    <User size={48} color="#4299E1" />
                  </View>
                  
                  <View style={styles.studentInfo}>
                    <View style={styles.studentInfoItem}>
                      <Text style={styles.studentInfoLabel}>Grade:</Text>
                      <Text style={styles.studentInfoValue}>{selectedStudent.grade}</Text>
                    </View>
                    
                    <View style={styles.studentInfoItem}>
                      <Text style={styles.studentInfoLabel}>Subjects:</Text>
                      <Text style={styles.studentInfoValue}>{selectedStudent.subjects.join(', ')}</Text>
                    </View>
                    
                    <View style={styles.studentInfoItem}>
                      <Text style={styles.studentInfoLabel}>Last Active:</Text>
                      <Text style={styles.studentInfoValue}>{selectedStudent.lastActive}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.performanceOverview}>
                  <Text style={styles.performanceOverviewTitle}>Performance Overview</Text>
                  
                  <View style={styles.performanceMetrics}>
                    <View style={styles.performanceMetric}>
                      <Text style={styles.performanceMetricValue}>{selectedStudent.performance.assessmentScore}%</Text>
                      <Text style={styles.performanceMetricLabel}>Assessment Score</Text>
                    </View>
                    
                    <View style={styles.performanceMetric}>
                      <Text style={styles.performanceMetricValue}>{selectedStudent.performance.homeworkCompletion}%</Text>
                      <Text style={styles.performanceMetricLabel}>Homework Completion</Text>
                    </View>
                    
                    <View style={styles.performanceMetric}>
                      <View style={[
                        styles.trendBadge,
                        selectedStudent.performance.trend === 'improving' ? styles.improvingBadge :
                        selectedStudent.performance.trend === 'declining' ? styles.decliningBadge :
                        selectedStudent.performance.trend === 'excellent' ? styles.excellentBadge :
                        styles.stableBadge
                      ]}>
                        <Text style={styles.trendBadgeText}>
                          {selectedStudent.performance.trend.charAt(0).toUpperCase() + selectedStudent.performance.trend.slice(1)}
                        </Text>
                      </View>
                      <Text style={styles.performanceMetricLabel}>Performance Trend</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.subjectPerformance}>
                  <Text style={styles.subjectPerformanceTitle}>Subject Performance</Text>
                  
                  {selectedStudent.subjects.map((subject, index) => {
                    // Generate random scores for demo purposes
                    const score = Math.floor(Math.random() * 30) + 70;
                    const classAverage = Math.floor(Math.random() * 20) + 65;
                    
                    return (
                      <View key={index} style={styles.subjectPerformanceItem}>
                        <View style={styles.subjectPerformanceHeader}>
                          <Text style={styles.subjectName}>{subject}</Text>
                          <Text style={styles.subjectScore}>{score}%</Text>
                        </View>
                        
                        <View style={styles.subjectProgressContainer}>
                          <View style={styles.subjectProgress}>
                            <View style={[styles.subjectProgressBar, { width: `${score}%` }]} />
                            <View style={[styles.classAverageMarker, { left: `${classAverage}%` }]} />
                          </View>
                          <Text style={styles.classAverageText}>Class Average: {classAverage}%</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
                
                <View style={styles.recentAssignments}>
                  <Text style={styles.recentAssignmentsTitle}>Recent Assignments</Text>
                  
                  {/* Mock recent assignments */}
                  {[1, 2, 3].map((_, index) => {
                    const status = index === 0 ? 'completed' : index === 1 ? 'in-progress' : 'not-started';
                    const score = status === 'completed' ? Math.floor(Math.random() * 30) + 70 : null;
                    
                    return (
                      <View key={index} style={styles.recentAssignmentItem}>
                        <View style={styles.recentAssignmentHeader}>
                          <Text style={styles.recentAssignmentTitle}>
                            {index === 0 ? 'Algebra Quiz' : index === 1 ? 'Science Lab Report' : 'History Essay'}
                          </Text>
                          <View style={[
                            styles.assignmentStatusBadge,
                            status === 'completed' ? styles.completedStatusBadge :
                            status === 'in-progress' ? styles.inProgressStatusBadge :
                            styles.notStartedStatusBadge
                          ]}>
                            <Text style={styles.assignmentStatusText}>
                              {status === 'completed' ? 'Completed' :
                               status === 'in-progress' ? 'In Progress' :
                               'Not Started'}
                            </Text>
                          </View>
                        </View>
                        
                        <View style={styles.recentAssignmentDetails}>
                          <Text style={styles.recentAssignmentSubject}>
                            {index === 0 ? 'Mathematics' : index === 1 ? 'Science' : 'Social Studies'}
                          </Text>
                          <Text style={styles.recentAssignmentDate}>
                            Due: {index === 0 ? '2025-03-10' : index === 1 ? '2025-03-15' : '2025-03-20'}
                          </Text>
                        </View>
                        
                        {status === 'completed' && (
                          <View style={styles.recentAssignmentScore}>
                            <Text style={styles.recentAssignmentScoreLabel}>Score:</Text>
                            <Text style={styles.recentAssignmentScoreValue}>{score}%</Text>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
              
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowStudentDetails(false)}
                >
                  <Text style={styles.cancelButtonText}>Close</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.viewReportButton}>
                  <FileText size={16} color="white" />
                  <Text style={styles.viewReportButtonText}>View Full Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#3B82F6',
  },
  createAssignmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  createAssignmentButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
  },
  filterContainer: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
    marginLeft: 8,
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterDropdownContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minWidth: 150,
  },
  filterDropdownText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
    marginRight: 8,
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
    marginTop: 4,
    maxHeight: 200,
    overflow: 'scroll',
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownItemText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
  },
  dropdownItemTextActive: {
    color: '#3B82F6',
    fontFamily: 'Inter-SemiBold',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  createButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginLeft: 8,
  },
  tableContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableHeaderCell: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  tableHeaderText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#64748B',
    marginRight: 4,
  },
  tableBody: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingVertical: 12,
  },
  tableCell: {
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  titleColumn: {
    flex: 3,
  },
  subjectColumn: {
    flex: 2,
  },
  gradeColumn: {
    flex: 1,
  },
  dueDateColumn: {
    flex: 2,
  },
  statusColumn: {
    flex: 2,
  },
  submissionsColumn: {
    flex: 1,
  },
  actionsColumn: {
    flex: 1,
  },
  nameColumn: {
    flex: 2,
  },
  assessmentColumn: {
    flex: 2,
  },
  homeworkColumn: {
    flex: 2,
  },
  lastActiveColumn: {
    flex: 2,
  },
  trendColumn: {
    flex: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  publishedBadge: {
    backgroundColor: '#EBF8FF',
  },
  draftBadge: {
    backgroundColor: '#F7FAFC',
  },
  completedBadge: {
    backgroundColor: '#F0FFF4',
  },
  statusBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  improvingBadge: {
    backgroundColor: '#EBF8FF',
  },
  decliningBadge: {
    backgroundColor: '#FEF2F2',
  },
  excellentBadge: {
    backgroundColor: '#F0FFF4',
  },
  stableBadge: {
    backgroundColor: '#F7FAFC',
  },
  trendBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
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
    borderRadius: 12,
    width: '100%',
    maxWidth: 600,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    padding: 20,
    maxHeight: 500,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
  },
  textArea: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  dropdown: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
    flex: 1,
  },
  placeholderText: {
    color: '#A0AEC0',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dateContainer: {
    flex: 3,
    position: 'relative',
  },
  timeContainer: {
    flex: 2,
    position: 'relative',
  },
  dateInput: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingRight: 40,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
  },
  timeInput: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingRight: 40,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
  },
  dateIcon: {
    position: 'absolute',
    right: 12,
    top: 10,
  },
  timeIcon: {
    position: 'absolute',
    right: 12,
    top: 10,
  },
  fileUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 12,
  },
  fileUploadText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
    marginLeft: 8,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  submitButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  assignmentDetails: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  assignmentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  assignmentDetailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
    width: 100,
  },
  assignmentDetailValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
    flex: 1,
  },
  assignmentContent: {
    marginBottom: 20,
  },
  assignmentContentTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 12,
  },
  assignmentContentText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 22,
  },
  submissionStats: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 16,
  },
  submissionStatsTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 16,
  },
  submissionStatsItem: {
    marginBottom: 16,
  },
  submissionStatsLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginBottom: 8,
  },
  submissionStatsProgressContainer: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  submissionStatsProgress: {
    height: '100%',
    backgroundColor: '#4299E1',
    borderRadius: 4,
  },
  submissionStatsValue: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
    textAlign: 'right',
  },
  editAssignmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editAssignmentButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginLeft: 8,
  },
  studentProfile: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  studentAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  studentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  studentInfoItem: {
    marginBottom: 8,
  },
  studentInfoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
    marginBottom: 2,
  },
  studentInfoValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
  },
  performanceOverview: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  performanceOverviewTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 16,
  },
  performanceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  performanceMetric: {
    alignItems: 'center',
  },
  performanceMetricValue: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  performanceMetricLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#718096',
    textAlign: 'center',
  },
  subjectPerformance: {
    marginBottom: 24,
  },
  subjectPerformanceTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 16,
  },
  subjectPerformanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
  },
  subjectScore: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  subjectProgressContainer: {
    marginBottom: 16,
  },
  subjectProgress: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 4,
    position: 'relative',
  },
  subjectProgressBar: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  classAverageMarker: {
    position: 'absolute',
    top: -4,
    width: 2,
    height: 16,
    backgroundColor: '#F59E0B',
  },
  classAverageText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'right',
  },
  recentAssignments: {
    marginBottom: 24,
  },
  recentAssignmentsTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 16,
  },
  recentAssignmentItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  recentAssignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recentAssignmentTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
  },
  assignmentStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedStatusBadge: {
    backgroundColor: '#F0FFF4',
  },
  inProgressStatusBadge: {
    backgroundColor: '#EBF8FF',
  },
  notStartedStatusBadge: {
    backgroundColor: '#F7FAFC',
  },
  assignmentStatusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  recentAssignmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  recentAssignmentSubject: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  recentAssignmentDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  recentAssignmentScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentAssignmentScoreLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginRight: 4,
  },
  recentAssignmentScoreValue: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
  viewReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  viewReportButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginLeft: 8,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  overviewCard: {
    flex: 1,
    minWidth: width >= 1200 ? 'calc(25% - 16px)' : width >= 768 ? 'calc(50% - 16px)' : '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  overviewCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  overviewCardTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  overviewCardValue: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  overviewCardTrend: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  chartsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  chartCard: {
    flex: 1,
    minWidth: width >= 1200 ? 'calc(50% - 16px)' : '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
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
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 16,
  },
  chartContent: {
    flex: 1,
  },
  subjectPerformanceItem: {
    marginBottom: 16,
  },
  subjectPerformanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  subjectPerformanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subjectScore: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  subjectCompletion: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  subjectTrend: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  positiveChange: {
    color: '#10B981',
  },
  negativeChange: {
    color: '#EF4444',
  },
  monthlyTrendsContainer: {
    flex: 1,
  },
  monthlyTrendsChart: {
    flexDirection: 'row',
    height: 200,
    marginBottom: 16,
  },
  chartLabels: {
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  chartLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
  },
  chartLines: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  monthColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
  },
  bar: {
    width: 8,
    marginHorizontal: 2,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  mathBar: {
    backgroundColor: '#3B82F6',
  },
  englishBar: {
    backgroundColor: '#10B981',
  },
  scienceBar: {
    backgroundColor: '#F59E0B',
  },
  monthLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
    marginTop: 4,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  mathLegend: {
    backgroundColor: '#3B82F6',
  },
  englishLegend: {
    backgroundColor: '#10B981',
  },
  scienceLegend: {
    backgroundColor: '#F59E0B',
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  recentActivityContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
  },
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  viewAllText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 16,
  },
  activityItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityItemTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  activityItemTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
  },
  activityItemDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 8,
  },
  activityItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityItemBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activityItemBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  activityItemGrade: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  generateButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  generateButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    marginLeft: 8,
  },
  generatedAssignmentContainer: {
    marginTop: 16,
  },
  generatedAssignmentTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 12,
  },
  generatedAssignmentContent: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  generatedAssignmentText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
    lineHeight: 22,
  },
  generatedAssignmentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  regenerateButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  regenerateButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  editButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  sendButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  pieSliceLow: {
    backgroundColor: '#E53E3E'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
});