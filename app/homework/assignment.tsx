import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  Animated,
  Platform
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Clock, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle, Save, Send, ChevronRight, ChevronLeft, Upload, Paperclip, Eye, EyeOff, CircleHelp as HelpCircle } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

// Mock data for a single assignment
const mockAssignment = {
  id: '1',
  title: 'Mathematics Assignment: Algebra Basics',
  subject: 'Mathematics',
  grade: 'Grade 8',
  dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  status: 'pending',
  totalPoints: 100,
  estimatedTime: 45, // minutes
  instructions: 'This assignment covers basic algebraic concepts including variables, expressions, and simple equations. Read each question carefully and show your work where required. You can save your progress and return later to complete the assignment.',
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      text: 'What is the value of x in the equation 3x + 5 = 20?',
      options: ['x = 3', 'x = 5', 'x = 7', 'x = 15'],
      correctAnswer: 1,
      points: 10,
      explanation: 'To solve for x, subtract 5 from both sides: 3x = 15. Then divide both sides by 3: x = 5.'
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      text: 'Which of the following is a linear equation?',
      options: ['y = x²', 'y = 2x + 3', 'y = 1/x', 'y = √x'],
      correctAnswer: 1,
      points: 10,
      explanation: 'A linear equation has the form y = mx + b, where m and b are constants. Only y = 2x + 3 fits this form.'
    },
    {
      id: 'q3',
      type: 'true-false',
      text: 'The equation 2x + 3y = 12 represents a straight line when graphed.',
      options: ['True', 'False'],
      correctAnswer: 0,
      points: 5,
      explanation: 'This is true. The equation 2x + 3y = 12 can be rewritten as y = (-2/3)x + 4, which is in the form y = mx + b and represents a straight line.'
    },
    {
      id: 'q4',
      type: 'short-answer',
      text: 'If f(x) = 2x + 3, what is the value of f(4)?',
      correctAnswer: '11',
      points: 15,
      explanation: 'To find f(4), substitute x = 4 into the function: f(4) = 2(4) + 3 = 8 + 3 = 11.'
    },
    {
      id: 'q5',
      type: 'essay',
      text: 'Explain the difference between an expression and an equation in algebra. Provide examples of each.',
      points: 20,
      sampleAnswer: 'An algebraic expression is a combination of variables, numbers, and operations without an equals sign. Examples include 3x + 2, 5y², and 2a - b.\n\nAn equation is a mathematical statement that asserts the equality of two expressions. It always contains an equals sign. Examples include 3x + 2 = 14, y = 5x - 3, and a + b = c.\n\nThe key difference is that expressions do not make a statement that can be true or false, while equations do. Expressions simply represent a value, while equations show a relationship between two expressions.'
    },
    {
      id: 'q6',
      type: 'file-upload',
      text: 'Solve the following system of equations and show your work. Upload a photo or document of your solution.\n\n2x + y = 7\n3x - 2y = 8',
      points: 20,
      acceptedFileTypes: ['image/*', 'application/pdf', 'application/msword'],
      maxFileSize: 5, // MB
      correctAnswer: 'x = 3, y = 1',
      explanation: 'To solve this system, you can use substitution or elimination. Using elimination: multiply the first equation by 2 to get 4x + 2y = 14, then add it to the second equation 3x - 2y = 8 to get 7x = 22, so x = 3. Substitute back to find y = 1.'
    },
    {
      id: 'q7',
      type: 'multiple-choice',
      text: 'Which of the following is the solution to the inequality 2x - 3 > 7?',
      options: ['x > 2', 'x > 5', 'x < 5', 'x < 2'],
      correctAnswer: 1,
      points: 10,
      explanation: 'To solve: 2x - 3 > 7\nAdd 3 to both sides: 2x > 10\nDivide both sides by 2: x > 5'
    },
    {
      id: 'q8',
      type: 'short-answer',
      text: 'Simplify the expression: 3(2x - 4) + 5',
      correctAnswer: '6x - 7',
      points: 10,
      explanation: 'First, distribute the 3: 3(2x - 4) = 6x - 12\nThen add 5: 6x - 12 + 5 = 6x - 7'
    }
  ]
};

