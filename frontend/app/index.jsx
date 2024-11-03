import React, { useCallback, useEffect } from 'react';
import { Link } from 'expo-router';
import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  const [fontsLoaded] = useFonts({
    'RootLight': require('../fonts/FredokaLight.ttf'),
    'RootRegular': require('../fonts/FredokaRegular.ttf'),
    'RootMedium': require('../fonts/FredokaMedium.ttf'),
    'RootSemiBold': require('../fonts/FredokaSemiBold.ttf'),
    'RootBold': require('../fonts/FredokaBold.ttf'),
  });

  useEffect(() => {
    // Prevent the splash screen from hiding until fonts are loaded
    SplashScreen.preventAutoHideAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // Hide the splash screen when fonts are loaded
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return null so nothing renders until fonts are ready
  }

  // return(
  //   <PaperProvider>
  //    <Text> <Redirect href="/(ktdi-merit)" />;</Text>
  //   </PaperProvider>
  // )

  // temporary before navbar is done
  return (
    <SafeAreaView className="w-full h-screen flex flex-1 justify-start items-center bg-blue-100">
      <View className="w-full h-1/3 flex justify-center items-center">
        <Text className="text-center text-3xl text-red-900 font-semibold">Welcome to KTDI SMART</Text>
      </View>
      <View className="w-4/5 flex justify-center items-center gap-3">
          <TouchableOpacity className="bg-red-500 py-4 px-6 rounded-lg mb-4">
            <Link href="/(auth)/sign-in">
              <Text className="text-xl text-white font-bold text-center">Sign In</Text>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity className="bg-red-500 py-4 px-6 rounded-lg mb-4">
            <Link href="/(navigation)">
              <Text className="text-xl text-white font-bold text-center">Navigation</Text>
            </Link>
          </TouchableOpacity>
       
          <TouchableOpacity className="bg-red-500 py-4 px-6 rounded-lg mb-4">
            <Link href="/(ktdi-merit)">
              <Text className="text-xl text-white font-bold text-center">KTDI Merit</Text>
            </Link>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
