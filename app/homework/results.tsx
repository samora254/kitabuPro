import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Platform
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Trophy, Target, Clock, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle, Share2, RotateCcw, Chrome as Home, ChevronDown, ChevronUp, Star } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

// Mock data for a completed assignment
const mockCompletedAssignment = {
  id: '3',
  title: 'Science: States of Matter',
  subject: 'Science',
  grade: 'Grade 8',
  dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  status: 'completed',
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      text: 'What are the three common states of matter?',
      options: [
        'Solid, liquid, gas',
        'Hot, cold, warm',
        'Hard, soft, medium',
        'Rock, water, air'
      ],
      correctAnswer: 0,
      userAnswer: 0,
      points: 10,
      earnedPoints: 10,
      explanation: 'The three common states of matter are solid, liquid, and gas. Plasma is often considered the fourth state of matter.'
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      text: 'Which state of matter has a definite shape and volume?',
      options: [
        'Solid',
        'Liquid',
        'Gas',
        'Plasma'
      ],
      correctAnswer: 0,
      userAnswer: 0,
      points: 10,
      earnedPoints: 10,
      explanation: 'Solids have a definite shape and volume because their particles are tightly packed in a regular pattern with strong forces of attraction.'
    },
    {
      id: 'q3',
      type: 'true-false',
      text: 'Liquids have a definite shape but not a definite volume.',
      options: ['True', 'False'],
      correctAnswer: 1,
      userAnswer: 0,
      points: 5,
      earnedPoints: 0,
      explanation: 'This statement is false. Liquids have a definite volume but not a definite shape. They take the shape of their container but maintain their volume.'
    },
    {
      id: 'q4',
      type: 'multiple-choice',
      text: 'What happens to the particles of a substance when it changes from a liquid to a gas?',
      options: [
        'They get closer together',
        'They move more slowly',
        'They gain energy and move farther apart',
        'They lose energy'
      ],
      correctAnswer: 2,
      userAnswer: 2,
      points: 10,
      earnedPoints: 10,
      explanation: 'When a substance changes from liquid to gas (vaporization), the particles gain energy, move faster, and spread farther apart from each other.'
    },
    {
      id: 'q5',
      type: 'short-answer',
      text: 'What is the process called when a substance changes directly from a solid to a gas without becoming a liquid?',
      correctAnswer: 'sublimation',
      userAnswer: 'sublimation',
      points: 15,
      earnedPoints: 15,
      explanation: 'Sublimation is the process where a solid changes directly into a gas without passing through the liquid state. An example is dry ice (solid carbon dioxide) changing to carbon dioxide gas.'
    },
    {
      id: 'q6',
      type: 'multiple-choice',
      text: 'Which state of matter has particles that are far apart and move freely in all directions?',
      options: [
        'Solid',
        'Liquid',
        'Gas',
        'All of the above'
      ],
      correctAnswer: 2,
      userAnswer: 3,
      points: 10,
      earnedPoints: 0,
      explanation: 'Gas particles are far apart and move freely in all directions with high energy, allowing gases to expand to fill their containers.'
    },
    {
      id: 'q7',
      type: 'essay',
      text: 'Explain the difference between physical and chemical changes in matter. Provide examples of each.',
      userAnswer: 'Physical changes alter the form or appearance of a substance but do not change its chemical composition. Examples include melting ice, cutting paper, and dissolving salt in water. Chemical changes create new substances with different properties and composition. Examples include burning wood, rusting iron, and cooking an egg.',
      points: 20,
      earnedPoints: 20,
      sampleAnswer: 'A physical change alters the form or appearance of a substance but does not change its chemical composition. Examples include melting ice, cutting paper, and dissolving salt in water. The substance remains the same at the molecular level.\n\nA chemical change creates a new substance with different properties and composition. Examples include burning wood, rusting iron, and cooking an egg. Chemical changes typically involve energy changes and cannot be easily reversed.'
    },
    {
      id: 'q8',
      type: 'file-upload',
      text: 'Draw and label the particle arrangement in solids, liquids, and gases. Upload your diagram.',
      userAnswer: 'states_of_matter_diagram.jpg',
      points: 20,
      earnedPoints: 20,
      acceptedFileTypes: ['image/*', 'application/pdf'],
      maxFileSize: 5 // MB
    }
  ],
  totalPoints: 100,
  earnedPoints: 85,
  completedDate: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
  timeSpent: 28, // minutes
  feedback: "Good work on understanding the basic concepts of states of matter. You demonstrated a strong grasp of the particle arrangement and behavior in different states. However, there was some confusion about the properties of liquids and the 'all of the above' option in one question. Review the explanations for the questions you missed to strengthen your understanding."
};

