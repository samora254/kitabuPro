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
  FlatList,
  ActivityIndicator,
  Linking,
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
  Check,
  GraduationCap,
  User as UserIcon,
  School,
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
  role: 'student' | 'teacher' | '';
  examNumber: string;
  teachingGrades: string[];
  teachingSubjects: string[];
  roleModel: string;
  dreamCareer: string;
  favoriteSubject: string;
  leastFavoriteSubject: string;
  bestFriend: string;
  favoriteTeacher: string;
  whyFavoriteTeacher: string;
  learningStyle: string;
}

// Mock school database
const schoolsDatabase = [
  { id: '1', name: 'Nairobi Academy', county: 'Nairobi' },
  { id: '2', name: 'Alliance High School', county: 'Kiambu' },
  { id: '3', name: 'Mang\'u High School', county: 'Kiambu' },
  { id: '4', name: 'Starehe Boys Centre', county: 'Nairobi' },
  { id: '5', name: 'Kenya High School', county: 'Nairobi' },
  { id: '6', name: 'Precious Blood Riruta', county: 'Nairobi' },
  { id: '7', name: 'Moi Girls School Nairobi', county: 'Nairobi' },
  { id: '8', name: 'Lenana School', county: 'Nairobi' },
  { id: '9', name: 'Sunshine Secondary School', county: 'Nairobi' },
  { id: '10', name: 'Maryhill Girls High School', county: 'Kiambu' },
  { id: '11', name: 'Nyeri High School', county: 'Nyeri' },
  { id: '12', name: 'Nakuru High School', county: 'Nakuru' },
  { id: '13', name: 'Mombasa High School', county: 'Mombasa' },
  { id: '14', name: 'Kisumu Boys High School', county: 'Kisumu' },
  { id: '15', name: 'St. Mary\'s School Yala', county: 'Siaya' },
];

