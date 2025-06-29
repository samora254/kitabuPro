import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  TextInput,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, BookOpen, Calculator, Globe, Beaker, Users, Heart, Palette, Music, Gamepad2, Send, Mic, Paperclip, Share, Headphones as Headphones, Trophy, User, Settings } from 'lucide-react-native';
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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const subjects: Subject[] = [
    { id: 'mathematics', name: 'Mathematics', color: '#E879F9', icon: Calculator },
    { id: 'english', name: 'English', color: '#60A5FA', icon: BookOpen },
    { id: 'kiswahili', name: 'Kiswahili', color: '#34D399', icon: Globe },
    { id: 'science', name: 'Home Science', color: '#FB7185', icon: Beaker },
    { id: 'social-studies', name: 'Social Studies', color: '#FBBF24', icon: Users },
    { id: 'religious', name: 'Religious Education', color: '#F97316', icon: Heart },
    { id: 'play-quiz', name: 'Play Quiz', color: '#8B5CF6', icon: Gamepad2 },
  ];

  const quickActions = [
    { id: 'ebooks', name: 'E-Books', icon: BookOpen, color: '#6B7280' },
    { id: 'audiobooks', name: 'Audio Books', icon: Headphones, color: '#6B7280' },
    { id: 'share', name: 'Share', icon: Share, color: '#6B7280' },
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

  const handleSendHelp = () => {
    if (helpText.trim()) {
      // Handle help request
      console.log('Help request:', helpText);
      setHelpText('');
    }
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
            <View style={styles.gradeBadge}>
              <Text style={styles.gradeText}>GRADE 8</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Bell size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => router.push('/profile')}
            >
              <User size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Banner */}
        <LinearGradient
          colors={['#8B5CF6', '#EC4899', '#F97316']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heroBanner}
        >
          <View style={styles.heroContent}>
            <View style={styles.heroText}>
              <Text style={styles.heroTitle}>Homework is Eazy and Fun!</Text>
              <Text style={styles.heroSubtitle}>With Kitabu AI</Text>
              <View style={styles.whatsappButton}>
                <Text style={styles.whatsappIcon}>📱</Text>
                <Text style={styles.whatsappText}>If You Need Help, Chat With us</Text>
                <Text style={styles.whatsappNumber}>+254711175405</Text>
              </View>
            </View>
            <View style={styles.heroImage}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.studentsImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quick Actions */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={action.id} style={styles.quickActionCard}>
                <action.icon size={24} color={action.color} />
                <Text style={styles.quickActionText}>{action.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.skillsAssessmentCard}>
              <Trophy size={24} color="#6B7280" />
              <Text style={styles.quickActionText}>Skills Assessment</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Homework Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.homeworkCard}>
            <BookOpen size={24} color="#6B7280" />
            <Text style={styles.homeworkText}>Homework</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialStudiesCard}>
            <Users size={24} color="white" />
            <Text style={styles.socialStudiesText}>Social Studies</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Subjects Grid */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.subjectsGrid}>
            {subjects.map((subject, index) => (
              <TouchableOpacity
                key={subject.id}
                style={[styles.subjectCard, { backgroundColor: subject.color }]}
                onPress={() => navigateToSubject(subject.id)}
              >
                <subject.icon size={28} color="white" />
                <Text style={styles.subjectName}>{subject.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Help Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.helpTitle}>Need help With Homework?</Text>
          <View style={styles.helpInputContainer}>
            <TouchableOpacity style={styles.attachButton}>
              <Paperclip size={20} color="#6B7280" />
            </TouchableOpacity>
            <TextInput
              style={styles.helpInput}
              placeholder="Ask me anything"
              placeholderTextColor="#9CA3AF"
              value={helpText}
              onChangeText={setHelpText}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendHelp}>
              <Send size={20} color="#3B82F6" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.micButton}>
              <Mic size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
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
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  },
  gradeText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
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
  heroBanner: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 10,
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroText: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    marginBottom: 12,
  },
  whatsappButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  whatsappIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  whatsappText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    marginRight: 4,
  },
  whatsappNumber: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  heroImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 16,
  },
  studentsImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 56) / 3,
    height: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  skillsAssessmentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 56) / 3,
    height: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
  },
  homeworkCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  homeworkText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginTop: 8,
  },
  socialStudiesCard: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  socialStudiesText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginTop: 8,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  subjectCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 56) / 2,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  subjectName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
  helpTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
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