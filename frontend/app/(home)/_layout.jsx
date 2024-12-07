import React from 'react';
import { Stack } from 'expo-router';
import BottomNavigationBar from '../BottomNavigationBar';

export default function Layout() {
  return (
    <>
    <Stack>
    <Stack.Screen name="Home" options={{ headerShown:false}} />
      <Stack.Screen name="profile" options={{ headerShown: "Resident Profile" }} />
    </Stack>
      {/* Render the custom bottom navigation bar */}
      <BottomNavigationBar />
    </>
  );
}