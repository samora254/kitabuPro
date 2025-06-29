import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, ChevronRight, Brain, BookOpen, FileCheck, ArrowLeft } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

const { width, height } = Dimensions.get('window');

export default function SubjectDetail() {
  const { id } = useLocalSearchParams();
  const [currentTopic, setCurrentTopic] = useState(1);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getSubjectInfo = (subjectId: string) => {
    const subjects: Record<string, any> = {
      'mathematics': {
        name: 'Mathematics',
        color: '#008000',
        topics: ['Numbers', 'Algebra', 'Geometry', 'Statistics', 'Probability'],
        progress: 20,
      },
      'english': {
        name: 'English',
        color: '#008000',
        topics: ['Grammar', 'Reading', 'Writing', 'Literature', 'Speaking', 'Listening'],
        progress: 15,
      },
      'science': {
        name: 'Science',
        color: '#008000',
        topics: ['Matter', 'Energy', 'Life Science', 'Earth Science', 'Chemistry', 'Physics', 'Biology', 'Environment'],
        progress: 30,
      },
      'social-studies': {
        name: 'Social Studies',
        color: '#008000',
        topics: ['Geography', 'History', 'Civics', 'Economics'],
        progress: 10,
      },
    };
    
    return subjects[subjectId as string] || subjects['mathematics'];
  };

  const subject = getSubjectInfo(id as string);
  const totalTopics = subject.topics.length;

  const activities = [
    {
      title: 'Brain Tease',
      description: 'Warm up your mind with quick exercises',
      icon: Brain,
      color: '#008000',
      action: 'Start Challenge',
    },
    {
      title: "Let's Learn",
      description: 'Master the concepts with interactive lessons',
      icon: BookOpen,
      color: '#4299E1',
      action: 'Start Learning',
    },
    {
      title: 'Take Quiz',
      description: 'Check your understanding with a quiz',
      icon: FileCheck,
      color: '#8B5CF6',
      action: 'Take Quiz',
    },
  ];

  const navigateTopic = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentTopic > 1) {
      setCurrentTopic(currentTopic - 1);
    } else if (direction === 'next' && currentTopic < totalTopics) {
      setCurrentTopic(currentTopic + 1);
    }
  };

  return (
    <View style={styles.container}>
      <DevModeIndicator />
      
      {/* Compact Header */}
      <Animated.View
        style={[
          styles.compactHeader,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#2D3748" />
        </TouchableOpacity>
        <Text style={styles.subjectTitle}>{subject.name}</Text>
        <View style={styles.headerSpacer} />
      </Animated.View>

      {/* Topic Navigation */}
      <Animated.View
        style={[
          styles.topicNavigation,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.navButton, currentTopic === 1 && styles.navButtonDisabled]}
          onPress={() => navigateTopic('prev')}
          disabled={currentTopic === 1}
        >
          <ChevronLeft size={18} color={currentTopic === 1 ? "#A0AEC0" : "#718096"} />
        </TouchableOpacity>
        
        <View style={styles.topicInfo}>
          <Text style={styles.topicCounter}>Topic {currentTopic} of {totalTopics}</Text>
          <Text style={styles.topicName}>{subject.topics[currentTopic - 1]}</Text>
        </View>
        
        <TouchableOpacity
          style={[styles.navButton, currentTopic === totalTopics && styles.navButtonDisabled]}
          onPress={() => navigateTopic('next')}
          disabled={currentTopic === totalTopics}
        >
          <ChevronRight size={18} color={currentTopic === totalTopics ? "#A0AEC0" : "#718096"} />
        </TouchableOpacity>
      </Animated.View>

      {/* Progress Bar */}
      <Animated.View
        style={[
          styles.progressSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${subject.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{subject.progress}% Complete</Text>
      </Animated.View>

      {/* Activities - Optimized for viewport */}
      <Animated.View
        style={[
          styles.activitiesContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
              </View>
              <View style={[styles.activityIcon, { backgroundColor: `${activity.color}20` }]}>
                <activity.icon size={24} color={activity.color} />
              </View>
            </View>
            
            <TouchableOpacity
              style={[styles.activityButton, { backgroundColor: activity.color }]}
            >
              <Text style={styles.activityButtonText}>{activity.action}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 20,
  },
  compactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 12,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  subjectTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
  topicNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  topicInfo: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  topicCounter: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 2,
  },
  topicName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  progressSection: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#008000',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#008000',
    textAlign: 'center',
  },
  activitiesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    lineHeight: 18,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  activityButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  activityButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});