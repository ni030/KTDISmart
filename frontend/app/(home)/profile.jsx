import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import authService from '../../services/authServices';

const UserProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null); // State to hold user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await SecureStore.getItemAsync('userId');
        if (!userId) {
          throw new Error('User ID not found!');
        }
        const response = await authService.getUserById(userId);
        setUser(response.user); // Set the user data
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token'); // Clear the token
      await SecureStore.deleteItemAsync('userId');
      Alert.alert('Logged Out', 'You have successfully logged out.');
      navigation.replace('(auth)'); // Redirect to login screen
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.message}>Hi, {user.name}</Text> 
          <Text style={styles.comingSoon}>Coming Soon</Text> 
        </>
      ) : (
        <Text style={styles.message}>Loading...</Text>
      )}
      
      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A1335D',
  },
  comingSoon: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'gray',
    marginTop: 26,
  },
  logoutButton: {
    marginTop: 300,
    backgroundColor: '#A1335D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UserProfile;
