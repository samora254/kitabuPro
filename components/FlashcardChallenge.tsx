import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { X, ChevronLeft, ChevronRight, Bookmark, CircleCheck as CheckCircle, Clock, Zap, Target, RotateCcw, Share2, Lightbulb, BookmarkCheck } from 'lucide-react-native';
import { FlashcardSet, Flashcard, DifficultyLevel } from '@/data/quickFacts/types';
import QuickFactsService from '@/services/quickFactsService';

const { width, height } = Dimensions.get('window');

interface FlashcardChallengeProps {
  subjectId: string;
  topic?: string;
  subtopic?: string;
  difficulty?: DifficultyLevel;
  cardCount?: number;
  customStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
  };
  onClose: () => void;
  onComplete: (score: number, total: number) => void;
}

export default function FlashcardChallenge({
  subjectId,
  topic,
  subtopic,
  difficulty,
  cardCount = 10,
  customStyles = {},
  onClose,
  onComplete
}: FlashcardChallengeProps) {
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [userResponses, setUserResponses] = useState<('correct' | 'incorrect' | null)[]>([]);
  const [bookmarkedCards, setBookmarkedCards] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isBookmarking, setIsBookmarking] = useState(false);
  
  // Animation refs
  const flipAnim = useRef(new Animated.Value(0)).current;
  const cardScaleAnim = useRef(new Animated.Value(0.9)).current;
  const cardOpacityAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const timerAnim = useRef(new Animated.Value(1)).current;
  
  // Default colors
  const colors = {
    primaryColor: customStyles.primaryColor || '#4299E1',
    secondaryColor: customStyles.secondaryColor || '#48BB78',
    accentColor: customStyles.accentColor || '#F59E0B',
  };
  
  // Load flashcard set
  useEffect(() => {
    const loadFlashcards = async () => {
      setIsLoading(true);
      
      // Generate flashcard challenge
      const challenge = QuickFactsService.generateFlashcardChallenge(
        subjectId,
        topic,
        subtopic,
        difficulty,
        cardCount
      );
      
      if (challenge) {
        setFlashcardSet(challenge);
        
        // Initialize user responses array
        setUserResponses(new Array(challenge.flashcards.length).fill(null));
        
        // Set timer for first card
        if (challenge.flashcards.length > 0) {
          setTimeLeft(challenge.flashcards[0].timeRecommended);
        }
        
        // Load bookmarked cards
        try {
          const userId = 'current-user'; // In a real app, get the actual user ID
          const bookmarks = await QuickFactsService.getBookmarkedFlashcards(userId);
          setBookmarkedCards(bookmarks);
        } catch (error) {
          console.error('Error loading bookmarks:', error);
        }
      }
      
      setIsLoading(false);
      setStartTime(new Date());
    };
    
    loadFlashcards();
  }, [subjectId, topic, subtopic, difficulty, cardCount]);
  
  // Progress animation effect
  useEffect(() => {
    if (!flashcardSet) return;
    
    Animated.timing(progressAnim, {
      toValue: (currentCardIndex + 1) / flashcardSet.flashcards.length,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentCardIndex, flashcardSet]);
  
  // Card entrance animation
  useEffect(() => {
    // Reset flip animation when changing cards
    flipAnim.setValue(0);
    setIsFlipped(false);
    
    // Animate card entrance
    Animated.parallel([
      Animated.timing(cardScaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Reset and start timer for new card
    if (flashcardSet && currentCardIndex < flashcardSet.flashcards.length) {
      const newTimeLeft = flashcardSet.flashcards[currentCardIndex].timeRecommended;
      setTimeLeft(newTimeLeft);
      setIsTimerActive(true);
    }
  }, [currentCardIndex, flashcardSet]);
  
  // Timer effect
  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
      
      // Pulse animation for last 5 seconds
      if (timeLeft <= 5) {
        Animated.sequence([
          Animated.timing(timerAnim, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(timerAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, isTimerActive]);
  
  // Flip card animation
  const flipCard = () => {
    if (isFlipped) {
      Animated.timing(flipAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsFlipped(false));
    } else {
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsFlipped(true));
    }
    
    // Pause timer when card is flipped
    setIsTimerActive(!isFlipped);
  };
  
  // Next card handler
  const handleNextCard = () => {
    if (!flashcardSet) return;
    
    // Reset animations
    cardScaleAnim.setValue(0.9);
    cardOpacityAnim.setValue(0);
    
    if (currentCardIndex < flashcardSet.flashcards.length - 1) {
      // Move to next card
      setCurrentCardIndex(prev => prev + 1);
    } else {
      // End of challenge
      setEndTime(new Date());
      setShowResults(true);
    }
  };
  
  // Previous card handler
  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      // Reset animations
      cardScaleAnim.setValue(0.9);
      cardOpacityAnim.setValue(0);
      
      // Move to previous card
      setCurrentCardIndex(prev => prev - 1);
    }
  };
  
  // Mark answer handler
  const handleMarkAnswer = (isCorrect: boolean) => {
    // Update score
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Update user responses
    const newResponses = [...userResponses];
    newResponses[currentCardIndex] = isCorrect ? 'correct' : 'incorrect';
    setUserResponses(newResponses);
    
    // Automatically flip card if not already flipped
    if (!isFlipped) {
      flipCard();
    }
  };
  
  // Toggle bookmark handler
  const handleToggleBookmark = async () => {
    if (!flashcardSet || isBookmarking) return;
    
    setIsBookmarking(true);
    
    try {
      const userId = 'current-user'; // In a real app, get the actual user ID
      const flashcardId = flashcardSet.flashcards[currentCardIndex].id;
      
      const isBookmarked = await QuickFactsService.toggleFlashcardBookmark(userId, flashcardId);
      
      // Update local bookmarked cards state
      if (isBookmarked) {
        setBookmarkedCards(prev => [...prev, flashcardId]);
      } else {
        setBookmarkedCards(prev => prev.filter(id => id !== flashcardId));
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsBookmarking(false);
    }
  };
  
  // Complete challenge handler
  const handleCompleteChallenge = async () => {
    if (!flashcardSet || !startTime) return;
    
    try {
      const userId = 'current-user'; // In a real app, get the actual user ID
      const endTimeValue = endTime || new Date();
      const timeSpent = Math.floor((endTimeValue.getTime() - startTime.getTime()) / 1000);
      
      // Save challenge result
      await QuickFactsService.saveChallengeResult({
        userId,
        setId: flashcardSet.id,
        date: new Date().toISOString(),
        score,
        totalCards: flashcardSet.flashcards.length,
        timeSpent,
        bookmarkedCards: bookmarkedCards
      });
      
      // Call onComplete callback
      onComplete(score, flashcardSet.flashcards.length);
    } catch (error) {
      console.error('Error completing challenge:', error);
      // Still call onComplete even if saving fails
      onComplete(score, flashcardSet?.flashcards.length || 0);
    }
  };
  
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Get color based on difficulty
  const getDifficultyColor = (difficulty: DifficultyLevel): string => {
    switch (difficulty) {
      case 'easy': return '#48BB78';
      case 'medium': return '#F59E0B';
      case 'hard': return '#E53E3E';
      default: return '#718096';
    }
  };
  
  // Calculate front and back transform styles
  const frontAnimatedStyle = {
    transform: [
      { scale: cardScaleAnim },
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
    opacity: cardOpacityAnim,
  };
  
  const backAnimatedStyle = {
    transform: [
      { scale: cardScaleAnim },
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
    opacity: cardOpacityAnim,
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryColor} />
        <Text style={styles.loadingText}>Loading challenge...</Text>
      </View>
    );
  }
  
  // Render error state if no flashcard set
  if (!flashcardSet) {
    return (
      <View style={styles.errorContainer}>
        <Lightbulb size={48} color="#A0AEC0" />
        <Text style={styles.errorTitle}>No Flashcards Available</Text>
        <Text style={styles.errorText}>
          We couldn't find any flashcards for this topic. Please try a different subject or topic.
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  // Get current flashcard
  const currentFlashcard = flashcardSet.flashcards[currentCardIndex];
  const isCurrentCardBookmarked = bookmarkedCards.includes(currentFlashcard.id);
  
  // Render results screen
  if (showResults) {
    const totalTime = endTime && startTime 
      ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000)
      : 0;
    
    const correctAnswers = userResponses.filter(r => r === 'correct').length;
    const incorrectAnswers = userResponses.filter(r => r === 'incorrect').length;
    const skippedAnswers = userResponses.filter(r => r === null).length;
    
    const percentage = Math.round((correctAnswers / flashcardSet.flashcards.length) * 100);
    
    // Determine performance message
    let performanceMessage = '';
    let performanceColor = '';
    
    if (percentage >= 90) {
      performanceMessage = 'Excellent! You\'re a master of this topic!';
      performanceColor = '#48BB78';
    } else if (percentage >= 75) {
      performanceMessage = 'Great job! You have a good understanding!';
      performanceColor = '#4299E1';
    } else if (percentage >= 60) {
      performanceMessage = 'Good effort! Keep practicing!';
      performanceColor = '#F59E0B';
    } else {
      performanceMessage = 'Keep learning! You\'ll improve with practice!';
      performanceColor = '#E53E3E';
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <X size={24} color="#4A5568" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Challenge Results</Text>
          <View style={styles.headerSpacer} />
        </View>
        
        <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.resultsCard}>
            <Text style={[styles.performanceMessage, { color: performanceColor }]}>
              {performanceMessage}
            </Text>
            
            <View style={styles.scoreCircle}>
              <Text style={styles.scorePercentage}>{percentage}%</Text>
              <Text style={styles.scoreText}>
                {correctAnswers}/{flashcardSet.flashcards.length}
              </Text>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <CheckCircle size={20} color="#48BB78" />
                <Text style={styles.statValue}>{correctAnswers}</Text>
                <Text style={styles.statLabel}>Correct</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <X size={20} color="#E53E3E" />
                <Text style={styles.statValue}>{incorrectAnswers}</Text>
                <Text style={styles.statLabel}>Incorrect</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Clock size={20} color="#4299E1" />
                <Text style={styles.statValue}>{formatTime(totalTime)}</Text>
                <Text style={styles.statLabel}>Time</Text>
              </View>
            </View>
            
            <View style={styles.bookmarksSection}>
              <Text style={styles.sectionTitle}>Bookmarked Cards</Text>
              {bookmarkedCards.length > 0 ? (
                <Text style={styles.bookmarksCount}>
                  You bookmarked {bookmarkedCards.length} card{bookmarkedCards.length !== 1 ? 's' : ''} for later review.
                </Text>
              ) : (
                <Text style={styles.bookmarksCount}>
                  You haven't bookmarked any cards in this session.
                </Text>
              )}
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.primaryColor }]}
                onPress={() => {
                  // Reset challenge
                  setCurrentCardIndex(0);
                  setScore(0);
                  setUserResponses(new Array(flashcardSet.flashcards.length).fill(null));
                  setIsFlipped(false);
                  setShowResults(false);
                  setStartTime(new Date());
                  setEndTime(null);
                }}
              >
                <RotateCcw size={20} color="white" />
                <Text style={styles.actionButtonText}>Try Again</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#718096' }]}
                onPress={handleCompleteChallenge}
              >
                <Share2 size={20} color="white" />
                <Text style={styles.actionButtonText}>Share Results</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              style={styles.closeResultsButton}
              onPress={() => {
                handleCompleteChallenge();
              }}
            >
              <Text style={styles.closeResultsText}>Finish</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
  
  // Render challenge screen
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <X size={24} color="#4A5568" />
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentCardIndex + 1}/{flashcardSet.flashcards.length}
          </Text>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                  backgroundColor: colors.primaryColor,
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
          <Clock size={16} color={timeLeft <= 5 ? "#E53E3E" : "#4A5568"} />
          <Text
            style={[
              styles.timerText,
              timeLeft <= 5 && styles.timerWarning,
            ]}
          >
            {formatTime(timeLeft)}
          </Text>
        </Animated.View>
      </View>
      
      <View style={styles.cardContainer}>
        {/* Front of card */}
        <Animated.View
          style={[
            styles.card,
            styles.cardFront,
            frontAnimatedStyle,
            { display: isFlipped ? 'none' : 'flex' },
          ]}
        >
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(currentFlashcard.difficulty) },
              ]}
            >
              <Text style={styles.difficultyText}>
                {currentFlashcard.difficulty.charAt(0).toUpperCase() + currentFlashcard.difficulty.slice(1)}
              </Text>
            </View>
            
            <TouchableOpacity
              style={styles.bookmarkButton}
              onPress={handleToggleBookmark}
              disabled={isBookmarking}
            >
              {isCurrentCardBookmarked ? (
                <BookmarkCheck size={24} color={colors.accentColor} />
              ) : (
                <Bookmark size={24} color="#A0AEC0" />
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.cardContent}>
            <Text style={styles.questionText}>{currentFlashcard.question}</Text>
            
            {currentFlashcard.imageUrl && (
              <Image
                source={{ uri: currentFlashcard.imageUrl }}
                style={styles.cardImage}
                resizeMode="cover"
              />
            )}
          </View>
          
          <View style={styles.cardFooter}>
            <TouchableOpacity
              style={[styles.flipButton, { backgroundColor: colors.primaryColor }]}
              onPress={flipCard}
            >
              <Text style={styles.flipButtonText}>Flip Card</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        {/* Back of card */}
        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            backAnimatedStyle,
            { display: isFlipped ? 'flex' : 'none' },
          ]}
        >
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(currentFlashcard.difficulty) },
              ]}
            >
              <Text style={styles.difficultyText}>
                {currentFlashcard.difficulty.charAt(0).toUpperCase() + currentFlashcard.difficulty.slice(1)}
              </Text>
            </View>
            
            <TouchableOpacity
              style={styles.bookmarkButton}
              onPress={handleToggleBookmark}
              disabled={isBookmarking}
            >
              {isCurrentCardBookmarked ? (
                <BookmarkCheck size={24} color={colors.accentColor} />
              ) : (
                <Bookmark size={24} color="#A0AEC0" />
              )}
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.cardContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.answerText}>{currentFlashcard.answer}</Text>
            
            {currentFlashcard.imageUrl && (
              <Image
                source={{ uri: currentFlashcard.imageUrl }}
                style={styles.cardImage}
                resizeMode="cover"
              />
            )}
          </ScrollView>
          
          <View style={styles.cardFooter}>
            <View style={styles.responseButtons}>
              <TouchableOpacity
                style={[
                  styles.responseButton,
                  styles.incorrectButton,
                  userResponses[currentCardIndex] === 'incorrect' && styles.selectedIncorrectButton,
                ]}
                onPress={() => handleMarkAnswer(false)}
              >
                <Text style={[
                  styles.responseButtonText,
                  styles.incorrectButtonText,
                  userResponses[currentCardIndex] === 'incorrect' && styles.selectedResponseText,
                ]}>
                  Got it Wrong
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.responseButton,
                  styles.correctButton,
                  userResponses[currentCardIndex] === 'correct' && styles.selectedCorrectButton,
                ]}
                onPress={() => handleMarkAnswer(true)}
              >
                <Text style={[
                  styles.responseButtonText,
                  styles.correctButtonText,
                  userResponses[currentCardIndex] === 'correct' && styles.selectedResponseText,
                ]}>
                  Got it Right
                </Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              style={[styles.flipButton, { backgroundColor: colors.primaryColor }]}
              onPress={flipCard}
            >
              <Text style={styles.flipButtonText}>Flip Card</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
      
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentCardIndex === 0 && styles.disabledButton,
          ]}
          onPress={handlePrevCard}
          disabled={currentCardIndex === 0}
        >
          <ChevronLeft size={20} color={currentCardIndex === 0 ? "#A0AEC0" : "#4A5568"} />
          <Text style={[
            styles.navButtonText,
            currentCardIndex === 0 && styles.disabledButtonText,
          ]}>
            Previous
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.nextButton,
            currentCardIndex === flashcardSet.flashcards.length - 1 && styles.finishButton,
            {
              backgroundColor: currentCardIndex === flashcardSet.flashcards.length - 1
                ? colors.secondaryColor
                : colors.primaryColor,
            },
          ]}
          onPress={handleNextCard}
        >
          <Text style={styles.nextButtonText}>
            {currentCardIndex === flashcardSet.flashcards.length - 1 ? 'Finish' : 'Next'}
          </Text>
          <ChevronRight size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'white',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  headerSpacer: {
    width: 40,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timerText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
    marginLeft: 6,
  },
  timerWarning: {
    color: '#E53E3E',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 500,
    height: Platform.OS === 'web' ? 400 : height * 0.5,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
      web: {
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
      },
    }),
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    position: 'absolute',
  },
  cardBack: {
    position: 'absolute',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  questionText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 16,
    lineHeight: 28,
  },
  answerText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 26,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginTop: 16,
  },
  cardFooter: {
    marginTop: 16,
  },
  flipButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  flipButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  responseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  responseButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  incorrectButton: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  correctButton: {
    backgroundColor: '#F0FFF4',
    borderWidth: 1,
    borderColor: '#9AE6B4',
  },
  selectedIncorrectButton: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  selectedCorrectButton: {
    backgroundColor: '#48BB78',
    borderColor: '#48BB78',
  },
  responseButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  incorrectButtonText: {
    color: '#E53E3E',
  },
  correctButtonText: {
    color: '#48BB78',
  },
  selectedResponseText: {
    color: 'white',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
  },
  navButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginLeft: 4,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginRight: 8,
  },
  finishButton: {
    backgroundColor: '#48BB78',
  },
  disabledButton: {
    backgroundColor: '#EDF2F7',
  },
  disabledButtonText: {
    color: '#A0AEC0',
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
  },
  resultsCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
      web: {
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  performanceMessage: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  scorePercentage: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
  },
  scoreText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  statDivider: {
    width: 1,
    height: 50,
    backgroundColor: '#E2E8F0',
  },
  bookmarksSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 8,
  },
  bookmarksCount: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginLeft: 8,
  },
  closeResultsButton: {
    backgroundColor: '#2D3748',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeResultsText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
});