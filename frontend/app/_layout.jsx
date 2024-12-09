import { Stack } from 'expo-router/stack';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ animation: 'none' }} >
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="(complaint)" options={{ headerShown: false }} />
      <Stack.Screen name="(ktdi-merit)" options={{ headerShown: false }} />
      <Stack.Screen name="(navigation)" options={{ headerShown: false }} />
    </Stack>

  );
}
