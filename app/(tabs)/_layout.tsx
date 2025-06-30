import { Tabs } from 'expo-router';
<<<<<<< HEAD
import { Chrome as Home, BookOpen, Trophy, User, MessageCircle, Book } from 'lucide-react-native';
=======
import { Chrome as Home, BookOpen, Trophy, User, MessageCircle } from 'lucide-react-native';
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarActiveTintColor: '#48BB78',
        tabBarInactiveTintColor: '#718096',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Medium',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="subjects"
        options={{
          title: 'Subjects',
          tabBarIcon: ({ size, color }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
<<<<<<< HEAD
        name="curriculum"
        options={{
          title: 'Curriculum',
          tabBarIcon: ({ size, color }) => (
            <Book size={size} color={color} />
=======
        name="achievements"
        options={{
          title: 'Achievements',
          tabBarIcon: ({ size, color }) => (
            <Trophy size={size} color={color} />
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'AI Tutor',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}