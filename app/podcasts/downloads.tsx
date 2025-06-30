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
import { ArrowLeft, Download, Trash2, Play, Pause, HardDrive, Wifi, WifiOff, MoveVertical as MoreVertical, Search, Filter, Clock, Headphones, Video, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';

interface DownloadItem {
  id: string;
  title: string;
  subject: string;
  duration: number;
  type: 'audio' | 'video';
  thumbnailUrl: string;
  fileSize: number; // in MB
  downloadDate: string;
  status: 'completed' | 'downloading' | 'paused' | 'failed';
  progress?: number;
}

export default function DownloadsScreen() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'downloading' | 'completed'>('all');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [totalStorage, setTotalStorage] = useState(1.2); // GB
  const [availableStorage, setAvailableStorage] = useState(8.8); // GB
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const downloads: DownloadItem[] = [
    {
      id: '1',
      title: 'Introduction to Algebra: Variables and Expressions',
      subject: 'Mathematics',
      duration: 1800,
      type: 'video',
      thumbnailUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
      fileSize: 145,
      downloadDate: '2024-01-15',
      status: 'completed',
    },
    {
      id: '2',
      title: 'Understanding Photosynthesis Process',
      subject: 'Science',
      duration: 1260,
      type: 'audio',
      thumbnailUrl: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=400',
      fileSize: 45,
      downloadDate: '2024-01-12',
      status: 'downloading',
      progress: 68,
    },
    {
      id: '3',
      title: 'Kenya\'s Geography and Climate',
      subject: 'Social Studies',
      duration: 1680,
      type: 'audio',
      thumbnailUrl: 'https://images.pexels.com/photos/631522/pexels-photo-631522.jpeg?auto=compress&cs=tinysrgb&w=400',
      fileSize: 38,
      downloadDate: '2024-01-10',
      status: 'completed',
    },
    {
      id: '4',
      title: 'Chemical Reactions and Equations',
      subject: 'Science',
      duration: 1920,
      type: 'video',
      thumbnailUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
      fileSize: 189,
      downloadDate: '2024-01-08',
      status: 'failed',
    },
    {
      id: '5',
      title: 'Grammar Essentials: Sentence Structure',
      subject: 'English',
      duration: 2100,
      type: 'video',
      thumbnailUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      fileSize: 156,
      downloadDate: '2024-01-05',
      status: 'paused',
      progress: 23,
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

  const filteredDownloads = downloads.filter(download => {
    switch (selectedTab) {
      case 'downloading':
        return ['downloading', 'paused', 'failed'].includes(download.status);
      case 'completed':
        return download.status === 'completed';
      default:
        return true;
    }
  });

  const completedDownloads = downloads.filter(d => d.status === 'completed');
  const downloadingCount = downloads.filter(d => ['downloading', 'paused'].includes(d.status)).length;

  const formatFileSize = (sizeInMB: number): string => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(1)} GB`;
    }
    return `${sizeInMB} MB`;
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const handlePlayPause = (downloadId: string) => {
    if (currentlyPlaying === downloadId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(downloadId);
      // Navigate to player
      router.push({
        pathname: '/podcasts/player',
        params: { episodeId: downloadId }
      });
    }
  };

  const handleRetryDownload = (downloadId: string) => {
    Alert.alert(
      'Retry Download',
      'Do you want to retry downloading this content?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Retry', onPress: () => console.log('Retrying download:', downloadId) }
      ]
    );
  };

  const handlePauseResume = (downloadId: string, currentStatus: string) => {
    const action = currentStatus === 'downloading' ? 'pause' : 'resume';
    console.log(`${action} download:`, downloadId);
  };

  const handleDeleteDownload = (downloadId: string) => {
    Alert.alert(
      'Delete Download',
      'Are you sure you want to delete this downloaded content?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => console.log('Deleting download:', downloadId) 
        }
      ]
    );
  };

  const clearAllCompleted = () => {
    Alert.alert(
      'Clear All Downloads',
      'Are you sure you want to remove all completed downloads?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => console.log('Clearing all downloads') 
        }
      ]
    );
  };

  const getStatusIcon = (status: string, progress?: number) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} color="#10B981" />;
      case 'downloading':
        return (
          <View style={styles.progressCircle}>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        );
      case 'paused':
        return <AlertCircle size={16} color="#F59E0B" />;
      case 'failed':
        return <XCircle size={16} color="#EF4444" />;
      default:
        return null;
    }
  };

  const storagePercentage = (totalStorage / (totalStorage + availableStorage)) * 100;

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
            <Text style={styles.headerTitle}>Downloads</Text>
            <Text style={styles.headerSubtitle}>Manage your offline content</Text>
          </View>

          <TouchableOpacity style={styles.headerButton}>
            <MoreVertical size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>

      {/* Storage Info */}
      <Animated.View
        style={[
          styles.storageContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.storageCard}>
          <View style={styles.storageHeader}>
            <HardDrive size={20} color="#4299E1" />
            <Text style={styles.storageTitle}>Storage Usage</Text>
          </View>
          
          <View style={styles.storageBar}>
            <View style={[styles.storageUsed, { width: `${storagePercentage}%` }]} />
          </View>
          
          <View style={styles.storageInfo}>
            <Text style={styles.storageText}>
              {formatFileSize(totalStorage * 1024)} used of {formatFileSize((totalStorage + availableStorage) * 1024)}
            </Text>
            <Text style={styles.storageCount}>
              {completedDownloads.length} downloads
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* Status Tabs */}
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
            { id: 'all', label: 'All Downloads', count: downloads.length },
            { id: 'downloading', label: 'In Progress', count: downloadingCount },
            { id: 'completed', label: 'Completed', count: completedDownloads.length },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, selectedTab === tab.id && styles.activeTab]}
              onPress={() => setSelectedTab(tab.id as any)}
            >
              <Text style={[
                styles.tabText,
                selectedTab === tab.id && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
              <View style={[styles.tabBadge, selectedTab === tab.id && styles.activeTabBadge]}>
                <Text style={[
                  styles.tabBadgeText,
                  selectedTab === tab.id && styles.activeTabBadgeText
                ]}>
                  {tab.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Downloads List */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={[
            styles.downloadsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {filteredDownloads.length > 0 ? (
            filteredDownloads.map((download) => (
              <View key={download.id} style={styles.downloadCard}>
                <View style={styles.downloadHeader}>
                  <Image source={{ uri: download.thumbnailUrl }} style={styles.downloadThumbnail} />
                  
                  <View style={styles.downloadOverlay}>
                    <TouchableOpacity
                      style={styles.downloadPlayButton}
                      onPress={() => handlePlayPause(download.id)}
                      disabled={download.status !== 'completed'}
                    >
                      {download.status === 'completed' ? (
                        currentlyPlaying === download.id ? (
                          <Pause size={16} color="white" />
                        ) : (
                          <Play size={16} color="white" />
                        )
                      ) : (
                        <View style={styles.disabledPlay}>
                          <Play size={16} color="#A0AEC0" />
                        </View>
                      )}
                    </TouchableOpacity>
                    
                    <View style={styles.downloadType}>
                      {download.type === 'video' ? (
                        <Video size={12} color="white" />
                      ) : (
                        <Headphones size={12} color="white" />
                      )}
                    </View>
                  </View>
                </View>
                
                <View style={styles.downloadInfo}>
                  <View style={styles.downloadDetails}>
                    <Text style={styles.downloadTitle} numberOfLines={2}>{download.title}</Text>
                    <Text style={styles.downloadSubject}>{download.subject}</Text>
                    
                    <View style={styles.downloadMeta}>
                      <View style={styles.metaItem}>
                        <Clock size={12} color="#718096" />
                        <Text style={styles.metaText}>{formatDuration(download.duration)}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <HardDrive size={12} color="#718096" />
                        <Text style={styles.metaText}>{formatFileSize(download.fileSize)}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.downloadActions}>
                    <View style={styles.downloadStatus}>
                      {getStatusIcon(download.status, download.progress)}
                      <Text style={[
                        styles.statusText,
                        download.status === 'completed' && styles.completedText,
                        download.status === 'failed' && styles.failedText,
                      ]}>
                        {download.status === 'downloading' ? `${download.progress}%` : download.status}
                      </Text>
                    </View>
                    
                    <View style={styles.actionButtons}>
                      {download.status === 'downloading' && (
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handlePauseResume(download.id, download.status)}
                        >
                          <AlertCircle size={16} color="#F59E0B" />
                        </TouchableOpacity>
                      )}
                      
                      {download.status === 'paused' && (
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handlePauseResume(download.id, download.status)}
                        >
                          <Download size={16} color="#4299E1" />
                        </TouchableOpacity>
                      )}
                      
                      {download.status === 'failed' && (
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleRetryDownload(download.id)}
                        >
                          <Download size={16} color="#EF4444" />
                        </TouchableOpacity>
                      )}
                      
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleDeleteDownload(download.id)}
                      >
                        <Trash2 size={16} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                
                {download.status === 'downloading' && download.progress && (
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${download.progress}%` }]} />
                  </View>
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Download size={48} color="#A0AEC0" />
              <Text style={styles.emptyTitle}>No downloads yet</Text>
              <Text style={styles.emptyDescription}>
                {selectedTab === 'completed' 
                  ? 'No completed downloads found'
                  : selectedTab === 'downloading'
                  ? 'No downloads in progress'
                  : 'Start downloading content for offline access'
                }
              </Text>
            </View>
          )}
        </Animated.View>

        {/* Clear All Button */}
        {completedDownloads.length > 0 && selectedTab === 'completed' && (
          <Animated.View
            style={[
              styles.clearAllContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity style={styles.clearAllButton} onPress={clearAllCompleted}>
              <Trash2 size={20} color="#EF4444" />
              <Text style={styles.clearAllText}>Clear All Downloads</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

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
  storageContainer: {
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
  },
  storageCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  storageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  storageTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginLeft: 12,
  },
  storageBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  storageUsed: {
    height: '100%',
    backgroundColor: '#4299E1',
    borderRadius: 4,
  },
  storageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storageText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
  },
  storageCount: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
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
    paddingVertical: 12,
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
    marginRight: 8,
  },
  activeTabText: {
    color: 'white',
  },
  tabBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  activeTabBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  tabBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#718096',
  },
  activeTabBadgeText: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  downloadsContainer: {
    gap: 16,
  },
  downloadCard: {
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
  downloadHeader: {
    position: 'relative',
  },
  downloadThumbnail: {
    width: '100%',
    height: 120,
    backgroundColor: '#F7FAFC',
  },
  downloadOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadPlayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledPlay: {
    opacity: 0.5,
  },
  downloadType: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  downloadInfo: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  downloadDetails: {
    flex: 1,
    marginRight: 12,
  },
  downloadTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
    lineHeight: 22,
  },
  downloadSubject: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
    marginBottom: 8,
  },
  downloadMeta: {
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
  downloadActions: {
    alignItems: 'flex-end',
  },
  downloadStatus: {
    alignItems: 'center',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#718096',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  completedText: {
    color: '#10B981',
  },
  failedText: {
    color: '#EF4444',
  },
  progressCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4299E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E2E8F0',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4299E1',
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
  clearAllContainer: {
    marginTop: 20,
  },
  clearAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  clearAllText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    marginLeft: 8,
  },
});