import { Stack } from 'expo-router';
import BottomNavigationBar from '../BottomNavigationBar';

export default function Layout() {
  return (
    <>
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="registerEvent" options={{headerShown: false}}/>
      <Stack.Screen name="scanQRCode" options={{headerShown: false}}/>
    </Stack>
    
    <BottomNavigationBar />
    </>
  );
}
