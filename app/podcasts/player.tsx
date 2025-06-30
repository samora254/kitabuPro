import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown, Play, Pause, SkipBack, SkipForward, Volume2, Download, Share, Heart, MoveVertical as MoreVertical, Shuffle, Repeat, CirclePlay as PlayCircle, Settings, List, BookOpen } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

const { width, height } = Dimensions.get('window');

interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  isShuffling: boolean;
  repeatMode: 'off' | 'one' | 'all';
}

export default function PodcastPlayer() {
  const { episodeId } = useLocalSearchParams();
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 1800, // 30 minutes
    volume: 0.8,
    playbackRate: 1.0,
    isShuffling: false,
    repeatMode: 'off',
  });
  
  const [showControls, setShowControls] = useState(true);
  const [showPlaybackSettings, setShowPlaybackSettings] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const controlsAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Mock episode data
  const episode = {
    id: episodeId,
    title: 'Introduction to Algebra: Variables and Expressions',
    description: 'Learn the fundamentals of algebra with this comprehensive introduction to variables, expressions, and basic operations.',
    thumbnailUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
    subject: 'Mathematics',
    instructor: 'Dr. Sarah Johnson',
    type: 'video' as const,
    isDownloaded: false,
  };

  const playbackRates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Auto-hide controls after 3 seconds
    const timer = setTimeout(() => {
      if (episode.type === 'video') {
        hideControls();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simulate playback progress
    if (playerState.isPlaying) {
      const interval = setInterval(() => {
        setPlayerState(prev => ({
          ...prev,
          currentTime: Math.min(prev.currentTime + 1, prev.duration),
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [playerState.isPlaying]);

  const togglePlayPause = () => {
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    if (episode.type === 'video') {
      showControlsTemporarily();
    }
  };

  const skipBack = () => {
    setPlayerState(prev => ({
      ...prev,
      currentTime: Math.max(prev.currentTime - 15, 0),
    }));
    if (episode.type === 'video') {
      showControlsTemporarily();
    }
  };

  const skipForward = () => {
    setPlayerState(prev => ({
      ...prev,
      currentTime: Math.min(prev.currentTime + 15, prev.duration),
    }));
    if (episode.type === 'video') {
      showControlsTemporarily();
    }
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    Animated.timing(controlsAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      if (episode.type === 'video') {
        hideControls();
      }
    }, 3000);
  };

  const hideControls = () => {
    Animated.timing(controlsAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowControls(false));
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (playerState.currentTime / playerState.duration) * 100;

  return (
    <View style={styles.container}>
      <DevModeIndicator />
      
      {episode.type === 'video' ? (
        <TouchableOpacity 
          style={styles.videoContainer}
          activeOpacity={1}
          onPress={showControlsTemporarily}
        >
          <Image source={{ uri: episode.thumbnailUrl }} style={styles.videoPlayer} />
          
          {/* Video Controls Overlay */}
          <Animated.View
            style={[
              styles.videoOverlay,
              {
                opacity: controlsAnim,
              },
            ]}
            pointerEvents={showControls ? 'auto' : 'none'}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ChevronDown size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.videoPlayButton}
              onPress={togglePlayPause}
            >
              {playerState.isPlaying ? (
                <Pause size={48} color="white" />
              ) : (
                <Play size={48} color="white" />
              )}
            </TouchableOpacity>

            <View style={styles.videoBottomControls}>
              <View style={styles.videoProgress}>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
                </View>
                <Text style={styles.timeText}>
                  {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
                </Text>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      ) : (
        <Animated.View
          style={[
            styles.audioContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.audioHeader}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ChevronDown size={24} color="white" />
            </TouchableOpacity>
            
            <Text style={styles.audioTitle}>Now Playing</Text>
            
            <TouchableOpacity style={styles.headerButton}>
              <MoreVertical size={24} color="white" />
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.audioArtwork}>
            <Image source={{ uri: episode.thumbnailUrl }} style={styles.albumArt} />
          </View>
        </Animated.View>
      )}

      {/* Player Controls */}
      <Animated.View
        style={[
          styles.controlsContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle} numberOfLines={2}>{episode.title}</Text>
          <Text style={styles.trackArtist}>{episode.instructor} • {episode.subject}</Text>
        </View>

        {episode.type === 'audio' && (
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
              <TouchableOpacity style={[styles.progressThumb, { left: `${progressPercentage}%` }]} />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(playerState.currentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(playerState.duration)}</Text>
            </View>
          </View>
        )}

        <View style={styles.mainControls}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setPlayerState(prev => ({ ...prev, isShuffling: !prev.isShuffling }))}
          >
            <Shuffle size={20} color={playerState.isShuffling ? '#4299E1' : '#718096'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} onPress={skipBack}>
            <SkipBack size={24} color="#2D3748" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
            {playerState.isPlaying ? (
              <Pause size={32} color="white" />
            ) : (
              <Play size={32} color="white" />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} onPress={skipForward}>
            <SkipForward size={24} color="#2D3748" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => {
              const modes: ('off' | 'one' | 'all')[] = ['off', 'one', 'all'];
              const currentIndex = modes.indexOf(playerState.repeatMode);
              const nextMode = modes[(currentIndex + 1) % modes.length];
              setPlayerState(prev => ({ ...prev, repeatMode: nextMode }));
            }}
          >
            <Repeat size={20} color={playerState.repeatMode !== 'off' ? '#4299E1' : '#718096'} />
          </TouchableOpacity>
        </View>

        <View style={styles.secondaryControls}>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => setIsLiked(!isLiked)}
          >
            <Heart size={20} color={isLiked ? '#EF4444' : '#718096'} fill={isLiked ? '#EF4444' : 'none'} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => setShowPlaybackSettings(!showPlaybackSettings)}
          >
            <Settings size={20} color="#718096" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Share size={20} color="#718096" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Download size={20} color={episode.isDownloaded ? '#10B981' : '#718096'} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => setShowTranscript(!showTranscript)}
          >
            <BookOpen size={20} color={showTranscript ? '#4299E1' : '#718096'} />
          </TouchableOpacity>
        </View>

        {/* Playback Speed Settings */}
        {showPlaybackSettings && (
          <View style={styles.settingsPanel}>
            <Text style={styles.settingsTitle}>Playback Speed</Text>
            <View style={styles.speedOptions}>
              {playbackRates.map((rate) => (
                <TouchableOpacity
                  key={rate}
                  style={[
                    styles.speedOption,
                    playerState.playbackRate === rate && styles.activeSpeedOption
                  ]}
                  onPress={() => setPlayerState(prev => ({ ...prev, playbackRate: rate }))}
                >
                  <Text style={[
                    styles.speedText,
                    playerState.playbackRate === rate && styles.activeSpeedText
                  ]}>
                    {rate}x
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Transcript */}
        {showTranscript && (
          <View style={styles.transcriptPanel}>
            <Text style={styles.transcriptTitle}>Transcript</Text>
            <Text style={styles.transcriptText}>
              Welcome to today's lesson on algebra fundamentals. In this episode, we'll explore the concept of variables and expressions, which form the foundation of algebraic thinking...
            </Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  videoPlayer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  videoPlayButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoBottomControls: {
    alignSelf: 'stretch',
  },
  videoProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  audioContainer: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  audioHeader: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  audioTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  audioArtwork: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  albumArt: {
    width: width - 80,
    height: width - 80,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: Platform.OS === 'ios' ? 50 : 30,
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  trackTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 26,
  },
  trackArtist: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4299E1',
    borderRadius: 2,
  },
  progressThumb: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4299E1',
    marginLeft: -8,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  mainControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 20,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#4299E1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4299E1',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  secondaryControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  secondaryButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsPanel: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  settingsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 12,
  },
  speedOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  speedOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeSpeedOption: {
    backgroundColor: '#4299E1',
    borderColor: '#4299E1',
  },
  speedText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#718096',
  },
  activeSpeedText: {
    color: 'white',
  },
  transcriptPanel: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    maxHeight: 200,
  },
  transcriptTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 12,
  },
  transcriptText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 20,
  },
});