// Format date to display
const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
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

export default function AssignmentScreen() {
  const { id } = useLocalSearchParams();
  const [assignment, setAssignment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setAssignment(mockAssignment);
      
      // Initialize answers with empty values
      const initialAnswers: Record<string, any> = {};
      mockAssignment.questions.forEach(question => {
        if (question.type === 'multiple-choice' || question.type === 'true-false') {
          initialAnswers[question.id] = null;
        } else if (question.type === 'short-answer' || question.type === 'essay') {
          initialAnswers[question.id] = '';
        } else if (question.type === 'file-upload') {
          initialAnswers[question.id] = null;
        }
      });
      
      setAnswers(initialAnswers);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  // Animation effect
  useEffect(() => {
    if (!loading) {
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
    }
  }, [loading, currentQuestionIndex]);
  
  // Handle answer change
  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  // Handle file upload
  const handleFileUpload = (questionId: string) => {
    // In a real app, this would open a file picker
    // For this demo, we'll simulate a file upload
    Alert.alert(
      'File Upload',
      'In a real app, this would open a file picker. For this demo, we\'ll simulate a file upload.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Simulate Upload',
          onPress: () => {
            setIsSaving(true);
            
            // Simulate upload delay
            setTimeout(() => {
              const fileName = 'assignment_solution.jpg';
              
              setUploadedFiles(prev => ({
                ...prev,
                [questionId]: fileName
              }));
              
              handleAnswerChange(questionId, fileName);
              setIsSaving(false);
            }, 1500);
          }
        }
      ]
    );
  };
  
  // Handle save progress
  const handleSaveProgress = () => {
    setIsSaving(true);
    
    // Simulate saving delay
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert('Progress Saved', 'Your progress has been saved successfully. You can continue later.');
    }, 1500);
  };
  
  // Handle submit assignment
  const handleSubmitAssignment = () => {
    // Check if all questions are answered
    const unansweredQuestions = assignment.questions.filter(question => {
      if (answers[question.id] === null || answers[question.id] === undefined || answers[question.id] === '') {
        return true;
      }
      return false;
    });
    
    if (unansweredQuestions.length > 0) {
      Alert.alert(
        'Incomplete Assignment',
        `You have ${unansweredQuestions.length} unanswered question(s). Do you want to submit anyway?`,
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Submit Anyway',
            onPress: submitAssignment
          }
        ]
      );
    } else {
      submitAssignment();
    }
  };
  
  // Submit assignment
  const submitAssignment = () => {
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Calculate score
      let totalPoints = 0;
      let earnedPoints = 0;
      
      assignment.questions.forEach(question => {
        totalPoints += question.points;
        
        if (question.type === 'multiple-choice' || question.type === 'true-false') {
          if (answers[question.id] === question.correctAnswer) {
            earnedPoints += question.points;
          }
        } else if (question.type === 'short-answer') {
          // Simple exact match for demo
          if (answers[question.id]?.trim().toLowerCase() === question.correctAnswer.toLowerCase()) {
            earnedPoints += question.points;
          }
        } else if (question.type === 'essay' || question.type === 'file-upload') {
          // For demo, give partial credit for essays and file uploads
          if (answers[question.id]) {
            earnedPoints += Math.floor(question.points * 0.8);
          }
        }
      });
      
      const score = Math.round((earnedPoints / totalPoints) * 100);
      
      // Navigate to results screen
      router.push({
        pathname: '/homework/results',
        params: { 
          id: assignment.id,
          score: score.toString(),
          earnedPoints: earnedPoints.toString(),
          totalPoints: totalPoints.toString()
        }
      });
    }, 2000);
  };
  
  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < assignment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };
  
  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };
  
  // Render current question
  const renderQuestion = () => {
    if (!assignment) return null;
    
    const question = assignment.questions[currentQuestionIndex];
    
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
          <Text style={styles.questionNumber}>
            Question {currentQuestionIndex + 1} of {assignment.questions.length}
          </Text>
          <Text style={styles.questionPoints}>{question.points} points</Text>
        </View>
        
        <Text style={styles.questionText}>{question.text}</Text>
        
        {renderQuestionContent(question)}
        
        {showExplanation && question.explanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>Explanation:</Text>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        )}
      </Animated.View>
    );
  };
  
  // Render question content based on type
  const renderQuestionContent = (question: any) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <View style={styles.optionsContainer}>
            {question.options.map((option: string, index: number) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  answers[question.id] === index && styles.selectedOption
                ]}
                onPress={() => handleAnswerChange(question.id, index)}
              >
                <View style={styles.optionContent}>
                  <View style={[
                    styles.optionIndicator,
                    answers[question.id] === index && styles.selectedOptionIndicator
                  ]}>
                    <Text style={[
                      styles.optionIndicatorText,
                      answers[question.id] === index && styles.selectedOptionIndicatorText
                    ]}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <Text style={[
                    styles.optionText,
                    answers[question.id] === index && styles.selectedOptionText
                  ]}>
                    {option}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
      
      case 'true-false':
        return (
          <View style={styles.trueFalseContainer}>
            {question.options.map((option: string, index: number) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.trueFalseButton,
                  answers[question.id] === index && styles.selectedTrueFalse
                ]}
                onPress={() => handleAnswerChange(question.id, index)}
              >
                <Text style={[
                  styles.trueFalseText,
                  answers[question.id] === index && styles.selectedTrueFalseText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      
      case 'short-answer':
        return (
          <View style={styles.shortAnswerContainer}>
            <TextInput
              style={styles.shortAnswerInput}
              placeholder="Type your answer here..."
              placeholderTextColor="#A0AEC0"
              value={answers[question.id] || ''}
              onChangeText={(text) => handleAnswerChange(question.id, text)}
              multiline={false}
            />
          </View>
        );
      
      case 'essay':
        return (
          <View style={styles.essayContainer}>
            <TextInput
              style={styles.essayInput}
              placeholder="Type your answer here..."
              placeholderTextColor="#A0AEC0"
              value={answers[question.id] || ''}
              onChangeText={(text) => handleAnswerChange(question.id, text)}
              multiline
              textAlignVertical="top"
              numberOfLines={8}
            />
          </View>
        );
      
      case 'file-upload':
        return (
          <View style={styles.fileUploadContainer}>
            {uploadedFiles[question.id] ? (
              <View style={styles.uploadedFileContainer}>
                <View style={styles.uploadedFile}>
                  <Paperclip size={20} color="#4299E1" />
                  <Text style={styles.uploadedFileName}>{uploadedFiles[question.id]}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeFileButton}
                  onPress={() => {
                    setUploadedFiles(prev => {
                      const newFiles = { ...prev };
                      delete newFiles[question.id];
                      return newFiles;
                    });
                    handleAnswerChange(question.id, null);
                  }}
                >
                  <XCircle size={20} color="#E53E3E" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => handleFileUpload(question.id)}
              >
                <Upload size={24} color="#4299E1" />
                <Text style={styles.uploadButtonText}>
                  Upload File
                </Text>
                <Text style={styles.uploadHint}>
                  {question.acceptedFileTypes.join(', ')} (Max: {question.maxFileSize}MB)
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );
      
      default:
        return null;
    }
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4299E1" />
        <Text style={styles.loadingText}>Loading assignment...</Text>
      </View>
    );
  }
  
  if (!assignment) {
    return (
      <View style={styles.errorContainer}>
        <AlertCircle size={64} color="#E53E3E" />
        <Text style={styles.errorTitle}>Assignment Not Found</Text>
        <Text style={styles.errorText}>
          The assignment you're looking for doesn't exist or has been removed.
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
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{assignment.subject}</Text>
          <Text style={styles.headerSubtitle}>{assignment.title}</Text>
        </View>
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => setShowExplanation(!showExplanation)}
        >
          {showExplanation ? (
            <EyeOff size={24} color="#4299E1" />
          ) : (
            <Eye size={24} color="#4299E1" />
          )}
        </TouchableOpacity>
      </View>
      
      {/* Assignment Info */}
      <View style={styles.assignmentInfo}>
        <View style={styles.infoItem}>
          <Clock size={16} color="#718096" />
          <Text style={styles.infoText}>
            {assignment.estimatedTime} minutes
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoText}>
            Due: {formatDate(assignment.dueDate)}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={[
            styles.dueText,
            { color: getDaysRemaining(assignment.dueDate).status === 'overdue' ? '#E53E3E' : '#F59E0B' }
          ]}>
            {getDaysRemaining(assignment.dueDate).text}
          </Text>
        </View>
      </View>
      
      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Instructions</Text>
        <Text style={styles.instructionsText}>{assignment.instructions}</Text>
      </View>
      
      {/* Question Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderQuestion()}
      </ScrollView>
      
      {/* Navigation and Action Buttons */}
      <View style={styles.navigationContainer}>
        <View style={styles.navigationButtons}>
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
          
          <TouchableOpacity
            style={[
              styles.navButton,
              currentQuestionIndex === assignment.questions.length - 1 && styles.disabledButton
            ]}
            onPress={handleNextQuestion}
            disabled={currentQuestionIndex === assignment.questions.length - 1}
          >
            <Text style={[
              styles.navButtonText,
              currentQuestionIndex === assignment.questions.length - 1 && styles.disabledButtonText
            ]}>
              Next
            </Text>
            <ChevronRight size={20} color={currentQuestionIndex === assignment.questions.length - 1 ? "#A0AEC0" : "#4A5568"} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.saveButton, isSaving && styles.disabledButton]}
            onPress={handleSaveProgress}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <Save size={20} color="white" />
                <Text style={styles.saveButtonText}>Save</Text>
              </>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.disabledButton]}
            onPress={handleSubmitAssignment}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <Send size={20} color="white" />
                <Text style={styles.submitButtonText}>Submit</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
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
    color: '#718096',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4299E1',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  assignmentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  dueText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  instructionsContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  instructionsTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 20,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
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
    alignItems: 'center',
    marginBottom: 16,
  },
  questionNumber: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4299E1',
  },
  questionPoints: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 20,
    lineHeight: 24,
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
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedOptionIndicator: {
    backgroundColor: '#4299E1',
  },
  optionIndicatorText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
  },
  selectedOptionIndicatorText: {
    color: 'white',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
  },
  selectedOptionText: {
    color: '#2D3748',
    fontFamily: 'Inter-Medium',
  },
  trueFalseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  trueFalseButton: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  selectedTrueFalse: {
    borderColor: '#4299E1',
    backgroundColor: '#EBF8FF',
  },
  trueFalseText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
  },
  selectedTrueFalseText: {
    color: '#4299E1',
  },
  shortAnswerContainer: {
    marginTop: 8,
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
  },
  essayContainer: {
    marginTop: 8,
  },
  essayInput: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    minHeight: 200,
    textAlignVertical: 'top',
  },
  fileUploadContainer: {
    marginTop: 8,
  },
  uploadButton: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#4299E1',
    marginTop: 8,
    marginBottom: 4,
  },
  uploadHint: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  uploadedFileContainer: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadedFile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  uploadedFileName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginLeft: 8,
    flex: 1,
  },
  removeFileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  explanationContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#F0FFF4',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#48BB78',
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
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginHorizontal: 4,
  },
  disabledButtonText: {
    color: '#A0AEC0',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A5568',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  submitButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4299E1',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
});