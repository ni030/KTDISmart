import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store';
import authService from '../../services/authServices';

const UserProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

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

  const username = user ? user.username : '';

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
    <ImageBackground
      source={require('./../../images/profilebg.png')} // Use the background image
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()} // Go back to the previous screen
            >
              <FontAwesome name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>

            {user && user.profile_picture ? (
              <Image
                source={{ uri: user.profile_picture }} // Use the user's profile picture
                height={110}
                width={110}
                style={styles.profileImage}
              />
              
            ) : (
              <FontAwesome
                name="user-circle"
                size={110}
                color="#A1335D"
                style={styles.profileImageFallback}
              />
            )}
            <Text style={styles.name}>{user ? user.name : 'Loading...'}</Text>
            <Text style={styles.subtitle}>Undergraduate student | Resident</Text>
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() => navigation.navigate('editProfile',{ username })}//pass username
            >
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
        
          {/* Student Info Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Student Info</Text>
            <Text style={styles.infoText}>
              Name: <Text style={styles.boldText}>{user ? user.name : 'Loading...'}</Text>
            </Text>
            <Text style={styles.infoText}>
              Matric No: <Text style={styles.boldText}>{user ? user.matricno : 'Loading...'}</Text>
            </Text>
            <Text style={styles.infoText}>
              Gender: <Text style={styles.boldText}>{user ? user.gender : 'Loading...'}</Text>
            </Text>
            <Text style={styles.infoText}>
              Programme Code: <Text style={styles.boldText}>{user ? user.programmecode : 'Loading...'}</Text>
            </Text>
            <Text style={styles.infoText}>
              Email: <Text style={styles.boldText}>{user ? user.email : 'Loading...'}</Text>
            </Text>
            <Text style={styles.infoText}>
              Phone number: <Text style={styles.boldText}>{user ? user.phonenum : 'Loading...'}</Text>
            </Text>
          </View>

          {/* Resident Info Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resident Info</Text>
            <Text style={styles.infoText}>
              Block: <Text style={styles.boldText}>{user ? user.block : 'Loading...'}</Text>
            </Text>
            <Text style={styles.infoText}>
              Room Number: <Text style={styles.boldText}>{user ? user.roomnumber : 'Loading...'}</Text>
            </Text>
            <Text style={styles.infoText}>
              Room Type: <Text style={styles.boldText}>Single Room with bathroom</Text>
            </Text>
            <Text style={styles.infoText}>
              Key Number: <Text style={styles.boldText}>{user ? user.keynumber : 'Loading...'}</Text>
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire screen
  },
  container: {
    flex: 1,
    paddingTop: 96,
  },
  scrollContent: {
    marginVertical: 10,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    padding: 10,
  },

  backButton: {
    position: 'absolute',
    top: -40,
    left: 20,
    padding: 10,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 4,
  },
  profileImageFallback: {
    marginBottom: 10,
  },
  name: {
    paddingTop: 2,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#343a40',
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 3,
  },
  editProfileButton: {
    marginTop: 12,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#A1335D',
  },
  editProfileText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 20,
    paddingTop: 20,
    paddingLeft: 35,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#A1335D',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#A1335D',
    paddingVertical: 10,
    paddingHorizontal: 45,
    borderRadius: 28,
    alignSelf: 'center',
    marginTop: 45,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomNav: {
    position: 'fixed',
    bottom: 15,
  }
});

export default UserProfile;
