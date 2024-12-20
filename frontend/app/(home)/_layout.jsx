import React from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import BottomNavigationBar from '../BottomNavigationBar';

export default function Layout() {
  const segments = useSegments(); // Get the current route segments

  // Check if the current route is 'profile' or 'editProfile'
  const showBottomNavBar = !segments.includes('profile') && !segments.includes('editProfile');

  return (
    <>
      <Stack>
        <Stack.Screen name="Home" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="editProfile" options={{ headerShown: false }} />
      </Stack>
      {/* Conditionally render the custom bottom navigation bar */}
      {showBottomNavBar && <BottomNavigationBar />}
    </>
  );
}
