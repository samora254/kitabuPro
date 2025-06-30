import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Book, BookOpen, Calculator, Globe, Beaker, Users, Heart, Utensils, Scissors, Chrome as Home, ChevronRight } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

export default function CurriculumScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const subjects = [
    { id: 'mathematics', name: 'Mathematics', icon: Calculator, color: '#FF6B6B', topics: 24 },
    { id: 'english', name: 'English', icon: BookOpen, color: '#4ECDC4', topics: 18 },
    { id: 'science', name: 'Science', icon: Beaker, color: '#45B7D1', topics: 32 },
    { id: 'social-studies', name: 'Social Studies', icon: Users, color: '#96CEB4', topics: 15 },
    { id: 'home-science', name: 'Home Science', icon: Utensils, color: '#FF9A8B', topics: 20 },
  ];

  const recentTopics = [
    {
      id: 'kitchen-garden',
      title: 'Kitchen Garden',
      subject: 'Home Science',
      progress: 75,
      image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'cooking-starchy-carbohydrates',
      title: 'Cooking Starchy Carbohydrates',
      subject: 'Home Science',
      progress: 40,
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'artificial-textile-fibers',
      title: 'Artificial Textile Fibers',
      subject: 'Home Science',
      progress: 60,
      image: 'https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
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

  const navigateToSubject = (subjectId: string) => {
    router.push(`/subjects/${subjectId}`);
  };

  const navigateToTopic = (topicId: string) => {
    router.push(`/curriculum`);
  };

  return (
    <View style={styles.container}>
      <DevModeIndicator />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Curriculum</Text>
        <Text style={styles.headerSubtitle}>Grade 8 Learning Materials</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Recent Topics */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue Learning</Text>
            <TouchableOpacity onPress={() => router.push('/curriculum')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentTopicsContainer}
          >
            {recentTopics.map((topic) => (
              <TouchableOpacity
                key={topic.id}
                style={styles.topicCard}
                onPress={() => navigateToTopic(topic.id)}
              >
                <Image 
                  source={{ uri: topic.image }} 
                  style={styles.topicImage}
                />
                <View style={styles.topicContent}>
                  <Text style={styles.topicSubject}>{topic.subject}</Text>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${topic.progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{topic.progress}%</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Home Science Strands */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Home Science Strands</Text>
          
          <View style={styles.strandsContainer}>
            <TouchableOpacity
              style={styles.strandCard}
              onPress={() => router.push('/curriculum')}
            >
              <View style={[styles.strandIcon, { backgroundColor: '#FF9A8B' }]}>
                <Utensils size={24} color="white" />
              </View>
              <View style={styles.strandInfo}>
                <Text style={styles.strandName}>Foods and Nutrition</Text>
                <Text style={styles.strandTopics}>5 sub-strands</Text>
              </View>
              <ChevronRight size={20} color="#A0AEC0" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.strandCard}
              onPress={() => router.push('/curriculum')}
            >
              <View style={[styles.strandIcon, { backgroundColor: '#8ED1FC' }]}>
                <Users size={24} color="white" />
              </View>
              <View style={styles.strandInfo}>
                <Text style={styles.strandName}>Consumer Education</Text>
                <Text style={styles.strandTopics}>2 sub-strands</Text>
              </View>
              <ChevronRight size={20} color="#A0AEC0" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.strandCard}
              onPress={() => router.push('/curriculum')}
            >
              <View style={[styles.strandIcon, { backgroundColor: '#A463F2' }]}>
                <Scissors size={24} color="white" />
              </View>
              <View style={styles.strandInfo}>
                <Text style={styles.strandName}>Textile and Clothing</Text>
                <Text style={styles.strandTopics}>3 sub-strands</Text>
              </View>
              <ChevronRight size={20} color="#A0AEC0" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.strandCard}
              onPress={() => router.push('/curriculum')}
            >
              <View style={[styles.strandIcon, { backgroundColor: '#4CAF50' }]}>
                <Home size={24} color="white" />
              </View>
              <View style={styles.strandInfo}>
                <Text style={styles.strandName}>Caring for the Family</Text>
                <Text style={styles.strandTopics}>7 sub-strands</Text>
              </View>
              <ChevronRight size={20} color="#A0AEC0" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Subjects */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>All Subjects</Text>
          
          <View style={styles.subjectsContainer}>
            {subjects.map((subject) => (
              <TouchableOpacity
                key={subject.id}
                style={styles.subjectCard}
                onPress={() => navigateToSubject(subject.id)}
              >
                <View style={[styles.subjectIcon, { backgroundColor: subject.color }]}>
                  <subject.icon size={24} color="white" />
                </View>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={styles.subjectTopics}>{subject.topics} topics</Text>
                </View>
                <ChevronRight size={20} color="#A0AEC0" />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Explore Curriculum */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity 
            style={styles.exploreCurriculumCard}
            onPress={() => router.push('/curriculum')}
          >
            <View style={styles.exploreCurriculumContent}>
              <Book size={24} color="white" />
              <View style={styles.exploreCurriculumText}>
                <Text style={styles.exploreCurriculumTitle}>Explore Full Curriculum</Text>
                <Text style={styles.exploreCurriculumDescription}>
                  Access all subjects, topics, and learning materials
                </Text>
              </View>
            </View>
            <ChevronRight size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
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
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
  },
  recentTopicsContainer: {
    paddingRight: 20,
  },
  topicCard: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topicImage: {
    width: '100%',
    height: 140,
  },
  topicContent: {
    padding: 16,
  },
  topicSubject: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
    marginBottom: 4,
  },
  topicTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#48BB78',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#48BB78',
  },
  strandsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  strandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  strandIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  strandInfo: {
    flex: 1,
  },
  strandName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  strandTopics: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  subjectsContainer: {
    gap: 12,
  },
  subjectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  subjectTopics: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  exploreCurriculumCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#4299E1',
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
  exploreCurriculumContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exploreCurriculumText: {
    marginLeft: 16,
  },
  exploreCurriculumTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    marginBottom: 4,
  },
  exploreCurriculumDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
});