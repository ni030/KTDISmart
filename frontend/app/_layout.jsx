import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{headerShown: false}} />
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="(home)" options={{headerShown: false}} />
      <Stack.Screen name="(complaint)" options={{headerShown: false}} />
      <Stack.Screen name="(ktdi-merit)" options={{headerShown: false}} />
      <Stack.Screen name="(navigation)" options={{headerShown:false}}/>
    </Stack>
  );
}
