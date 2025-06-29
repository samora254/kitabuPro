import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Users, Zap, CircleCheck as CheckCircle, Circle as XCircle, Trophy, Target } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

const { width } = Dimensions.get('window');

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  type: 'multiple-choice' | 'short-answer';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface PlayerScore {
  id: string;
  name: string;
  score: number;
  correctAnswers: number;
  streak: number;
  averageTime: number;
}

export default function QuizGame() {
  const params = useLocalSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(parseInt(params.timePerQuestion as string) || 10);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [playerScores, setPlayerScores] = useState<PlayerScore[]>([
    { id: '1', name: 'Walter (You)', score: 0, correctAnswers: 0, streak: 0, averageTime: 0 },
    { id: '2', name: 'Sarah M.', score: 0, correctAnswers: 0, streak: 0, averageTime: 0 },
    { id: '3', name: 'Emma L.', score: 0, correctAnswers: 0, streak: 0, averageTime: 0 },
  ]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const timerAnim = useRef(new Animated.Value(1)).current;

  // Sample questions
  const questions: Question[] = [
    {
      id: '1',
      question: 'What is the result of 15 × 8?',
      options: ['120', '125', '115', '130'],
      correctAnswer: 0,
      type: 'multiple-choice',
      difficulty: 'Medium',
    },
    {
      id: '2',
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 1,
      type: 'multiple-choice',
      difficulty: 'Easy',
    },
    {
      id: '3',
      question: 'What is the capital of Kenya?',
      options: ['Mombasa', 'Kisumu', 'Nairobi', 'Nakuru'],
      correctAnswer: 2,
      type: 'multiple-choice',
      difficulty: 'Easy',
    },
  ];

  const totalQuestions = parseInt(params.totalQuestions as string) || 20;
  const currentQuestionData = questions[currentQuestion % questions.length];

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

    // Progress animation
    Animated.timing(progressAnim, {
      toValue: (currentQuestion + 1) / totalQuestions,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        
        // Timer animation
        if (timeLeft <= 5) {
          Animated.sequence([
            Animated.timing(timerAnim, {
              toValue: 1.2,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(timerAnim, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start();
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }
  }, [timeLeft, isAnswered]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowResult(true);
    
    // Calculate score based on correctness and speed
    const isCorrect = answerIndex === currentQuestionData.correctAnswer;
    const timeBonus = Math.max(0, timeLeft * 10);
    const basePoints = isCorrect ? 100 : 0;
    const totalPoints = basePoints + (isCorrect ? timeBonus : 0);
    
    // Update player score (simulating real-time updates)
    setPlayerScores(prev => prev.map(player => {
      if (player.id === '1') { // Current player
        return {
          ...player,
          score: player.score + totalPoints,
          correctAnswers: player.correctAnswers + (isCorrect ? 1 : 0),
          streak: isCorrect ? player.streak + 1 : 0,
        };
      } else {
        // Simulate other players' scores
        const otherPlayerCorrect = Math.random() > 0.3;
        const otherPlayerTime = Math.floor(Math.random() * 8) + 2;
        const otherPlayerPoints = otherPlayerCorrect ? 100 + (otherPlayerTime * 10) : 0;
        return {
          ...player,
          score: player.score + otherPlayerPoints,
          correctAnswers: player.correctAnswers + (otherPlayerCorrect ? 1 : 0),
          streak: otherPlayerCorrect ? player.streak + 1 : 0,
        };
      }
    }));

    // Show result for 2 seconds then move to next question
    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleTimeUp = () => {
    setIsAnswered(true);
    setShowResult(true);
    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 >= totalQuestions) {
      // Quiz finished
      router.push({
        pathname: '/quiz/results',
        params: {
          ...params,
          finalScores: JSON.stringify(playerScores),
        },
      });
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(parseInt(params.timePerQuestion as string) || 10);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowResult(false);
      
      // Reset animations
      fadeAnim.setValue(0);
      slideAnim.setValue(30);
      timerAnim.setValue(1);
      
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
    }
  };

  const sortedPlayers = [...playerScores].sort((a, b) => b.score - a.score);
  const currentPlayerRank = sortedPlayers.findIndex(p => p.id === '1') + 1;

  return (
    <View style={styles.container}>
      <DevModeIndicator />
      
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.questionProgress}>
            <Text style={styles.questionNumber}>
              {currentQuestion + 1}/{totalQuestions}
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
          
          <Animated.View
            style={[
              styles.timerContainer,
              {
                transform: [{ scale: timerAnim }],
              },
            ]}
          >
            <Clock size={20} color="white" />
            <Text style={[
              styles.timerText,
              timeLeft <= 5 && styles.timerWarning
            ]}>
              {timeLeft}s
            </Text>
          </Animated.View>
        </View>
      </LinearGradient>

      {/* Live Leaderboard */}
      <View style={styles.leaderboardContainer}>
        <View style={styles.leaderboardHeader}>
          <Trophy size={16} color="#F59E0B" />
          <Text style={styles.leaderboardTitle}>Live Rankings</Text>
        </View>
        <View style={styles.leaderboardList}>
          {sortedPlayers.slice(0, 3).map((player, index) => (
            <View key={player.id} style={styles.leaderboardItem}>
              <Text style={styles.playerRank}>#{index + 1}</Text>
              <Text style={[
                styles.playerNameSmall,
                player.id === '1' && styles.currentPlayerName
              ]}>
                {player.name.split(' ')[0]}
              </Text>
              <Text style={styles.playerScoreSmall}>{player.score}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Question */}
      <Animated.View
        style={[
          styles.questionContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>{currentQuestionData.difficulty}</Text>
            </View>
            <View style={styles.questionType}>
              <Target size={16} color="#4299E1" />
              <Text style={styles.questionTypeText}>Multiple Choice</Text>
            </View>
          </View>
          
          <Text style={styles.questionText}>{currentQuestionData.question}</Text>
        </View>
      </Animated.View>

      {/* Answer Options */}
      <Animated.View
        style={[
          styles.optionsContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {currentQuestionData.options.map((option, index) => {
          let optionStyle = styles.optionButton;
          let optionTextStyle = styles.optionText;
          let iconComponent = null;

          if (showResult) {
            if (index === currentQuestionData.correctAnswer) {
              optionStyle = [styles.optionButton, styles.correctOption];
              optionTextStyle = [styles.optionText, styles.correctOptionText];
              iconComponent = <CheckCircle size={20} color="white" />;
            } else if (index === selectedAnswer && index !== currentQuestionData.correctAnswer) {
              optionStyle = [styles.optionButton, styles.incorrectOption];
              optionTextStyle = [styles.optionText, styles.incorrectOptionText];
              iconComponent = <XCircle size={20} color="white" />;
            }
          } else if (selectedAnswer === index) {
            optionStyle = [styles.optionButton, styles.selectedOption];
            optionTextStyle = [styles.optionText, styles.selectedOptionText];
          }

          return (
            <TouchableOpacity
              key={index}
              style={optionStyle}
              onPress={() => handleAnswerSelect(index)}
              disabled={isAnswered}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionLabel}>
                  <Text style={styles.optionLabelText}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={optionTextStyle}>{option}</Text>
                {iconComponent && (
                  <View style={styles.optionIcon}>
                    {iconComponent}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      {/* Current Player Stats */}
      <View style={styles.playerStatsContainer}>
        <View style={styles.playerStats}>
          <View style={styles.statItem}>
            <Zap size={16} color="#F59E0B" />
            <Text style={styles.statValue}>{playerScores[0].score}</Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Target size={16} color="#10B981" />
            <Text style={styles.statValue}>{playerScores[0].correctAnswers}</Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Trophy size={16} color="#8B5CF6" />
            <Text style={styles.statValue}>#{currentPlayerRank}</Text>
            <Text style={styles.statLabel}>Rank</Text>
          </View>
        </View>
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
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionProgress: {
    flex: 1,
    marginRight: 20,
  },
  questionNumber: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timerText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginLeft: 8,
  },
  timerWarning: {
    color: '#FEF2F2',
  },
  leaderboardContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  leaderboardTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginLeft: 8,
  },
  leaderboardList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leaderboardItem: {
    flex: 1,
    alignItems: 'center',
  },
  playerRank: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#F59E0B',
    marginBottom: 4,
  },
  playerNameSmall: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
    marginBottom: 2,
  },
  currentPlayerName: {
    color: '#4299E1',
    fontFamily: 'Inter-Bold',
  },
  playerScoreSmall: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#48BB78',
  },
  questionContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  questionCard: {
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
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  difficultyBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#D97706',
  },
  questionType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionTypeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
    marginLeft: 6,
  },
  questionText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    lineHeight: 28,
  },
  optionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  optionButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedOption: {
    borderColor: '#4299E1',
    backgroundColor: '#EBF8FF',
  },
  correctOption: {
    borderColor: '#10B981',
    backgroundColor: '#10B981',
  },
  incorrectOption: {
    borderColor: '#EF4444',
    backgroundColor: '#EF4444',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionLabelText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#4A5568',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
  },
  selectedOptionText: {
    color: '#4299E1',
  },
  correctOptionText: {
    color: 'white',
  },
  incorrectOptionText: {
    color: 'white',
  },
  optionIcon: {
    marginLeft: 12,
  },
  playerStatsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  playerStats: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginTop: 4,
    marginBottom: 2,
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
});