export default function ResultsScreen() {
  const { id, score, earnedPoints, totalPoints } = useLocalSearchParams();
  const [assignment, setAssignment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  
  // Determine if we're viewing a pre-completed assignment or a newly submitted one
  const isPreCompleted = !score && !earnedPoints && !totalPoints;
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPreCompleted) {
        // Load pre-completed assignment
        setAssignment(mockCompletedAssignment);
      } else {
        // For newly submitted assignments, we would normally fetch from API
        // Here we'll use the mock data but update with the passed params
        const updatedAssignment = {
          ...mockCompletedAssignment,
          earnedPoints: parseInt(earnedPoints as string) || 85,
          totalPoints: parseInt(totalPoints as string) || 100
        };
        setAssignment(updatedAssignment);
      }
      
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id, score, earnedPoints, totalPoints]);
  
  // Animation effect
  useEffect(() => {
    if (!loading) {
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
    }
  }, [loading]);
  
  // Toggle question expansion
  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  
  // Get performance message based on score
  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return { text: 'Excellent!', color: '#10B981' };
    if (score >= 75) return { text: 'Great Job!', color: '#3B82F6' };
    if (score >= 60) return { text: 'Good Effort!', color: '#F59E0B' };
    return { text: 'Keep Practicing!', color: '#EF4444' };
  };
  
  // Handle retry assignment
  const handleRetryAssignment = () => {
    router.push({
      pathname: '/homework/assignment',
      params: { id: assignment.id }
    });
  };
  
  // Handle share results
  const handleShareResults = () => {
    // In a real app, this would use the Share API
    alert(`Shared result: ${assignment.earnedPoints}/${assignment.totalPoints} on ${assignment.title}`);
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <DevModeIndicator />
        <Trophy size={64} color="#F59E0B" />
        <Text style={styles.loadingText}>Loading your results...</Text>
      </View>
    );
  }
  
  if (!assignment) {
    return (
      <View style={styles.errorContainer}>
        <DevModeIndicator />
        <AlertCircle size={64} color="#E53E3E" />
        <Text style={styles.errorTitle}>Results Not Found</Text>
        <Text style={styles.errorText}>
          The assignment results you're looking for don't exist or have been removed.
        </Text>
        <TouchableOpacity
          style={styles.backToHomeworkButton}
          onPress={() => router.push('/homework')}
        >
          <Text style={styles.backToHomeworkText}>Back to Homework</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const percentage = Math.round((assignment.earnedPoints / assignment.totalPoints) * 100);
  const performance = getPerformanceMessage(percentage);
  const correctAnswers = assignment.questions.filter((q: any) => q.earnedPoints === q.points).length;
  
  return (
    <View style={styles.container}>
      <DevModeIndicator />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/homework')}
        >
          <ArrowLeft size={24} color="#2D3748" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assignment Results</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Results Summary */}
        <Animated.View
          style={[
            styles.summaryCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={[styles.performanceText, { color: performance.color }]}>
            {performance.text}
          </Text>
          
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
            {percentage >= 90 ? (
              <Trophy size={64} color="#FFD700" />
            ) : percentage >= 75 ? (
              <Trophy size={64} color="#C0C0C0" />
            ) : percentage >= 60 ? (
              <Trophy size={64} color="#CD7F32" />
            ) : (
              <Target size={64} color="#718096" />
            )}
          </Animated.View>
          
          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercentage}>{percentage}%</Text>
            <Text style={styles.scoreText}>
              {assignment.earnedPoints}/{assignment.totalPoints}
            </Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <CheckCircle size={20} color="#10B981" />
              <Text style={styles.statValue}>{correctAnswers}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <XCircle size={20} color="#E53E3E" />
              <Text style={styles.statValue}>{assignment.questions.length - correctAnswers}</Text>
              <Text style={styles.statLabel}>Incorrect</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Clock size={20} color="#4299E1" />
              <Text style={styles.statValue}>{assignment.timeSpent} min</Text>
              <Text style={styles.statLabel}>Time Spent</Text>
            </View>
          </View>
        </Animated.View>
        
        {/* Feedback */}
        {assignment.feedback && (
          <Animated.View
            style={[
              styles.feedbackCard,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.feedbackTitle}>Feedback</Text>
            <Text style={styles.feedbackText}>{assignment.feedback}</Text>
          </Animated.View>
        )}
        
        {/* Questions Review */}
        <Animated.View
          style={[
            styles.questionsReviewContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.questionsReviewTitle}>Questions Review</Text>
          
          {assignment.questions.map((question: any, index: number) => {
            const isExpanded = expandedQuestions[question.id] || false;
            const isCorrect = question.earnedPoints === question.points;
            
            return (
              <View 
                key={question.id} 
                style={[
                  styles.questionReviewCard,
                  isCorrect ? styles.correctQuestionCard : styles.incorrectQuestionCard
                ]}
              >
                <TouchableOpacity
                  style={styles.questionReviewHeader}
                  onPress={() => toggleQuestion(question.id)}
                >
                  <View style={styles.questionReviewInfo}>
                    <View style={styles.questionNumberContainer}>
                      <Text style={styles.questionNumber}>{index + 1}</Text>
                    </View>
                    <View style={styles.questionReviewContent}>
                      <Text style={styles.questionReviewTitle} numberOfLines={isExpanded ? undefined : 2}>
                        {question.text}
                      </Text>
                      <View style={styles.questionReviewMeta}>
                        <Text style={styles.questionType}>
                          {question.type.split('-').map((word: string) => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </Text>
                        <Text style={styles.questionPoints}>
                          {question.earnedPoints}/{question.points} points
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.questionStatusContainer}>
                    {isCorrect ? (
                      <CheckCircle size={24} color="#10B981" />
                    ) : (
                      <XCircle size={24} color="#E53E3E" />
                    )}
                    {isExpanded ? (
                      <ChevronUp size={20} color="#718096" />
                    ) : (
                      <ChevronDown size={20} color="#718096" />
                    )}
                  </View>
                </TouchableOpacity>
                
                {isExpanded && (
                  <View style={styles.questionReviewDetails}>
                    {/* Question content based on type */}
                    {question.type === 'multiple-choice' && (
                      <View style={styles.optionsReviewContainer}>
                        {question.options.map((option: string, optionIndex: number) => (
                          <View
                            key={optionIndex}
                            style={[
                              styles.optionReview,
                              optionIndex === question.correctAnswer && styles.correctOption,
                              optionIndex === question.userAnswer && optionIndex !== question.correctAnswer && styles.incorrectOption
                            ]}
                          >
                            <View style={styles.optionReviewContent}>
                              <Text style={styles.optionLabel}>
                                {String.fromCharCode(65 + optionIndex)}
                              </Text>
                              <Text style={styles.optionReviewText}>{option}</Text>
                            </View>
                            
                            {optionIndex === question.correctAnswer && (
                              <CheckCircle size={20} color="#10B981" />
                            )}
                            {optionIndex === question.userAnswer && optionIndex !== question.correctAnswer && (
                              <XCircle size={20} color="#E53E3E" />
                            )}
                          </View>
                        ))}
                      </View>
                    )}
                    
                    {question.type === 'true-false' && (
                      <View style={styles.optionsReviewContainer}>
                        {question.options.map((option: string, optionIndex: number) => (
                          <View
                            key={optionIndex}
                            style={[
                              styles.optionReview,
                              optionIndex === question.correctAnswer && styles.correctOption,
                              optionIndex === question.userAnswer && optionIndex !== question.correctAnswer && styles.incorrectOption
                            ]}
                          >
                            <View style={styles.optionReviewContent}>
                              <Text style={styles.optionReviewText}>{option}</Text>
                            </View>
                            
                            {optionIndex === question.correctAnswer && (
                              <CheckCircle size={20} color="#10B981" />
                            )}
                            {optionIndex === question.userAnswer && optionIndex !== question.correctAnswer && (
                              <XCircle size={20} color="#E53E3E" />
                            )}
                          </View>
                        ))}
                      </View>
                    )}
                    
                    {question.type === 'short-answer' && (
                      <View style={styles.shortAnswerReview}>
                        <View style={styles.answerSection}>
                          <Text style={styles.answerLabel}>Your Answer:</Text>
                          <Text style={styles.userAnswer}>{question.userAnswer}</Text>
                        </View>
                        
                        <View style={styles.answerSection}>
                          <Text style={styles.answerLabel}>Correct Answer:</Text>
                          <Text style={styles.correctAnswer}>{question.correctAnswer}</Text>
                        </View>
                      </View>
                    )}
                    
                    {question.type === 'essay' && (
                      <View style={styles.essayReview}>
                        <View style={styles.answerSection}>
                          <Text style={styles.answerLabel}>Your Response:</Text>
                          <Text style={styles.userAnswer}>{question.userAnswer}</Text>
                        </View>
                        
                        {question.sampleAnswer && (
                          <View style={styles.answerSection}>
                            <Text style={styles.answerLabel}>Sample Answer:</Text>
                            <Text style={styles.sampleAnswer}>{question.sampleAnswer}</Text>
                          </View>
                        )}
                      </View>
                    )}
                    
                    {question.type === 'file-upload' && (
                      <View style={styles.fileUploadReview}>
                        <View style={styles.answerSection}>
                          <Text style={styles.answerLabel}>Your Submission:</Text>
                          <View style={styles.fileSubmission}>
                            <Text style={styles.fileName}>{question.userAnswer}</Text>
                          </View>
                        </View>
                      </View>
                    )}
                    
                    {/* Explanation */}
                    {question.explanation && (
                      <View style={styles.explanationContainer}>
                        <Text style={styles.explanationTitle}>Explanation:</Text>
                        <Text style={styles.explanationText}>{question.explanation}</Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            );
          })}
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
            onPress={handleRetryAssignment}
          >
            <RotateCcw size={20} color="white" />
            <Text style={styles.primaryButtonText}>Retry Assignment</Text>
          </TouchableOpacity>
          
          <View style={styles.secondaryButtons}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/homework')}
            >
              <Home size={20} color="#4A5568" />
              <Text style={styles.secondaryButtonText}>Homework</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleShareResults}
            >
              <Share2 size={20} color="#4A5568" />
              <Text style={styles.secondaryButtonText}>Share Results</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#4A5568',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7FAFC',
  },
  errorTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#E53E3E',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
  },
  backToHomeworkButton: {
    backgroundColor: '#4299E1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backToHomeworkText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
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
    flex: 1,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
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
  performanceText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
  },
  trophyContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreCircle: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scorePercentage: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
  },
  scoreText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  statDivider: {
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
    marginBottom: 12,
  },
  feedbackText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 24,
  },
  questionsReviewContainer: {
    marginBottom: 20,
  },
  questionsReviewTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 16,
  },
  questionReviewCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  correctQuestionCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  incorrectQuestionCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#E53E3E',
  },
  questionReviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  questionReviewInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  questionNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  questionNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#4A5568',
  },
  questionReviewContent: {
    flex: 1,
  },
  questionReviewTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
    lineHeight: 22,
  },
  questionReviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionType: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  questionPoints: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
  },
  questionStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  questionReviewDetails: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  optionsReviewContainer: {
    gap: 8,
  },
  optionReview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  correctOption: {
    backgroundColor: '#F0FFF4',
    borderColor: '#C6F6D5',
  },
  incorrectOption: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
  },
  optionReviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionLabel: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#4A5568',
    marginRight: 12,
  },
  optionReviewText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    flex: 1,
  },
  shortAnswerReview: {
    gap: 16,
  },
  answerSection: {
    marginBottom: 12,
  },
  answerLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
    marginBottom: 8,
  },
  userAnswer: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    backgroundColor: '#F7FAFC',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  correctAnswer: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    backgroundColor: '#F0FFF4',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C6F6D5',
  },
  essayReview: {
    gap: 16,
  },
  sampleAnswer: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    backgroundColor: '#F0FFF4',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C6F6D5',
    lineHeight: 20,
  },
  fileUploadReview: {
    gap: 16,
  },
  fileSubmission: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  fileName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
  },
  explanationContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F0FFF4',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#48BB78',
  },
  explanationTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 8,
  },
  explanationText: {
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
    justifyContent: 'space-between',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7FAFC',
    paddingVertical: 12,
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