import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BookOpen, Clock, Award, ChevronRight } from 'lucide-react-native';
import { QuestionSet } from '@/data/questionBank/types';

interface QuizCardProps {
  quizSet: QuestionSet;
  onPress: (quizSet: QuestionSet) => void;
}

export default function QuizCard({ quizSet, onPress }: QuizCardProps) {
  // Format time from seconds to minutes
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  // Get color based on difficulty
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'easy': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return '#4B5563';
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(quizSet)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{quizSet.title}</Text>
          <Text style={styles.subtitle}>{quizSet.subject} • {quizSet.grade}</Text>
        </View>
        <View style={[
          styles.difficultyBadge, 
          { backgroundColor: `${getDifficultyColor(quizSet.difficulty)}15` }
        ]}>
          <Text style={[
            styles.difficultyText, 
            { color: getDifficultyColor(quizSet.difficulty) }
          ]}>
            {quizSet.difficulty.charAt(0).toUpperCase() + quizSet.difficulty.slice(1)}
          </Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {quizSet.description}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <BookOpen size={16} color="#4B5563" />
          <Text style={styles.statText}>{quizSet.questions.length} questions</Text>
        </View>
        <View style={styles.stat}>
          <Clock size={16} color="#4B5563" />
          <Text style={styles.statText}>{formatTime(quizSet.estimatedTime)}</Text>
        </View>
        <View style={styles.stat}>
          <Award size={16} color="#4B5563" />
          <Text style={styles.statText}>{quizSet.totalPoints} points</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.startText}>Start Quiz</Text>
        <ChevronRight size={16} color="#4299E1" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    marginBottom: 16,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4B5563',
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  startText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4299E1',
    marginRight: 4,
  },
});