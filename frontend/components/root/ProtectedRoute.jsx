import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { ToastAndroid, ActivityIndicator, View } from 'react-native';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');

        if (!token) {
          router.replace('/(auth)/login');
          ToastAndroid.show('Please login first!', ToastAndroid.LONG);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        router.replace('/(auth)/login');
      }
    };

    checkAuthentication();
  }, [router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return children || null;
};

export default ProtectedRoute;
