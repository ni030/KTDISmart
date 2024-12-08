import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: "Complaint History"}}/>
      <Stack.Screen name="category" options={{title: "Complaint Subsystem"}}/>
      <Stack.Screen name="report" options={{title: "Report form"}}/>
      <Stack.Screen name="progress" options={{title: "Tracking Complaint Progress"}}/>
    </Stack>
  );
}