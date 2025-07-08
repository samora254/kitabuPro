import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, Clock, Filter, Search, Calendar, ChevronRight, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle, FileText, Upload, Eye, ArrowLeft, Plus } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

// Define types for our data structures
interface Assignment {
  id: string;
  title: string;
  subject: string;
  subjectColor: string;
  grade: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  questions: number;
  estimatedTime: number; // in minutes
  points: number;
  thumbnailUrl?: string;
}

export default function HomeworkScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showAssignmentDetails, setShowAssignmentDetails] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Sample assignments data
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Algebra Fundamentals',
      subject: 'Mathematics',
      subjectColor: '#E879F9',
      grade: 'Grade 8',
      dueDate: '2025-07-15',
      status: 'pending',
      questions: 15,
      estimatedTime: 45,
      points: 100,
      thumbnailUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Essay on Climate Change',
      subject: 'English',
      subjectColor: '#60A5FA',
      grade: 'Grade 8',
      dueDate: '2025-07-20',
      status: 'in-progress',
      questions: 3,
      estimatedTime: 120,
      points: 50,
      thumbnailUrl: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'Chemical Reactions Lab Report',
      subject: 'Science',
      subjectColor: '#45B7D1',
      grade: 'Grade 8',
      dueDate: '2025-07-10',
      status: 'completed',
      questions: 8,
      estimatedTime: 60,
      points: 75,
      thumbnailUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      title: 'History of Kenya Timeline',
      subject: 'Social Studies',
      subjectColor: '#FBBF24',
      grade: 'Grade 8',
      dueDate: '2025-07-05',
      status: 'overdue',
      questions: 10,
      estimatedTime: 90,
      points: 80,
      thumbnailUrl: 'https://images.pexels.com/photos/631522/pexels-photo-631522.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      title: 'Geometry Practice Problems',
      subject: 'Mathematics',
      subjectColor: '#E879F9',
      grade: 'Grade 8',
      dueDate: '2025-07-25',
      status: 'pending',
      questions: 20,
      estimatedTime: 60,
      points: 100,
      thumbnailUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '6',
      title: 'Kiswahili Insha',
      subject: 'Kiswahili',
      subjectColor: '#34D399',
      grade: 'Grade 8',
      dueDate: '2025-07-18',
      status: 'pending',
      questions: 1,
      estimatedTime: 90,
      points: 50,
      thumbnailUrl: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  // Subjects for filtering
  const subjects = [
    { id: 'mathematics', name: 'Mathematics', color: '#E879F9' },
    { id: 'english', name: 'English', color: '#60A5FA' },
    { id: 'science', name: 'Science', color: '#45B7D1' },
    { id: 'social-studies', name: 'Social Studies', color: '#FBBF24' },
    { id: 'kiswahili', name: 'Kiswahili', color: '#34D399' },
    { id: 'home-science', name: 'Home Science', color: '#FB7185' },
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

  // Filter assignments based on active tab, search query, and selected subject
  const filteredAssignments = assignments.filter(assignment => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'pending' && (assignment.status === 'pending' || assignment.status === 'in-progress' || assignment.status === 'overdue')) ||
      (activeTab === 'completed' && assignment.status === 'completed');
    
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = 
      selectedSubject === null || 
      assignment.subject.toLowerCase() === selectedSubject.toLowerCase();
    
    return matchesTab && matchesSearch && matchesSubject;
  });

  // Calculate days remaining until due date
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Format date to display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in-progress': return '#3B82F6';
      case 'pending': return '#F59E0B';
      case 'overdue': return '#EF4444';
      default: return '#A0AEC0';
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'pending': return 'Pending';
      case 'overdue': return 'Overdue';
      default: return 'Unknown';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} color="#10B981" />;
      case 'in-progress': return <Clock size={16} color="#3B82F6" />;
      case 'pending': return <AlertCircle size={16} color="#F59E0B" />;
      case 'overdue': return <XCircle size={16} color="#EF4444" />;
      default: return null;
    }
  };

  // Handle assignment selection
  const handleAssignmentPress = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowAssignmentDetails(true);
  };

  // Render assignment card
  const renderAssignmentCard = ({ item }: { item: Assignment }) => {
    const daysRemaining = getDaysRemaining(item.dueDate);
    
    return (
      <TouchableOpacity
        style={styles.assignmentCard}
        onPress={() => handleAssignmentPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.assignmentHeader}>
          <View style={[styles.subjectTag, { backgroundColor: item.subjectColor }]}>
            <Text style={styles.subjectText}>{item.subject}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
            {getStatusIcon(item.status)}
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>
        
        {item.thumbnailUrl && (
          <Image 
            source={{ uri: item.thumbnailUrl }} 
            style={styles.assignmentImage}
            resizeMode="cover"
          />
        )}
        
        <View style={styles.assignmentContent}>
          <Text style={styles.assignmentTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.gradeText}>{item.grade}</Text>
          
          <View style={styles.assignmentMeta}>
            <View style={styles.metaItem}>
              <Calendar size={14} color="#718096" />
              <Text style={styles.metaText}>
                {formatDate(item.dueDate)}
                {daysRemaining > 0 && item.status !== 'completed' && (
                  <Text style={[
                    styles.daysRemaining,
                    daysRemaining <= 2 ? styles.urgentDays : {}
                  ]}>
                    {' '}({daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left)
                  </Text>
                )}
              </Text>
            </View>
            
            <View style={styles.metaItem}>
              <FileText size={14} color="#718096" />
              <Text style={styles.metaText}>{item.questions} question{item.questions !== 1 ? 's' : ''}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Clock size={14} color="#718096" />
              <Text style={styles.metaText}>{item.estimatedTime} min</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.assignmentFooter}>
          <Text style={styles.pointsText}>{item.points} points</Text>
          <ChevronRight size={16} color="#A0AEC0" />
        </View>
      </TouchableOpacity>
    );
  };

  // Render assignment details screen
  const renderAssignmentDetails = () => {
    if (!selectedAssignment) return null;
    
    return (
      <View style={styles.detailsContainer}>
        <View style={styles.detailsHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowAssignmentDetails(false)}
          >
            <ArrowLeft size={24} color="#4A5568" />
          </TouchableOpacity>
          <Text style={styles.detailsTitle}>Assignment Details</Text>
          <View style={styles.headerSpacer} />
        </View>
        
        <ScrollView style={styles.detailsContent} showsVerticalScrollIndicator={false}>
          <View style={styles.detailsCard}>
            <View style={styles.detailsCardHeader}>
              <View style={[styles.subjectTag, { backgroundColor: selectedAssignment.subjectColor }]}>
                <Text style={styles.subjectText}>{selectedAssignment.subject}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(selectedAssignment.status)}20` }]}>
                {getStatusIcon(selectedAssignment.status)}
                <Text style={[styles.statusText, { color: getStatusColor(selectedAssignment.status) }]}>
                  {getStatusText(selectedAssignment.status)}
                </Text>
              </View>
            </View>
            
            {selectedAssignment.thumbnailUrl && (
              <Image 
                source={{ uri: selectedAssignment.thumbnailUrl }} 
                style={styles.detailsImage}
                resizeMode="cover"
              />
            )}
            
            <Text style={styles.detailsAssignmentTitle}>{selectedAssignment.title}</Text>
            <Text style={styles.detailsGradeText}>{selectedAssignment.grade}</Text>
            
            <View style={styles.detailsSection}>
              <Text style={styles.sectionTitle}>Due Date</Text>
              <View style={styles.sectionContent}>
                <Calendar size={16} color="#4A5568" />
                <Text style={styles.sectionText}>{formatDate(selectedAssignment.dueDate)}</Text>
              </View>
            </View>
            
            <View style={styles.detailsSection}>
              <Text style={styles.sectionTitle}>Assignment Overview</Text>
              <View style={styles.overviewGrid}>
                <View style={styles.overviewItem}>
                  <FileText size={20} color="#4299E1" />
                  <Text style={styles.overviewValue}>{selectedAssignment.questions}</Text>
                  <Text style={styles.overviewLabel}>Questions</Text>
                </View>
                
                <View style={styles.overviewItem}>
                  <Clock size={20} color="#48BB78" />
                  <Text style={styles.overviewValue}>{selectedAssignment.estimatedTime}</Text>
                  <Text style={styles.overviewLabel}>Minutes</Text>
                </View>
                
                <View style={styles.overviewItem}>
                  <CheckCircle size={20} color="#F59E0B" />
                  <Text style={styles.overviewValue}>{selectedAssignment.points}</Text>
                  <Text style={styles.overviewLabel}>Points</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.detailsSection}>
              <Text style={styles.sectionTitle}>Instructions</Text>
              <Text style={styles.instructionsText}>
                Complete all questions in this assignment. Read each question carefully before answering.
                You can save your progress and return later to complete the assignment.
                Once submitted, the AI will grade your work and provide feedback.
              </Text>
            </View>
            
            <View style={styles.questionPreview}>
              <Text style={styles.sectionTitle}>Questions Preview</Text>
              <View style={styles.questionItem}>
                <Text style={styles.questionNumber}>1</Text>
                <View style={styles.questionContent}>
                  <Text style={styles.questionText}>
                    {selectedAssignment.subject === 'Mathematics' 
                      ? 'Solve for x: 3x + 5 = 20' 
                      : selectedAssignment.subject === 'English'
                      ? 'Write a 500-word essay on the effects of climate change.'
                      : 'Describe the process of photosynthesis.'}
                  </Text>
                  <Text style={styles.questionType}>
                    {selectedAssignment.subject === 'Mathematics' 
                      ? 'Multiple Choice' 
                      : selectedAssignment.subject === 'English'
                      ? 'Essay'
                      : 'Short Answer'}
                  </Text>
                </View>
                <Text style={styles.questionPoints}>5 pts</Text>
              </View>
              
              <Text style={styles.moreQuestionsText}>
                + {selectedAssignment.questions - 1} more question{selectedAssignment.questions - 1 !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        </ScrollView>
        
        <View style={styles.detailsFooter}>
          <TouchableOpacity
            style={[
              styles.startButton,
              selectedAssignment.status === 'completed' ? styles.viewResultsButton : {}
            ]}
            onPress={() => router.push('/homework/assignment')}
          >
            <Text style={styles.startButtonText}>
              {selectedAssignment.status === 'completed' 
                ? 'View Results' 
                : selectedAssignment.status === 'in-progress'
                ? 'Continue Assignment'
                : 'Start Assignment'}
            </Text>
            <ChevronRight size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <DevModeIndicator />
      
      {showAssignmentDetails ? (
        renderAssignmentDetails()
      ) : (
        <>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Homework</Text>
            <Text style={styles.headerSubtitle}>Manage your assignments</Text>
            
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => router.push('/homework/create')}
            >
              <Plus size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Search and Filter */}
          <Animated.View
            style={[
              styles.searchContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.searchBar}>
              <Search size={20} color="#A0AEC0" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search assignments..."
                placeholderTextColor="#A0AEC0"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#4299E1" />
            </TouchableOpacity>
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
              style={[styles.tab, activeTab === 'all' && styles.activeTab]}
              onPress={() => setActiveTab('all')}
            >
              <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
              onPress={() => setActiveTab('pending')}
            >
              <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>
                Pending
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
              onPress={() => setActiveTab('completed')}
            >
              <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
                Completed
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Subject Filters */}
          <Animated.View
            style={[
              styles.subjectsContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.subjectsScrollContent}
            >
              <TouchableOpacity
                style={[
                  styles.subjectFilter,
                  selectedSubject === null && styles.selectedSubjectFilter,
                ]}
                onPress={() => setSelectedSubject(null)}
              >
                <Text style={[
                  styles.subjectFilterText,
                  selectedSubject === null && styles.selectedSubjectFilterText,
                ]}>
                  All Subjects
                </Text>
              </TouchableOpacity>
              
              {subjects.map((subject) => (
                <TouchableOpacity
                  key={subject.id}
                  style={[
                    styles.subjectFilter,
                    { backgroundColor: `${subject.color}15` },
                    selectedSubject === subject.name && styles.selectedSubjectFilter,
                    selectedSubject === subject.name && { backgroundColor: subject.color },
                  ]}
                  onPress={() => setSelectedSubject(selectedSubject === subject.name ? null : subject.name)}
                >
                  <Text style={[
                    styles.subjectFilterText,
                    { color: subject.color },
                    selectedSubject === subject.name && styles.selectedSubjectFilterText,
                  ]}>
                    {subject.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>

          {/* Assignments List */}
          <Animated.View
            style={[
              styles.assignmentsContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {filteredAssignments.length === 0 ? (
              <View style={styles.emptyState}>
                <FileText size={64} color="#A0AEC0" />
                <Text style={styles.emptyTitle}>No assignments found</Text>
                <Text style={styles.emptyDescription}>
                  {searchQuery 
                    ? 'Try adjusting your search or filters' 
                    : activeTab === 'completed' 
                    ? 'You haven\'t completed any assignments yet'
                    : 'You don\'t have any pending assignments'}
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredAssignments}
                renderItem={renderAssignmentCard}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.assignmentsList}
                numColumns={Platform.OS === 'web' && Platform.isPad ? 2 : 1}
                key={Platform.OS === 'web' && Platform.isPad ? 'two-column' : 'one-column'}
                columnWrapperStyle={Platform.OS === 'web' && Platform.isPad ? styles.columnWrapper : undefined}
              />
            )}
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginTop: 4,
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4299E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    marginLeft: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
  },
  activeTab: {
    backgroundColor: '#4299E1',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  activeTabText: {
    color: 'white',
  },
  subjectsContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  subjectsScrollContent: {
    paddingHorizontal: 20,
  },
  subjectFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F7FAFC',
  },
  selectedSubjectFilter: {
    backgroundColor: '#4299E1',
  },
  subjectFilterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  selectedSubjectFilterText: {
    color: 'white',
  },
  assignmentsContainer: {
    flex: 1,
    paddingTop: 16,
  },
  assignmentsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  assignmentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
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
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  subjectTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  subjectText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  assignmentImage: {
    width: '100%',
    height: 150,
  },
  assignmentContent: {
    padding: 16,
  },
  assignmentTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  gradeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
    marginBottom: 12,
  },
  assignmentMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginLeft: 6,
  },
  daysRemaining: {
    color: '#F59E0B',
  },
  urgentDays: {
    color: '#EF4444',
  },
  assignmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F7FAFC',
  },
  pointsText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
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
  detailsContainer: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  detailsHeader: {
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
  detailsTitle: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  detailsContent: {
    flex: 1,
    padding: 20,
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  detailsCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailsImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailsAssignmentTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  detailsGradeText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#718096',
    marginBottom: 24,
  },
  detailsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 12,
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    marginLeft: 12,
  },
  overviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
  },
  overviewValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginTop: 8,
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  instructionsText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 24,
  },
  questionPreview: {
    marginTop: 8,
  },
  questionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  questionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4299E1',
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  questionContent: {
    flex: 1,
    marginRight: 12,
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
    marginBottom: 8,
  },
  questionType: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  questionPoints: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
  },
  moreQuestionsText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
    textAlign: 'center',
    marginTop: 8,
  },
  detailsFooter: {
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  startButton: {
    backgroundColor: '#4299E1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#4299E1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  viewResultsButton: {
    backgroundColor: '#10B981',
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    marginRight: 8,
  },
});