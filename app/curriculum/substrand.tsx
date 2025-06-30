import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CircleCheck as CheckCircle, CircleHelp as HelpCircle, BookOpen } from 'lucide-react-native';
import { curriculumService, Subject, CurriculumStrand, CurriculumSubStrand } from '@/services/curriculumService';
import { DevModeIndicator } from '@/components/DevModeIndicator';

export default function SubStrandScreen() {
  const { subjectId, strandId, subStrandId } = useLocalSearchParams();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [strand, setStrand] = useState<CurriculumStrand | null>(null);
  const [subStrand, setSubStrand] = useState<CurriculumSubStrand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSubStrand = async () => {
      try {
        setLoading(true);
        
        if (!subjectId || !strandId || !subStrandId) {
          setError('Subject ID, Strand ID, or Sub-Strand ID is missing');
          return;
        }
        
        const subjectData = await curriculumService.getSubjectById(subjectId as string);
        
        if (!subjectData) {
          setError('Subject not found');
          return;
        }
        
        const strandData = subjectData.strands.find(s => s.id === strandId);
        
        if (!strandData) {
          setError('Strand not found');
          return;
        }
        
        const subStrandData = strandData.subStrands.find(ss => ss.id === subStrandId);
        
        if (!subStrandData) {
          setError('Sub-Strand not found');
          return;
        }
        
        setSubject(subjectData);
        setStrand(strandData);
        setSubStrand(subStrandData);
      } catch (err) {
        console.error('Error loading sub-strand:', err);
        setError('Failed to load sub-strand data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadSubStrand();
  }, [subjectId, strandId, subStrandId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4299E1" />
        <Text style={styles.loadingText}>Loading sub-strand data...</Text>
      </View>
    );
  }

  if (error || !subject || !strand || !subStrand) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Sub-Strand not found'}</Text>
        <TouchableOpacity 
          style={styles.backToListButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backToListButtonText}>Back</Text>
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
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#2D3748" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerSubject}>{subject.name} - {subject.grade}</Text>
          <Text style={styles.headerTitle}>{subStrand.title}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>
      
      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.subStrandInfoCard}>
          <Text style={styles.subStrandId}>Strand {strand.id} - Sub-Strand {subStrand.id}</Text>
          <Text style={styles.subStrandDescription}>{subStrand.description}</Text>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CheckCircle size={20} color="#48BB78" />
            <Text style={styles.sectionTitle}>Learning Outcomes</Text>
          </View>
          
          {subStrand.learningOutcomes.length === 0 ? (
            <Text style={styles.emptyText}>No learning outcomes available</Text>
          ) : (
            <View style={styles.outcomesList}>
              {subStrand.learningOutcomes.map((outcome, index) => (
                <View key={index} style={styles.outcomeItem}>
                  <Text style={styles.outcomeNumber}>{index + 1}</Text>
                  <Text style={styles.outcomeText}>{outcome}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BookOpen size={20} color="#4299E1" />
            <Text style={styles.sectionTitle}>Learning Experiences</Text>
          </View>
          
          {subStrand.learningExperiences.length === 0 ? (
            <Text style={styles.emptyText}>No learning experiences available</Text>
          ) : (
            <View style={styles.experiencesList}>
              {subStrand.learningExperiences.map((experience, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.experienceBullet}>•</Text>
                  <Text style={styles.experienceText}>{experience}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <HelpCircle size={20} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Key Inquiry Questions</Text>
          </View>
          
          {subStrand.keyInquiryQuestions.length === 0 ? (
            <Text style={styles.emptyText}>No key inquiry questions available</Text>
          ) : (
            <View style={styles.questionsList}>
              {subStrand.keyInquiryQuestions.map((question, index) => (
                <View key={index} style={styles.questionItem}>
                  <Text style={styles.questionNumber}>{index + 1}</Text>
                  <Text style={styles.questionText}>{question}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
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
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#E53E3E',
    textAlign: 'center',
    marginBottom: 20,
  },
  backToListButton: {
    backgroundColor: '#4299E1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backToListButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  headerTitleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  headerSubject: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  subStrandInfoCard: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subStrandId: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4299E1',
    marginBottom: 8,
  },
  subStrandDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginLeft: 12,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#A0AEC0',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  outcomesList: {
    gap: 12,
  },
  outcomeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  outcomeNumber: {
    width: 24,
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#4299E1',
  },
  outcomeText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 22,
  },
  experiencesList: {
    gap: 12,
  },
  experienceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  experienceBullet: {
    width: 24,
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#4299E1',
    textAlign: 'center',
  },
  experienceText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 22,
  },
  questionsList: {
    gap: 12,
  },
  questionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  questionNumber: {
    width: 24,
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#F59E0B',
  },
  questionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 22,
  },
});