import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft,
  Users,
  Clock,
  Play,
  UserPlus,
  Crown,
  Zap,
  Target,
  Share,
  Copy
} from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

interface Player {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
  isReady: boolean;
  isOnline: boolean;
}

export default function QuizLobby() {
  const params = useLocalSearchParams();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [players, setPlayers] = useState<Player[]>([
    {
      id: '1',
      name: 'Walter (You)',
      avatar: '🎓',
      isHost: true,
      isReady: true,
      isOnline: true,
    },
    {
      id: '2',
      name: 'Sarah M.',
      avatar: '👩‍🎓',
      isHost: false,
      isReady: true,
      isOnline: true,
    },
    {
      id: '3',
      name: 'John K.',
      avatar: '👨‍🎓',
      isHost: false,
      isReady: false,
      isOnline: true,
    },
    {
      id: '4',
      name: 'Emma L.',
      avatar: '👩‍🎓',
      isHost: false,
      isReady: true,
      isOnline: true,
    },
  ]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

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

    // Pulse animation for waiting state
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Start the quiz
      router.push({
        pathname: '/quiz/game',
        params: {
          ...params,
          players: JSON.stringify(players),
        },
      });
    }
  }, [countdown]);

  const handleStartQuiz = () => {
    const readyPlayers = players.filter(p => p.isReady);
    if (readyPlayers.length < 2) {
      Alert.alert('Not Ready', 'At least 2 players must be ready to start the quiz.');
      return;
    }
    setCountdown(5);
  };

  const handleInviteFriends = () => {
    Alert.alert('Invite Friends', 'Quiz code: QZ123\nShare this code with your friends to join!');
  };

  const handleShareQuiz = () => {
    Alert.alert('Share Quiz', 'Quiz link copied to clipboard!');
  };

  const readyCount = players.filter(p => p.isReady).length;
  const canStart = readyCount >= 2 && players.find(p => p.isHost)?.isReady;

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
            <Text style={styles.headerTitle}>Quiz Lobby</Text>
            <Text style={styles.headerSubtitle}>
              {params.subject} • {params.totalQuestions} Questions
            </Text>
          </View>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShareQuiz}
          >
            <Share size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Countdown Overlay */}
        {countdown !== null && countdown > 0 && (
          <View style={styles.countdownOverlay}>
            <Animated.View
              style={[
                styles.countdownContainer,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <Text style={styles.countdownText}>{countdown}</Text>
              <Text style={styles.countdownLabel}>Starting in...</Text>
            </Animated.View>
          </View>
        )}

        {/* Quiz Info */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.quizInfoCard}>
            <View style={styles.quizInfoHeader}>
              <View style={styles.quizInfoIcon}>
                <Target size={24} color="#4299E1" />
              </View>
              <View style={styles.quizInfoDetails}>
                <Text style={styles.quizInfoTitle}>Quiz Settings</Text>
                <Text style={styles.quizInfoSubtitle}>Ready to challenge your knowledge?</Text>
              </View>
            </View>
            
            <View style={styles.quizStats}>
              <View style={styles.statItem}>
                <Clock size={16} color="#718096" />
                <Text style={styles.statText}>{params.timePerQuestion}s per question</Text>
              </View>
              <View style={styles.statItem}>
                <Zap size={16} color="#718096" />
                <Text style={styles.statText}>{params.difficulty} difficulty</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Players List */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Players ({players.length})</Text>
            <Text style={styles.readyCount}>{readyCount}/{players.length} Ready</Text>
          </View>
          
          <View style={styles.playersContainer}>
            {players.map((player, index) => (
              <Animated.View
                key={player.id}
                style={[
                  styles.playerCard,
                  {
                    opacity: fadeAnim,
                    transform: [
                      { 
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 30],
                          outputRange: [0, 30 + (index * 10)],
                        })
                      }
                    ],
                  },
                ]}
              >
                <View style={styles.playerInfo}>
                  <View style={styles.playerAvatar}>
                    <Text style={styles.avatarText}>{player.avatar}</Text>
                    {player.isHost && (
                      <View style={styles.hostBadge}>
                        <Crown size={12} color="#FFD93D" />
                      </View>
                    )}
                  </View>
                  <View style={styles.playerDetails}>
                    <Text style={styles.playerName}>{player.name}</Text>
                    <View style={styles.playerStatus}>
                      <View style={[
                        styles.statusDot,
                        { backgroundColor: player.isOnline ? '#10B981' : '#EF4444' }
                      ]} />
                      <Text style={styles.statusText}>
                        {player.isOnline ? 'Online' : 'Offline'}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={[
                  styles.readyBadge,
                  { backgroundColor: player.isReady ? '#10B981' : '#EF4444' }
                ]}>
                  <Text style={styles.readyText}>
                    {player.isReady ? 'Ready' : 'Not Ready'}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Invite Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.inviteButton}
            onPress={handleInviteFriends}
          >
            <UserPlus size={24} color="#4299E1" />
            <Text style={styles.inviteButtonText}>Invite More Friends</Text>
            <View style={styles.quizCode}>
              <Copy size={16} color="#718096" />
              <Text style={styles.quizCodeText}>QZ123</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Start Button */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.startButton,
              !canStart && styles.startButtonDisabled
            ]}
            onPress={handleStartQuiz}
            disabled={!canStart}
          >
            <Play size={24} color="white" />
            <Text style={styles.startButtonText}>
              {canStart ? 'Start Quiz' : 'Waiting for Players'}
            </Text>
          </TouchableOpacity>
          
          {!canStart && (
            <Text style={styles.startHint}>
              At least 2 players must be ready to start
            </Text>
          )}
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
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  countdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  countdownContainer: {
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 80,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: 16,
  },
  countdownLabel: {
    fontSize: 20,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255,255,255,0.8)',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
  },
  readyCount: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  quizInfoCard: {
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
  quizInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quizInfoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quizInfoDetails: {
    flex: 1,
  },
  quizInfoTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  quizInfoSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  quizStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginLeft: 8,
  },
  playersContainer: {
    gap: 12,
  },
  playerCard: {
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
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  avatarText: {
    fontSize: 20,
  },
  hostBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF5B7',
    justifyContent: 'center',
    alignItems: 'center',
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
  playerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  readyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  readyText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  inviteButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
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
  inviteButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#4299E1',
    marginLeft: 12,
    flex: 1,
  },
  quizCode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  quizCodeText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginLeft: 8,
  },
  startButton: {
    backgroundColor: '#48BB78',
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#48BB78',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  startButtonDisabled: {
    backgroundColor: '#A0AEC0',
    shadowOpacity: 0,
    elevation: 0,
  },
  startButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginLeft: 12,
  },
  startHint: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    marginTop: 12,
  },
});