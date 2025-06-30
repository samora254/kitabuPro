import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, ChevronRight, BookOpen } from 'lucide-react-native';
import { curriculumService, Subject, CurriculumStrand } from '@/services/curriculumService';
import { DevModeIndicator } from '@/components/DevModeIndicator';

export default function SubjectScreen() {
  const { id } = useLocalSearchParams();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSubject = async () => {
      try {
        setLoading(true);
        
        if (!id) {
          setError('Subject ID is missing');
          return;
        }
        
        const subjectData = await curriculumService.getSubjectById(id as string);
        
        if (!subjectData) {
          setError('Subject not found');
          return;
        }
        
        setSubject(subjectData);
      } catch (err) {
        console.error('Error loading subject:', err);
        setError('Failed to load subject data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadSubject();
  }, [id]);

  const handleStrandPress = (strand: CurriculumStrand) => {
    router.push({
      pathname: '/curriculum/strand',
      params: { 
        subjectId: subject?.id,
        strandId: strand.id 
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4299E1" />
        <Text style={styles.loadingText}>Loading subject data...</Text>
      </View>
    );
  }

  if (error || !subject) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Subject not found'}</Text>
        <TouchableOpacity 
          style={styles.backToListButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backToListButtonText}>Back to Curriculum</Text>
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
          <Text style={styles.headerTitle}>{subject.name}</Text>
          <Text style={styles.headerSubtitle}>{subject.grade}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>
      
      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Strands</Text>
        
        {subject.strands.length === 0 ? (
          <View style={styles.emptyState}>
            <BookOpen size={48} color="#A0AEC0" />
            <Text style={styles.emptyStateText}>No strands available</Text>
            <Text style={styles.emptyStateSubtext}>This subject doesn't have any strands yet</Text>
          </View>
        ) : (
          <View style={styles.strandsList}>
            {subject.strands.map((strand) => (
              <TouchableOpacity
                key={strand.id}
                style={styles.strandCard}
                onPress={() => handleStrandPress(strand)}
              >
                <View style={styles.strandInfo}>
                  <Text style={styles.strandId}>{strand.id}</Text>
                  <Text style={styles.strandTitle}>{strand.title}</Text>
                  <Text style={styles.strandDescription} numberOfLines={2}>
                    {strand.description}
                  </Text>
                  <Text style={styles.strandStats}>
                    {strand.subStrands.length} sub-strands
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
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
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
  strandsList: {
    flexDirection: 'column',
    gap: 16,
  },
  strandCard: {
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
  strandInfo: {
    flex: 1,
  },
  strandId: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#4299E1',
    marginBottom: 4,
  },
  strandTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  strandDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginBottom: 8,
  },
  strandStats: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#A0AEC0',
  },
});