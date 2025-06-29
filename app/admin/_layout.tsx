import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="schools" />
      <Stack.Screen name="subjects" />
      <Stack.Screen name="users" />
      <Stack.Screen name="agents" />
     <Stack.Screen name="teachers" />
    </Stack>
  );
}