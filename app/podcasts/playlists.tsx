import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Plus, Play, Pause, Music, Clock, MoveVertical as MoreVertical, Shuffle, CreditCard as Edit3, Trash2, Share, Download, Heart, List, Video, Headphones } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

interface Playlist {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  episodeCount: number;
  totalDuration: number; // in seconds
  createdAt: string;
  isDefault: boolean;
  episodes: string[]; // episode IDs
}

export default function PlaylistsScreen() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const playlists: Playlist[] = [
    {
      id: '1',
      name: 'Mathematics Mastery',
      description: 'Essential math concepts for Grade 8',
      thumbnailUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
      episodeCount: 12,
      totalDuration: 18000, // 5 hours
      createdAt: '2024-01-15',
      isDefault: false,
      episodes: ['1', '2', '3'],
    },
    {
      id: '2',
      name: 'Science Fundamentals',
      description: 'Core science topics and experiments',
      thumbnailUrl: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=400',
      episodeCount: 8,
      totalDuration: 12600, // 3.5 hours
      createdAt: '2024-01-12',
      isDefault: false,
      episodes: ['4', '5'],
    },
    {
      id: '3',
      name: 'Language Arts',
      description: 'English and Kiswahili essentials',
      thumbnailUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      episodeCount: 15,
      totalDuration: 21600, // 6 hours
      createdAt: '2024-01-10',
      isDefault: false,
      episodes: ['6', '7', '8'],
    },
    {
      id: 'recent',
      name: 'Recently Played',
      description: 'Your recently accessed content',
      thumbnailUrl: 'https://images.pexels.com/photos/631522/pexels-photo-631522.jpeg?auto=compress&cs=tinysrgb&w=400',
      episodeCount: 6,
      totalDuration: 7200, // 2 hours
      createdAt: '2024-01-20',
      isDefault: true,
      episodes: ['1', '2', '3', '4'],
    },
    {
      id: 'favorites',
      name: 'Favorites',
      description: 'Your liked episodes',
      thumbnailUrl: 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=400',
      episodeCount: 9,
      totalDuration: 10800, // 3 hours
      createdAt: '2024-01-18',
      isDefault: true,
      episodes: ['1', '3', '5'],
    },
  ];

  const quickPlaylists = [
    { 
      id: 'downloaded', 
      name: 'Downloaded', 
      icon: Download, 
      color: '#10B981',
      description: 'Offline content',
      count: 12
    },
    { 
      id: 'study-mode', 
      name: 'Study Mode', 
      icon: Clock, 
      color: '#8B5CF6',
      description: 'Focus sessions',
      count: 8
    },
    { 
      id: 'audio-only', 
      name: 'Audio Only', 
      icon: Headphones, 
      color: '#4ECDC4',
      description: 'Listen on the go',
      count: 24
    },
    { 
      id: 'video-lessons', 
      name: 'Video Lessons', 
      icon: Video, 
      color: '#FF6B6B',
      description: 'Visual learning',
      count: 18
    },
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

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const handlePlayPlaylist = (playlistId: string) => {
    if (currentlyPlaying === playlistId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(playlistId);
      // Navigate to player with playlist
      router.push({
        pathname: '/podcasts/player',
        params: { playlistId }
      });
    }
  };

  const handleEditPlaylist = (playlistId: string) => {
    router.push({
      pathname: '/podcasts/playlists/edit',
      params: { playlistId }
    });
  };

  const handleDeletePlaylist = (playlistId: string, isDefault: boolean) => {
    if (isDefault) {
      Alert.alert('Cannot Delete', 'Default playlists cannot be deleted.');
      return;
    }

    Alert.alert(
      'Delete Playlist',
      'Are you sure you want to delete this playlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => console.log('Deleting playlist:', playlistId) 
        }
      ]
    );
  };

  const handleSharePlaylist = (playlistId: string) => {
    console.log('Sharing playlist:', playlistId);
  };

  const renderPlaylistCard = (playlist: Playlist) => (
    <TouchableOpacity
      key={playlist.id}
      style={styles.playlistCard}
      onPress={() => router.push({
        pathname: '/podcasts/playlists/[id]',
        params: { id: playlist.id }
      })}
    >
      <View style={styles.playlistHeader}>
        <Image source={{ uri: playlist.thumbnailUrl }} style={styles.playlistThumbnail} />
        
        <View style={styles.playlistOverlay}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={(e) => {
              e.stopPropagation();
              handlePlayPlaylist(playlist.id);
            }}
          >
            {currentlyPlaying === playlist.id ? (
              <Pause size={20} color="white" />
            ) : (
              <Play size={20} color="white" />
            )}
          </TouchableOpacity>
          
          {playlist.isDefault && (
            <View style={styles.defaultBadge}>
              <Heart size={12} color="#EF4444" fill="#EF4444" />
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.playlistContent}>
        <View style={styles.playlistInfo}>
          <Text style={styles.playlistName} numberOfLines={1}>{playlist.name}</Text>
          <Text style={styles.playlistDescription} numberOfLines={2}>{playlist.description}</Text>
          
          <View style={styles.playlistMeta}>
            <View style={styles.metaItem}>
              <List size={12} color="#718096" />
              <Text style={styles.metaText}>{playlist.episodeCount} episodes</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock size={12} color="#718096" />
              <Text style={styles.metaText}>{formatDuration(playlist.totalDuration)}</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.moreButton}
          onPress={(e) => {
            e.stopPropagation();
            Alert.alert(
              playlist.name,
              'Choose an action',
              [
                { text: 'Play', onPress: () => handlePlayPlaylist(playlist.id) },
                { text: 'Edit', onPress: () => handleEditPlaylist(playlist.id) },
                { text: 'Share', onPress: () => handleSharePlaylist(playlist.id) },
                ...(playlist.isDefault ? [] : [{ 
                  text: 'Delete', 
                  style: 'destructive' as const,
                  onPress: () => handleDeletePlaylist(playlist.id, playlist.isDefault) 
                }]),
                { text: 'Cancel', style: 'cancel' as const }
              ]
            );
          }}
        >
          <MoreVertical size={16} color="#718096" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Playlists</Text>
            <Text style={styles.headerSubtitle}>Organize your learning content</Text>
          </View>

          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.push('/podcasts/playlists/create')}
          >
            <Plus size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quick Access Playlists */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Quick Access</Text>
          
          <View style={styles.quickPlaylistsGrid}>
            {quickPlaylists.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.quickPlaylistCard, { backgroundColor: `${item.color}20` }]}
                onPress={() => console.log('Opening quick playlist:', item.id)}
              >
                <View style={[styles.quickPlaylistIcon, { backgroundColor: item.color }]}>
                  <item.icon size={20} color="white" />
                </View>
                <View style={styles.quickPlaylistInfo}>
                  <Text style={[styles.quickPlaylistName, { color: item.color }]}>{item.name}</Text>
                  <Text style={styles.quickPlaylistCount}>{item.count} items</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* My Playlists */}
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
            <Text style={styles.sectionTitle}>My Playlists</Text>
            <TouchableOpacity 
              style={styles.shuffleButton}
              onPress={() => console.log('Shuffle all playlists')}
            >
              <Shuffle size={16} color="#4299E1" />
              <Text style={styles.shuffleText}>Shuffle All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.playlistsContainer}>
            {playlists.map(renderPlaylistCard)}
          </View>
        </Animated.View>

        {/* Create Playlist Prompt */}
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
            style={styles.createPlaylistCard}
            onPress={() => router.push('/podcasts/playlists/create')}
          >
            <View style={styles.createPlaylistIcon}>
              <Plus size={32} color="#4299E1" />
            </View>
            <Text style={styles.createPlaylistTitle}>Create New Playlist</Text>
            <Text style={styles.createPlaylistDescription}>
              Organize your favorite episodes into custom playlists
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={{ height: 100 }} />
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
  headerButton: {
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
  section: {
    marginBottom: 30,
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
  shuffleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  shuffleText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4299E1',
    marginLeft: 6,
  },
  quickPlaylistsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickPlaylistCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickPlaylistIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quickPlaylistInfo: {
    flex: 1,
  },
  quickPlaylistName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  quickPlaylistCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  playlistsContainer: {
    gap: 16,
  },
  playlistCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  playlistHeader: {
    position: 'relative',
  },
  playlistThumbnail: {
    width: '100%',
    height: 140,
    backgroundColor: '#F7FAFC',
  },
  playlistOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  playlistContent: {
    padding: 16,
    flexDirection: 'row',
  },
  playlistInfo: {
    flex: 1,
    marginRight: 12,
  },
  playlistName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  playlistDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    lineHeight: 20,
    marginBottom: 8,
  },
  playlistMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createPlaylistCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  createPlaylistIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  createPlaylistTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 8,
  },
  createPlaylistDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
});