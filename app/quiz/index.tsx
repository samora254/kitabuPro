import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft,
  Users,
  Clock,
  Trophy,
  Zap,
  Target,
  BookOpen,
  Calculator,
  Globe,
  Beaker,
  Heart,
  Palette,
  Music,
  ChevronRight
} from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
import { getSubjectTheme } from '@/utils/subjectThemes';

const { width } = Dimensions.get('window');

interface Subject {
  id: string;
  name: string;
  color: string;
  icon: any;
  questionCount: number;
}

interface QuizSettings {
  subject: string;
  timePerQuestion: number;
  totalQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export default function QuizSetup() {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [quizSettings, setQuizSettings] = useState<QuizSettings>({
    subject: '',
    timePerQuestion: 10,
    totalQuestions: 20,
    difficulty: 'Medium',
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const subjects: Subject[] = [
    { id: 'mathematics', name: 'Mathematics', color: '#FF6B6B', icon: Calculator, questionCount: 150 },
    { id: 'english', name: 'English', color: '#4ECDC4', icon: BookOpen, questionCount: 120 },
    { id: 'kiswahili', name: 'Kiswahili', color: '#45B7D1', icon: Globe, questionCount: 100 },
    { id: 'science', name: 'Science', color: '#96CEB4', icon: Beaker, questionCount: 180 },
    { id: 'social-studies', name: 'Social Studies', color: '#FFEAA7', icon: Users, questionCount: 90 },
    { id: 'religious', name: 'Religious Education', color: '#FD79A8', icon: Heart, questionCount: 80 },
    { id: 'art', name: 'Art & Craft', color: '#A29BFE', icon: Palette, questionCount: 60 },
    { id: 'music', name: 'Music', color: '#6C5CE7', icon: Music, questionCount: 70 },
  ];

  const timeOptions = [5, 10, 15, 20, 30];
  const questionOptions = [10, 15, 20, 25, 30];
  const difficultyOptions = ['Easy', 'Medium', 'Hard'] as const;

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

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setQuizSettings(prev => ({ ...prev, subject: subjectId }));
    
    // Apply subject-specific theme colors to UI elements
    const theme = getSubjectTheme(subjectId);
    // You could update UI elements here if needed
  };

  const handleCreateQuiz = () => {
    if (!selectedSubject) return;
    
    // Navigate to lobby with quiz settings
    router.push({
      pathname: '/quiz/lobby',
      params: {
        subject: quizSettings.subject,
        timePerQuestion: quizSettings.timePerQuestion.toString(),
        totalQuestions: quizSettings.totalQuestions.toString(),
        difficulty: quizSettings.difficulty,
      },
    });
  };

  const selectedSubjectData = subjects.find(s => s.id === selectedSubject);

  return (
    <View style={styles.container}>
      <DevModeIndicator />
      
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Animated.View
          style={[
            styles.headerContent,
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
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Quiz Challenge</Text>
            <Text style={styles.headerSubtitle}>Create & Challenge Friends</Text>
          </View>

          <TouchableOpacity
            style={styles.leaderboardButton}
            onPress={() => router.push('/quiz/leaderboard')}
          >
            <Trophy size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Subject Selection */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Choose Subject</Text>
          <Text style={styles.sectionSubtitle}>Select the topic for your quiz challenge</Text>
          
          <View style={styles.subjectsGrid}>
            {subjects.map((subject) => (
              <TouchableOpacity
                key={subject.id}
                style={[
                  styles.subjectCard,
                  { backgroundColor: subject.color },
                  selectedSubject === subject.id && styles.selectedSubjectCard
                ]}
                onPress={() => handleSubjectSelect(subject.id)}
              >
                <subject.icon size={28} color="white" />
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.questionCount}>{subject.questionCount} questions</Text>
                {selectedSubject === subject.id && (
                  <View style={styles.selectedIndicator}>
                    <Target size={16} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Quiz Settings */}
        {selectedSubject && (
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Quiz Settings</Text>
            
            {/* Time Per Question */}
            <View style={styles.settingGroup}>
              <View style={styles.settingHeader}>
                <Clock size={20} color="#4299E1" />
                <Text style={styles.settingTitle}>Time per Question</Text>
              </View>
              <View style={styles.optionsRow}>
                {timeOptions.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.optionButton,
                      quizSettings.timePerQuestion === time && styles.selectedOption
                    ]}
                    onPress={() => setQuizSettings(prev => ({ ...prev, timePerQuestion: time }))}
                  >
                    <Text style={[
                      styles.optionText,
                      quizSettings.timePerQuestion === time && styles.selectedOptionText
                    ]}>
                      {time}s
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Number of Questions */}
            <View style={styles.settingGroup}>
              <View style={styles.settingHeader}>
                <BookOpen size={20} color="#48BB78" />
                <Text style={styles.settingTitle}>Number of Questions</Text>
              </View>
              <View style={styles.optionsRow}>
                {questionOptions.map((count) => (
                  <TouchableOpacity
                    key={count}
                    style={[
                      styles.optionButton,
                      quizSettings.totalQuestions === count && styles.selectedOption
                    ]}
                    onPress={() => setQuizSettings(prev => ({ ...prev, totalQuestions: count }))}
                  >
                    <Text style={[
                      styles.optionText,
                      quizSettings.totalQuestions === count && styles.selectedOptionText
                    ]}>
                      {count}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Difficulty */}
            <View style={styles.settingGroup}>
              <View style={styles.settingHeader}>
                <Zap size={20} color="#F59E0B" />
                <Text style={styles.settingTitle}>Difficulty Level</Text>
              </View>
              <View style={styles.optionsRow}>
                {difficultyOptions.map((difficulty) => (
                  <TouchableOpacity
                    key={difficulty}
                    style={[
                      styles.difficultyButton,
                      quizSettings.difficulty === difficulty && styles.selectedDifficulty,
                      difficulty === 'Easy' && { borderColor: '#10B981' },
                      difficulty === 'Medium' && { borderColor: '#F59E0B' },
                      difficulty === 'Hard' && { borderColor: '#EF4444' },
                    ]}
                    onPress={() => setQuizSettings(prev => ({ ...prev, difficulty }))}
                  >
                    <Text style={[
                      styles.difficultyText,
                      quizSettings.difficulty === difficulty && styles.selectedDifficultyText,
                      difficulty === 'Easy' && { color: '#10B981' },
                      difficulty === 'Medium' && { color: '#F59E0B' },
                      difficulty === 'Hard' && { color: '#EF4444' },
                    ]}>
                      {difficulty}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Animated.View>
        )}

        {/* Quiz Summary */}
        {selectedSubject && selectedSubjectData && (
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                <View style={[styles.summaryIcon, { backgroundColor: `${selectedSubjectData.color}20` }]}>
                  <selectedSubjectData.icon size={24} color={selectedSubjectData.color} />
                </View>
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryTitle}>{selectedSubjectData.name} Quiz</Text>
                  <Text style={styles.summarySubtitle}>Ready to challenge friends?</Text>
                </View>
              </View>
              
              <View style={styles.summaryStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{quizSettings.totalQuestions}</Text>
                  <Text style={styles.statLabel}>Questions</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{quizSettings.timePerQuestion}s</Text>
                  <Text style={styles.statLabel}>Per Question</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{quizSettings.difficulty}</Text>
                  <Text style={styles.statLabel}>Difficulty</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        )}

        {/* Create Quiz Button */}
        {selectedSubject && (
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.createButton, { backgroundColor: selectedSubjectData?.color }]}
              onPress={handleCreateQuiz}
            >
              <Users size={24} color="white" />
              <Text style={styles.createButtonText}>Create Quiz & Invite Friends</Text>
              <ChevronRight size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
        )}

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
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.9)',
  },
  leaderboardButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginBottom: 20,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  subjectCard: {
    width: (width - 56) / 2,
    margin: 8,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  selectedSubjectCard: {
    transform: [{ scale: 1.05 }],
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  subjectName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  questionCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingGroup: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginLeft: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  optionButton: {
    backgroundColor: '#F7FAFC',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    margin: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#4299E1',
    borderColor: '#4299E1',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
  },
  selectedOptionText: {
    color: 'white',
  },
  difficultyButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 6,
    flex: 1,
    alignItems: 'center',
  },
  selectedDifficulty: {
    backgroundColor: '#F7FAFC',
  },
  difficultyText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  selectedDifficultyText: {
    fontFamily: 'Inter-Bold',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  summaryStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  createButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    marginHorizontal: 12,
  },
});