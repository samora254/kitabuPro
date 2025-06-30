import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
<<<<<<< HEAD
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, ChevronRight, Brain, BookOpen, FileCheck, ArrowLeft, Lightbulb, Zap, Target, Clock, Video, FileText, Headphones, ExternalLink } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
import CurriculumService from '@/services/curriculumService';
import { useCurriculumAI } from '@/hooks/useCurriculumAI';
import { Topic, Resource, Activity, Assessment } from '@/constants/curriculum';
=======
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, ChevronRight, Brain, BookOpen, FileCheck, ArrowLeft } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1

const { width, height } = Dimensions.get('window');

export default function SubjectDetail() {
  const { id } = useLocalSearchParams();
<<<<<<< HEAD
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [curriculum, setCurriculum] = useState<any>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'activities' | 'assessments'>('overview');
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [isLoadingCurriculum, setIsLoadingCurriculum] = useState(true);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Initialize AI hook
  const { generateExplanation, loading: aiLoading, error: aiError } = useCurriculumAI({ 
    userId: 'current-user' // In a real app, this would be the actual user ID
  });

=======
  const [currentTopic, setCurrentTopic] = useState(1);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
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
<<<<<<< HEAD

    // Load curriculum data
    loadCurriculumData();
  }, [id]);

  useEffect(() => {
    if (topics.length > 0 && currentTopicIndex >= 0 && currentTopicIndex < topics.length) {
      setCurrentTopic(topics[currentTopicIndex]);
      
      // Generate AI explanation for the current topic
      if (topics[currentTopicIndex]) {
        handleGenerateExplanation(topics[currentTopicIndex].id);
      }
    }
  }, [topics, currentTopicIndex]);

  const loadCurriculumData = async () => {
    setIsLoadingCurriculum(true);
    try {
      // Get subject info
      const subjectId = id as string;
      let subjectName = '';
      
      // Map subject ID to curriculum subject
      switch (subjectId) {
        case 'mathematics':
          subjectName = 'Mathematics';
          break;
        case 'science':
          subjectName = 'Science';
          break;
        case 'english':
          subjectName = 'English';
          break;
        case 'social-studies':
          subjectName = 'Social Studies';
          break;
        default:
          subjectName = 'Mathematics';
      }
      
      // Get curriculum for this subject
      const curricula = CurriculumService.getCurriculaBySubjectAndGrade(subjectName, 'Grade 8');
      
      if (curricula.length > 0) {
        setCurriculum(curricula[0]);
        
        // Extract all topics from all units
        const allTopics: Topic[] = [];
        curricula[0].units.forEach(unit => {
          unit.topics.forEach(topic => {
            allTopics.push(topic);
          });
        });
        
        setTopics(allTopics);
        setCurrentTopicIndex(0);
      }
    } catch (error) {
      console.error('Error loading curriculum:', error);
    } finally {
      setIsLoadingCurriculum(false);
    }
  };

  const handleGenerateExplanation = async (topicId: string) => {
    setIsLoadingAI(true);
    try {
      const explanation = await generateExplanation(topicId, 'standard');
      setAiExplanation(explanation);
    } catch (error) {
      console.error('Error generating explanation:', error);
      setAiExplanation('Sorry, I could not generate an explanation for this topic at the moment.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  const navigateTopic = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1);
    } else if (direction === 'next' && currentTopicIndex < topics.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'article':
        return FileText;
      case 'interactive':
        return Zap;
      case 'document':
        return FileText;
      case 'quiz':
        return FileCheck;
      case 'exercise':
        return Target;
      default:
        return FileText;
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
  };

  const renderResourceItem = (resource: Resource) => {
    const ResourceIcon = getResourceIcon(resource.type);
    
    return (
      <TouchableOpacity 
        key={resource.id} 
        style={styles.resourceItem}
        onPress={() => console.log('Open resource:', resource.url)}
      >
        <View style={styles.resourceContent}>
          {resource.thumbnailUrl ? (
            <Image 
              source={{ uri: resource.thumbnailUrl }} 
              style={styles.resourceThumbnail} 
            />
          ) : (
            <View style={[styles.resourceIconContainer, { backgroundColor: '#EBF8FF' }]}>
              <ResourceIcon size={24} color="#4299E1" />
            </View>
          )}
          
          <View style={styles.resourceInfo}>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceDescription} numberOfLines={2}>{resource.description}</Text>
            
            <View style={styles.resourceMeta}>
              <View style={styles.metaItem}>
                <Clock size={12} color="#718096" />
                <Text style={styles.metaText}>{formatDuration(resource.duration || 0)}</Text>
              </View>
              
              <View style={[styles.resourceTypeBadge, { 
                backgroundColor: 
                  resource.type === 'video' ? '#FEF5FF' : 
                  resource.type === 'interactive' ? '#F0FFF4' : 
                  '#EBF8FF'
              }]}>
                <Text style={[styles.resourceTypeText, {
                  color: 
                    resource.type === 'video' ? '#805AD5' : 
                    resource.type === 'interactive' ? '#48BB78' : 
                    '#4299E1'
                }]}>
                  {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                </Text>
              </View>
            </View>
          </View>
          
          <ExternalLink size={16} color="#A0AEC0" />
        </View>
      </TouchableOpacity>
    );
  };

  const renderActivityItem = (activity: Activity) => {
    return (
      <View key={activity.id} style={styles.activityItem}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>{activity.title}</Text>
          <View style={styles.activityTypeBadge}>
            <Text style={styles.activityTypeText}>{activity.type}</Text>
          </View>
        </View>
        
        <Text style={styles.activityDescription}>{activity.description}</Text>
        
        <View style={styles.activityMeta}>
          <View style={styles.metaItem}>
            <Clock size={12} color="#718096" />
            <Text style={styles.metaText}>{formatDuration(activity.duration)}</Text>
          </View>
          
          <View style={[styles.difficultyBadge, {
            backgroundColor: 
              activity.difficulty === 'beginner' ? '#F0FFF4' :
              activity.difficulty === 'advanced' ? '#FFF5F5' :
              '#FFFAF0'
          }]}>
            <Text style={[styles.difficultyText, {
              color: 
                activity.difficulty === 'beginner' ? '#48BB78' :
                activity.difficulty === 'advanced' ? '#E53E3E' :
                '#ED8936'
            }]}>
              {activity.difficulty.charAt(0).toUpperCase() + activity.difficulty.slice(1)}
            </Text>
          </View>
        </View>
        
        {activity.steps.length > 0 && (
          <View style={styles.activitySteps}>
            <Text style={styles.stepsTitle}>Steps:</Text>
            {activity.steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderAssessmentItem = (assessment: Assessment) => {
    return (
      <TouchableOpacity 
        key={assessment.id} 
        style={styles.assessmentItem}
        onPress={() => console.log('Open assessment:', assessment.id)}
      >
        <View style={styles.assessmentHeader}>
          <Text style={styles.assessmentTitle}>{assessment.title}</Text>
          <View style={[styles.assessmentTypeBadge, {
            backgroundColor: 
              assessment.type === 'quiz' ? '#EBF8FF' :
              assessment.type === 'test' ? '#FEF5FF' :
              '#F0FFF4'
          }]}>
            <Text style={[styles.assessmentTypeText, {
              color: 
                assessment.type === 'quiz' ? '#4299E1' :
                assessment.type === 'test' ? '#805AD5' :
                '#48BB78'
            }]}>
              {assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.assessmentDescription}>{assessment.description}</Text>
        
        <View style={styles.assessmentMeta}>
          <View style={styles.metaItem}>
            <Clock size={12} color="#718096" />
            <Text style={styles.metaText}>{formatDuration(assessment.duration)}</Text>
          </View>
          
          <View style={styles.metaItem}>
            <Target size={12} color="#718096" />
            <Text style={styles.metaText}>{assessment.passingScore}/{assessment.totalPoints} to pass</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoadingCurriculum) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4299E1" />
        <Text style={styles.loadingText}>Loading curriculum...</Text>
      </View>
    );
  }

=======
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

>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
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
<<<<<<< HEAD
        <Text style={styles.subjectTitle}>{curriculum?.subject || 'Subject'}</Text>
=======
        <Text style={styles.subjectTitle}>{subject.name}</Text>
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
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
<<<<<<< HEAD
          style={[styles.navButton, currentTopicIndex === 0 && styles.navButtonDisabled]}
          onPress={() => navigateTopic('prev')}
          disabled={currentTopicIndex === 0}
        >
          <ChevronLeft size={18} color={currentTopicIndex === 0 ? "#A0AEC0" : "#718096"} />
        </TouchableOpacity>
        
        <View style={styles.topicInfo}>
          <Text style={styles.topicCounter}>Topic {currentTopicIndex + 1} of {topics.length}</Text>
          <Text style={styles.topicName}>{currentTopic?.title || 'Loading...'}</Text>
        </View>
        
        <TouchableOpacity
          style={[styles.navButton, currentTopicIndex === topics.length - 1 && styles.navButtonDisabled]}
          onPress={() => navigateTopic('next')}
          disabled={currentTopicIndex === topics.length - 1}
        >
          <ChevronRight size={18} color={currentTopicIndex === topics.length - 1 ? "#A0AEC0" : "#718096"} />
=======
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
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
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
<<<<<<< HEAD
          <View style={[styles.progressFill, { width: `${((currentTopicIndex + 1) / topics.length) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>{Math.round(((currentTopicIndex + 1) / topics.length) * 100)}% Complete</Text>
      </Animated.View>

      {/* Tab Navigation */}
      <Animated.View
        style={[
          styles.tabContainer,
=======
          <View style={[styles.progressFill, { width: `${subject.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{subject.progress}% Complete</Text>
      </Animated.View>

      {/* Activities - Optimized for viewport */}
      <Animated.View
        style={[
          styles.activitiesContainer,
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
<<<<<<< HEAD
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'resources' && styles.activeTab]}
          onPress={() => setActiveTab('resources')}
        >
          <Text style={[styles.tabText, activeTab === 'resources' && styles.activeTabText]}>Resources</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'activities' && styles.activeTab]}
          onPress={() => setActiveTab('activities')}
        >
          <Text style={[styles.tabText, activeTab === 'activities' && styles.activeTabText]}>Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'assessments' && styles.activeTab]}
          onPress={() => setActiveTab('assessments')}
        >
          <Text style={[styles.tabText, activeTab === 'assessments' && styles.activeTabText]}>Assessments</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Content */}
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'overview' && currentTopic && (
          <View style={styles.overviewContainer}>
            <View style={styles.topicDescriptionCard}>
              <Text style={styles.topicDescription}>{currentTopic.description}</Text>
            </View>
            
            {currentTopic.keyTerms.length > 0 && (
              <View style={styles.keyTermsContainer}>
                <Text style={styles.sectionTitle}>Key Terms</Text>
                {currentTopic.keyTerms.map((term, index) => (
                  <View key={index} style={styles.keyTermItem}>
                    <Text style={styles.termName}>{term.term}</Text>
                    <Text style={styles.termDefinition}>{term.definition}</Text>
                  </View>
                ))}
              </View>
            )}
            
            {currentTopic.learningObjectives.length > 0 && (
              <View style={styles.objectivesContainer}>
                <Text style={styles.sectionTitle}>Learning Objectives</Text>
                {currentTopic.learningObjectives.map((objective, index) => (
                  <View key={index} style={styles.objectiveItem}>
                    <View style={styles.objectiveBullet}>
                      <Target size={16} color="#4299E1" />
                    </View>
                    <Text style={styles.objectiveText}>{objective.description}</Text>
                  </View>
                ))}
              </View>
            )}
            
            <View style={styles.aiExplanationContainer}>
              <View style={styles.aiExplanationHeader}>
                <Lightbulb size={20} color="#805AD5" />
                <Text style={styles.aiExplanationTitle}>AI-Powered Explanation</Text>
              </View>
              
              {isLoadingAI ? (
                <View style={styles.aiLoadingContainer}>
                  <ActivityIndicator size="small" color="#805AD5" />
                  <Text style={styles.aiLoadingText}>Generating explanation...</Text>
                </View>
              ) : (
                <Text style={styles.aiExplanationText}>{aiExplanation}</Text>
              )}
              
              <TouchableOpacity 
                style={styles.regenerateButton}
                onPress={() => currentTopic && handleGenerateExplanation(currentTopic.id)}
                disabled={isLoadingAI}
              >
                <Text style={styles.regenerateButtonText}>Regenerate Explanation</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {activeTab === 'resources' && currentTopic && (
          <View style={styles.resourcesContainer}>
            {currentTopic.resources.length > 0 ? (
              currentTopic.resources.map(resource => renderResourceItem(resource))
            ) : (
              <View style={styles.emptyStateContainer}>
                <FileText size={48} color="#A0AEC0" />
                <Text style={styles.emptyStateText}>No resources available for this topic</Text>
              </View>
            )}
          </View>
        )}
        
        {activeTab === 'activities' && currentTopic && (
          <View style={styles.activitiesContainer}>
            {currentTopic.activities.length > 0 ? (
              currentTopic.activities.map(activity => renderActivityItem(activity))
            ) : (
              <View style={styles.emptyStateContainer}>
                <Zap size={48} color="#A0AEC0" />
                <Text style={styles.emptyStateText}>No activities available for this topic</Text>
              </View>
            )}
          </View>
        )}
        
        {activeTab === 'assessments' && currentTopic && (
          <View style={styles.assessmentsContainer}>
            {currentTopic.assessments.length > 0 ? (
              currentTopic.assessments.map(assessment => renderAssessmentItem(assessment))
            ) : (
              <View style={styles.emptyStateContainer}>
                <FileCheck size={48} color="#A0AEC0" />
                <Text style={styles.emptyStateText}>No assessments available for this topic</Text>
              </View>
            )}
          </View>
        )}
        
        <View style={{ height: 100 }} />
      </ScrollView>
=======
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
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
<<<<<<< HEAD
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
=======
    paddingHorizontal: 20,
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
  },
  compactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
<<<<<<< HEAD
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
=======
    paddingBottom: 12,
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
<<<<<<< HEAD
    backgroundColor: '#F7FAFC',
=======
    backgroundColor: 'white',
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
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
<<<<<<< HEAD
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 12,
=======
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
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
<<<<<<< HEAD
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#718096',
    marginBottom: 4,
  },
  topicName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    textAlign: 'center',
  },
  progressSection: {
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 16,
=======
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
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
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
<<<<<<< HEAD
    backgroundColor: '#4299E1',
=======
    backgroundColor: '#008000',
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
<<<<<<< HEAD
    color: '#4299E1',
    textAlign: 'right',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  overviewContainer: {
    gap: 16,
  },
  topicDescriptionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  topicDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    lineHeight: 24,
  },
  keyTermsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 12,
  },
  keyTermItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  termName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#4299E1',
    marginBottom: 4,
  },
  termDefinition: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 20,
  },
  objectivesContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  objectiveItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  objectiveBullet: {
    marginRight: 12,
    marginTop: 2,
  },
  objectiveText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    lineHeight: 20,
  },
  aiExplanationContainer: {
    backgroundColor: '#F8F7FC',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E9D8FD',
  },
  aiExplanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiExplanationTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#805AD5',
    marginLeft: 8,
  },
  aiLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  aiLoadingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#805AD5',
    marginLeft: 8,
  },
  aiExplanationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    lineHeight: 22,
  },
  regenerateButton: {
    backgroundColor: '#FAF5FF',
    borderWidth: 1,
    borderColor: '#D6BCFA',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
    marginTop: 16,
  },
  regenerateButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#805AD5',
  },
  resourcesContainer: {
    gap: 12,
  },
  resourceItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resourceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceThumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  resourceIconContainer: {
    width: 80,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resourceInfo: {
    flex: 1,
    marginRight: 8,
  },
  resourceTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginBottom: 8,
  },
  resourceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginLeft: 4,
  },
  resourceTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  resourceTypeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  activitiesContainer: {
    gap: 16,
  },
  activityItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
=======
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
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
<<<<<<< HEAD
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  activityTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginRight: 8,
  },
  activityTypeBadge: {
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activityTypeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#4299E1',
=======
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
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
  },
  activityDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
<<<<<<< HEAD
    color: '#4A5568',
    lineHeight: 20,
    marginBottom: 12,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  activitySteps: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 12,
  },
  stepsTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 8,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4299E1',
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    marginRight: 8,
    lineHeight: 20,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 20,
  },
  assessmentsContainer: {
    gap: 16,
  },
  assessmentItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  assessmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  assessmentTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginRight: 8,
  },
  assessmentTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  assessmentTypeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  assessmentDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 20,
    marginBottom: 12,
  },
  assessmentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#718096',
    marginTop: 16,
    textAlign: 'center',
=======
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
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
  },
});