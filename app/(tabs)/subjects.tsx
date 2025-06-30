import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { 
  Search,
  Filter,
  BookOpen,
  Calculator,
  Globe,
  Beaker,
  Users,
  Heart,
  Palette,
  Music,
  Zap,
  ChevronRight,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

interface Subject {
  id: string;
  name: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
  icon: any;
  estimatedTime: string;
  rating: number;
}

export default function SubjectsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const categories = ['All', 'Core', 'STEM', 'Languages', 'Arts', 'Life Skills'];

  const subjects: Subject[] = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      description: 'Master numbers, algebra, and problem-solving',
      progress: 75,
      totalLessons: 48,
      completedLessons: 36,
      difficulty: 'Intermediate',
      color: '#FF6B6B',
      icon: Calculator,
      estimatedTime: '2h 30m',
      rating: 4.8,
    },
    {
      id: 'english',
      name: 'English',
      description: 'Improve reading, writing, and communication',
      progress: 60,
      totalLessons: 42,
      completedLessons: 25,
      difficulty: 'Intermediate',
      color: '#4ECDC4',
      icon: BookOpen,
      estimatedTime: '3h 15m',
      rating: 4.6,
    },
    {
      id: 'science',
      name: 'Science',
      description: 'Explore physics, chemistry, and biology',
      progress: 85,
      totalLessons: 56,
      completedLessons: 48,
      difficulty: 'Advanced',
      color: '#45B7D1',
      icon: Beaker,
      estimatedTime: '4h 20m',
      rating: 4.9,
    },
    {
      id: 'social-studies',
      name: 'Social Studies',
      description: 'Learn about history, geography, and culture',
      progress: 40,
      totalLessons: 38,
      completedLessons: 15,
      difficulty: 'Beginner',
      color: '#96CEB4',
      icon: Globe,
      estimatedTime: '2h 45m',
      rating: 4.4,
    },
    {
      id: 'kiswahili',
      name: 'Kiswahili',
      description: 'Master the national language',
      progress: 55,
      totalLessons: 32,
      completedLessons: 18,
      difficulty: 'Intermediate',
      color: '#FFEAA7',
      icon: Users,
      estimatedTime: '2h 10m',
      rating: 4.5,
    },
    {
      id: 'art',
      name: 'Art & Craft',
      description: 'Express creativity through visual arts',
      progress: 30,
      totalLessons: 24,
      completedLessons: 7,
      difficulty: 'Beginner',
      color: '#FD79A8',
      icon: Palette,
      estimatedTime: '1h 50m',
      rating: 4.3,
    },
    {
      id: 'music',
      name: 'Music',
      description: 'Learn rhythm, melody, and instruments',
      progress: 20,
      totalLessons: 28,
      completedLessons: 6,
      difficulty: 'Beginner',
      color: '#A29BFE',
      icon: Music,
      estimatedTime: '2h 00m',
      rating: 4.2,
    },
    {
      id: 'computer',
      name: 'Computer Studies',
      description: 'Digital literacy and programming basics',
      progress: 65,
      totalLessons: 36,
      completedLessons: 23,
      difficulty: 'Intermediate',
      color: '#6C5CE7',
      icon: Zap,
      estimatedTime: '3h 30m',
      rating: 4.7,
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

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
      (selectedCategory === 'Core' && ['mathematics', 'english', 'science', 'social-studies', 'kiswahili'].includes(subject.id)) ||
      (selectedCategory === 'STEM' && ['mathematics', 'science', 'computer'].includes(subject.id)) ||
      (selectedCategory === 'Arts' && ['art', 'music'].includes(subject.id)) ||
      (selectedCategory === 'Languages' && ['english', 'kiswahili'].includes(subject.id));
    
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#48BB78';
      case 'Intermediate': return '#ECC94B';
      case 'Advanced': return '#E53E3E';
      default: return '#A0AEC0';
    }
  };

  const navigateToSubject = (subjectId: string) => {
    router.push(`/subjects/${subjectId}`);
  };

  return (
    <View style={styles.container}>
      <DevModeIndicator />
      
      {/* Header */}
      <View style={styles.header}>
        <Animated.View
          style={[
            styles.headerContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.headerTitle}>My Subjects</Text>
          <Text style={styles.headerSubtitle}>Continue your learning journey</Text>
        </Animated.View>
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
            placeholder="Search subjects..."
            placeholderTextColor="#A0AEC0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#4299E1" />
        </TouchableOpacity>
      </Animated.View>

      {/* Categories */}
      <Animated.View
        style={[
          styles.categoriesContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Subjects List */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={[
            styles.subjectsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {filteredSubjects.map((subject, index) => (
            <TouchableOpacity
              key={subject.id}
              style={styles.subjectCard}
              onPress={() => navigateToSubject(subject.id)}
            >
              <View style={styles.subjectHeader}>
                <View style={[styles.subjectIcon, { backgroundColor: `${subject.color}20` }]}>
                  <subject.icon size={24} color={subject.color} />
                </View>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={styles.subjectDescription}>{subject.description}</Text>
                </View>
                <ChevronRight size={20} color="#A0AEC0" />
              </View>

              <View style={styles.subjectStats}>
                <View style={styles.statItem}>
                  <Clock size={14} color="#718096" />
                  <Text style={styles.statText}>{subject.estimatedTime}</Text>
                </View>
                <View style={styles.statItem}>
                  <BookOpen size={14} color="#718096" />
                  <Text style={styles.statText}>{subject.completedLessons}/{subject.totalLessons}</Text>
                </View>
                <View style={styles.statItem}>
                  <Star size={14} color="#ECC94B" />
                  <Text style={styles.statText}>{subject.rating}</Text>
                </View>
              </View>

              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Progress</Text>
                  <View style={[
                    styles.difficultyBadge, 
                    { backgroundColor: `${getDifficultyColor(subject.difficulty)}20` }
                  ]}>
                    <Text style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(subject.difficulty) }
                    ]}>
                      {subject.difficulty}
                    </Text>
                  </View>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${subject.progress}%`,
                          backgroundColor: subject.color 
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressPercentage}>{subject.progress}%</Text>
                </View>
              </View>

              {subject.progress > 0 && (
                <View style={styles.continueSection}>
                  <TrendingUp size={16} color={subject.color} />
                  <Text style={[styles.continueText, { color: subject.color }]}>
                    Continue Learning
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
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
  categoriesContainer: {
    backgroundColor: 'white',
    paddingBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#4299E1',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  categoryTextActive: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  subjectsContainer: {
    gap: 16,
  },
  subjectCard: {
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
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  subjectIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  subjectDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    lineHeight: 20,
  },
  subjectStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#718096',
    marginLeft: 4,
  },
  progressSection: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
    minWidth: 40,
    textAlign: 'right',
  },
  continueSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F7FAFC',
  },
  continueText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
});