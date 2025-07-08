import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Search, Filter, Plus, Clock, FileText, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle, BookOpen, Calendar } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

// Mock data for assignments
const mockAssignments = [
  {
    id: '1',
    title: 'Mathematics Assignment: Algebra Basics',
    subject: 'Mathematics',
    grade: 'Grade 8',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    status: 'pending',
    questions: 15,
    estimatedTime: 45, // minutes
    thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'English Grammar: Parts of Speech',
    subject: 'English',
    grade: 'Grade 8',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    status: 'in-progress',
    questions: 20,
    estimatedTime: 60, // minutes
    thumbnail: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: 'Science: States of Matter',
    subject: 'Science',
    grade: 'Grade 8',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    status: 'completed',
    questions: 12,
    estimatedTime: 30, // minutes
    thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    score: 85
  },
  {
    id: '4',
    title: 'Social Studies: Geography of Kenya',
    subject: 'Social Studies',
    grade: 'Grade 8',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    status: 'pending',
    questions: 18,
    estimatedTime: 50, // minutes
    thumbnail: 'https://images.pexels.com/photos/631522/pexels-photo-631522.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    title: 'Kiswahili: Uandishi wa Barua',
    subject: 'Kiswahili',
    grade: 'Grade 8',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    status: 'pending',
    questions: 10,
    estimatedTime: 40, // minutes
    thumbnail: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    title: 'Home Science: Food and Nutrition',
    subject: 'Home Science',
    grade: 'Grade 8',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: 'completed',
    questions: 15,
    estimatedTime: 45, // minutes
    thumbnail: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
    score: 92
  }
];

// Status colors
const statusColors = {
  pending: '#F59E0B',
  'in-progress': '#3B82F6',
  completed: '#10B981',
  overdue: '#EF4444'
};

// Status icons
const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return <AlertCircle size={16} color={statusColors.pending} />;
    case 'in-progress':
      return <Clock size={16} color={statusColors['in-progress']} />;
    case 'completed':
      return <CheckCircle size={16} color={statusColors.completed} />;
    case 'overdue':
      return <XCircle size={16} color={statusColors.overdue} />;
    default:
      return null;
  }
};

// Format date to display
const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Calculate days remaining
const getDaysRemaining = (dueDate: Date) => {
  const today = new Date();
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return { text: `${Math.abs(diffDays)} days overdue`, status: 'overdue' };
  } else if (diffDays === 0) {
    return { text: 'Due today', status: 'pending' };
  } else if (diffDays === 1) {
    return { text: 'Due tomorrow', status: 'pending' };
  } else {
    return { text: `${diffDays} days left`, status: 'pending' };
  }
};

