import { Stack } from 'expo-router';
import BottomNavigationBar from '../BottomNavigationBar';

export default function Layout() {
  return (
    <>
    <Stack>
      <Stack.Screen name="index" options={{title: "Complaint History"}}/>
      <Stack.Screen name="category" options={{title: "Report Complaint"}}/>
      <Stack.Screen name="report" options={{title: "Complaint Form"}}/>
      <Stack.Screen name="progress" options={{title: "Tracking Complaint Status"}}/>
    </Stack>

    <BottomNavigationBar />
    </>
  );
}