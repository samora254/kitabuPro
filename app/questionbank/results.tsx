import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Trophy, Target, Clock, RotateCcw, Chrome as Home, Share, CircleCheck as CheckCircle, Circle as XCircle, Star } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
import QuestionBankService from '@/services/questionBankService';

export default function QuizResultsScreen() {
  const params = useLocalSearchParams();
  const quizId = params.quizId as string;
  const score = parseInt(params.score as string) || 0;
  const totalPoints = parseInt(params.totalPoints as string) || 0;
  const correctAnswers = parseInt(params.correctAnswers as string) || 0;
  const totalQuestions = parseInt(params.totalQuestions as string) || 0;
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Get quiz data
  const quizSet = QuestionBankService.getQuestionSet(quizId);
  
  // Calculate percentage score
  const percentage = Math.round((score / totalPoints) * 100);
  
  // Determine performance level
  const getPerformanceLevel = () => {
    if (percentage >= 90) return { text: 'Excellent!', color: '#10B981' };
    if (percentage >= 75) return { text: 'Great Job!', color: '#3B82F6' };
    if (percentage >= 60) return { text: 'Good Effort!', color: '#F59E0B' };
    return { text: 'Keep Practicing!', color: '#EF4444' };
  };
  
  const performance = getPerformanceLevel();

  useEffect(() => {
    // Entrance animations
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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Trophy rotation animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleRetakeQuiz = () => {
    router.replace({
      pathname: '/questionbank/quiz',
      params: { quizId }
    });
  };

  const handleGoHome = () => {
    router.replace('/questionbank');
  };

  const handleShareResults = () => {
    // In a real app, this would use the Share API
    alert(`Shared result: ${percentage}% on ${quizSet?.title}`);
  };

  return (
    <View style={styles.container}>
      <DevModeIndicator />
      
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoHome}
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        
        <Animated.View
          style={[
            styles.headerContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.headerTitle}>Quiz Results</Text>
          <Text style={styles.headerSubtitle}>{quizSet?.title || 'Quiz'}</Text>
          
          <Animated.View
            style={[
              styles.trophyContainer,
              {
                transform: [
                  { scale: scaleAnim },
                  {
                    rotate: rotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['-5deg', '5deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            {percentage >= 75 ? (
              <Trophy size={64} color="#FFD700" />
            ) : percentage >= 60 ? (
              <Trophy size={64} color="#C0C0C0" />
            ) : (
              <Trophy size={64} color="#CD7F32" />
            )}
          </Animated.View>
          
          <Text style={[styles.performanceText, { color: performance.color }]}>
            {performance.text}
          </Text>
        </Animated.View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Score Card */}
        <Animated.View
          style={[
            styles.scoreCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.scoreHeader}>
            <Text style={styles.scoreTitle}>Your Score</Text>
            <View style={styles.percentageContainer}>
              <Text style={styles.percentageText}>{percentage}%</Text>
            </View>
          </View>
          
          <View style={styles.scoreDetails}>
            <View style={styles.scoreItem}>
              <Target size={20} color="#4299E1" />
              <Text style={styles.scoreValue}>{score}/{totalPoints}</Text>
              <Text style={styles.scoreLabel}>Points</Text>
            </View>
            
            <View style={styles.scoreDivider} />
            
            <View style={styles.scoreItem}>
              <CheckCircle size={20} color="#10B981" />
              <Text style={styles.scoreValue}>{correctAnswers}/{totalQuestions}</Text>
              <Text style={styles.scoreLabel}>Correct</Text>
            </View>
            
            <View style={styles.scoreDivider} />
            
            <View style={styles.scoreItem}>
              <Clock size={20} color="#F59E0B" />
              <Text style={styles.scoreValue}>{quizSet?.estimatedTime ? Math.round(quizSet.estimatedTime / 60) : 0} min</Text>
              <Text style={styles.scoreLabel}>Time</Text>
            </View>
          </View>
        </Animated.View>
        
        {/* Performance Feedback */}
        <Animated.View
          style={[
            styles.feedbackCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.feedbackTitle}>Performance Analysis</Text>
          
          <View style={styles.feedbackItem}>
            <View style={[
              styles.feedbackIcon,
              { backgroundColor: percentage >= 75 ? '#F0FFF4' : '#FEF2F2' }
            ]}>
              {percentage >= 75 ? (
                <CheckCircle size={20} color="#10B981" />
              ) : (
                <XCircle size={20} color="#EF4444" />
              )}
            </View>
            <View style={styles.feedbackContent}>
              <Text style={styles.feedbackItemTitle}>Overall Performance</Text>
              <Text style={styles.feedbackItemText}>
                {percentage >= 75 
                  ? 'You have a good understanding of this topic!' 
                  : 'You might need more practice with this topic.'}
              </Text>
            </View>
          </View>
          
          <View style={styles.feedbackItem}>
            <View style={[
              styles.feedbackIcon,
              { backgroundColor: '#EBF8FF' }
            ]}>
              <Star size={20} color="#4299E1" />
            </View>
            <View style={styles.feedbackContent}>
              <Text style={styles.feedbackItemTitle}>Strengths</Text>
              <Text style={styles.feedbackItemText}>
                {percentage >= 90 
                  ? 'Excellent mastery of the subject matter!'
                  : percentage >= 75 
                  ? 'Good grasp of key concepts.'
                  : 'You got some questions right - build on this foundation!'}
              </Text>
            </View>
          </View>
          
          <View style={styles.feedbackItem}>
            <View style={[
              styles.feedbackIcon,
              { backgroundColor: '#FEF3C7' }
            ]}>
              <Target size={20} color="#F59E0B" />
            </View>
            <View style={styles.feedbackContent}>
              <Text style={styles.feedbackItemTitle}>Areas for Improvement</Text>
              <Text style={styles.feedbackItemText}>
                {percentage >= 90 
                  ? 'Keep practicing to maintain your excellent performance!'
                  : percentage >= 75 
                  ? 'Review the questions you missed to improve further.'
                  : 'Focus on understanding the core concepts and practice more.'}
              </Text>
            </View>
          </View>
        </Animated.View>
        
        {/* Action Buttons */}
        <Animated.View
          style={[
            styles.actionsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleRetakeQuiz}
          >
            <RotateCcw size={20} color="white" />
            <Text style={styles.primaryButtonText}>Retake Quiz</Text>
          </TouchableOpacity>
          
          <View style={styles.secondaryButtons}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleGoHome}
            >
              <Home size={20} color="#4A5568" />
              <Text style={styles.secondaryButtonText}>Question Bank</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleShareResults}
            >
              <Share size={20} color="#4A5568" />
              <Text style={styles.secondaryButtonText}>Share Results</Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 24,
    textAlign: 'center',
  },
  trophyContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  performanceText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  scoreCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
  },
  percentageContainer: {
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#4299E1',
  },
  scoreDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  scoreItem: {
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginTop: 8,
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  scoreDivider: {
    width: 1,
    height: 50,
    backgroundColor: '#E2E8F0',
  },
  feedbackCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  feedbackTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 16,
  },
  feedbackItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  feedbackIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  feedbackContent: {
    flex: 1,
  },
  feedbackItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  feedbackItemText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 20,
  },
  actionsContainer: {
    gap: 16,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4299E1',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#4299E1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    marginLeft: 8,
  },
  secondaryButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7FAFC',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginLeft: 8,
  },
});