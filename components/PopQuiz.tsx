import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';
import { X, ChevronLeft, ChevronRight, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import QuestionBankService from '@/services/questionBankService';
import { Question, QuestionSet } from '@/data/questionBank/types';

interface PopQuizProps {
  subjectId: string; // unique identifier for the subject
  grade: string;
  topic?: string; // optional topic to filter questions
  subtopic?: string; // optional subtopic to filter questions
  difficulty?: 'easy' | 'medium' | 'hard'; // optional difficulty filter
  questionCount?: number; // number of questions to include (default: 20)
  timePerQuestion?: number; // time in seconds per question (default: 30)
  customStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
  }; // optional styling overrides
  onClose: () => void;
  onComplete: (score: number, total: number) => void;
}

export default function PopQuiz({ 
  subjectId, 
  grade, 
  topic,
  subtopic,
  difficulty,
  questionCount = 20,
  timePerQuestion = 30,
  customStyles = {},
  onClose, 
  onComplete 
}: PopQuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | string | null)[]>([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<Date>(new Date());
  const [quizId] = useState(`quiz-${Date.now()}`);
  
  // State for delay timer
  const [delayActive, setDelayActive] = useState(false);
  const [delayTimeLeft, setDelayTimeLeft] = useState(0);
  
  // Default colors
  const colors = {
    primaryColor: customStyles.primaryColor || '#4299E1',
    secondaryColor: customStyles.secondaryColor || '#10B981',
    accentColor: customStyles.accentColor || '#F59E0B',
  };
 
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const explanationHeightAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // Load questions
  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        // Generate a quiz with 20 questions
        const generatedQuiz = QuestionBankService.generateQuiz(
          subjectId,
          grade,
          topic,
          subtopic,
          difficulty,
          questionCount
        );
        
        if (generatedQuiz.questions.length > 0) {
          setQuestions(generatedQuiz.questions);
          // Initialize user answers array with nulls
          setUserAnswers(new Array(generatedQuiz.questions.length).fill(null));
        } else {
          Alert.alert('No Questions', 'No questions available for this subject and topic.');
          onClose();
        }
      } catch (error) {
        console.error('Error loading questions:', error);
        Alert.alert('Error', 'Failed to load questions. Please try again.');
        onClose();
      } finally {
        setIsLoading(false);
      }
    };
    
    loadQuestions();
    setQuizStartTime(new Date());
  }, [subjectId, grade, topic]);

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

  // Save user response
  const saveUserResponse = async (questionId: string, answer: number | string | null, isCorrect: boolean) => {
    // In a real app, this would save to a database
    console.log('Saving response:', {
      quizId,
      questionId,
      userId: 'current-user', // This would be the actual user ID
      selectedAnswer: answer,
      timestamp: new Date().toISOString(),
      isCorrect,
    });
    
    // Here you would call an API to save the response
    // For now, we'll just update the local state
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newUserAnswers);
  };

  // Handle answer selection
  const handleSelectAnswer = (answer: number | string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(answer);
  };

  // Submit answer
  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || isAnswerSubmitted) return;
    
    setIsAnswerSubmitted(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;
    
    // Check if answer is correct based on question type
    if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false') {
      isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      if (isCorrect) {
        setScore(prev => prev + currentQuestion.points);
      }
    }
    
    // Save user response
    await saveUserResponse(currentQuestion.id, selectedAnswer, isCorrect);
    
    // Animate explanation height
    Animated.timing(explanationHeightAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      // Auto-scroll to show explanation
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
    
    // Start 5-second delay timer
    setDelayTimeLeft(5);
    setDelayActive(true);
  };

  // Delay timer effect
  useEffect(() => {
    if (!delayActive) return;
    
    if (delayTimeLeft > 0) {
      const timer = setTimeout(() => {
        setDelayTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setDelayActive(false);
      // Proceed to next question after delay
      if (currentQuestionIndex < questions.length - 1) {
        handleNextQuestion();
      } else {
        // Quiz completed
        finishQuiz();
      }
    }
  }, [delayActive, delayTimeLeft, currentQuestionIndex, questions.length]);

  // Go to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex >= questions.length - 1) return;
    
    // Reset state for next question
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswer(userAnswers[currentQuestionIndex + 1]);
    const nextQuestionAnswered = userAnswers[currentQuestionIndex + 1] !== null;
    setIsAnswerSubmitted(nextQuestionAnswered);
    setDelayActive(false);
    
    // Reset explanation animation
    explanationHeightAnim.setValue(nextQuestionAnswered ? 1 : 0);
    
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
    const prevQuestionAnswered = userAnswers[currentQuestionIndex - 1] !== null;
    setIsAnswerSubmitted(prevQuestionAnswered);
    setDelayActive(false);
    
    // Reset explanation animation
    explanationHeightAnim.setValue(prevQuestionAnswered ? 1 : 0);
    
    // Reset animations
    fadeAnim.setValue(0);
    slideAnim.setValue(30);
  };

  // Finish quiz
  const finishQuiz = () => {
    const endTime = new Date();
    const totalTime = Math.floor((endTime.getTime() - quizStartTime.getTime()) / 1000); // in seconds
    
    // Calculate total possible points
    const totalPossiblePoints = questions.reduce((sum, q) => sum + q.points, 0);
    
    // In a real app, save the quiz results to a database
    console.log('Saving quiz results:', {
      quizId,
      userId: 'current-user', // This would be the actual user ID
      totalScore: score,
      totalPossible: totalPossiblePoints,
      completionStatus: 'completed',
      startTime: quizStartTime.toISOString(),
      endTime: endTime.toISOString(),
      totalTimeInSeconds: totalTime,
      subjectId,
    });
    
    // Call the onComplete callback with the score
    onComplete(score, totalPossiblePoints);
  };

  // Handle exit confirmation
  const handleExit = () => {
    if (userAnswers.some(answer => answer !== null)) {
      setShowExitConfirmation(true);
    } else {
      onClose();
    }
  };

  // Save and quit
  const handleSaveAndQuit = () => {
    // In a real app, save the current progress
    console.log('Saving quiz progress:', {
      quizId,
      userId: 'current-user',
      completedQuestions: userAnswers.filter(a => a !== null).length,
      totalQuestions: questions.length,
      currentScore: score,
      completionStatus: 'in-progress',
    });
    
    onClose();
  };

  // Render current question
  const renderQuestion = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading questions...</Text>
        </View>
      );
    }
    
    if (questions.length === 0) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No questions available.</Text>
        </View>
      );
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    
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
        
        {isAnswerSubmitted && currentQuestion.type === 'multiple-choice' && 'explanation' in currentQuestion && currentQuestion.explanation && (
          <Animated.View 
            style={[
              styles.explanationContainer,
              {
                maxHeight: explanationHeightAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 500] // Maximum height for explanation
                }),
                opacity: explanationHeightAnim,
                marginTop: explanationHeightAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 24]
                })
              }
            ]}
          >
            <Text style={styles.explanationTitle}>Explanation:</Text>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          </Animated.View>
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
      
      case 'short-answer':
        return (
          <View style={styles.shortAnswerContainer}>
            <TextInput
              style={styles.shortAnswerInput}
              placeholder="Type your answer here..."
              placeholderTextColor="#A0AEC0"
              value={selectedAnswer as string || ''}
              onChangeText={(text) => setSelectedAnswer(text)}
              multiline
              editable={!isAnswerSubmitted}
            />
            {isAnswerSubmitted && (
              <View style={styles.shortAnswerFeedback}>
                <Text style={styles.feedbackTitle}>Sample Answer:</Text>
                <Text style={styles.feedbackText}>{question.correctAnswer}</Text>
              </View>
            )}
          </View>
        );
      
      default:
        return (
          <View style={styles.unsupportedContainer}>
            <Text style={styles.unsupportedText}>
              This question type is not supported in the quiz interface.
            </Text>
          </View>
        );
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

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleExit}
            >
              <X size={24} color="#4A5568" />
            </TouchableOpacity>
            
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Question {currentQuestionIndex + 1} of {questions.length}
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                      backgroundColor: colors.primaryColor 
                    }
                  ]} 
                />
              </View>
            </View>
            
            <View style={styles.scoreContainer}>
              <Text style={[styles.scoreText, { color: colors.primaryColor }]}>Score: {score}</Text>
            </View>
          </View>
          
          {/* Question Content */}
          <ScrollView 
            ref={scrollViewRef}
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
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  currentQuestionIndex >= questions.length - 1 && styles.finishButton,
                  { backgroundColor: currentQuestionIndex >= questions.length - 1 ? colors.secondaryColor : colors.primaryColor }
                ]}
                onPress={
                  currentQuestionIndex < questions.length - 1 
                    ? handleNextQuestion 
                    : finishQuiz
                }
              >
                <Text style={styles.nextButtonText}>
                  {delayActive 
                    ? `Next in ${delayTimeLeft}s` 
                    : currentQuestionIndex < questions.length - 1 
                      ? 'Next' 
                      : 'Finish'
                  }
                </Text>
                <ChevronRight size={20} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      
      {/* Exit Confirmation Modal */}
      <Modal
        visible={showExitConfirmation}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.confirmationOverlay}>
          <View style={styles.confirmationBox}>
            <Text style={styles.confirmationTitle}>Save & Quit?</Text>
            <Text style={styles.confirmationText}>
              Your progress will be saved. You can resume this quiz later.
            </Text>
            
            <View style={styles.confirmationButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowExitConfirmation(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveAndQuit}
              >
                <Text style={styles.saveButtonText}>Save & Quit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    maxWidth: 600,
    maxHeight: '90%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
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
  scoreContainer: {
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4299E1',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
  },
  errorContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#E53E3E',
    textAlign: 'center',
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
    padding: 16,
    backgroundColor: '#F0FFF4',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
    overflow: 'hidden',
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
  shortAnswerContainer: {
    marginTop: 16,
  },
  shortAnswerInput: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  shortAnswerFeedback: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#EBF8FF',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4299E1',
  },
  feedbackTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 20,
  },
  unsupportedContainer: {
    padding: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    marginTop: 16,
  },
  unsupportedText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#E53E3E',
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
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
    backgroundColor: '#4299E1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4299E1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
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
  confirmationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationBox: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  confirmationTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 12,
    textAlign: 'center',
  },
  confirmationText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4299E1',
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
});