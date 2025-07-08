import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { X, CircleAlert as AlertCircle, ChevronDown, Save, LogOut, Lock, Bell, Shield, User, Mail, Phone, School, Users, GraduationCap, BookOpen, Calculator, Globe, Beaker, Palette, Music, Heart, Zap, CircleCheck as CheckCircle } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
import { useAuth } from '@/contexts/AuthContext';
import { checkSubscriptionStatus } from '@/lib/mpesa';
import ProtectedRoute from '@/components/ProtectedRoute';
import RenewSubscriptionButton from '@/components/RenewSubscriptionButton';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const { width, height } = Dimensions.get('window');

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  school: string;
  gender: string;
  grade: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  studyReminders: boolean;
}

export default function ProfileScreen() {
  const { user, userRole, signOut: authSignOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'subjects'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    isActive: boolean;
    endDate?: Date;
    planType?: string;
    daysRemaining?: number;
    isInTrial?: boolean;
  } | null>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'Walter',
    lastName: 'Momanyi',
    email: 'walter.momanyi@example.com',
    phone: '+254712345678',
    school: 'Nyabururu Girls High School',
    gender: 'Female',
    grade: 'Grade 8',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    pushNotifications: true,
    studyReminders: false,
  });

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    'Mathematics', 'English', 'Kiswahili', 'Science', 'Social Studies'
  ]);

  // Load subscription status
  useEffect(() => {
    if (user) {
      loadSubscriptionStatus();
    }
  }, [user]);

  const loadSubscriptionStatus = async () => {
    try {
      setLoadingSubscription(true);
      const status = await checkSubscriptionStatus(user.id);
      setSubscriptionStatus(status);
    } catch (error) {
      console.error('Error loading subscription status:', error);
    } finally {
      setLoadingSubscription(false);
    }
  };

  // Define default and optional subjects
  const defaultSubjects = [
    'Mathematics', 'English', 'Kiswahili', 'Science', 'Social Studies'
  ];

  // Load saved subjects on component mount
  useEffect(() => {
    const loadSavedSubjects = async () => {
      try {
        const storedSubjects = await AsyncStorage.getItem('selectedSubjects');
        if (storedSubjects) {
          setSelectedSubjects(JSON.parse(storedSubjects));
        }
      } catch (error) {
        console.error('Error loading saved subjects:', error);
      }
    };
    
    loadSavedSubjects();
  }, []);
  
  const optionalSubjects = [
    'Home Science'
  ];
  
  // All available subjects (including coming soon)
  const allSubjects = [
    { name: 'Mathematics', color: 'rgba(34, 197, 94, 0.19)', isDefault: true, isAvailable: true },
    { name: 'English', color: 'rgba(239, 68, 68, 0.19)', isDefault: true, isAvailable: true },
    { name: 'Kiswahili', color: 'rgba(6, 182, 212, 0.19)', isDefault: true, isAvailable: true },
    { name: 'Science', color: 'rgba(69, 183, 209, 0.19)', isDefault: true, isAvailable: true },
    { name: 'Social Studies', color: 'rgba(6, 182, 212, 0.19)', isDefault: true, isAvailable: true },
    { name: 'Home Science', color: 'rgba(251, 113, 133, 0.19)', isDefault: false, isAvailable: true },
    { name: 'Agriculture', color: 'rgba(34, 197, 94, 0.19)', isDefault: false, isAvailable: false },
    { name: 'Business Studies', color: 'rgba(139, 92, 246, 0.19)', isDefault: false, isAvailable: false },
    { name: 'Computer Science', color: 'rgba(245, 158, 11, 0.19)', isDefault: false, isAvailable: false },
    { name: 'Creative Arts', color: 'rgba(236, 72, 153, 0.19)', isDefault: false, isAvailable: false },
    { name: 'Geography', color: 'rgba(245, 158, 11, 0.19)', isDefault: false, isAvailable: false },
    { name: 'Health Education', color: 'rgba(6, 182, 212, 0.19)', isDefault: false, isAvailable: false },
    { name: 'History', color: 'rgba(59, 130, 246, 0.19)', isDefault: false, isAvailable: false },
    { name: 'Life Skills Education', color: 'rgba(59, 130, 246, 0.19)', isDefault: false, isAvailable: false },
    { name: 'Physical Education', color: 'rgba(245, 158, 11, 0.19)', isDefault: false, isAvailable: false },
    { name: 'Pre-Technical', color: 'rgba(59, 130, 246, 0.19)', isDefault: false, isAvailable: false },
    { name: 'Religious Education', color: 'rgba(236, 72, 153, 0.19)', isDefault: false, isAvailable: false }
  ];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: string | boolean) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    // Validate that exactly 5 subjects are selected
    if (selectedSubjects.length !== 5) {
      setSelectionError('You must select exactly 5 subjects');
      setSaveSuccess(null);
      return;
    }
    setSelectionError(null);
    
    // Save logic here
    console.log('Saving changes:', profileData, 'Selected subjects:', selectedSubjects);
    
    // Save selected subjects to AsyncStorage
    try {
      AsyncStorage.setItem('selectedSubjects', JSON.stringify(selectedSubjects));
      setSaveSuccess(true);
      setHasChanges(false);
      
      // Show success message briefly
      setTimeout(() => {
        setSaveSuccess(null);
      }, 3000);
    } catch (error) {
      console.error('Error saving subjects:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await authSignOut();
      router.replace('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleSubject = (subject: string) => {
    // Check if the subject is available (not "Coming Soon") 
    const subjectData = allSubjects.find(s => s.name === subject);
    
    // Set hasChanges to true to enable the Save Changes button
    setHasChanges(true);
    
    // For web platform, handle the alert differently
    if (Platform.OS === 'web') {
      if (!subjectData || !subjectData.isAvailable) {
        setSelectionError(`${subject} will be available in a future update.`);
        setTimeout(() => setSelectionError(null), 3000);
        return;
      }
    } else {
      if (!subjectData || !subjectData.isAvailable) {
        Alert.alert('Coming Soon', `${subject} will be available in a future update.`);
        return;
      }
    }
    
    // Allow deselection regardless of count - validation will happen on save
    if (selectedSubjects.includes(subject)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(prev => prev.filter(s => s !== subject));
        setSelectionError(null);
      } else {
        setSelectionError('You must have at least one subject selected');
      }
    } else {
      // Adding a subject
      setSelectedSubjects(prev => [...prev, subject]);
      setSelectionError(null);
    }
  };
  
  const primarySubjects = [
    { name: 'Agriculture', color: 'rgba(34, 197, 94, 0.19)' },
    { name: 'Business Studies', color: 'rgba(139, 92, 246, 0.19)' },
    { name: 'Computer Science', color: 'rgba(245, 158, 11, 0.19)' },
    { name: 'Creative Arts', color: 'rgba(236, 72, 153, 0.19)' },
    { name: 'English', color: 'rgba(239, 68, 68, 0.19)' },
    { name: 'Geography', color: 'rgba(245, 158, 11, 0.19)' },
    { name: 'Health Education', color: 'rgba(6, 182, 212, 0.19)' },
    { name: 'History', color: 'rgba(59, 130, 246, 0.19)' },
    { name: 'Home Science', color: 'rgba(239, 68, 68, 0.19)' },
    { name: 'Kiswahili', color: 'rgba(6, 182, 212, 0.19)' },
    { name: 'Life Skills Education', color: 'rgba(59, 130, 246, 0.19)' },
    { name: 'Mathematics', color: 'rgba(34, 197, 94, 0.19)' },
    { name: 'Physical Education', color: 'rgba(245, 158, 11, 0.19)' },
    { name: 'Pre-Technical', color: 'rgba(59, 130, 246, 0.19)' },
    { name: 'Religious Education', color: 'rgba(236, 72, 153, 0.19)' },
    { name: 'Science', color: 'rgba(245, 158, 11, 0.19)' },
    { name: 'Social Studies', color: 'rgba(6, 182, 212, 0.19)' },
  ];

  const renderProfileSection = () => (
    <ScrollView 
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Basic Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.inputRow}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>First name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={profileData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              editable={isEditing}
              placeholder="First name"
              placeholderTextColor="#A0AEC0"
            />
          </View>
          <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Last name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={profileData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              editable={isEditing}
              placeholder="Last name"
              placeholderTextColor="#A0AEC0"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            value={profileData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            editable={isEditing}
            placeholder="Email address"
            placeholderTextColor="#A0AEC0"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            value={profileData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            editable={isEditing}
            placeholder="Phone number"
            placeholderTextColor="#A0AEC0"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>School</Text>
          <View style={styles.selectContainer}>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={profileData.school}
              onChangeText={(value) => handleInputChange('school', value)}
              editable={isEditing}
              placeholder="School name"
              placeholderTextColor="#A0AEC0"
            />
            {!isEditing && <ChevronDown size={20} color="#A0AEC0" style={styles.selectIcon} />}
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.selectContainer}>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={profileData.gender}
                onChangeText={(value) => handleInputChange('gender', value)}
                editable={isEditing}
                placeholder="Gender"
                placeholderTextColor="#A0AEC0"
              />
              {!isEditing && <ChevronDown size={20} color="#A0AEC0" style={styles.selectIcon} />}
            </View>
          </View>
          <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Grade</Text>
            <View style={styles.selectContainer}>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={profileData.grade}
                onChangeText={(value) => handleInputChange('grade', value)}
                editable={isEditing}
                placeholder="Grade"
                placeholderTextColor="#A0AEC0"
              />
              {!isEditing && <ChevronDown size={20} color="#A0AEC0" style={styles.selectIcon} />}
            </View>
          </View>
        </View>
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Shield size={20} color="#4299E1" />
          <Text style={styles.sectionTitle}>Account Settings</Text>
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Lock size={20} color="#718096" />
            <Text style={styles.settingText}>Change Password</Text>
          </View>
          <ChevronDown size={20} color="#A0AEC0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <User size={20} color="#718096" />
            <Text style={styles.settingText}>Privacy Settings</Text>
          </View>
          <ChevronDown size={20} color="#A0AEC0" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => router.push('/admin')}
        >
          <View style={styles.settingLeft}>
            <Shield size={20} color="#8B5CF6" />
            <Text style={styles.settingText}>Admin Dashboard</Text>
          </View>
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>Active</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Notification Preferences */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Bell size={20} color="#48BB78" />
          <Text style={styles.sectionTitle}>Notifications</Text>
        </View>
        
        <View style={styles.toggleItem}>
          <View style={styles.settingLeft}>
            <Mail size={20} color="#718096" />
            <Text style={styles.settingText}>Email Notifications</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggle, profileData.emailNotifications && styles.toggleActive]}
            onPress={() => handleInputChange('emailNotifications', !profileData.emailNotifications)}
          >
            <View style={[styles.toggleThumb, profileData.emailNotifications && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>

        <View style={styles.toggleItem}>
          <View style={styles.settingLeft}>
            <Bell size={20} color="#718096" />
            <Text style={styles.settingText}>Push Notifications</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggle, profileData.pushNotifications && styles.toggleActive]}
            onPress={() => handleInputChange('pushNotifications', !profileData.pushNotifications)}
          >
            <View style={[styles.toggleThumb, profileData.pushNotifications && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>

        <View style={styles.toggleItem}>
          <View style={styles.settingLeft}>
            <BookOpen size={20} color="#718096" />
            <Text style={styles.settingText}>Study Reminders</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggle, profileData.studyReminders && styles.toggleActive]}
            onPress={() => handleInputChange('studyReminders', !profileData.studyReminders)}
          >
            <View style={[styles.toggleThumb, profileData.studyReminders && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Additional spacing for scroll */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const renderSubjectsSection = () => (
    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      <View style={styles.selectionHeader}>
        <Text style={styles.sectionTitle}>Subject Selection</Text>
        <Text style={styles.selectionCount}>
          Selected: <Text style={styles.selectionCountNumber}>{selectedSubjects.length}/5</Text> subjects
        </Text>
      </View>
      
      {selectionError && (
        <View style={styles.errorContainer}>
          <AlertCircle size={16} color="#E53E3E" />
          <Text style={styles.errorText}>{selectionError}</Text>
        </View>
      )}
      
      {saveSuccess && (
        <View style={styles.successContainer}>
          <CheckCircle size={16} color="#48BB78" />
          <Text style={styles.successText}>
            Subject selection saved successfully!
          </Text>
        </View>
      )}
      
      <Text style={styles.selectionHelp}>
        You must select exactly 5 subjects. The first 5 subjects are selected by default.
        You can replace a default subject with Home Science if desired.
      </Text>
      
      <Text style={styles.sectionSubtitle}>Available Subjects</Text>
       
      <View style={styles.subjectsGrid}>
        {allSubjects.filter(subject => subject.isAvailable).map((subject, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.subjectButton,
              { backgroundColor: subject.color },
              selectedSubjects.includes(subject.name) && styles.subjectButtonSelected
            ]}
            onPress={() => toggleSubject(subject.name)}
          >
            <Text style={styles.subjectButtonText}>{subject.name}</Text>
            {subject.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultBadgeText}>Default</Text>
              </View>
            )}
            {selectedSubjects.includes(subject.name) && ( 
              <View style={styles.selectedIndicator}>
                <Text style={styles.selectedIndicatorText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
       
      <Text style={styles.sectionSubtitle}>Coming Soon</Text>
      
      <View style={styles.subjectsGrid}>
        {allSubjects.filter(subject => !subject.isAvailable).map((subject, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.subjectButton,
              styles.comingSoonSubject,
              { backgroundColor: subject.color }
            ]} 
            onPress={() => toggleSubject(subject.name)}
          >
            <Text style={styles.subjectButtonText}>{subject.name}</Text>
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>Coming Soon</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View> 

      {/* Additional spacing for scroll */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <DevModeIndicator />
        
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
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
            <X size={24} color="#718096" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile Settings</Text>
          <View style={styles.headerSpacer} />
        </Animated.View>

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
          style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'subjects' && styles.activeTab]}
          onPress={() => setActiveTab('subjects')}
        >
          <Text style={[styles.tabText, activeTab === 'subjects' && styles.activeTabText]}>
            Subjects
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Content */}
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        {activeTab === 'profile' ? (
          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Subscription Status Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Shield size={20} color="#4299E1" />
                <Text style={styles.sectionTitle}>Subscription Status</Text>
              </View>
              
              {loadingSubscription ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#4299E1" />
                  <Text style={styles.loadingText}>Loading subscription status...</Text>
                </View>
              ) : (
                <View style={styles.subscriptionCard}>
                  <View style={styles.subscriptionHeader}>
                    <View style={[
                      styles.subscriptionBadge,
                      {
                        backgroundColor: subscriptionStatus?.isActive 
                          ? subscriptionStatus.isInTrial 
                            ? '#FEF3C7' 
                            : '#F0FFF4'
                          : '#FEF2F2'
                      }
                    ]}>
                      <Text style={[
                        styles.subscriptionBadgeText,
                        {
                          color: subscriptionStatus?.isActive 
                            ? subscriptionStatus.isInTrial 
                              ? '#D97706' 
                              : '#10B981'
                            : '#E53E3E'
                        }
                      ]}>
                        {subscriptionStatus?.isActive 
                          ? subscriptionStatus.isInTrial 
                            ? 'Trial' 
                            : 'Active'
                          : 'Inactive'}
                      </Text>
                    </View>
                    
                    {subscriptionStatus?.isActive && subscriptionStatus.planType && !subscriptionStatus.isInTrial && (
                      <Text style={styles.planTypeText}>
                        {subscriptionStatus.planType === 'monthly' ? 'Monthly Plan' : 'Annual Plan'}
                      </Text>
                    )}
                  </View>
                  
                  <View style={styles.subscriptionDetails}>
                    {subscriptionStatus?.isActive ? (
                      <>
                        <Text style={styles.subscriptionText}>
                          {subscriptionStatus.isInTrial 
                            ? `Your free trial ${subscriptionStatus.daysRemaining && subscriptionStatus.daysRemaining > 0 ? 'expires' : 'expired'} on ${subscriptionStatus.endDate?.toLocaleDateString()}.` 
                            : `Your subscription ${subscriptionStatus.daysRemaining && subscriptionStatus.daysRemaining > 0 ? 'renews' : 'expired'} on ${subscriptionStatus.endDate?.toLocaleDateString()}.`}
                        </Text>
                        
                        {subscriptionStatus.daysRemaining && subscriptionStatus.daysRemaining > 0 ? (
                          <Text style={styles.daysRemainingText}>
                            {subscriptionStatus.daysRemaining} days remaining
                          </Text>
                        ) : (
                          <Text style={styles.expiredText}>
                            Your {subscriptionStatus.isInTrial ? 'trial has' : 'subscription has'} expired
                          </Text>
                        )}
                      </>
                    ) : (
                      <Text style={styles.subscriptionText}>
                        Your subscription is inactive. Subscribe to access premium features.
                      </Text>
                    )}
                  </View>
                  
                  <View style={styles.subscriptionActions}>
                    {subscriptionStatus?.isActive && !subscriptionStatus.isInTrial ? (
                      <RenewSubscriptionButton 
                        planType={subscriptionStatus.planType as 'monthly' | 'annual'} 
                        onSuccess={loadSubscriptionStatus}
                        style={styles.renewButton}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.subscribeButton}
                        onPress={() => router.push('/subscription')}
                      >
                        <Text style={styles.subscribeButtonText}>
                          {subscriptionStatus?.isActive && subscriptionStatus.isInTrial 
                            ? 'Upgrade to Premium' 
                            : 'Subscribe Now'}
                        </Text>
                      </TouchableOpacity>
                    )}
                    
                    {subscriptionStatus?.isActive && !subscriptionStatus.isInTrial && (
                      <TouchableOpacity
                        style={styles.viewHistoryButton}
                        onPress={() => router.push('/subscription/billing-history')}
                      >
                        <Text style={styles.viewHistoryButtonText}>View Billing History</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            </View>
            
            {/* Basic Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              
              <View style={styles.inputRow}>
                <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>First name</Text>
                  <TextInput
                    style={[styles.input, !isEditing && styles.inputDisabled]}
                    value={profileData.firstName}
                    onChangeText={(value) => handleInputChange('firstName', value)}
                    editable={isEditing}
                    placeholder="First name"
                    placeholderTextColor="#A0AEC0"
                  />
                </View>
                <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>Last name</Text>
                  <TextInput
                    style={[styles.input, !isEditing && styles.inputDisabled]}
                    value={profileData.lastName}
                    onChangeText={(value) => handleInputChange('lastName', value)}
                    editable={isEditing}
                    placeholder="Last name"
                    placeholderTextColor="#A0AEC0"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, !isEditing && styles.inputDisabled]}
                  value={profileData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  editable={isEditing}
                  placeholder="Email address"
                  placeholderTextColor="#A0AEC0"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  style={[styles.input, !isEditing && styles.inputDisabled]}
                  value={profileData.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                  editable={isEditing}
                  placeholder="Phone number"
                  placeholderTextColor="#A0AEC0"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>School</Text>
                <View style={styles.selectContainer}>
                  <TextInput
                    style={[styles.input, !isEditing && styles.inputDisabled]}
                    value={profileData.school}
                    onChangeText={(value) => handleInputChange('school', value)}
                    editable={isEditing}
                    placeholder="School name"
                    placeholderTextColor="#A0AEC0"
                  />
                  {!isEditing && <ChevronDown size={20} color="#A0AEC0" style={styles.selectIcon} />}
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Gender</Text>
                  <View style={styles.selectContainer}>
                    <TextInput
                      style={[styles.input, !isEditing && styles.inputDisabled]}
                      value={profileData.gender}
                      onChangeText={(value) => handleInputChange('gender', value)}
                      editable={isEditing}
                      placeholder="Gender"
                      placeholderTextColor="#A0AEC0"
                    />
                    {!isEditing && <ChevronDown size={20} color="#A0AEC0" style={styles.selectIcon} />}
                  </View>
                </View>
                <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>Grade</Text>
                  <View style={styles.selectContainer}>
                    <TextInput
                      style={[styles.input, !isEditing && styles.inputDisabled]}
                      value={profileData.grade}
                      onChangeText={(value) => handleInputChange('grade', value)}
                      editable={isEditing}
                      placeholder="Grade"
                      placeholderTextColor="#A0AEC0"
                    />
                    {!isEditing && <ChevronDown size={20} color="#A0AEC0" style={styles.selectIcon} />}
                  </View>
                </View>
              </View>
            </View>

            {/* Account Settings */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Shield size={20} color="#4299E1" />
                <Text style={styles.sectionTitle}>Account Settings</Text>
              </View>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Lock size={20} color="#718096" />
                  <Text style={styles.settingText}>Change Password</Text>
                </View>
                <ChevronDown size={20} color="#A0AEC0" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <User size={20} color="#718096" />
                  <Text style={styles.settingText}>Privacy Settings</Text>
                </View>
                <ChevronDown size={20} color="#A0AEC0" />
              </TouchableOpacity>

              {userRole === 'admin' && (
                <TouchableOpacity 
                  style={styles.settingItem}
                  onPress={() => router.push('/admin')}
                >
                  <View style={styles.settingLeft}>
                    <Shield size={20} color="#8B5CF6" />
                    <Text style={styles.settingText}>Admin Dashboard</Text>
                  </View>
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeBadgeText}>Active</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            {/* Notification Preferences */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Bell size={20} color="#48BB78" />
                <Text style={styles.sectionTitle}>Notifications</Text>
              </View>
              
              <View style={styles.toggleItem}>
                <View style={styles.settingLeft}>
                  <Mail size={20} color="#718096" />
                  <Text style={styles.settingText}>Email Notifications</Text>
                </View>
                <TouchableOpacity
                  style={[styles.toggle, profileData.emailNotifications && styles.toggleActive]}
                  onPress={() => handleInputChange('emailNotifications', !profileData.emailNotifications)}
                >
                  <View style={[styles.toggleThumb, profileData.emailNotifications && styles.toggleThumbActive]} />
                </TouchableOpacity>
              </View>

              <View style={styles.toggleItem}>
                <View style={styles.settingLeft}>
                  <Bell size={20} color="#718096" />
                  <Text style={styles.settingText}>Push Notifications</Text>
                </View>
                <TouchableOpacity
                  style={[styles.toggle, profileData.pushNotifications && styles.toggleActive]}
                  onPress={() => handleInputChange('pushNotifications', !profileData.pushNotifications)}
                >
                  <View style={[styles.toggleThumb, profileData.pushNotifications && styles.toggleThumbActive]} />
                </TouchableOpacity>
              </View>

              <View style={styles.toggleItem}>
                <View style={styles.settingLeft}>
                  <BookOpen size={20} color="#718096" />
                  <Text style={styles.settingText}>Study Reminders</Text>
                </View>
                <TouchableOpacity
                  style={[styles.toggle, profileData.studyReminders && styles.toggleActive]}
                  onPress={() => handleInputChange('studyReminders', !profileData.studyReminders)}
                >
                  <View style={[styles.toggleThumb, profileData.studyReminders && styles.toggleThumbActive]} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Additional spacing for scroll */}
            <View style={{ height: 40 }} />
          </ScrollView>
        ) : renderSubjectsSection()}
      </Animated.View>

      {/* Action Buttons */}
      <Animated.View
        style={[
          styles.actionButtons,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {activeTab === 'profile' && !isEditing && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}>
            <LogOut size={20} color="white" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.saveButton,
              (!hasChanges) && styles.saveButtonDisabled
            ]}
            onPress={handleSaveChanges}
            disabled={!hasChanges}
          >
            <Save size={20} color="white" />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F7FAFC',
    margin: 16,
    borderRadius: 12,
    padding: 4,
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
  contentContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    marginLeft: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
  },
  inputDisabled: {
    backgroundColor: '#F7FAFC',
    color: '#718096',
  },
  selectContainer: {
    position: 'relative',
  },
  selectIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
    marginLeft: 12,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#48BB78',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  activeBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activeBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: -6,
  },
  subjectButton: {
    width: '36%', // 75% of previous 48% width
    margin: '1.5%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    minHeight: 60, // Reduced height to fit more in viewport
  },
  selectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectionCount: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  selectionCountNumber: {
    fontFamily: 'Inter-Bold',
    color: '#4299E1',
  },
  selectionHelp: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginBottom: 20,
    lineHeight: 20,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#E53E3E',
    marginLeft: 8,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FFF4',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  successText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#48BB78',
    marginLeft: 8,
  },
  subjectButtonSelected: {
    borderWidth: 1.5,
    borderColor: 'rgba(66, 153, 225, 0.4)',
    backgroundColor: 'rgba(66, 153, 225, 0.08)',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
    transform: [{ scale: 1.02 }],
  },
  comingSoonSubject: {
    opacity: 0.6,
    transform: [{ scale: 1 }],
  },
  defaultBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'rgba(66, 153, 225, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultBadgeText: {
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: '#4299E1',
  },
  comingSoonBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  subjectButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    textAlign: 'center',
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  comingSoonText: {
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(66, 153, 225, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(66, 153, 225, 0.3)',
  },
  selectedIndicatorText: {
    fontSize: 12,
    color: '#4299E1',
    fontFamily: 'Inter-Bold',
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  editButton: {
    backgroundColor: '#4299E1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoutButton: {
    backgroundColor: '#E53E3E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 0.48,
    justifyContent: 'center',
    shadowColor: '#E53E3E',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#48BB78',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 0.48,
    justifyContent: 'center',
    shadowColor: '#48BB78',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#A0AEC0',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
    marginTop: 8,
  },
  subscriptionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subscriptionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 12,
  },
  subscriptionBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  planTypeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4A5568',
  },
  subscriptionDetails: {
    marginBottom: 16,
  },
  subscriptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    marginBottom: 8,
  },
  daysRemainingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#48BB78',
  },
  expiredText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#E53E3E',
  },
  subscriptionActions: {
    marginTop: 8,
  },
  renewButton: {
    backgroundColor: '#48BB78',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  subscribeButton: {
    backgroundColor: '#4299E1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  viewHistoryButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  viewHistoryButtonText: {
    color: '#718096',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});