export default function HomeworkScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [assignments, setAssignments] = useState(mockAssignments);
  const [loading, setLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter assignments based on search query and selected filter
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') {
      return matchesSearch;
    } else {
      let status = assignment.status;
      
      // Check if assignment is overdue
      if (status === 'pending' && assignment.dueDate < new Date()) {
        status = 'overdue';
      }
      
      return matchesSearch && status === selectedFilter;
    }
  });

  const handleAssignmentPress = (assignmentId: string) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (assignment?.status === 'completed') {
      router.push({
        pathname: '/homework/results',
        params: { id: assignmentId }
      });
    } else {
      router.push({
        pathname: '/homework/assignment',
        params: { id: assignmentId }
      });
    }
  };

  const handleCreateAssignment = () => {
    router.push('/homework/create');
  };

  return (
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
        <Text style={styles.headerTitle}>Homework</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateAssignment}
        >
          <Plus size={24} color="#4299E1" />
        </TouchableOpacity>
      </View>
      
      {/* Search and Filter */}
      <View style={styles.searchContainer}>
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
      </View>
      
      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterTabs}
      >
        {['all', 'pending', 'in-progress', 'completed', 'overdue'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              selectedFilter === filter && styles.activeFilterTab,
              selectedFilter === filter && { borderColor: statusColors[filter as keyof typeof statusColors] || '#4299E1' }
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterTabText,
              selectedFilter === filter && styles.activeFilterTabText,
              selectedFilter === filter && { color: statusColors[filter as keyof typeof statusColors] || '#4299E1' }
            ]}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Assignments List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4299E1" />
          <Text style={styles.loadingText}>Loading assignments...</Text>
        </View>
      ) : filteredAssignments.length > 0 ? (
        <ScrollView 
          style={styles.assignmentsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.assignmentsContent}
        >
          {filteredAssignments.map((assignment) => {
            // Check if assignment is overdue
            let status = assignment.status;
            if (status === 'pending' && assignment.dueDate < new Date()) {
              status = 'overdue';
            }
            
            const daysRemaining = getDaysRemaining(assignment.dueDate);
            
            return (
              <TouchableOpacity
                key={assignment.id}
                style={styles.assignmentCard}
                onPress={() => handleAssignmentPress(assignment.id)}
              >
                <Image 
                  source={{ uri: assignment.thumbnail }} 
                  style={styles.assignmentThumbnail}
                />
                
                <View style={styles.assignmentContent}>
                  <View style={styles.assignmentHeader}>
                    <Text style={styles.assignmentSubject}>{assignment.subject}</Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: `${statusColors[status as keyof typeof statusColors]}15` }
                    ]}>
                      <StatusIcon status={status} />
                      <Text style={[
                        styles.statusText,
                        { color: statusColors[status as keyof typeof statusColors] }
                      ]}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={styles.assignmentTitle} numberOfLines={2}>
                    {assignment.title}
                  </Text>
                  
                  <View style={styles.assignmentFooter}>
                    <View style={styles.assignmentMeta}>
                      <View style={styles.metaItem}>
                        <Calendar size={14} color="#718096" />
                        <Text style={styles.metaText}>
                          {formatDate(assignment.dueDate)}
                        </Text>
                      </View>
                      
                      <View style={styles.metaItem}>
                        <Clock size={14} color="#718096" />
                        <Text style={styles.metaText}>
                          {assignment.estimatedTime} min
                        </Text>
                      </View>
                    </View>
                    
                    <View style={[
                      styles.dueBadge,
                      { 
                        backgroundColor: `${statusColors[daysRemaining.status as keyof typeof statusColors]}15`,
                        borderColor: `${statusColors[daysRemaining.status as keyof typeof statusColors]}30`
                      }
                    ]}>
                      <Text style={[
                        styles.dueText,
                        { color: statusColors[daysRemaining.status as keyof typeof statusColors] }
                      ]}>
                        {daysRemaining.text}
                      </Text>
                    </View>
                  </View>
                  
                  {status === 'completed' && (
                    <View style={styles.scoreContainer}>
                      <Text style={styles.scoreText}>
                        Score: <Text style={styles.scoreValue}>{assignment.score}%</Text>
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
          
          <View style={{ height: 100 }} />
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <FileText size={64} color="#A0AEC0" />
          <Text style={styles.emptyTitle}>No assignments found</Text>
          <Text style={styles.emptyDescription}>
            {searchQuery 
              ? "Try adjusting your search or filters" 
              : "You don't have any assignments yet"}
          </Text>
          
          <TouchableOpacity
            style={styles.createAssignmentButton}
            onPress={handleCreateAssignment}
          >
            <Plus size={20} color="white" />
            <Text style={styles.createAssignmentText}>Create Assignment</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  filterTabs: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 12,
  },
  activeFilterTab: {
    backgroundColor: '#F7FAFC',
  },
  filterTabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  activeFilterTabText: {
    fontFamily: 'Inter-SemiBold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#718096',
    marginTop: 16,
  },
  assignmentsList: {
    flex: 1,
  },
  assignmentsContent: {
    padding: 20,
  },
  assignmentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
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
  assignmentThumbnail: {
    width: '100%',
    height: 120,
    backgroundColor: '#F7FAFC',
  },
  assignmentContent: {
    padding: 16,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  assignmentSubject: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4299E1',
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
  assignmentTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 12,
    lineHeight: 22,
  },
  assignmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assignmentMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  dueBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  dueText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  scoreContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  scoreText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  scoreValue: {
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
  emptyState: {
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
    marginBottom: 24,
  },
  createAssignmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4299E1',
    paddingHorizontal: 20,
    paddingVertical: 12,
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
  createAssignmentText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    marginLeft: 8,
  },
});