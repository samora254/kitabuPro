import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
import { useAuth } from '@/contexts/AuthContext';

type OnboardingStep = 'credentials' | 'personal' | 'role' | 'grade';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState<'student' | 'teacher' | null>(null);
  const [grade, setGrade] = useState('');
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('credentials');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signUp } = useAuth();

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
  }, [currentStep]);

  const validateCredentials = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePersonal = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!lastName) {
      newErrors.lastName = 'Last name is required';
    }

    if (!age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(age)) || Number(age) < 5 || Number(age) > 100) {
      newErrors.age = 'Please enter a valid age between 5 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRole = () => {
    const newErrors: Record<string, string> = {};

    if (!role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateGrade = () => {
    const newErrors: Record<string, string> = {};

    if (role === 'student' && !grade) {
      newErrors.grade = 'Please select a grade';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;

    switch (currentStep) {
      case 'credentials':
        isValid = validateCredentials();
        if (isValid) setCurrentStep('personal');
        break;
      case 'personal':
        isValid = validatePersonal();
        if (isValid) setCurrentStep('role');
        break;
      case 'role':
        isValid = validateRole();
        if (isValid) {
          if (role === 'student') {
            setCurrentStep('grade');
          } else {
            handleSignUp();
          }
        }
        break;
      case 'grade':
        isValid = validateGrade();
        if (isValid) {
          handleSignUp();
        }
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'personal':
        setCurrentStep('credentials');
        break;
      case 'role':
        setCurrentStep('personal');
        break;
      case 'grade':
        setCurrentStep('role');
        break;
      default:
        router.back();
    }
  };

  const handleSignUp = useCallback(async () => {
    // Validate all steps
    if (
      !validateCredentials() ||
      !validatePersonal() ||
      !validateRole() ||
      (role === 'student' && !validateGrade())
    ) {
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        name: `${firstName} ${lastName}`,
        role,
        grade: role === 'student' ? grade : undefined,
        age: Number(age),
      };

      await signUp(email, password, userData);
      
      // Navigate to dashboard after successful signup
      router.replace('/dashboard');
    } catch (error: any) {
      console.error('Error signing up:', error);
      Alert.alert('Sign Up Failed', error.message || 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, firstName, lastName, age, role, grade, signUp]);

  const renderCredentialsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Create Your Account</Text>
      <Text style={styles.stepSubtitle}>Enter your email and create a password</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="you@example.com"
          placeholderTextColor="#A0AEC0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Create a password"
          placeholderTextColor="#A0AEC0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          placeholder="Confirm your password"
          placeholderTextColor="#A0AEC0"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      </View>
    </View>
  );

  const renderPersonalStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <Text style={styles.stepSubtitle}>Tell us a bit about yourself</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={[styles.input, errors.firstName && styles.inputError]}
          placeholder="Your first name"
          placeholderTextColor="#A0AEC0"
          value={firstName}
          onChangeText={setFirstName}
        />
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={[styles.input, errors.lastName && styles.inputError]}
          placeholder="Your last name"
          placeholderTextColor="#A0AEC0"
          value={lastName}
          onChangeText={setLastName}
        />
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={[styles.input, errors.age && styles.inputError]}
          placeholder="Your age"
          placeholderTextColor="#A0AEC0"
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
        />
        {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
      </View>
    </View>
  );

  const renderRoleStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Your Role</Text>
      <Text style={styles.stepSubtitle}>Are you a student or a teacher?</Text>

      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleCard, role === 'student' && styles.roleCardSelected]}
          onPress={() => setRole('student')}
        >
          <View style={[styles.roleIcon, role === 'student' && styles.roleIconSelected]}>
            <Text style={styles.roleIconText}>👨‍🎓</Text>
          </View>
          <Text style={[styles.roleName, role === 'student' && styles.roleNameSelected]}>Student</Text>
          <Text style={styles.roleDescription}>Access learning materials, submit homework, and track your progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleCard, role === 'teacher' && styles.roleCardSelected]}
          onPress={() => setRole('teacher')}
        >
          <View style={[styles.roleIcon, role === 'teacher' && styles.roleIconSelected]}>
            <Text style={styles.roleIconText}>👩‍🏫</Text>
          </View>
          <Text style={[styles.roleName, role === 'teacher' && styles.roleNameSelected]}>Teacher</Text>
          <Text style={styles.roleDescription}>Create assignments, grade submissions, and manage your classes</Text>
        </TouchableOpacity>
      </View>

      {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}
    </View>
  );

  const renderGradeStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Your Grade</Text>
      <Text style={styles.stepSubtitle}>What grade are you currently in?</Text>

      <View style={styles.gradeContainer}>
        {['Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((gradeOption) => (
          <TouchableOpacity
            key={gradeOption}
            style={[styles.gradeCard, grade === gradeOption && styles.gradeCardSelected]}
            onPress={() => setGrade(gradeOption)}
          >
            <Text style={[styles.gradeText, grade === gradeOption && styles.gradeTextSelected]}>
              {gradeOption}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {errors.grade && <Text style={styles.errorText}>{errors.grade}</Text>}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <DevModeIndicator />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
          >
            <ChevronLeft size={24} color="#2D3748" />
          </TouchableOpacity>
          
          <View style={styles.stepIndicator}>
            <View style={[styles.stepDot, currentStep === 'credentials' && styles.activeStepDot]} />
            <View style={styles.stepLine} />
            <View style={[styles.stepDot, currentStep === 'personal' && styles.activeStepDot]} />
            <View style={styles.stepLine} />
            <View style={[styles.stepDot, currentStep === 'role' && styles.activeStepDot]} />
            {role === 'student' && (
              <>
                <View style={styles.stepLine} />
                <View style={[styles.stepDot, currentStep === 'grade' && styles.activeStepDot]} />
              </>
            )}
          </View>
        </Animated.View>

        {/* Content */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {currentStep === 'credentials' && renderCredentialsStep()}
          {currentStep === 'personal' && renderPersonalStep()}
          {currentStep === 'role' && renderRoleStep()}
          {currentStep === 'grade' && renderGradeStep()}

          <TouchableOpacity
            style={[styles.nextButton, isLoading && styles.buttonDisabled]}
            onPress={handleNext}
            disabled={isLoading}
          >
            <Text style={styles.nextButtonText}>
              {isLoading 
                ? 'Processing...' 
                : currentStep === 'grade' || (currentStep === 'role' && role === 'teacher') 
                  ? 'Sign Up' 
                  : 'Next'}
            </Text>
            {!isLoading && (
              currentStep === 'grade' || (currentStep === 'role' && role === 'teacher') 
                ? null 
                : <ChevronRight size={20} color="white" />
            )}
          </TouchableOpacity>

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/signin')}>
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepIndicator: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 40,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E2E8F0',
  },
  activeStepDot: {
    backgroundColor: '#4299E1',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stepLine: {
    height: 2,
    width: 20,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    marginBottom: 30,
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
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
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
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E53E3E',
    marginTop: 4,
  },
  roleContainer: {
    gap: 16,
    marginBottom: 20,
  },
  roleCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  roleCardSelected: {
    borderColor: '#4299E1',
    backgroundColor: '#EBF8FF',
  },
  roleIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleIconSelected: {
    backgroundColor: '#BEE3F8',
  },
  roleIconText: {
    fontSize: 32,
  },
  roleName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 8,
  },
  roleNameSelected: {
    color: '#4299E1',
  },
  roleDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
  },
  gradeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  gradeCard: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    marginBottom: 12,
  },
  gradeCardSelected: {
    borderColor: '#4299E1',
    backgroundColor: '#EBF8FF',
  },
  gradeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
  },
  gradeTextSelected: {
    color: '#4299E1',
  },
  nextButton: {
    backgroundColor: '#4299E1',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginRight: 8,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  signInText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  signInLink: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
  },
});