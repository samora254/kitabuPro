import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Download, Play, Pause, Filter, BookOpen, Calculator, Globe, Beaker, Users, Heart, Clock, Headphones, Video, List, MoveVertical as MoreVertical, Plus, Shuffle, SkipForward } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

const { width } = Dimensions.get('window');

interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  type: 'audio' | 'video';
  subject: string;
  thumbnailUrl: string;
  isDownloaded: boolean;
  downloadProgress?: number;
  viewCount: number;
  publishedAt: string;
  transcript?: string;
}

interface Subject {
  id: string;
  name: string;
  color: string;
  icon: any;
  episodeCount: number;
}

export default function PodcastsScreen() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'audio' | 'video' | 'downloaded'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const subjects: Subject[] = [
    { id: 'mathematics', name: 'Mathematics', color: '#FF6B6B', icon: Calculator, episodeCount: 24 },
    { id: 'english', name: 'English', color: '#4ECDC4', icon: BookOpen, episodeCount: 18 },
    { id: 'science', name: 'Science', color: '#45B7D1', icon: Beaker, episodeCount: 32 },
    { id: 'social-studies', name: 'Social Studies', color: '#96CEB4', icon: Users, episodeCount: 15 },
    { id: 'kiswahili', name: 'Kiswahili', color: '#FFEAA7', icon: Globe, episodeCount: 12 },
    { id: 'religious', name: 'Religious Education', color: '#FD79A8', icon: Heart, episodeCount: 8 },
  ];

  const podcastEpisodes: PodcastEpisode[] = [
    {
      id: '1',
      title: 'Introduction to Algebra: Variables and Expressions',
      description: 'Learn the fundamentals of algebra with this comprehensive introduction to variables, expressions, and basic operations.',
      duration: 1800, // 30 minutes
      type: 'video',
      subject: 'mathematics',
      thumbnailUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
      isDownloaded: true,
      viewCount: 1204,
      publishedAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Understanding Photosynthesis Process',
      description: 'Dive deep into how plants convert sunlight into energy through the amazing process of photosynthesis.',
      duration: 1260, // 21 minutes
      type: 'audio',
      subject: 'science',
      thumbnailUrl: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=400',
      isDownloaded: false,
      downloadProgress: 65,
      viewCount: 892,
      publishedAt: '2024-01-12',
    },
    {
      id: '3',
      title: 'Grammar Essentials: Sentence Structure',
      description: 'Master the building blocks of clear communication with this detailed exploration of sentence structure.',
      duration: 2100, // 35 minutes
      type: 'video',
      subject: 'english',
      thumbnailUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      isDownloaded: false,
      viewCount: 756,
      publishedAt: '2024-01-10',
    },
    {
      id: '4',
      title: 'Kenya\'s Geography and Climate',
      description: 'Explore the diverse landscapes and climate patterns that make Kenya unique in East Africa.',
      duration: 1680, // 28 minutes
      type: 'audio',
      subject: 'social-studies',
      thumbnailUrl: 'https://images.pexels.com/photos/631522/pexels-photo-631522.jpeg?auto=compress&cs=tinysrgb&w=400',
      isDownloaded: true,
      viewCount: 543,
      publishedAt: '2024-01-08',
    },
    {
      id: '5',
      title: 'Chemical Reactions and Equations',
      description: 'Understanding how atoms interact and form new compounds through chemical reactions.',
      duration: 1920, // 32 minutes
      type: 'video',
      subject: 'science',
      thumbnailUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
      isDownloaded: false,
      viewCount: 1089,
      publishedAt: '2024-01-05',
    },
    {
      id: '6',
      title: 'Kiswahili Poetry and Literature',
      description: 'Appreciate the beauty of Kiswahili literature through classic poems and modern works.',
      duration: 1440, // 24 minutes
      type: 'audio',
      subject: 'kiswahili',
      thumbnailUrl: 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=400',
      isDownloaded: false,
      viewCount: 234,
      publishedAt: '2024-01-03',
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
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const filteredEpisodes = podcastEpisodes.filter(episode => {
    const matchesSearch = episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         episode.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'audio' && episode.type === 'audio') ||
                      (selectedTab === 'video' && episode.type === 'video') ||
                      (selectedTab === 'downloaded' && episode.isDownloaded);
    const matchesSubject = selectedSubject === 'all' || episode.subject === selectedSubject;
    
    return matchesSearch && matchesTab && matchesSubject;
  });

  const handlePlayPause = (episodeId: string) => {
    if (currentlyPlaying === episodeId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(episodeId);
      // Navigate to player screen
      router.push({
        pathname: '/podcasts/player',
        params: { episodeId }
      });
    }
  };

  const handleDownload = (episodeId: string) => {
    // Implement download logic
    console.log('Starting download for episode:', episodeId);
  };

  const renderEpisodeCard = ({ item }: { item: PodcastEpisode }) => {
    const subject = subjects.find(s => s.id === item.subject);
    
    return (
      <View style={styles.episodeCard}>
        <View style={styles.episodeHeader}>
          <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
          <View style={styles.episodeOverlay}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => handlePlayPause(item.id)}
            >
              {currentlyPlaying === item.id ? (
                <Pause size={24} color="white" />
              ) : (
                <Play size={24} color="white" />
              )}
            </TouchableOpacity>
            
            <View style={styles.episodeType}>
              {item.type === 'video' ? (
                <Video size={16} color="white" />
              ) : (
                <Headphones size={16} color="white" />
              )}
            </View>
          </View>
        </View>
        
        <View style={styles.episodeContent}>
          <View style={styles.episodeInfo}>
            <Text style={styles.episodeTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.episodeDescription} numberOfLines={2}>{item.description}</Text>
            
            <View style={styles.episodeMeta}>
              <View style={styles.subjectTag}>
                <View style={[styles.subjectDot, { backgroundColor: subject?.color }]} />
                <Text style={styles.subjectText}>{subject?.name}</Text>
              </View>
              <View style={styles.episodeStats}>
                <Clock size={14} color="#718096" />
                <Text style={styles.statText}>{formatDuration(item.duration)}</Text>
                <Text style={styles.statText}>•</Text>
                <Text style={styles.statText}>{item.viewCount} views</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.episodeActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDownload(item.id)}
            >
              {item.isDownloaded ? (
                <View style={styles.downloadedBadge}>
                  <Download size={16} color="#10B981" />
                </View>
              ) : item.downloadProgress ? (
                <View style={styles.progressIndicator}>
                  <View style={[styles.progressFill, { width: `${item.downloadProgress}%` }]} />
                  <Text style={styles.progressText}>{item.downloadProgress}%</Text>
                </View>
              ) : (
                <Download size={16} color="#718096" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <MoreVertical size={16} color="#718096" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderSubjectFilter = ({ item }: { item: Subject }) => (
    <TouchableOpacity
      style={[
        styles.subjectFilter,
        { backgroundColor: `${item.color}20` },
        selectedSubject === item.id && { backgroundColor: item.color }
      ]}
      onPress={() => setSelectedSubject(item.id)}
    >
      <item.icon 
        size={16} 
        color={selectedSubject === item.id ? 'white' : item.color} 
      />
      <Text style={[
        styles.subjectFilterText,
        { color: selectedSubject === item.id ? 'white' : item.color }
      ]}>
        {item.name}
      </Text>
      <Text style={[
        styles.episodeCount,
        { color: selectedSubject === item.id ? 'rgba(255,255,255,0.8)' : `${item.color}80` }
      ]}>
        {item.episodeCount}
      </Text>
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
          <Text style={styles.headerTitle}>Podcasts & Videos</Text>
          <Text style={styles.headerSubtitle}>Learn on the go with audio and video content</Text>
          
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => router.push('/podcasts/playlists')}
            >
              <List size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => router.push('/podcasts/downloads')}
            >
              <Download size={20} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Quick Stats */}
      <Animated.View
        style={[
          styles.statsContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Headphones size={16} color="#4ECDC4" />
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Audio</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Video size={16} color="#FF6B6B" />
            <Text style={styles.statNumber}>32</Text>
            <Text style={styles.statLabel}>Videos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Download size={16} color="#10B981" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Downloaded</Text>
          </View>
        </View>
      </Animated.View>

      {/* Search and Filters */}
      <Animated.View
        style={[
          styles.searchContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.searchBar}>
          <Search size={20} color="#A0AEC0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search podcasts and videos..."
            placeholderTextColor="#A0AEC0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color="#4299E1" />
        </TouchableOpacity>
      </Animated.View>

      {/* Content Type Tabs */}
      <Animated.View
        style={[
          styles.tabsContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
          {[
            { id: 'all', label: 'All Content', icon: BookOpen },
            { id: 'audio', label: 'Audio', icon: Headphones },
            { id: 'video', label: 'Videos', icon: Video },
            { id: 'downloaded', label: 'Downloaded', icon: Download },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, selectedTab === tab.id && styles.activeTab]}
              onPress={() => setSelectedTab(tab.id as any)}
            >
              <tab.icon 
                size={16} 
                color={selectedTab === tab.id ? 'white' : '#718096'} 
              />
              <Text style={[
                styles.tabText,
                selectedTab === tab.id && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Subject Filters */}
      {showFilters && (
        <Animated.View style={styles.subjectFiltersContainer}>
          <Text style={styles.filtersTitle}>Filter by Subject</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[{ id: 'all', name: 'All Subjects', color: '#718096', icon: BookOpen, episodeCount: 0 }, ...subjects]}
            renderItem={renderSubjectFilter}
            contentContainerStyle={styles.subjectFilters}
            keyExtractor={(item) => item.id}
          />
        </Animated.View>
      )}

      {/* Content List */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <FlatList
          data={filteredEpisodes}
          renderItem={renderEpisodeCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.episodesList}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <BookOpen size={48} color="#A0AEC0" />
              <Text style={styles.emptyTitle}>No content found</Text>
              <Text style={styles.emptyDescription}>
                Try adjusting your search or filters
              </Text>
            </View>
          }
        />
      </Animated.View>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/podcasts/playlists/create')}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginTop: -20,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    backgroundColor: 'white',
    justifyContent: 'center',
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
  tabsContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabs: {
    paddingHorizontal: 4,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#4299E1',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
    marginLeft: 8,
  },
  activeTabText: {
    color: 'white',
  },
  subjectFiltersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filtersTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 12,
  },
  subjectFilters: {
    paddingRight: 20,
  },
  subjectFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  subjectFilterText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 6,
    marginRight: 4,
  },
  episodeCount: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
  },
  contentContainer: {
    flex: 1,
  },
  episodesList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  episodeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
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
  episodeHeader: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 160,
    backgroundColor: '#F7FAFC',
  },
  episodeOverlay: {
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
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  episodeType: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  episodeContent: {
    padding: 16,
    flexDirection: 'row',
  },
  episodeInfo: {
    flex: 1,
    marginRight: 12,
  },
  episodeTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
    lineHeight: 22,
  },
  episodeDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    lineHeight: 20,
    marginBottom: 12,
  },
  episodeMeta: {
    gap: 8,
  },
  subjectTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  subjectText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
  },
  episodeStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  episodeActions: {
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadedBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0FFF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    backgroundColor: '#4299E1',
    borderRadius: 18,
  },
  progressText: {
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: '#4299E1',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
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
});