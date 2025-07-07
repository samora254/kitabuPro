import { Stack } from 'expo-router';

export default function QuestionBankLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="quiz" />
      <Stack.Screen name="results" />
    </Stack>
  );
}