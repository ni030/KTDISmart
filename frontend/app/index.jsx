import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';

export default function App() {
  return <Redirect href="/(auth)/sign-up" />;
};
