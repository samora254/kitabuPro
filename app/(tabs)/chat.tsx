import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { Send, Bot, User, Lightbulb, BookOpen, Calculator, Beaker, Globe, Mic, Paperclip, MoveHorizontal as MoreHorizontal, X } from 'lucide-react-native';
import TypewriterText from '@/components/TypewriterText';
import { DevModeIndicator } from '@/components/DevModeIndicator';

interface QuickAction {
  id: string;
  title: string;
  icon: any;
  color: string;
  action: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'lesson';
}

interface QuickAction {
  id: string;
  title: string;
  icon: any;
  color: string;
  action: string;
}

interface ChatScreenProps {
  initialMessage?: string;
  onClose?: () => void;
}

export default function ChatScreen({ initialMessage = '', onClose }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi Walter! I'm your AI tutor. I'm here to help you learn and answer any questions you have. What would you like to study today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState(initialMessage);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const inputContainerHeightAnim = useRef(new Animated.Value(48)).current;
  const sendButtonScaleAnim = useRef(new Animated.Value(1)).current;
  const sendButtonColorAnim = useRef(new Animated.Value(0)).current;

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Explain Math',
      icon: Calculator,
      color: '#FF6B6B',
      action: 'Can you help me understand algebra?',
    },
    {
      id: '2',
      title: 'Science Help',
      icon: Beaker,
      color: '#45B7D1',
      action: 'I need help with chemistry concepts',
    },
    {
      id: '3',
      title: 'Study Tips',
      icon: Lightbulb,
      color: '#FFD93D',
      action: 'Give me some study tips for better learning',
    },
    {
      id: '4',
      title: 'Practice Quiz',
      icon: BookOpen,
      color: '#4ECDC4',
      action: 'Create a practice quiz for me',
    },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // If there's an initial message, send it automatically
  useEffect(() => {
    if (initialMessage.trim()) {
      setTimeout(() => {
        sendMessage(initialMessage);
      }, 500);
    }
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // Handle input focus/blur
  const handleInputFocus = () => {
    setInputFocused(true);
    setWelcomeMessage('Welcome! How can I help you today?');
    
    // Animate container expansion
    Animated.timing(inputContainerHeightAnim, {
      toValue: 80,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleInputBlur = () => {
    if (!inputText.trim()) {
      setInputFocused(false);
      setWelcomeMessage('');
      
      // Animate container contraction
      Animated.timing(inputContainerHeightAnim, {
        toValue: 48,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  // Animate send button when text changes
  useEffect(() => {
    if (inputText.trim()) {
      // Pulse and color change animation
      Animated.sequence([
        Animated.timing(sendButtonScaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sendButtonScaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Animate color change to green
      Animated.timing(sendButtonColorAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      // Animate color back to default
      Animated.timing(sendButtonColorAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [inputText]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Scroll to bottom immediately after sending message
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text.trim());
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Scroll to bottom after AI response is added
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
  };

  const generateAIResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('math') || lowerText.includes('algebra')) {
      return "Great! Algebra is all about finding unknown values using equations. Let me break it down:\n\n1. Variables (like x, y) represent unknown numbers\n2. Equations show relationships between numbers\n3. We solve by isolating the variable\n\nWould you like me to show you a specific example?";
    }
    
    if (lowerText.includes('science') || lowerText.includes('chemistry')) {
      return "Chemistry is fascinating! It's the study of matter and how it changes. Here are key concepts:\n\n• Atoms - building blocks of matter\n• Elements - pure substances\n• Compounds - combinations of elements\n• Chemical reactions - when substances change\n\nWhat specific chemistry topic interests you most?";
    }
    
    if (lowerText.includes('study') || lowerText.includes('tips')) {
      return "Here are my top study tips for effective learning:\n\n📚 Break study sessions into 25-30 minute chunks\n🎯 Set specific goals for each session\n📝 Take notes by hand when possible\n🔄 Review material regularly (spaced repetition)\n💤 Get enough sleep - your brain consolidates learning while you rest\n\nWhich subject would you like specific study strategies for?";
    }
    
    if (lowerText.includes('quiz') || lowerText.includes('practice')) {
      return "I'd love to create a practice quiz for you! Which subject would you like to focus on?\n\n• Mathematics (algebra, geometry, etc.)\n• Science (chemistry, physics, biology)\n• English (grammar, reading comprehension)\n• Social Studies (history, geography)\n\nJust let me know your choice and difficulty level!";
    }
    
    return "That's a great question! I'm here to help you learn and understand any topic. Could you tell me more about what you'd like to explore? I can help with:\n\n• Explaining concepts step-by-step\n• Creating practice problems\n• Providing study strategies\n• Answering specific questions\n\nWhat subject or topic interests you most right now?";
  };

  const handleQuickAction = (action: string) => {
    sendMessage(action);
  };

  const renderMessage = (message: Message) => {
    const isUser = message.sender === 'user';
    
    return (
      <View key={message.id} style={[styles.messageContainer, isUser && styles.userMessageContainer]}>
        <View style={[styles.messageAvatar, isUser && styles.userAvatar]}>
          {isUser ? (
            <User size={16} color="white" />
          ) : (
            <Bot size={16} color="white" />
          )}
        </View>
        <View style={[styles.messageBubble, isUser && styles.userMessageBubble]}>
          {isUser ? (
            <Text style={[styles.messageText, styles.userMessageText]}>
              {message.text}
            </Text>
          ) : (
            <TypewriterText 
              text={message.text}
              style={styles.messageText}
              typingSpeed={20}
              onComplete={() => {
                // Scroll to bottom when typing is complete
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }}
            />
          )}
          <Text style={[styles.messageTime, isUser && styles.userMessageTime]}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  const renderTypingIndicator = () => (
    <View style={styles.messageContainer}>
      <View style={styles.messageAvatar}>
        <Bot size={16} color="white" />
      </View>
      <View style={styles.typingBubble}>
        <View style={styles.typingDots}>
          <View style={[styles.typingDot, styles.typingDot1]} />
          <View style={[styles.typingDot, styles.typingDot2]} />
          <View style={[styles.typingDot, styles.typingDot3]} />
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <DevModeIndicator />
      
      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <View style={styles.headerContent}>
          <View style={styles.aiAvatar}>
            <Bot size={24} color="white" />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Rafiki</Text>
            <Text style={styles.headerSubtitle}>Always here to help you learn</Text>
          </View>
          {onClose && (
            <TouchableOpacity
              style={styles.closeButton} 
              onPress={onClose}
            >
              <X size={24} color="#718096" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      {/* Quick Actions */}
      {showQuickActions && (
        <Animated.View
          style={[
            styles.quickActionsContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsContent}
          >
              <TouchableOpacity
                key={action.id}
                style={[styles.quickActionButton, { backgroundColor: `${action.color}20` }]}
                onPress={() => handleQuickAction(action.action)}
              >
                <action.icon size={20} color={action.color} />
                <Text style={[styles.quickActionText, { color: action.color }]}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )}

      {/* Messages */}
      <Animated.View
        style={[
          styles.messagesContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}
          {isTyping && renderTypingIndicator()}
        </ScrollView>
      </Animated.View>

      {/* Input */}
      <Animated.View
        style={[
          styles.inputWrapper,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        {welcomeMessage && inputFocused && (
          <Text style={styles.welcomeMessage}>{welcomeMessage}</Text>
        )}
        <Animated.View style={[
          styles.inputContainer,
          {
            height: inputContainerHeightAnim,
          }
        ]}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={20} color="#718096" />
          </TouchableOpacity>
          <TextInput
            ref={inputRef}
            style={styles.textInput}
            placeholder="Ask me anything about your studies..."
            placeholderTextColor="#A0AEC0"
            value={inputText}
            onChangeText={setInputText}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            multiline
            maxLength={500}
          />
          <TouchableOpacity style={styles.micButton}>
            <Mic size={20} color="#718096" />
          </TouchableOpacity>
          <Animated.View style={{
            transform: [{ scale: sendButtonScaleAnim }]
          }}>
            <TouchableOpacity
              style={[
                styles.sendButton, 
                inputText.trim() && styles.sendButtonActive,
                {
                  backgroundColor: sendButtonColorAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#E2E8F0', '#48BB78']
                  })
                }
              ]}
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim()}
            >
              <Send 
                size={20} 
                color={inputText.trim() ? "white" : "#A0AEC0"} 
              />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4299E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionsContainer: {
    borderBottomColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
  },
  quickActionsContent: {
    padding: 12,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    flexDirection: 'row-reverse',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4299E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  userAvatar: {
    backgroundColor: '#48BB78',
  },
  messageBubble: {
    maxWidth: '75%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userMessageBubble: {
    backgroundColor: '#4299E1',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    lineHeight: 22,
    marginBottom: 4,
  },
  userMessageText: {
    color: 'white',
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#A0AEC0',
  },
  userMessageTime: {
    color: 'rgba(255,255,255,0.8)',
  },
  typingBubble: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#A0AEC0',
    marginHorizontal: 2,
  },
  typingDot1: {
    // Animation would be added here
  },
  typingDot2: {
    // Animation would be added here
  },
  typingDot3: {
    // Animation would be added here
  },
  inputWrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  welcomeMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F7FAFC',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minHeight: 48,
  },
  attachButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    paddingVertical: 8,
    maxHeight: 100
  },
  micButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    transition: 'all 0.2s ease',
  },
  sendButtonActive: {
    backgroundColor: '#EF4444',
    transform: [{ scale: 1.05 }],
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});