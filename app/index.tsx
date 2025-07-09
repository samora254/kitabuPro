import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { DevModeIndicator } from '@/components/DevModeIndicator';

const { width, height } = Dimensions.get('window');

const landingScreens = [
  {
    id: 1,
    title: 'Welcome to',
    titleAccent: 'Kitabu.AI',
    subtitle: 'Your Personal AI Tutor 24/7',
    image: { uri: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800' },
  },
  {
    id: 2,
    title: 'Study Ahead of',
    titleAccent: 'Everyone',
    subtitle: 'Boost Confidence and Curiosity',
    image: { uri: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=800' },
  },
  {
    id: 3,
    title: 'Prepare for',
    titleAccent: 'CBC EXAMS',
    subtitle: 'With UNLIMITED Revision Papers',
    image: { uri: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800' },
  },
];

export default function LandingPage() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    animateIn();
  }, []);

  useEffect(() => {
    animateScreenTransition();
  }, [currentScreen]);

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(imageScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateScreenTransition = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 30,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(imageScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const nextScreen = () => {
    if (currentScreen < landingScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleGetStarted = () => {
    router.replace('/auth/signup');
  };

  const handleSignIn = () => {
    router.replace('/auth/signin');
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX, velocityX } = event.nativeEvent;
      
      if (translationX > 50 || velocityX > 500) {
        // Swipe right - go to previous screen
        prevScreen();
      } else if (translationX < -50 || velocityX < -500) {
        // Swipe left - go to next screen
        nextScreen();
      }
      
      // Reset translation
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const currentScreenData = landingScreens[currentScreen];

  // Platform-specific gesture handling
  const renderContent = () => (
    <Animated.View style={styles.content}>
      {/* Hero Image */}
      <Animated.View
        style={[
          styles.heroContainer,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: imageScale },
              { translateX: translateX },
            ],
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image
            source={currentScreenData.image}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            style={styles.imageOverlay}
          />
        </View>
      </Animated.View>

      {/* Content Card */}
      <Animated.View
        style={[
          styles.contentCard,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { translateX: translateX },
            ],
          },
        ]}
      >
        <View style={styles.textContent}>
          <Text style={styles.title}>
            {currentScreenData.title}{' '}
            <Text style={styles.titleAccent}>{currentScreenData.titleAccent}</Text>
          </Text>
          <Text style={styles.subtitle}>{currentScreenData.subtitle}</Text>
        </View>

        {/* Page Indicators */}
        <View style={styles.pageIndicators}>
          {landingScreens.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.indicator,
                index === currentScreen && styles.activeIndicator,
              ]}
              onPress={() => setCurrentScreen(index)}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {currentScreen < landingScreens.length - 1 ? (
            <TouchableOpacity style={styles.nextButton} onPress={nextScreen}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </Animated.View>
  );
  return (
    <View style={styles.container}>
      <DevModeIndicator />
      <LinearGradient
        colors={['#FF6B6B', '#FF8E53', '#FFA726']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Navigation Arrows */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={[styles.navButton, currentScreen === 0 && styles.navButtonDisabled]} 
            onPress={prevScreen}
            disabled={currentScreen === 0}
          >
            <ChevronLeft size={24} color={currentScreen === 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.8)"} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navButton, currentScreen === landingScreens.length - 1 && styles.navButtonDisabled]} 
            onPress={nextScreen}
            disabled={currentScreen === landingScreens.length - 1}
          >
            <ChevronRight size={24} color={currentScreen === landingScreens.length - 1 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.8)"} />
          </TouchableOpacity>
        </View>

        {Platform.OS !== 'web' ? (
          <GestureHandlerRootView style={{ flex: 1 }}>
            <PanGestureHandler
              onGestureEvent={onGestureEvent}
              onHandlerStateChange={onHandlerStateChange}
            >
              {renderContent()}
            </PanGestureHandler>
          </GestureHandlerRootView>
        ) : (
          renderContent()
        )}

        {/* Bottom Action */}
        <Animated.View
          style={[
            styles.bottomContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: `${((currentScreen + 1) / landingScreens.length) * 100}%`,
                },
              ]}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  navButtonDisabled: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  content: {
    flex: 1,
    paddingTop: 120,
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  imageContainer: {
    width: Math.min(width - 48, width * 0.85),
    height: height * 0.4,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  contentCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    marginHorizontal: 24,
    borderRadius: 25,
    padding: Math.min(30, width * 0.08),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 20,
    backdropFilter: 'blur(20px)',
  },
  textContent: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 36,
  },
  titleAccent: {
    color: '#48BB78',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#4299E1',
    textAlign: 'center',
    marginBottom: 0,
    lineHeight: 24,
  },
  pageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 6,
    transition: 'all 0.3s ease',
  },
  activeIndicator: {
    backgroundColor: '#48BB78',
    width: 30,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#48BB78',
    paddingHorizontal: 50,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#48BB78',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  getStartedButton: {
    backgroundColor: '#4299E1',
    paddingHorizontal: 50,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#4299E1',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  getStartedButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  signInButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backdropFilter: 'blur(10px)',
  },
  signInButtonText: {
    color: '#2D3748',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 120,
    left: 24,
    right: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
});