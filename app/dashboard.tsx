import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  TextInput,
  Image,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Bell, 
  BookOpen, 
  Calculator, 
  Globe, 
  Beaker, 
  Users, 
  Heart, 
  Palette, 
  Gamepad2,
  Send, 
  Mic, 
  Paperclip, 
  Headphones, 
  Trophy, 
  User, 
  FileText,
  GraduationCap,
  ChevronDown,
  Check
} from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

const { width } = Dimensions.get('window');

interface Subject {
  id: string;
  name: string;
  color: string;
  icon: any;
}

export default function Dashboard() {
  const [helpText, setHelpText] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('GRADE 8');
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const grades = [
    'GRADE 4', 'GRADE 5', 'GRADE 6', 'GRADE 7', 'GRADE 8', 
    'GRADE 9', 'GRADE 10', 'GRADE 11', 'GRADE 12'
  ];
  // Fixed 7 subjects from profile - ensuring exactly 7 subjects are always displayed
  // Load saved grade on component mount
  useEffect(() => {
    loadSavedGrade();
  }, []);

  const loadSavedGrade = async () => {
    try {
      const savedGrade = await AsyncStorage.getItem('selectedGrade');
      if (savedGrade) {
        setSelectedGrade(savedGrade);
      }
    } catch (error) {
      console.log('Error loading saved grade:', error);
    }
  };

  const saveGrade = async (grade: string) => {
    try {
      await AsyncStorage.setItem('selectedGrade', grade);
    } catch (error) {
      console.log('Error saving grade:', error);
    }
  };
  const subjects: Subject[] = [
    { id: 'mathematics', name: 'Mathematics', color: '#E879F9', icon: Calculator },
    { id: 'english', name: 'English', color: '#60A5FA', icon: BookOpen },
    { id: 'kiswahili', name: 'Kiswahili', color: '#34D399', icon: Globe },
    { id: 'science', name: 'Home Science', color: '#FB7185', icon: Beaker },
    { id: 'social-studies', name: 'Social Studies', color: '#FBBF24', icon: Users },
    { id: 'play-quiz', name: 'Play Quiz', color: '#8B5CF6', icon: Gamepad2 },
  ];

  // Fixed 3 quick actions
  const quickActions = [
    { id: 'podcasts', name: 'Podcasts', icon: Headphones, color: '#6B7280' },
    { id: 'past-papers', name: 'Past Papers', icon: FileText, color: '#6B7280' },
    { id: 'homework', name: 'Homework', icon: GraduationCap, color: '#6B7280' },
  ];

  useEffect(() => {
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
    ]).start();
  }, []);

  const navigateToSubject = (subjectId: string) => {
    if (subjectId === 'play-quiz') {
      router.push('/quiz');
    } else {
      router.push(`/subjects/${subjectId}`);
    }
  };

  const handleQuickAction = (actionId: string) => {
    if (actionId === 'podcasts') {
      router.push('/(tabs)/podcasts');
    } else {
      Alert.alert('Quick Action', `${actionId} feature coming soon!`);
    }
  };

  const handleSendHelp = () => {
    if (helpText.trim()) {
      Alert.alert('Help Request', `Your question: "${helpText}" has been sent to our AI tutor!`);
      setHelpText('');
    }
  };

  const openProfileSettings = () => {
    router.push('/profile');
  };

  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade);
    saveGrade(grade); // Auto-save the selection
    setShowGradeDropdown(false);
  };
  return (
    <View style={styles.container}>
      <DevModeIndicator />
      
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
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoText}>📚</Text>
            </View>
            <Text style={styles.logoTitle}>
              KITABU<Text style={styles.logoAccent}>.AI</Text>
            </Text>
            <TouchableOpacity 
              style={styles.gradeBadge}
              onPress={() => setShowGradeDropdown(true)}
            >
              <Text style={styles.gradeText}>{selectedGrade}</Text>
              <ChevronDown size={14} color="white" style={styles.chevronIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Bell size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={openProfileSettings}
            >
              <User size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.carouselImage}
            resizeMode="cover"
          />
        </View>
      </Animated.View>

      {/* Grade Selection Modal */}
      <Modal
        visible={showGradeDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowGradeDropdown(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowGradeDropdown(false)}
        >
          <TouchableOpacity 
            style={styles.gradeDropdown}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>Select Grade</Text>
            </View>
            <ScrollView 
              style={styles.gradeScrollView}
              showsVerticalScrollIndicator={true}
              indicatorStyle="default"
            >
              {grades.map((grade, index) => (
                <TouchableOpacity
                  key={grade}
                  style={[
                    styles.gradeOption,
                    selectedGrade === grade && styles.selectedGradeOption,
                    index === grades.length - 1 && styles.lastGradeOption
                  ]}
                  onPress={() => handleGradeSelect(grade)}
                >
                  <Text style={[
                    styles.gradeOptionText,
                    selectedGrade === grade && styles.selectedGradeOptionText
                  ]}>
                    {grade}
                  </Text>
                  {selectedGrade === grade && (
                    <Check size={16} color="#10B981" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      {/* Main Content - Fixed Layout */}
      <View style={styles.mainContent}>
        {/* Quick Actions Section - Fixed 3 buttons */}
        <Animated.View
          style={[
            styles.quickActionsSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionButton}
                onPress={() => handleQuickAction(action.name)}
              >
                <action.icon size={24} color={action.color} />
                <Text style={styles.quickActionText}>{action.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Subjects Section - Fixed 7 buttons, no scroll */}
        <Animated.View
          style={[
            styles.subjectsSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>My Subjects</Text>
          <View style={styles.subjectsContainer}>
            {subjects.map((subject) => (
              <TouchableOpacity
                key={subject.id}
                style={[styles.subjectButton, { backgroundColor: subject.color }]}
                onPress={() => navigateToSubject(subject.id)}
              >
                <Text style={styles.subjectText}>{subject.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Help Section */}
        <Animated.View
          style={[
            styles.helpSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.helpTitle}>Need help with homework?</Text>
          <View style={styles.helpInputContainer}>
            <TouchableOpacity style={styles.attachButton}>
              <Paperclip size={20} color="#6B7280" />
            </TouchableOpacity>
            <TextInput
              style={styles.helpInput}
              placeholder="Ask me anything..."
              placeholderTextColor="#9CA3AF"
              value={helpText}
              onChangeText={setHelpText}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendHelp}>
              <Send size={20} color="#3B82F6" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.micButton}>
              <Mic size={20} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    fontSize: 16,
  },
  logoTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginRight: 12,
  },
  logoAccent: {
    color: '#10B981',
  },
  gradeBadge: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradeText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  chevronIcon: {
    marginLeft: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  gradeDropdown: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    maxWidth: 300,
    maxHeight: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  dropdownHeader: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  dropdownTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    textAlign: 'center',
  },
  gradeScrollView: {
    maxHeight: 280,
  },
  gradeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  lastGradeOption: {
    borderBottomWidth: 0,
  },
  selectedGradeOption: {
    backgroundColor: '#F0FDF4',
  },
  gradeOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  selectedGradeOptionText: {
    color: '#10B981',
    fontFamily: 'Inter-SemiBold',
  },
  heroBanner: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 100,
    marginBottom: 8,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  // Quick Actions Section
  quickActionsSection: {
    marginBottom: 12,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 60) / 3,
    height: 70,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginTop: 6,
    textAlign: 'center',
  },
  // Subjects Section - Fixed Layout
  subjectsSection: {
    marginBottom: 12,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subjectButton: {
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 52) / 2,
    height: 60,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  subjectText: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginTop: 0,
    textAlign: 'center',
    lineHeight: 15,
  },
  // Help Section
  helpSection: {
    marginBottom: 16,
  },
  helpTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  helpInputContainer: {
    backgroundColor: 'white',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  attachButton: {
    marginRight: 12,
  },
  helpInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    paddingVertical: 4,
  },
  sendButton: {
    marginHorizontal: 12,
  },
  micButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
});