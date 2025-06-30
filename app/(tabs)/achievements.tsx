import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Trophy,
  Star,
  Award,
  Target,
  Zap,
  BookOpen,
  Brain,
  Clock,
  TrendingUp,
  Users,
  Heart,
  Shield,
  Crown,
  Flame,
  Medal
} from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  category: string;
  points: number;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
  maxProgress?: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  unlocked: boolean;
}

export default function AchievementsScreen() {
  const [selectedTab, setSelectedTab] = useState<'achievements' | 'badges' | 'leaderboard'>('achievements');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: Star,
      color: '#FFD93D',
      category: 'Getting Started',
      points: 10,
      unlocked: true,
      unlockedDate: '2024-01-15',
    },
    {
      id: '2',
      title: 'Math Wizard',
      description: 'Complete 10 mathematics lessons',
      icon: Brain,
      color: '#FF6B6B',
      category: 'Mathematics',
      points: 50,
      unlocked: true,
      unlockedDate: '2024-01-20',
    },
    {
      id: '3',
      title: 'Speed Reader',
      description: 'Read 5 articles in one day',
      icon: BookOpen,
      color: '#4ECDC4',
      category: 'English',
      points: 30,
      unlocked: true,
      unlockedDate: '2024-01-18',
    },
    {
      id: '4',
      title: 'Science Explorer',
      description: 'Complete 15 science experiments',
      icon: Zap,
      color: '#45B7D1',
      category: 'Science',
      points: 75,
      unlocked: false,
      progress: 8,
      maxProgress: 15,
    },
    {
      id: '5',
      title: 'Streak Master',
      description: 'Study for 7 consecutive days',
      icon: Flame,
      color: '#FF8E53',
      category: 'Consistency',
      points: 100,
      unlocked: true,
      unlockedDate: '2024-01-22',
    },
    {
      id: '6',
      title: 'Quiz Champion',
      description: 'Score 100% on 5 quizzes',
      icon: Trophy,
      color: '#8B5CF6',
      category: 'Assessment',
      points: 80,
      unlocked: false,
      progress: 3,
      maxProgress: 5,
    },
    {
      id: '7',
      title: 'Time Master',
      description: 'Study for 10 hours total',
      icon: Clock,
      color: '#10B981',
      category: 'Time',
      points: 60,
      unlocked: false,
      progress: 7.5,
      maxProgress: 10,
    },
    {
      id: '8',
      title: 'Social Learner',
      description: 'Help 3 classmates with questions',
      icon: Users,
      color: '#F59E0B',
      category: 'Community',
      points: 40,
      unlocked: false,
      progress: 1,
      maxProgress: 3,
    },
  ];

  const badges: Badge[] = [
    {
      id: '1',
      name: 'Scholar',
      description: 'Completed 50 lessons',
      icon: Crown,
      color: '#FFD93D',
      rarity: 'Legendary',
      unlocked: true,
    },
    {
      id: '2',
      name: 'Dedicated',
      description: '30-day study streak',
      icon: Shield,
      color: '#8B5CF6',
      rarity: 'Epic',
      unlocked: false,
    },
    {
      id: '3',
      name: 'Perfectionist',
      description: '10 perfect quiz scores',
      icon: Medal,
      color: '#10B981',
      rarity: 'Rare',
      unlocked: true,
    },
    {
      id: '4',
      name: 'Helper',
      description: 'Helped 10 classmates',
      icon: Heart,
      color: '#F59E0B',
      rarity: 'Common',
      unlocked: false,
    },
  ];

  const leaderboardData = [
    { rank: 1, name: 'Sarah M.', points: 2450, avatar: '👩‍🎓' },
    { rank: 2, name: 'John K.', points: 2380, avatar: '👨‍🎓' },
    { rank: 3, name: 'You (Walter)', points: 2120, avatar: '🎓' },
    { rank: 4, name: 'Emma L.', points: 1950, avatar: '👩‍🎓' },
    { rank: 5, name: 'David R.', points: 1820, avatar: '👨‍🎓' },
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

  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return '#10B981';
      case 'Rare': return '#3B82F6';
      case 'Epic': return '#8B5CF6';
      case 'Legendary': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const renderAchievements = () => (
    <ScrollView 
      style={styles.tabContent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {achievements.map((achievement) => (
        <View 
          key={achievement.id} 
          style={[
            styles.achievementCard,
            !achievement.unlocked && styles.achievementLocked
          ]}
        >
          <View style={styles.achievementHeader}>
            <View style={[
              styles.achievementIcon, 
              { backgroundColor: achievement.unlocked ? `${achievement.color}20` : '#F7FAFC' }
            ]}>
              <achievement.icon 
                size={24} 
                color={achievement.unlocked ? achievement.color : '#A0AEC0'} 
              />
            </View>
            <View style={styles.achievementInfo}>
              <Text style={[
                styles.achievementTitle,
                !achievement.unlocked && styles.achievementTextLocked
              ]}>
                {achievement.title}
              </Text>
              <Text style={[
                styles.achievementDescription,
                !achievement.unlocked && styles.achievementTextLocked
              ]}>
                {achievement.description}
              </Text>
              <View style={styles.achievementMeta}>
                <Text style={styles.categoryText}>{achievement.category}</Text>
                <Text style={styles.pointsText}>+{achievement.points} pts</Text>
              </View>
            </View>
            {achievement.unlocked && (
              <View style={styles.unlockedBadge}>
                <Star size={16} color="#FFD93D" />
              </View>
            )}
          </View>
          
          {!achievement.unlocked && achievement.progress && achievement.maxProgress && (
            <View style={styles.progressSection}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                      backgroundColor: achievement.color 
                    }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {achievement.progress}/{achievement.maxProgress}
              </Text>
            </View>
          )}
          
          {achievement.unlocked && achievement.unlockedDate && (
            <Text style={styles.unlockedDate}>
              Unlocked on {new Date(achievement.unlockedDate).toLocaleDateString()}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );

  const renderBadges = () => (
    <ScrollView 
      style={styles.tabContent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.badgesGrid}>
        {badges.map((badge) => (
          <View 
            key={badge.id} 
            style={[
              styles.badgeCard,
              !badge.unlocked && styles.badgeLocked
            ]}
          >
            <View style={[
              styles.badgeIcon,
              { backgroundColor: badge.unlocked ? `${badge.color}20` : '#F7FAFC' }
            ]}>
              <badge.icon 
                size={32} 
                color={badge.unlocked ? badge.color : '#A0AEC0'} 
              />
            </View>
            <Text style={[
              styles.badgeName,
              !badge.unlocked && styles.badgeTextLocked
            ]}>
              {badge.name}
            </Text>
            <Text style={[
              styles.badgeDescription,
              !badge.unlocked && styles.badgeTextLocked
            ]}>
              {badge.description}
            </Text>
            <View style={[
              styles.rarityBadge,
              { backgroundColor: `${getRarityColor(badge.rarity)}20` }
            ]}>
              <Text style={[
                styles.rarityText,
                { color: getRarityColor(badge.rarity) }
              ]}>
                {badge.rarity}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderLeaderboard = () => (
    <ScrollView 
      style={styles.tabContent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {leaderboardData.map((user) => (
        <View 
          key={user.rank} 
          style={[
            styles.leaderboardItem,
            user.name.includes('You') && styles.currentUser
          ]}
        >
          <View style={styles.rankContainer}>
            <Text style={[
              styles.rankText,
              user.rank <= 3 && styles.topRank
            ]}>
              #{user.rank}
            </Text>
            {user.rank === 1 && <Crown size={16} color="#FFD93D" />}
            {user.rank === 2 && <Medal size={16} color="#C0C0C0" />}
            {user.rank === 3 && <Award size={16} color="#CD7F32" />}
          </View>
          <Text style={styles.avatar}>{user.avatar}</Text>
          <View style={styles.userInfo}>
            <Text style={[
              styles.userName,
              user.name.includes('You') && styles.currentUserName
            ]}>
              {user.name}
            </Text>
            <Text style={styles.userPoints}>{user.points} points</Text>
          </View>
          <TrendingUp size={16} color="#48BB78" />
        </View>
      ))}
    </ScrollView>
  );

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
          <Text style={styles.headerTitle}>Achievements</Text>
          <Text style={styles.headerSubtitle}>Track your learning progress</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Trophy size={24} color="white" />
              <Text style={styles.statNumber}>{unlockedAchievements}</Text>
              <Text style={styles.statLabel}>Unlocked</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Star size={24} color="white" />
              <Text style={styles.statNumber}>{totalPoints}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Target size={24} color="white" />
              <Text style={styles.statNumber}>3rd</Text>
              <Text style={styles.statLabel}>Rank</Text>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Tab Navigation */}
      <Animated.View
        style={[
          styles.tabContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'achievements' && styles.activeTab]}
          onPress={() => setSelectedTab('achievements')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'achievements' && styles.activeTabText
          ]}>
            Achievements
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'badges' && styles.activeTab]}
          onPress={() => setSelectedTab('badges')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'badges' && styles.activeTabText
          ]}>
            Badges
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'leaderboard' && styles.activeTab]}
          onPress={() => setSelectedTab('leaderboard')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'leaderboard' && styles.activeTabText
          ]}>
            Leaderboard
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {selectedTab === 'achievements' && renderAchievements()}
        {selectedTab === 'badges' && renderBadges()}
        {selectedTab === 'leaderboard' && renderLeaderboard()}
      </Animated.View>
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 20,
    backdropFilter: 'blur(10px)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255,255,255,0.8)',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#4299E1',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  tabContent: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  achievementCard: {
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
  achievementLocked: {
    opacity: 0.6,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginBottom: 8,
    lineHeight: 20,
  },
  achievementMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
  },
  pointsText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#48BB78',
  },
  achievementTextLocked: {
    color: '#A0AEC0',
  },
  unlockedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF5B7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F7FAFC',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
  },
  unlockedDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginTop: 12,
    fontStyle: 'italic',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  badgeCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    margin: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  badgeLocked: {
    opacity: 0.6,
  },
  badgeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  badgeDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 16,
  },
  badgeTextLocked: {
    color: '#A0AEC0',
  },
  rarityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rarityText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'uppercase',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  currentUser: {
    borderWidth: 2,
    borderColor: '#4299E1',
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
  },
  rankText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#718096',
    marginRight: 4,
  },
  topRank: {
    color: '#2D3748',
  },
  avatar: {
    fontSize: 24,
    marginHorizontal: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 2,
  },
  currentUserName: {
    color: '#4299E1',
  },
  userPoints: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
});