import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, ChevronRight, BookOpen } from 'lucide-react-native';
import { curriculumService, Subject, CurriculumStrand, CurriculumSubStrand } from '@/services/curriculumService';
import { DevModeIndicator } from '@/components/DevModeIndicator';

export default function StrandScreen() {
  const { subjectId, strandId } = useLocalSearchParams();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [strand, setStrand] = useState<CurriculumStrand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStrand = async () => {
      try {
        setLoading(true);
        
        if (!subjectId || !strandId) {
          setError('Subject ID or Strand ID is missing');
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
        
        setSubject(subjectData);
        setStrand(strandData);
      } catch (err) {
        console.error('Error loading strand:', err);
        setError('Failed to load strand data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadStrand();
  }, [subjectId, strandId]);

  const handleSubStrandPress = (subStrand: CurriculumSubStrand) => {
    router.push({
      pathname: '/curriculum/substrand',
      params: { 
        subjectId: subject?.id,
        strandId: strand?.id,
        subStrandId: subStrand.id 
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4299E1" />
        <Text style={styles.loadingText}>Loading strand data...</Text>
      </View>
    );
  }

  if (error || !subject || !strand) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Strand not found'}</Text>
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
          <Text style={styles.headerTitle}>{strand.title}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>
      
      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.strandInfoCard}>
          <Text style={styles.strandId}>Strand {strand.id}</Text>
          <Text style={styles.strandDescription}>{strand.description}</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Sub-Strands</Text>
        
        {strand.subStrands.length === 0 ? (
          <View style={styles.emptyState}>
            <BookOpen size={48} color="#A0AEC0" />
            <Text style={styles.emptyStateText}>No sub-strands available</Text>
            <Text style={styles.emptyStateSubtext}>This strand doesn't have any sub-strands yet</Text>
          </View>
        ) : (
          <View style={styles.subStrandsList}>
            {strand.subStrands.map((subStrand) => (
              <TouchableOpacity
                key={subStrand.id}
                style={styles.subStrandCard}
                onPress={() => handleSubStrandPress(subStrand)}
              >
                <View style={styles.subStrandInfo}>
                  <Text style={styles.subStrandId}>{subStrand.id}</Text>
                  <Text style={styles.subStrandTitle}>{subStrand.title}</Text>
                  <Text style={styles.subStrandDescription} numberOfLines={2}>
                    {subStrand.description}
                  </Text>
                </View>
                <ChevronRight size={20} color="#A0AEC0" />
              </TouchableOpacity>
            ))}
          </View>
        )}
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
  strandInfoCard: {
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
  strandId: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4299E1',
    marginBottom: 8,
  },
  strandDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
  },
  subStrandsList: {
    flexDirection: 'column',
    gap: 16,
  },
  subStrandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subStrandInfo: {
    flex: 1,
  },
  subStrandId: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#4299E1',
    marginBottom: 4,
  },
  subStrandTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  subStrandDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
});