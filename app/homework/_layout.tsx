import { Stack } from 'expo-router';

export default function HomeworkLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="assignment" />
      <Stack.Screen name="results" />
      <Stack.Screen name="create" />
    </Stack>
  );
}