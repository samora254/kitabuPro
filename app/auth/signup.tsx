import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Heart, 
  BookOpen, 
  Users, 
  Trophy,
  Sparkles,
  Check
} from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
import { isDevelopmentBypass, shouldAllowEmptyForms } from '@/constants/config';

const { width } = Dimensions.get('window');

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: string;
  grade: string;
  school: string;
  roleModel: string;
  dreamCareer: string;
  favoriteSubject: string;
  leastFavoriteSubject: string;
  bestFriend: string;
  favoriteTeacher: string;
  whyFavoriteTeacher: string;
  learningStyle: string;
}

const steps = [
  { id: 'welcome', title: "Welcome to KITABU.AI!", subtitle: "Your personalized learning journey starts here" },
  { id: 'name', title: "What's your name?", subtitle: "We'd love to know what to call you" },
  { id: 'contact', title: "How can we reach you?", subtitle: "Just in case we need to send you something awesome" },
  { id: 'security', title: "Keep your account safe", subtitle: "Choose a password you'll remember" },
  { id: 'personal', title: "Tell us about yourself", subtitle: "Help us personalize your experience" },
  { id: 'school', title: "Where do you study?", subtitle: "" },
  { id: 'inspiration', title: "Who inspires you?", subtitle: "" },
  { id: 'dreams', title: "What's your dream career?", subtitle: "" },
  { id: 'subjects', title: "Your favorite subject?", subtitle: "" },
  { id: 'social', title: "Best Friend", subtitle: "" },
  { id: 'teacher', title: "Favorite Teacher", subtitle: "" },
  { id: 'learning', title: "How do you learn best?", subtitle: "" },
  { id: 'complete', title: "You're all set! 🎉", subtitle: "" },
];

