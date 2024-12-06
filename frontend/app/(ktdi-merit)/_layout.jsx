import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: "KTDI Merit"}}/>
      <Stack.Screen name="registerEvent" options={{headerShown: false}}/>
      <Stack.Screen name="scanQRCode" options={{headerShown: false}}/>
    </Stack>
  );
}
