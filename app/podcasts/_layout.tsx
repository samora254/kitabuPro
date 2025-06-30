import { Stack } from 'expo-router';

export default function PodcastsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="player" />
      <Stack.Screen name="downloads" />
      <Stack.Screen name="playlists" />
      <Stack.Screen name="search" />
    </Stack>
  );
}