export default function ProgressiveSignUp() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    grade: 'GRADE 8',
    school: '',
    roleModel: '',
    dreamCareer: '',
    favoriteSubject: '',
    leastFavoriteSubject: '',
    bestFriend: '',
    favoriteTeacher: '',
    whyFavoriteTeacher: '',
    learningStyle: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const celebrationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: currentStep / (steps.length - 1),
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  const animateTransition = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 30,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const celebrateProgress = () => {
    Animated.sequence([
      Animated.timing(celebrationAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(celebrationAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep === 2 || currentStep === 5 || currentStep === 8) {
        celebrateProgress();
      }
      animateTransition(() => {
        setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
      });
    }
  };

  const prevStep = () => {
    animateTransition(() => {
      setCurrentStep(prev => Math.max(prev - 1, 0));
    });
  };

  const validateCurrentStep = () => {
    // Skip validation in development bypass mode
    if (isDevelopmentBypass()) {
      return true;
    }

    const newErrors: Record<string, string> = {};
    
    switch (currentStep) {
      case 1: // Name
        if (!formData.firstName.trim() && !shouldAllowEmptyForms()) {
          newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim() && !shouldAllowEmptyForms()) {
          newErrors.lastName = 'Last name is required';
        }
        break;
      case 2: // Contact
        if (!formData.email && !shouldAllowEmptyForms()) {
          newErrors.email = 'Email is required';
        } else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Invalid email';
        }
        if (!formData.phone && !shouldAllowEmptyForms()) {
          newErrors.phone = 'Phone number is required';
        }
        break;
      case 3: // Security
        if (!formData.password && !shouldAllowEmptyForms()) {
          newErrors.password = 'Password is required';
        } else if (formData.password && formData.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword && !shouldAllowEmptyForms()) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
      case 4: // Personal
        if (!formData.gender && !shouldAllowEmptyForms()) {
          newErrors.gender = 'Please select your gender';
        }
        break;
      case 5: // School
        if (!formData.school.trim() && !shouldAllowEmptyForms()) {
          newErrors.school = 'School name is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    // Simulate API call to save user data
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/dashboard');
    }, 2000);
  };

  const renderStep = () => {
    const step = steps[currentStep];
    
    switch (step.id) {
      case 'welcome':
        return (
          <View style={styles.welcomeContainer}>
            <View style={styles.iconContainer}>
              <Sparkles size={60} color="#48BB78" />
            </View>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Star size={20} color="#48BB78" />
                <Text style={styles.featureText}>Personalized learning paths</Text>
              </View>
              <View style={styles.featureItem}>
                <Trophy size={20} color="#48BB78" />
                <Text style={styles.featureText}>Fun quizzes and challenges</Text>
              </View>
              <View style={styles.featureItem}>
                <Heart size={20} color="#48BB78" />
                <Text style={styles.featureText}>AI-powered study buddy</Text>
              </View>
            </View>
          </View>
        );

      case 'name':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.inputRow}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={[styles.input, errors.firstName && styles.inputError]}
                  placeholder="Your first name"
                  placeholderTextColor="#A0AEC0"
                  value={formData.firstName}
                  onChangeText={(value) => updateFormData('firstName', value)}
                  autoFocus
                />
                {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
              </View>
              <View style={[styles.inputContainer, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={[styles.input, errors.lastName && styles.inputError]}
                  placeholder="Your last name"
                  placeholderTextColor="#A0AEC0"
                  value={formData.lastName}
                  onChangeText={(value) => updateFormData('lastName', value)}
                />
                {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
              </View>
            </View>
          </View>
        );

      case 'contact':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="you@example.com"
                placeholderTextColor="#A0AEC0"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoFocus
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={[styles.input, errors.phone && styles.inputError]}
                placeholder="Your phone number"
                placeholderTextColor="#A0AEC0"
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                keyboardType="phone-pad"
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>
          </View>
        );

      case 'security':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Create Password</Text>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Choose a strong password"
                placeholderTextColor="#A0AEC0"
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                secureTextEntry
                autoFocus
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={[styles.input, errors.confirmPassword && styles.inputError]}
                placeholder="Type your password again"
                placeholderTextColor="#A0AEC0"
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                secureTextEntry
              />
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>
          </View>
        );

      case 'personal':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, styles.centeredLabel]}>I am...</Text>
              <View style={styles.genderContainer}>
                {['Male', 'Female', 'Prefer not to say'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      formData.gender === option && styles.optionButtonSelected
                    ]}
                    onPress={() => updateFormData('gender', option)}
                  >
                    <Text style={[
                      styles.optionText,
                      formData.gender === option && styles.optionTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Grade Level</Text>
              <View style={styles.gradeContainer}>
                {['GRADE 6', 'GRADE 7', 'GRADE 8', 'GRADE 9'].map((grade) => (
                  <TouchableOpacity
                    key={grade}
                    style={[
                      styles.gradeButton,
                      formData.grade === grade && styles.gradeButtonSelected
                    ]}
                    onPress={() => updateFormData('grade', grade)}
                  >
                    <Text style={[
                      styles.gradeText,
                      formData.grade === grade && styles.gradeTextSelected
                    ]}>
                      {grade}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );

      case 'school':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>What's the name of your school?</Text>
              <TextInput
                style={[styles.input, errors.school && styles.inputError]}
                placeholder="e.g., Nairobi Academy"
                placeholderTextColor="#A0AEC0"
                value={formData.school}
                onChangeText={(value) => updateFormData('school', value)}
                autoFocus
              />
              {errors.school && <Text style={styles.errorText}>{errors.school}</Text>}
              <Text style={styles.helpText}>
                This helps us connect you with other students from your school!
              </Text>
            </View>
          </View>
        );

      case 'inspiration':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconContainer}>
              <Star size={40} color="#ECC94B" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="e.g., Nelson Mandela, Marie Curie, your mom..."
                placeholderTextColor="#A0AEC0"
                value={formData.roleModel}
                onChangeText={(value) => updateFormData('roleModel', value)}
                autoFocus
              />
              <Text style={styles.helpText}>
                It could be anyone - a historical figure, family member, or even a fictional character!
              </Text>
            </View>
          </View>
        );

      case 'dreams':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconContainer}>
              <Trophy size={40} color="#8B5CF6" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="e.g., Doctor, Engineer, Artist, Entrepreneur..."
                placeholderTextColor="#A0AEC0"
                value={formData.dreamCareer}
                onChangeText={(value) => updateFormData('dreamCareer', value)}
                autoFocus
              />
              <Text style={styles.helpText}>
                Don't worry if you're not sure yet - dreams can change and grow!
              </Text>
            </View>
          </View>
        );

      case 'subjects':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconContainer}>
              <BookOpen size={40} color="#48BB78" />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.subjectGrid}>
                {['Mathematics', 'English', 'Science', 'Social Studies', 'Kiswahili', 'Art', 'Other'].map((subject) => (
                  <TouchableOpacity
                    key={subject}
                    style={[
                      styles.subjectButton,
                      formData.favoriteSubject === subject && styles.subjectButtonSelected
                    ]}
                    onPress={() => updateFormData('favoriteSubject', subject)}
                  >
                    <Text style={[
                      styles.subjectButtonText,
                      formData.favoriteSubject === subject && styles.subjectButtonTextSelected
                    ]}>
                      {subject}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );

      case 'social':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconContainer}>
              <Users size={40} color="#4299E1" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Who is your best friend?"
                placeholderTextColor="#A0AEC0"
                value={formData.bestFriend}
                onChangeText={(value) => updateFormData('bestFriend', value)}
                autoFocus
              />
            </View>
          </View>
        );

      case 'teacher':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconContainer}>
              <Users size={40} color="#4299E1" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Who is your favorite teacher?"
                placeholderTextColor="#A0AEC0"
                value={formData.favoriteTeacher}
                onChangeText={(value) => updateFormData('favoriteTeacher', value)}
              />
            </View>
          </View>
        );

      case 'learning':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconContainer}>
              <Heart size={40} color="#FF6B6B" />
            </View>
              <View style={styles.learningStyleContainer}>
                {[
                  { id: 'reading', label: 'Reading 📚' },
                  { id: 'listening', label: 'Listening 🎧' },
                  { id: 'watching', label: 'Watching 📺' },
                  { id: 'doing', label: 'Hands-on 🛠️' }
                ].map((style) => (
                  <TouchableOpacity
                    key={style.id}
                    style={[
                      styles.learningStyleButton,
                      formData.learningStyle === style.id && styles.learningStyleButtonSelected
                    ]}
                    onPress={() => updateFormData('learningStyle', style.id)}
                  >
                    <Text style={[
                      styles.learningStyleLabel,
                      formData.learningStyle === style.id && styles.learningStyleLabelSelected
                    ]}>
                      {style.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
          </View>
        );

      case 'complete':
        return (
          <View style={styles.completeContainer}>
            <Animated.View style={[
              styles.celebrationIcon,
              { transform: [{ scale: celebrationAnim }] }
            ]}>
              <Check size={80} color="#48BB78" />
            </Animated.View>
            <Text style={styles.completeSubtitle}>
              We've created a personalized learning experience just for you{formData.firstName ? `, ${formData.firstName}` : ''}!
            </Text>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Your Learning Profile:</Text>
              {formData.favoriteSubject && <Text style={styles.summaryItem}>📚 Favorite Subject: {formData.favoriteSubject}</Text>}
              {formData.dreamCareer && <Text style={styles.summaryItem}>🎯 Dream Career: {formData.dreamCareer}</Text>}
              {formData.learningStyle && <Text style={styles.summaryItem}>💡 Learning Style: {formData.learningStyle}</Text>}
              {formData.school && <Text style={styles.summaryItem}>🏫 School: {formData.school}</Text>}
              {formData.bestFriend && <Text style={styles.summaryItem}>👥 Best Friend: {formData.bestFriend}</Text>}
              {formData.favoriteTeacher && <Text style={styles.summaryItem}>👨‍🏫 Favorite Teacher: {formData.favoriteTeacher}</Text>}
            </View>
            <TouchableOpacity
              style={[styles.completeButton, isLoading && styles.buttonDisabled]}
              onPress={handleComplete}
              disabled={isLoading}
            >
              <Text style={styles.completeButtonText}>
                {isLoading ? 'Setting up your account...' : 'Start Learning! 🚀'}
              </Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <DevModeIndicator />
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <TouchableOpacity style={styles.backButton} onPress={prevStep}>
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
          )}
          <View style={styles.headerCenter}>
            <Text style={styles.stepCounter}>
              {currentStep + 1} of {steps.length}
            </Text>
            <View style={styles.progressBarContainer}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Animated.View
            style={[
              styles.stepContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>
            {steps[currentStep].subtitle.trim() !== '' && (
              <Text style={styles.stepSubtitle}>{steps[currentStep].subtitle}</Text>
            )}
            
            {renderStep()}
          </Animated.View>
        </ScrollView>

        {/* Footer */}
        {currentStep < steps.length - 1 && (
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={nextStep}
            >
              <Text style={styles.nextButtonText}>
                {currentStep === 0 ? "Let's go!" : 'Continue'}
              </Text>
              <ChevronRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: 40,
  },
  stepCounter: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  progressBarContainer: {
    width: width * 0.6,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    maxWidth: width - 40,
    alignSelf: 'center',
  },
  stepTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  featureList: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
    marginLeft: 12,
  },
  stepContainer: {
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 8,
  },
  centeredLabel: {
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
  },
  inputError: {
    borderColor: '#E53E3E',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E53E3E',
    marginTop: 4,
  },
  helpText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginTop: 8,
    fontStyle: 'italic',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#48BB78',
    borderColor: '#48BB78',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
  },
  optionTextSelected: {
    color: 'white',
  },
  gradeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gradeButton: {
    width: '48%',
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  gradeButtonSelected: {
    backgroundColor: '#4299E1',
    borderColor: '#4299E1',
  },
  gradeText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
  },
  gradeTextSelected: {
    color: 'white',
  },
  subjectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subjectButton: {
    width: '48%',
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectButtonSelected: {
    backgroundColor: '#48BB78',
    borderColor: '#48BB78',
  },
  subjectButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
    textAlign: 'center',
  },
  subjectButtonTextSelected: {
    color: 'white',
  },
  learningStyleContainer: {
    gap: 12,
    marginTop: 20,
  },
  learningStyleButton: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
  },
  learningStyleButtonSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  learningStyleLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  learningStyleLabelSelected: {
    color: 'white',
  },
  learningStyleDesc: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  learningStyleDescSelected: {
    color: 'rgba(255,255,255,0.9)',
  },
  completeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  celebrationIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0FFF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  completeTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 16,
  },
  completeSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  summaryContainer: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 12,
    textAlign: 'center',
  },
  summaryItem: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginBottom: 6,
    paddingLeft: 8,
  },
  completeButton: {
    backgroundColor: '#48BB78',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
    shadowColor: '#48BB78',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  nextButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginRight: 8,
  },
});