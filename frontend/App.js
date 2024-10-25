import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-500">KTDI Smart</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
}
