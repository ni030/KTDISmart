import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const UserProfile = () => {
  const navigation = useNavigation();
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
       <Text style={styles.message}>Coming Soon</Text>
      
      {/*Log Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={async ()=>{await handleLogout()}}>
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
    backgroundColor: '#ffffff', // Background color for the profile page
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A1335D', // Customize the color as needed
  },

  logoutButton: {
    marginTop: 300,
    backgroundColor: '#A1335D', // Button color
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