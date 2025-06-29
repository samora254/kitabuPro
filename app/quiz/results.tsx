import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Medal, Award, Target, Clock, Zap, TrendingUp, Share, RotateCcw, Chrome as Home, Crown, Star } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

const { width } = Dimensions.get('window');

interface PlayerResult {
  id: string;
  name: string;
  score: number;
  correctAnswers: number;
  streak: number;
  averageTime: number;
  accuracy: number;
}

export default function QuizResults() {
  const params = useLocalSearchParams();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  // Parse final scores
  const finalScores: PlayerResult[] = params.finalScores 
    ? JSON.parse(params.finalScores as string).map((player: any) => ({
        ...player,
        accuracy: Math.round((player.correctAnswers / parseInt(params.totalQuestions as string)) * 100),
      }))
    : [];

  const sortedResults = [...finalScores].sort((a, b) => b.score - a.score);
  const currentPlayer = sortedResults.find(p => p.name.includes('You'));
  const currentPlayerRank = sortedResults.findIndex(p => p.name.includes('You')) + 1;

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

    // Confetti animation for winners
    if (currentPlayerRank <= 3) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(confettiAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(confettiAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown size={24} color="#FFD93D" />;
      case 2: return <Medal size={24} color="#C0C0C0" />;
      case 3: return <Award size={24} color="#CD7F32" />;
      default: return <Trophy size={24} color="#718096" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return '#FFD93D';
      case 2: return '#C0C0C0';
      case 3: return '#CD7F32';
      default: return '#718096';
    }
  };

  const getPerformanceMessage = () => {
    if (currentPlayerRank === 1) return "🎉 Congratulations! You're the Quiz Champion!";
    if (currentPlayerRank <= 3) return "🏆 Great job! You made it to the podium!";
    if (currentPlayer && currentPlayer.accuracy >= 80) return "💪 Excellent accuracy! Keep it up!";
    if (currentPlayer && currentPlayer.accuracy >= 60) return "👍 Good performance! Room for improvement!";
    return "📚 Keep practicing! You'll do better next time!";
  };

  const handlePlayAgain = () => {
    router.push('/quiz');
  };

  const handleShareResults = () => {
    // Share functionality would be implemented here
    console.log('Sharing results...');
  };

  const handleGoHome = () => {
    router.push('/dashboard');
  };

  const handleViewLeaderboard = () => {
    router.push('/quiz/leaderboard');
  };

  return (
    <View style={styles.container}>
      <DevModeIndicator />
      
      {/* Header */}
      <LinearGradient
        colors={currentPlayerRank <= 3 ? ['#FFD93D', '#FF8E53'] : ['#667eea', '#764ba2']}
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
          <Text style={styles.headerTitle}>Quiz Complete!</Text>
          <Text style={styles.headerSubtitle}>{getPerformanceMessage()}</Text>
          
          {currentPlayerRank <= 3 && (
            <Animated.View
              style={[
                styles.confetti,
                {
                  opacity: confettiAnim,
                  transform: [
                    {
                      rotate: confettiAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Star size={20} color="white" />
            </Animated.View>
          )}
        </Animated.View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Your Performance */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.performanceCard}>
            <View style={styles.performanceHeader}>
              <View style={[styles.rankBadge, { backgroundColor: getRankColor(currentPlayerRank) }]}>
                {getRankIcon(currentPlayerRank)}
                <Text style={styles.rankText}>#{currentPlayerRank}</Text>
              </View>
              <View style={styles.performanceInfo}>
                <Text style={styles.performanceTitle}>Your Performance</Text>
                <Text style={styles.performanceSubtitle}>
                  {currentPlayer?.name || 'Walter (You)'}
                </Text>
              </View>
            </View>
            
            <View style={styles.performanceStats}>
              <View style={styles.statCard}>
                <Zap size={20} color="#F59E0B" />
                <Text style={styles.statValue}>{currentPlayer?.score || 0}</Text>
                <Text style={styles.statLabel}>Total Score</Text>
              </View>
              <View style={styles.statCard}>
                <Target size={20} color="#10B981" />
                <Text style={styles.statValue}>{currentPlayer?.accuracy || 0}%</Text>
                <Text style={styles.statLabel}>Accuracy</Text>
              </View>
              <View style={styles.statCard}>
                <TrendingUp size={20} color="#8B5CF6" />
                <Text style={styles.statValue}>{currentPlayer?.streak || 0}</Text>
                <Text style={styles.statLabel}>Best Streak</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Final Rankings */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Final Rankings</Text>
          
          <View style={styles.rankingsContainer}>
            {sortedResults.map((player, index) => (
              <View
                key={player.id}
                style={[
                  styles.rankingCard,
                  player.name.includes('You') && styles.currentPlayerCard,
                  index === 0 && styles.winnerCard,
                ]}
              >
                <View style={styles.rankingLeft}>
                  <View style={[styles.rankingBadge, { backgroundColor: getRankColor(index + 1) }]}>
                    {getRankIcon(index + 1)}
                  </View>
                  <View style={styles.playerInfo}>
                    <Text style={[
                      styles.playerName,
                      player.name.includes('You') && styles.currentPlayerName
                    ]}>
                      {player.name}
                    </Text>
                    <View style={styles.playerStats}>
                      <Text style={styles.playerAccuracy}>{player.accuracy}% accuracy</Text>
                      <Text style={styles.playerCorrect}>
                        {player.correctAnswers}/{params.totalQuestions} correct
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.rankingRight}>
                  <Text style={styles.playerScore}>{player.score}</Text>
                  <Text style={styles.scoreLabel}>points</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Quiz Summary */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Quiz Summary</Text>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryStats}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{params.subject}</Text>
                <Text style={styles.summaryLabel}>Subject</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{params.totalQuestions}</Text>
                <Text style={styles.summaryLabel}>Questions</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{params.difficulty}</Text>
                <Text style={styles.summaryLabel}>Difficulty</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{sortedResults.length}</Text>
                <Text style={styles.summaryLabel}>Players</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handlePlayAgain}
            >
              <RotateCcw size={20} color="white" />
              <Text style={styles.primaryButtonText}>Play Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleViewLeaderboard}
            >
              <Trophy size={20} color="#4299E1" />
              <Text style={styles.secondaryButtonText}>Leaderboard</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={handleShareResults}
            >
              <Share size={20} color="#718096" />
              <Text style={styles.outlineButtonText}>Share Results</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={handleGoHome}
            >
              <Home size={20} color="#718096" />
              <Text style={styles.outlineButtonText}>Go Home</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

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
    paddingBottom: 40,
    paddingHorizontal: 20,
    position: 'relative',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  confetti: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  performanceCard: {
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
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginRight: 16,
  },
  rankText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginLeft: 8,
  },
  performanceInfo: {
    flex: 1,
  },
  performanceTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  performanceSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  rankingsContainer: {
    gap: 12,
  },
  rankingCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  currentPlayerCard: {
    borderWidth: 2,
    borderColor: '#4299E1',
  },
  winnerCard: {
    backgroundColor: '#FFFBEB',
    borderWidth: 2,
    borderColor: '#FFD93D',
  },
  rankingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankingBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  currentPlayerName: {
    color: '#4299E1',
  },
  playerStats: {
    flexDirection: 'row',
    gap: 12,
  },
  playerAccuracy: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  playerCorrect: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  rankingRight: {
    alignItems: 'flex-end',
  },
  playerScore: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
  },
  scoreLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#48BB78',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#48BB78',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    marginLeft: 8,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#EBF8FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4299E1',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#4299E1',
    marginLeft: 8,
  },
  outlineButton: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  outlineButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#718096',
    marginLeft: 8,
  },
});