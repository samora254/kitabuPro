import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft,
  Trophy,
  Medal,
  Award,
  Crown,
  TrendingUp,
  Calendar,
  Users,
  Target,
  Zap,
  Clock
} from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  totalScore: number;
  gamesPlayed: number;
  averageScore: number;
  accuracy: number;
  bestStreak: number;
  grade: string;
  lastActive: string;
}

export default function QuizLeaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'all'>('week');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Sample leaderboard data for Grade 8
  const leaderboardData: LeaderboardEntry[] = [
    {
      id: '1',
      name: 'Sarah M.',
      avatar: '👩‍🎓',
      totalScore: 15420,
      gamesPlayed: 28,
      averageScore: 551,
      accuracy: 94,
      bestStreak: 12,
      grade: 'Grade 8',
      lastActive: '2 hours ago',
    },
    {
      id: '2',
      name: 'John K.',
      avatar: '👨‍🎓',
      totalScore: 14850,
      gamesPlayed: 25,
      averageScore: 594,
      accuracy: 91,
      bestStreak: 15,
      grade: 'Grade 8',
      lastActive: '1 hour ago',
    },
    {
      id: '3',
      name: 'Walter (You)',
      avatar: '🎓',
      totalScore: 13920,
      gamesPlayed: 22,
      averageScore: 632,
      accuracy: 88,
      bestStreak: 8,
      grade: 'Grade 8',
      lastActive: 'Now',
    },
    {
      id: '4',
      name: 'Emma L.',
      avatar: '👩‍🎓',
      totalScore: 12680,
      gamesPlayed: 20,
      averageScore: 634,
      accuracy: 85,
      bestStreak: 10,
      grade: 'Grade 8',
      lastActive: '30 minutes ago',
    },
    {
      id: '5',
      name: 'David R.',
      avatar: '👨‍🎓',
      totalScore: 11950,
      gamesPlayed: 18,
      averageScore: 664,
      accuracy: 82,
      bestStreak: 7,
      grade: 'Grade 8',
      lastActive: '3 hours ago',
    },
    {
      id: '6',
      name: 'Grace W.',
      avatar: '👩‍🎓',
      totalScore: 11200,
      gamesPlayed: 16,
      averageScore: 700,
      accuracy: 89,
      bestStreak: 9,
      grade: 'Grade 8',
      lastActive: '1 day ago',
    },
    {
      id: '7',
      name: 'Michael T.',
      avatar: '👨‍🎓',
      totalScore: 10800,
      gamesPlayed: 15,
      averageScore: 720,
      accuracy: 86,
      bestStreak: 6,
      grade: 'Grade 8',
      lastActive: '2 days ago',
    },
    {
      id: '8',
      name: 'Aisha K.',
      avatar: '👩‍🎓',
      totalScore: 10350,
      gamesPlayed: 14,
      averageScore: 739,
      accuracy: 90,
      bestStreak: 11,
      grade: 'Grade 8',
      lastActive: '5 hours ago',
    },
  ];

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'all', label: 'All Time' },
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

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown size={20} color="#FFD93D" />;
      case 2: return <Medal size={20} color="#C0C0C0" />;
      case 3: return <Award size={20} color="#CD7F32" />;
      default: return null;
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

  const currentPlayerRank = leaderboardData.findIndex(p => p.name.includes('You')) + 1;
  const currentPlayer = leaderboardData.find(p => p.name.includes('You'));

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
            <Text style={styles.headerTitle}>Leaderboard</Text>
            <Text style={styles.headerSubtitle}>Grade 8 Rankings</Text>
          </View>

          <View style={styles.headerRight} />
        </Animated.View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Period Selector */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.periodSelector}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                style={[
                  styles.periodButton,
                  selectedPeriod === period.id && styles.selectedPeriod
                ]}
                onPress={() => setSelectedPeriod(period.id as any)}
              >
                <Text style={[
                  styles.periodText,
                  selectedPeriod === period.id && styles.selectedPeriodText
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Your Rank Card */}
        {currentPlayer && (
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.yourRankCard}>
              <View style={styles.yourRankHeader}>
                <Text style={styles.yourRankTitle}>Your Current Rank</Text>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankNumber}>#{currentPlayerRank}</Text>
                </View>
              </View>
              
              <View style={styles.yourRankStats}>
                <View style={styles.rankStat}>
                  <Zap size={16} color="#F59E0B" />
                  <Text style={styles.rankStatValue}>{currentPlayer.totalScore}</Text>
                  <Text style={styles.rankStatLabel}>Total Score</Text>
                </View>
                <View style={styles.rankStat}>
                  <Target size={16} color="#10B981" />
                  <Text style={styles.rankStatValue}>{currentPlayer.accuracy}%</Text>
                  <Text style={styles.rankStatLabel}>Accuracy</Text>
                </View>
                <View style={styles.rankStat}>
                  <TrendingUp size={16} color="#8B5CF6" />
                  <Text style={styles.rankStatValue}>{currentPlayer.bestStreak}</Text>
                  <Text style={styles.rankStatLabel}>Best Streak</Text>
                </View>
                <View style={styles.rankStat}>
                  <Users size={16} color="#4299E1" />
                  <Text style={styles.rankStatValue}>{currentPlayer.gamesPlayed}</Text>
                  <Text style={styles.rankStatLabel}>Games</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        )}

        {/* Top 3 Podium */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Top Performers</Text>
          
          <View style={styles.podiumContainer}>
            {/* 2nd Place */}
            <View style={[styles.podiumPlace, styles.secondPlace]}>
              <View style={styles.podiumAvatar}>
                <Text style={styles.avatarText}>{leaderboardData[1].avatar}</Text>
              </View>
              <View style={styles.podiumRank}>
                <Medal size={16} color="#C0C0C0" />
                <Text style={styles.podiumRankText}>2</Text>
              </View>
              <Text style={styles.podiumName}>{leaderboardData[1].name.split(' ')[0]}</Text>
              <Text style={styles.podiumScore}>{leaderboardData[1].totalScore}</Text>
            </View>

            {/* 1st Place */}
            <View style={[styles.podiumPlace, styles.firstPlace]}>
              <View style={styles.podiumAvatar}>
                <Text style={styles.avatarText}>{leaderboardData[0].avatar}</Text>
              </View>
              <View style={styles.podiumRank}>
                <Crown size={20} color="#FFD93D" />
                <Text style={styles.podiumRankText}>1</Text>
              </View>
              <Text style={styles.podiumName}>{leaderboardData[0].name.split(' ')[0]}</Text>
              <Text style={styles.podiumScore}>{leaderboardData[0].totalScore}</Text>
            </View>

            {/* 3rd Place */}
            <View style={[styles.podiumPlace, styles.thirdPlace]}>
              <View style={styles.podiumAvatar}>
                <Text style={styles.avatarText}>{leaderboardData[2].avatar}</Text>
              </View>
              <View style={styles.podiumRank}>
                <Award size={16} color="#CD7F32" />
                <Text style={styles.podiumRankText}>3</Text>
              </View>
              <Text style={styles.podiumName}>{leaderboardData[2].name.split(' ')[0]}</Text>
              <Text style={styles.podiumScore}>{leaderboardData[2].totalScore}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Full Rankings */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Complete Rankings</Text>
          
          <View style={styles.rankingsContainer}>
            {leaderboardData.map((player, index) => (
              <View
                key={player.id}
                style={[
                  styles.rankingItem,
                  player.name.includes('You') && styles.currentPlayerItem,
                  index < 3 && styles.topThreeItem,
                ]}
              >
                <View style={styles.rankingLeft}>
                  <View style={[
                    styles.rankingNumber,
                    { backgroundColor: getRankColor(index + 1) }
                  ]}>
                    {getRankIcon(index + 1) || (
                      <Text style={styles.rankingNumberText}>{index + 1}</Text>
                    )}
                  </View>
                  
                  <View style={styles.playerAvatar}>
                    <Text style={styles.avatarText}>{player.avatar}</Text>
                  </View>
                  
                  <View style={styles.playerDetails}>
                    <Text style={[
                      styles.playerName,
                      player.name.includes('You') && styles.currentPlayerName
                    ]}>
                      {player.name}
                    </Text>
                    <View style={styles.playerMeta}>
                      <View style={styles.metaItem}>
                        <Clock size={12} color="#718096" />
                        <Text style={styles.metaText}>{player.lastActive}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Target size={12} color="#718096" />
                        <Text style={styles.metaText}>{player.accuracy}%</Text>
                      </View>
                    </View>
                  </View>
                </View>
                
                <View style={styles.rankingRight}>
                  <Text style={styles.playerTotalScore}>{player.totalScore}</Text>
                  <Text style={styles.playerGames}>{player.gamesPlayed} games</Text>
                </View>
              </View>
            ))}
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
  headerRight: {
    width: 40,
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedPeriod: {
    backgroundColor: '#4299E1',
  },
  periodText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#718096',
  },
  selectedPeriodText: {
    color: 'white',
  },
  yourRankCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#4299E1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  yourRankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  yourRankTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
  },
  rankBadge: {
    backgroundColor: '#4299E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rankNumber: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  yourRankStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rankStat: {
    alignItems: 'center',
  },
  rankStatValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginTop: 4,
    marginBottom: 2,
  },
  rankStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  podiumPlace: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  firstPlace: {
    marginBottom: 0,
  },
  secondPlace: {
    marginBottom: 20,
  },
  thirdPlace: {
    marginBottom: 40,
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 24,
  },
  podiumRank: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  podiumRankText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginLeft: 4,
  },
  podiumName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  podiumScore: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#48BB78',
  },
  rankingsContainer: {
    gap: 12,
  },
  rankingItem: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
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
  currentPlayerItem: {
    borderWidth: 2,
    borderColor: '#4299E1',
  },
  topThreeItem: {
    backgroundColor: '#FFFBEB',
  },
  rankingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankingNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankingNumberText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  playerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  playerDetails: {
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
  playerMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginLeft: 4,
  },
  rankingRight: {
    alignItems: 'flex-end',
  },
  playerTotalScore: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
  },
  playerGames: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
});