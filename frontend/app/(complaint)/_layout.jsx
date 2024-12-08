import { Stack } from 'expo-router';
import BottomNavigationBar from '../BottomNavigationBar';

export default function Layout() {
  return (
    <>
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="category" options={{headerShown: false}}/>
      <Stack.Screen name="report" options={{headerShown: false}}/>
      <Stack.Screen name="progress" options={{headerShown: false}}/>
    </Stack>

    <BottomNavigationBar />
    </>
  );
}