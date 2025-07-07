import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Clock, ChevronRight, ChevronLeft, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
import QuestionBankService from '@/services/questionBankService';
import { getSubjectTheme } from '@/utils/subjectThemes';
import { Question, QuestionSet } from '@/data/questionBank/types';

export default function QuizScreen() {
  const { quizId } = useLocalSearchParams();
  const [quizSet, setQuizSet] = useState<QuestionSet | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | string | null)[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const subjectTheme = quizSet ? getSubjectTheme(quizSet.subject.toLowerCase()) : getSubjectTheme('default');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load quiz data
  useEffect(() => {
    if (quizId) {
      const quiz = QuestionBankService.getQuestionSet(quizId as string);
      if (quiz) {
        setQuizSet(quiz);
        // Initialize user answers array with nulls
        setUserAnswers(new Array(quiz.questions.length).fill(null));
        // Set initial time based on first question
        if (quiz.questions.length > 0) {
          setTimeRemaining(quiz.questions[0].timeEstimate);
        }
      } else {
        Alert.alert('Error', 'Quiz not found');
        router.back();
      }
    }
  }, [quizId]);

  // Animation effect
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
  }, [currentQuestionIndex]);

  // Timer effect
  useEffect(() => {
    if (!quizSet || isAnswerSubmitted || isQuizComplete) return;
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Set up new timer
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Time's up, auto-submit
          clearInterval(timerRef.current!);
          handleSubmitAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestionIndex, isAnswerSubmitted, quizSet, isQuizComplete]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleSelectAnswer = (answer: number | string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(answer);
  };

  // Submit answer
  const handleSubmitAnswer = () => {
    if (!quizSet || isAnswerSubmitted) return;
    
    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Mark answer as submitted
    setIsAnswerSubmitted(true);
    
    // Update user answers
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newUserAnswers);
    
    // Check if answer is correct and update score
    const currentQuestion = quizSet.questions[currentQuestionIndex];
    if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false') {
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore(prev => prev + currentQuestion.points);
      }
    }
    
    // Auto-advance after 2 seconds
    setTimeout(() => {
      if (currentQuestionIndex < quizSet.questions.length - 1) {
        handleNextQuestion();
      } else {
        setIsQuizComplete(true);
        // Navigate to results
        router.push({
          pathname: '/questionbank/results',
          params: {
            quizId: quizId as string,
            score: score.toString(),
            totalPoints: quizSet.totalPoints.toString(),
            correctAnswers: userAnswers.filter((answer, index) => {
              const question = quizSet.questions[index];
              if (question.type === 'multiple-choice' || question.type === 'true-false') {
                return answer === question.correctAnswer;
              }
              return false;
            }).length.toString(),
            totalQuestions: quizSet.questions.length.toString()
          }
        });
      }
    }, 2000);
  };

  // Go to next question
  const handleNextQuestion = () => {
    if (!quizSet || currentQuestionIndex >= quizSet.questions.length - 1) return;
    
    // Reset state for next question
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    
    // Set timer for next question
    setTimeRemaining(quizSet.questions[currentQuestionIndex + 1].timeEstimate);
    
    // Reset animations
    fadeAnim.setValue(0);
    slideAnim.setValue(30);
  };

  // Go to previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex <= 0) return;
    
    // Reset state for previous question
    setCurrentQuestionIndex(prev => prev - 1);
    setSelectedAnswer(userAnswers[currentQuestionIndex - 1]);
    setIsAnswerSubmitted(true);
    
    // Reset animations
    fadeAnim.setValue(0);
    slideAnim.setValue(30);
  };

  // Render current question
  const renderQuestion = () => {
    if (!quizSet || currentQuestionIndex >= quizSet.questions.length) return null;
    
    const currentQuestion = quizSet.questions[currentQuestionIndex];
    
    return (
      <Animated.View
        style={[
          styles.questionContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.questionHeader}>
          <View style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor(currentQuestion.difficulty) }
          ]}>
            <Text style={styles.difficultyText}>
              {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
            </Text>
          </View>
          <Text style={styles.questionType}>
            {formatQuestionType(currentQuestion.type)}
          </Text>
        </View>
        
        <Text style={styles.questionText}>{currentQuestion.text}</Text>
        
        {renderAnswerOptions(currentQuestion)}
        
        {isAnswerSubmitted && currentQuestion.explanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>Explanation:</Text>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          </View>
        )}
      </Animated.View>
    );
  };

  // Render answer options based on question type
  const renderAnswerOptions = (question: Question) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => {
              let optionStyle = styles.optionButton;
              let textStyle = styles.optionText;
              let statusIcon = null;
              
              if (isAnswerSubmitted) {
                if (index === question.correctAnswer) {
                  optionStyle = [styles.optionButton, styles.correctOption];
                  textStyle = [styles.optionText, styles.correctOptionText];
                  statusIcon = <CheckCircle size={20} color="#10B981" />;
                } else if (index === selectedAnswer) {
                  optionStyle = [styles.optionButton, styles.incorrectOption];
                  textStyle = [styles.optionText, styles.incorrectOptionText];
                  statusIcon = <XCircle size={20} color="#EF4444" />;
                }
              } else if (index === selectedAnswer) {
                optionStyle = [styles.optionButton, styles.selectedOption];
                textStyle = [styles.optionText, styles.selectedOptionText];
              }
              
              return (
                <TouchableOpacity
                  key={index}
                  style={optionStyle}
                  onPress={() => handleSelectAnswer(index)}
                  disabled={isAnswerSubmitted}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.optionLabel}>{String.fromCharCode(65 + index)}</Text>
                    <Text style={textStyle}>{option}</Text>
                    {statusIcon}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      
      case 'true-false':
        return (
          <View style={styles.optionsContainer}>
            {[
              { value: true, label: 'True' },
              { value: false, label: 'False' }
            ].map((option, index) => {
              let optionStyle = styles.optionButton;
              let textStyle = styles.optionText;
              let statusIcon = null;
              
              if (isAnswerSubmitted) {
                if (option.value === question.correctAnswer) {
                  optionStyle = [styles.optionButton, styles.correctOption];
                  textStyle = [styles.optionText, styles.correctOptionText];
                  statusIcon = <CheckCircle size={20} color="#10B981" />;
                } else if (option.value === selectedAnswer) {
                  optionStyle = [styles.optionButton, styles.incorrectOption];
                  textStyle = [styles.optionText, styles.incorrectOptionText];
                  statusIcon = <XCircle size={20} color="#EF4444" />;
                }
              } else if (option.value === selectedAnswer) {
                optionStyle = [styles.optionButton, styles.selectedOption];
                textStyle = [styles.optionText, styles.selectedOptionText];
              }
              
              return (
                <TouchableOpacity
                  key={index}
                  style={optionStyle}
                  onPress={() => handleSelectAnswer(option.value)}
                  disabled={isAnswerSubmitted}
                >
                  <View style={styles.optionContent}>
                    <Text style={textStyle}>{option.label}</Text>
                    {statusIcon}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      
      // Add other question types as needed
      
      default:
        return null;
    }
  };

  // Format question type for display
  const formatQuestionType = (type: string): string => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Get color based on difficulty
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'easy': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return '#4B5563';
    }
  };

  if (!quizSet) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading quiz...</Text>
      </View>
    );
  }

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
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{quizSet.title}</Text>
          <Text style={styles.headerSubtitle}>
            Question {currentQuestionIndex + 1} of {quizSet.questions.length}
          </Text>
        </View>
        <View style={styles.timerContainer}>
          <Clock size={16} color={timeRemaining <= 10 ? "#EF4444" : "#4A5568"} />
          <Text style={[
            styles.timerText,
            timeRemaining <= 10 && styles.timerWarning
          ]}>
            {formatTime(timeRemaining)}
          </Text>
        </View>
      </View>
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestionIndex + 1) / quizSet.questions.length) * 100}%` }
            ]} 
          />
        </View>
      </View>
      
      {/* Question Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderQuestion()}
      </ScrollView>
      
      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentQuestionIndex === 0 && styles.disabledButton
          ]}
          onPress={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft size={20} color={currentQuestionIndex === 0 ? "#A0AEC0" : "#4A5568"} />
          <Text style={[
            styles.navButtonText,
            currentQuestionIndex === 0 && styles.disabledButtonText
          ]}>
            Previous
          </Text>
        </TouchableOpacity>
        
        {!isAnswerSubmitted ? (
          <TouchableOpacity
            style={[
              styles.submitButton,
              selectedAnswer === null && styles.disabledButton
            ]}
            onPress={handleSubmitAnswer}
            disabled={selectedAnswer === null}
          >
            <Text style={[
              styles.submitButtonText,
              selectedAnswer === null && styles.disabledButtonText
            ]}>
              Submit
            </Text>
            <CheckCircle size={20} color={selectedAnswer === null ? "#A0AEC0" : "white"} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.nextButton,
              currentQuestionIndex >= quizSet.questions.length - 1 && styles.finishButton
            ]}
            onPress={
              currentQuestionIndex < quizSet.questions.length - 1 
                ? handleNextQuestion 
                : () => setIsQuizComplete(true)
            }
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < quizSet.questions.length - 1 ? 'Next' : 'Finish'}
            </Text>
            <ChevronRight size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
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
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  timerText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
    marginLeft: 6,
  },
  timerWarning: {
    color: '#EF4444',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4299E1',
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  questionContainer: {
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
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  questionType: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  questionText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 24,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
  },
  selectedOption: {
    borderColor: '#4299E1',
    backgroundColor: '#EBF8FF',
  },
  correctOption: {
    borderColor: '#10B981',
    backgroundColor: '#F0FFF4',
  },
  incorrectOption: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
  },
  selectedOptionText: {
    color: '#4299E1',
    fontFamily: 'Inter-Medium',
  },
  correctOptionText: {
    color: '#10B981',
    fontFamily: 'Inter-Medium',
  },
  incorrectOptionText: {
    color: '#EF4444',
    fontFamily: 'Inter-Medium',
  },
  explanationContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#F0FFF4',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  explanationTitle: {
    fontSize: 16,
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
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
  },
  navButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginLeft: 4,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#4299E1',
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginRight: 8,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#4299E1',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginRight: 8,
  },
  finishButton: {
    backgroundColor: '#10B981',
  },
  disabledButton: {
    backgroundColor: '#E2E8F0',
  },
  disabledButtonText: {
    color: '#A0AEC0',
  },
});