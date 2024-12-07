import { Stack } from 'expo-router';
import BottomNavigationBar from '../BottomNavigationBar';

export default function Layout() {
  return (
    <>
    <Stack>
      <Stack.Screen name="index" options={{title: "Complaint Subsystem"}}/>
      <Stack.Screen name="report" options={{title: "Report form"}}/>
    </Stack>

    <BottomNavigationBar />
    </>
  );
}