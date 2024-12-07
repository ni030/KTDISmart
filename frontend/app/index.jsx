import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'RootLight': require('../fonts/FredokaLight.ttf'),
    'RootRegular': require('../fonts/FredokaRegular.ttf'),
    'RootMedium': require('../fonts/FredokaMedium.ttf'),
    'RootSemiBold': require('../fonts/FredokaSemiBold.ttf'),
    'RootBold': require('../fonts/FredokaBold.ttf'),
  });

  const navigation = useNavigation();

  useEffect(() => {
    // Initialize app and manage splash screen
    const initializeApp = async () => {
      // Prevent the splash screen from hiding automatically
      SplashScreen.preventAutoHideAsync();

      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate an async task (e.g., token fetching or resource loading)
      const token = await SecureStore.getItemAsync('token');
      const userId = await SecureStore.getItemAsync('userId');

      console.log("Check userId -> " + userId)

      // Wait for fonts to load
      if (fontsLoaded) {
        // Hide the splash screen and navigate to the appropriate screen
        await SplashScreen.hideAsync();
        navigation.replace(token ? '(home)' : '(auth)');
      }
    };

    initializeApp();
    // navigation.replace('(home)');
  }, [fontsLoaded, navigation]);

  // Return null to prevent rendering until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/splash.png')}
        style={styles.logo}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    position: 'absolute',
    top: 0,
    left: 1,
    width: '100%', 
    height: '100%', 
  },
});