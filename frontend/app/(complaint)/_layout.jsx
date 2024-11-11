import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: "Complaint Subsystem"}}/>
      <Stack.Screen name="report" options={{title: "Report form"}}/>
    </Stack>
  );
}