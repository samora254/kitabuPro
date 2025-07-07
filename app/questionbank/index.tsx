import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Search, Filter, BookOpen, Calculator, Globe, Beaker, Users } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
import { getSubjectTheme } from '@/utils/subjectThemes';
import QuizCard from '@/components/QuizCard';
import { questionBanks } from '@/data/questionBank';
import { QuestionSet } from '@/data/questionBank/types';

export default function QuestionBankScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>('Grade 8');

  // Get all question sets across all subjects
  const getAllQuestionSets = (): QuestionSet[] => {
    const allSets: QuestionSet[] = [];
    Object.values(questionBanks).forEach(bank => {
      allSets.push(...bank.questionSets);
    });
    return allSets;
  };

  // Filter question sets based on search, subject, and grade
  const getFilteredQuestionSets = (): QuestionSet[] => {
    let sets = getAllQuestionSets();

    // Filter by grade
    sets = sets.filter(set => set.grade === selectedGrade);

    // Filter by subject if selected
    if (selectedSubject) {
      sets = sets.filter(set => set.subject.toLowerCase() === selectedSubject.toLowerCase());
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      sets = sets.filter(set => 
        set.title.toLowerCase().includes(query) ||
        set.description.toLowerCase().includes(query) ||
        set.topic.toLowerCase().includes(query) ||
        (set.subtopic && set.subtopic.toLowerCase().includes(query))
      );
    }

    return sets;
  };

  // Get icon for subject
  const getSubjectIcon = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'mathematics': 
        return Calculator;
      case 'english': 
        return BookOpen;
      case 'kiswahili': 
        return Globe;
      case 'science': 
        return Beaker;
      case 'social studies': 
        return Users;
      case 'home science': 
        return Heart;
      default: 
        return BookOpen;
    }
  };

  // Get color for subject
  const getSubjectColor = (subject: string): string => {
    const theme = getSubjectTheme(subject.toLowerCase().replace(/\s+/g, '-'));
    return theme.primaryColor;
  };

  // Handle quiz selection
  const handleQuizPress = (quizSet: QuestionSet) => {
    router.push({
      pathname: '/questionbank/quiz',
      params: { quizId: quizSet.id }
    });
  };

  // Available subjects
  const subjects = [
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'english', name: 'English' },
    { id: 'science', name: 'Science' },
    { id: 'social-studies', name: 'Social Studies' },
    { id: 'kiswahili', name: 'Kiswahili' }
  ];

  // Filtered question sets
  const filteredSets = getFilteredQuestionSets();

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
        <Text style={styles.headerTitle}>Question Bank</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#A0AEC0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for questions..."
            placeholderTextColor="#A0AEC0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#4299E1" />
        </TouchableOpacity>
      </View>
      
      {/* Subject Filters */}
      <View style={styles.subjectsContainer}>
        <FlatList
          horizontal
          data={subjects}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subjectsList}
          renderItem={({ item }) => {
            const SubjectIcon = getSubjectIcon(item.name);
            const isSelected = selectedSubject === item.id;
            const subjectColor = getSubjectColor(item.name);
            
            return (
              <TouchableOpacity
                style={[
                  styles.subjectButton,
                  isSelected && { backgroundColor: `${subjectColor}20`, borderColor: subjectColor }
                ]}
                onPress={() => setSelectedSubject(isSelected ? null : item.id)}
              >
                <View style={[styles.subjectIcon, { backgroundColor: `${subjectColor}15` }]}>
                  <SubjectIcon size={20} color={subjectColor} />
                </View>
                <Text style={[
                  styles.subjectName,
                  isSelected && { color: subjectColor, fontFamily: 'Inter-SemiBold' }
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      
      {/* Grade Selector */}
      <View style={styles.gradeSelector}>
        <Text style={styles.gradeSelectorLabel}>Grade:</Text>
        {['Grade 7', 'Grade 8', 'Grade 9'].map((grade) => (
          <TouchableOpacity
            key={grade}
            style={[
              styles.gradeButton,
              selectedGrade === grade && styles.selectedGradeButton
            ]}
            onPress={() => setSelectedGrade(grade)}
          >
            <Text style={[
              styles.gradeButtonText,
              selectedGrade === grade && styles.selectedGradeButtonText
            ]}>
              {grade}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Question Sets */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          {selectedSubject 
            ? `${subjects.find(s => s.id === selectedSubject)?.name || 'Subject'} Questions` 
            : 'All Subjects'}
        </Text>
        
        {filteredSets.length === 0 ? (
          <View style={styles.emptyState}>
            <BookOpen size={48} color="#A0AEC0" />
            <Text style={styles.emptyStateTitle}>No question sets found</Text>
            <Text style={styles.emptyStateDescription}>
              Try changing your search criteria or selecting a different subject
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredSets}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <QuizCard quizSet={item} onPress={handleQuizPress} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.questionSetsList}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
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
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    marginLeft: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectsContainer: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  subjectsList: {
    paddingHorizontal: 20,
  },
  subjectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  subjectIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  subjectName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
  },
  gradeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  gradeSelectorLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginRight: 12,
  },
  gradeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F7FAFC',
    marginRight: 8,
  },
  selectedGradeButton: {
    backgroundColor: '#4299E1',
  },
  gradeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
  },
  selectedGradeButtonText: {
    color: 'white',
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
  questionSetsList: {
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
  },
});