const steps = [
  { id: 'welcome', title: "Welcome to KITABU.AI!", subtitle: "Your personalized learning journey starts here" },
  { id: 'name', title: "What's your name?", subtitle: "We'd love to know what to call you" },
  { id: 'contact', title: "How can we reach you?", subtitle: "Just in case we need to send you something awesome" },
  { id: 'security', title: "Keep your account safe", subtitle: "Choose a password you'll remember" },
  { id: 'role', title: "Select Your Role", subtitle: "Are you a teacher or a student?" },
  { id: 'student-exam', title: "Exam Number", subtitle: "Please enter your exam number" },
  { id: 'teacher-school', title: "School Information", subtitle: "Tell us where you teach" },
  { id: 'teacher-grades', title: "Grade Levels", subtitle: "Select the grades you teach" },
  { id: 'teacher-subjects', title: "Teaching Subjects", subtitle: "Select the subjects you teach" },
  { id: 'personal', title: "Tell us about yourself", subtitle: "Help us personalize your experience" },
  { id: 'school', title: "Where do you study?", subtitle: "Help us connect you with your school community" },
  { id: 'inspiration', title: "Who inspires you?", subtitle: "Tell us about your role model" },
  { id: 'dreams', title: "What's your dream career?", subtitle: "Share your aspirations with us" },
  { id: 'subjects', title: "Your favorite subject?", subtitle: "Let us know what you love learning" },
  { id: 'social', title: "Best Friend", subtitle: "Who do you like spending time with?" },
  { id: 'teacher', title: "Favorite Teacher", subtitle: "Who inspires your learning?" },
  { id: 'learning', title: "How do you learn best?", subtitle: "Help us personalize your experience" },
  { id: 'complete', title: "You're all set! 🎉", subtitle: "Ready to start your learning journey" },
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
    role: '',
    examNumber: '',
    teachingGrades: [],
    teachingSubjects: [],
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

  // School search state
  const [schoolSearchResults, setSchoolSearchResults] = useState<Array<{ id: string; name: string; county: string }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSchoolResults, setShowSchoolResults] = useState(false);

  // Available grades for teacher selection
  const availableGrades = ['GRADE 4', 'GRADE 5', 'GRADE 6', 'GRADE 7', 'GRADE 8', 'GRADE 9', 'GRADE 10', 'GRADE 11', 'GRADE 12'];
  
  // Available subjects for teacher selection
  const availableSubjects = ['Mathematics', 'English', 'Kiswahili', 'Science', 'Social Studies', 'Home Science'];
  
  // Available schools for teacher selection
  const availableSchools = [
    'Nairobi Academy',
    'Moi Girls High School',
    'Alliance High School',
    'Starehe Boys Centre',
    'Kenya High School',
    'Precious Blood Riruta',
    'Mangu High School',
    'Nyabururu Girls High School',
    'Maryhill Girls High School',
    'St. Mary\'s School Yala'
  ];

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

  // Search schools based on input
  const searchSchools = (query: string) => {
    setFormData(prev => ({ ...prev, school: query }));
    
    if (query.length < 2) {
      setSchoolSearchResults([]);
      setShowSchoolResults(false);
      return;
    }
    
    setIsSearching(true);
    setShowSchoolResults(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const results = schoolsDatabase.filter(school => 
        school.name.toLowerCase().includes(query.toLowerCase())
      );
      setSchoolSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  // Handle school selection
  const handleSelectSchool = (school: { id: string; name: string; county: string }) => {
    setFormData(prev => ({ ...prev, school: school.name }));
    setShowSchoolResults(false);
    if (errors.school) {
      setErrors(prev => ({ ...prev, school: undefined }));
    }
  };

  // Contact admin via WhatsApp
  const contactAdmin = () => {
    Linking.openURL('https://wa.me/254704646611');
  };

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
      
      // Skip student-specific steps if user is a teacher
      if (formData.role === 'teacher' && currentStep === 4) {
        // First ask for gender (personal info)
        animateTransition(() => {
          setCurrentStep(9); // Go to personal info for gender selection
        });
        return;
      }
      
      // Skip teacher-specific steps if user is a student
      if (formData.role === 'student' && currentStep === 5) {
        animateTransition(() => {
          setCurrentStep(9); // Skip to personal info
        });
        return;
      }
      
      animateTransition(() => {
        setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
      });
    }
  };

  const prevStep = () => {
    // Handle special navigation for role-specific paths
    if (formData.role === 'teacher' && currentStep === 18) {
      animateTransition(() => {
        setCurrentStep(8); // Go back to teacher subjects from complete screen
      });
      return;
    }
    
    if (formData.role === 'teacher' && currentStep === 9) {
      animateTransition(() => {
        setCurrentStep(4); // Go back to role selection
      });
      return;
    }
    
    if (formData.role === 'student' && currentStep === 9) {
      animateTransition(() => {
        setCurrentStep(5); // Go back to student exam number
      });
      return;
    }
    
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
      case 4: // Role selection
        if (!formData.role && !shouldAllowEmptyForms()) {
          newErrors.role = 'Please select a role';
        }
        break;
      case 5: // Student exam number
        if (formData.role === 'student' && !formData.examNumber.trim() && !shouldAllowEmptyForms()) {
          newErrors.examNumber = 'Exam number is required';
        }
        break;
      case 6: // Teacher school
        if (formData.role === 'teacher' && !formData.school.trim() && !shouldAllowEmptyForms()) {
          newErrors.school = 'School name is required';
        }
        break;
      case 7: // Teacher grades
        if (formData.role === 'teacher' && formData.teachingGrades.length === 0 && !shouldAllowEmptyForms()) {
          newErrors.teachingGrades = 'Please select at least one grade';
        }
        break;
      case 8: // Teacher subjects
        if (formData.role === 'teacher' && formData.teachingSubjects.length === 0 && !shouldAllowEmptyForms()) {
          newErrors.teachingSubjects = 'Please select at least one subject';
        }
        break;
      case 9: // Personal
        if (!formData.gender && !shouldAllowEmptyForms()) {
          newErrors.gender = 'Please select your gender';
        }
        break;
      case 10: // School
        if (!formData.school.trim() && !shouldAllowEmptyForms()) {
          newErrors.school = 'School name is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
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
      // Route to appropriate dashboard based on role
      if (formData.role === 'teacher') {
        router.replace('/admin'); // Direct teachers to admin dashboard
      } else {
        router.replace('/dashboard');
      }
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

      case 'role':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.roleSelectionTitle}>I am a:</Text>
            <View style={styles.roleButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  formData.role === 'student' && styles.selectedRoleButton
                ]}
                onPress={() => updateFormData('role', 'student')}
              >
                <UserIcon size={40} color={formData.role === 'student' ? "white" : "#4299E1"} />
                <Text style={[
                  styles.roleButtonText,
                  formData.role === 'student' && styles.selectedRoleButtonText
                ]}>
                  Student
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  formData.role === 'teacher' && styles.selectedRoleButton
                ]}
                onPress={() => updateFormData('role', 'teacher')}
              >
                <GraduationCap size={40} color={formData.role === 'teacher' ? "white" : "#4299E1"} />
                <Text style={[
                  styles.roleButtonText,
                  formData.role === 'teacher' && styles.selectedRoleButtonText
                ]}>
                  Teacher
                </Text>
              </TouchableOpacity>
            </View>
            {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}
          </View>
        );

      case 'student-exam':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Exam Number</Text>
              <TextInput
                style={[styles.input, errors.examNumber && styles.inputError]}
                placeholder="Enter your exam number"
                placeholderTextColor="#A0AEC0"
                value={formData.examNumber}
                onChangeText={(value) => updateFormData('examNumber', value)}
                autoFocus
              />
              {errors.examNumber && <Text style={styles.errorText}>{errors.examNumber}</Text>}
              <Text style={styles.helpText}>
                Your exam number is used to link your account with your academic records.
              </Text>
            </View>
          </View>
        );

      case 'teacher-school':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Select Your School</Text>
              <View style={styles.schoolSelector}>
                <ScrollView style={styles.schoolList}>
                  {availableSchools.map((school) => (
                    <TouchableOpacity
                      key={school}
                      style={[
                        styles.schoolOption,
                        formData.school === school && styles.selectedSchoolOption
                      ]}
                      onPress={() => updateFormData('school', school)}
                    >
                      <School size={20} color={formData.school === school ? "#4299E1" : "#718096"} />
                      <Text style={[
                        styles.schoolOptionText,
                        formData.school === school && styles.selectedSchoolOptionText
                      ]}>
                        {school}
                      </Text>
                      {formData.school === school && (
                        <Check size={20} color="#4299E1" />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              {errors.school && <Text style={styles.errorText}>{errors.school}</Text>}
              <Text style={styles.helpText}>
                If your school is not listed, please contact our support team.
              </Text>
            </View>
          </View>
        );

      case 'teacher-grades':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Select Grades You Teach</Text>
              <Text style={styles.sublabel}>Select all that apply</Text>
              
              <View style={styles.gradesGrid}>
                {availableGrades.map((grade) => (
                  <TouchableOpacity
                    key={grade}
                    style={[
                      styles.gradeCheckbox,
                      formData.teachingGrades.includes(grade) && styles.selectedGradeCheckbox
                    ]}
                    onPress={() => {
                      const updatedGrades = formData.teachingGrades.includes(grade)
                        ? formData.teachingGrades.filter(g => g !== grade)
                        : [...formData.teachingGrades, grade];
                      updateFormData('teachingGrades', updatedGrades);
                    }}
                  >
                    <View style={[
                      styles.checkbox,
                      formData.teachingGrades.includes(grade) && styles.checkedCheckbox
                    ]}>
                      {formData.teachingGrades.includes(grade) && (
                        <Check size={16} color="white" />
                      )}
                    </View>
                    <Text style={styles.gradeCheckboxText}>{grade}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              {errors.teachingGrades && <Text style={styles.errorText}>{errors.teachingGrades}</Text>}
            </View>
          </View>
        );

      case 'teacher-subjects':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Select Subjects You Teach</Text>
              <Text style={styles.sublabel}>Select all that apply</Text>
              
              <View style={styles.subjectsContainer}>
                {availableSubjects.map((subject) => (
                  <TouchableOpacity
                    key={subject}
                    style={[
                      styles.subjectCheckbox,
                      formData.teachingSubjects.includes(subject) && styles.selectedSubjectCheckbox
                    ]}
                    onPress={() => {
                      const updatedSubjects = formData.teachingSubjects.includes(subject)
                        ? formData.teachingSubjects.filter(s => s !== subject)
                        : [...formData.teachingSubjects, subject];
                      updateFormData('teachingSubjects', updatedSubjects);
                    }}
                  >
                    <View style={[
                      styles.checkbox,
                      formData.teachingSubjects.includes(subject) && styles.checkedCheckbox
                    ]}>
                      {formData.teachingSubjects.includes(subject) && (
                        <Check size={16} color="white" />
                      )}
                    </View>
                    <Text style={styles.subjectCheckboxText}>{subject}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              {errors.teachingSubjects && <Text style={styles.errorText}>{errors.teachingSubjects}</Text>}
            </View>
          </View>
        );

      case 'personal':
        return (
          <View style={styles.stepContainer}>
            {formData.role === 'teacher' ? (
              <View>
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
                
                {/* After gender selection, show school selection for teachers */}
                {formData.gender && (
                  <View style={styles.teacherSchoolContainer}>
                    <Text style={styles.label}>Select Your School</Text>
                    <View style={styles.schoolSelector}>
                      <ScrollView style={styles.schoolList}>
                        {availableSchools.map((school) => (
                          <TouchableOpacity
                            key={school}
                            style={[
                              styles.schoolOption,
                              formData.school === school && styles.selectedSchoolOption
                            ]}
                            onPress={() => updateFormData('school', school)}
                          >
                            <School size={20} color={formData.school === school ? "#4299E1" : "#718096"} />
                            <Text style={[
                              styles.schoolOptionText,
                              formData.school === school && styles.selectedSchoolOptionText
                            ]}>
                              {school}
                            </Text>
                            {formData.school === school && (
                              <Check size={20} color="#4299E1" />
                            )}
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                    {errors.school && <Text style={styles.errorText}>{errors.school}</Text>}
                  </View>
                )}
                
                {/* After school selection, show grade selection for teachers */}
                {formData.gender && formData.school && (
                  <View style={styles.teacherGradesContainer}>
                    <Text style={styles.label}>Select Grades You Teach</Text>
                    <Text style={styles.sublabel}>Select all that apply</Text>
                    
                    <View style={styles.gradesGrid}>
                      {availableGrades.map((grade) => (
                        <TouchableOpacity
                          key={grade}
                          style={[
                            styles.gradeCheckbox,
                            formData.teachingGrades.includes(grade) && styles.selectedGradeCheckbox
                          ]}
                          onPress={() => {
                            const updatedGrades = formData.teachingGrades.includes(grade)
                              ? formData.teachingGrades.filter(g => g !== grade)
                              : [...formData.teachingGrades, grade];
                            updateFormData('teachingGrades', updatedGrades);
                          }}
                        >
                          <View style={[
                            styles.checkbox,
                            formData.teachingGrades.includes(grade) && styles.checkedCheckbox
                          ]}>
                            {formData.teachingGrades.includes(grade) && (
                              <Check size={16} color="white" />
                            )}
                          </View>
                          <Text style={styles.gradeCheckboxText}>{grade}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    
                    {errors.teachingGrades && <Text style={styles.errorText}>{errors.teachingGrades}</Text>}
                  </View>
                )}
                
                {/* After grade selection, show subject selection for teachers */}
                {formData.gender && formData.school && formData.teachingGrades.length > 0 && (
                  <View style={styles.teacherSubjectsContainer}>
                    <Text style={styles.label}>Select Subjects You Teach</Text>
                    <Text style={styles.sublabel}>Select all that apply</Text>
                    
                    <View style={styles.subjectsContainer}>
                      {availableSubjects.map((subject) => (
                        <TouchableOpacity
                          key={subject}
                          style={[
                            styles.subjectCheckbox,
                            formData.teachingSubjects.includes(subject) && styles.selectedSubjectCheckbox
                          ]}
                          onPress={() => {
                            const updatedSubjects = formData.teachingSubjects.includes(subject)
                              ? formData.teachingSubjects.filter(s => s !== subject)
                              : [...formData.teachingSubjects, subject];
                            updateFormData('teachingSubjects', updatedSubjects);
                          }}
                        >
                          <View style={[
                            styles.checkbox,
                            formData.teachingSubjects.includes(subject) && styles.checkedCheckbox
                          ]}>
                            {formData.teachingSubjects.includes(subject) && (
                              <Check size={16} color="white" />
                            )}
                          </View>
                          <Text style={styles.subjectCheckboxText}>{subject}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    
                    {errors.teachingSubjects && <Text style={styles.errorText}>{errors.teachingSubjects}</Text>}
                  </View>
                )}
              </View>
            ) : (
              <View>
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
            )}
          </View>
        );

      case 'school':
        return (
          <View style={styles.stepContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Where do you study?</Text>
              <Text style={styles.helpText}>
                Help us connect you with your school community
              </Text>
              
              <Text style={styles.schoolLabel}>What's the name of your school?</Text>
              <View style={styles.schoolInputContainer}>
                <TextInput
                  style={[styles.input, errors.school && styles.inputError]}
                  placeholder="e.g., Nairobi Academy"
                  placeholderTextColor="#A0AEC0"
                  value={formData.school}
                  onChangeText={searchSchools}
                  autoFocus
                />
                {isSearching && (
                  <ActivityIndicator size="small" color="#4299E1" style={styles.searchingIndicator} />
                )}
              </View>
              
              {errors.school && <Text style={styles.errorText}>{errors.school}</Text>}
              
              {showSchoolResults && (
                <View style={styles.schoolResultsContainer}>
                  {schoolSearchResults.length > 0 ? (
                    <FlatList
                      data={schoolSearchResults}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.schoolResultItem}
                          onPress={() => handleSelectSchool(item)}
                        >
                          <Text style={styles.schoolResultName}>{item.name}</Text>
                          <Text style={styles.schoolResultCounty}>{item.county} County</Text>
                        </TouchableOpacity>
                      )}
                      style={styles.schoolResultsList}
                      nestedScrollEnabled
                      maxHeight={200}
                    />
                  ) : (
                    <View style={styles.noResultsContainer}>
                      <Text style={styles.noResultsText}>No schools found</Text>
                      <TouchableOpacity onPress={contactAdmin}>
                        <Text style={styles.contactAdminText}>
                          Contact <Text style={styles.adminLink}>admin</Text> to add your school
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
              
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
            {formData.role === 'teacher' ? (
              <View>
                <Animated.View style={[
                  styles.celebrationIcon,
                  { transform: [{ scale: celebrationAnim }] }
                ]}>
                  <GraduationCap size={80} color="#48BB78" />
                </Animated.View>
                <Text style={styles.completeSubtitle}>
                  Welcome to the Teacher's Portal, {formData.firstName}! Your account is ready.
                </Text>
                <View style={styles.summaryContainer}>
                  <Text style={styles.summaryTitle}>Your Teaching Profile:</Text>
                  <Text style={styles.summaryItem}>👨‍🏫 Name: {formData.firstName} {formData.lastName}</Text>
                  <Text style={styles.summaryItem}>🏫 School: {formData.school}</Text>
                  <Text style={styles.summaryItem}>🎓 Teaching Grades: {formData.teachingGrades.join(', ')}</Text>
                  <Text style={styles.summaryItem}>📚 Teaching Subjects: {formData.teachingSubjects.join(', ')}</Text>
                  <Text style={styles.summaryItem}>📧 Email: {formData.email}</Text>
                  <Text style={styles.summaryItem}>📱 Phone: {formData.phone}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.completeButton, isLoading && styles.buttonDisabled]}
                  onPress={handleComplete}
                  disabled={isLoading}
                >
                  <Text style={styles.completeButtonText}>
                    {isLoading ? 'Setting up your account...' : 'Go to Admin Dashboard'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
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
                  {formData.role === 'student' && formData.examNumber && <Text style={styles.summaryItem}>🔢 Exam Number: {formData.examNumber}</Text>}
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
            )}
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
  schoolLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
    marginTop: 8,
    marginBottom: 8,
  },
  schoolInputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchingIndicator: {
    position: 'absolute',
    right: 16,
  },
  schoolResultsContainer: {
    marginTop: 4,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10,
  },
  schoolResultsList: {
    maxHeight: 200,
  },
  schoolResultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  schoolResultName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
  },
  schoolResultCounty: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginTop: 2,
  },
  noResultsContainer: {
    padding: 16,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
    marginBottom: 8,
  },
  contactAdminText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  adminLink: {
    color: '#4299E1',
    fontFamily: 'Inter-SemiBold',
    textDecorationLine: 'underline',
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
  sublabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginBottom: 12,
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
  roleSelectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 24,
  },
  roleButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  roleButton: {
    width: 140,
    height: 140,
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  selectedRoleButton: {
    backgroundColor: '#4299E1',
    borderColor: '#4299E1',
  },
  roleButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginTop: 12,
  },
  selectedRoleButtonText: {
    color: 'white',
  },
  schoolSelector: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    maxHeight: 200,
    marginBottom: 8,
  },
  schoolList: {
    padding: 8,
  },
  schoolOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  selectedSchoolOption: {
    backgroundColor: '#EBF8FF',
  },
  schoolOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    flex: 1,
    marginLeft: 12,
  },
  selectedSchoolOptionText: {
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
  },
  gradesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  gradeCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  selectedGradeCheckbox: {
    backgroundColor: '#EBF8FF',
    borderRadius: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkedCheckbox: {
    backgroundColor: '#4299E1',
    borderColor: '#4299E1',
  },
  gradeCheckboxText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
  },
  subjectsContainer: {
    marginTop: 8,
  },
  subjectCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  selectedSubjectCheckbox: {
    backgroundColor: '#EBF8FF',
    borderRadius: 8,
  },
  subjectCheckboxText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
  },
  teacherSchoolContainer: {
    marginTop: 24,
  },
  teacherGradesContainer: {
    marginTop: 24,
  },
  teacherSubjectsContainer: {
    marginTop: 24,
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