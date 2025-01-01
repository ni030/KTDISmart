import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ImageBackground, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import authService from '../../services/authServices';

const EditProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [programmeCode, setProgrammeCode] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const route = useRoute();
  const { username } = route.params || {};

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await SecureStore.getItemAsync('userId');
        if (!userId) {
          throw new Error('User ID not found!');
        }
        const response = await authService.getUserById(userId);
        console.log("Fetched user data:", response.user);
        setUser(response.user);
        setProgrammeCode(response.user.programmecode || '');
        setEmail(response.user.email || '');
        setPhoneNumber(response.user.phonenum || '');
        setProfilePicture(response.user.profile_picture || null);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+60\d{9,11}$/; // Matches +60 followed by 9-11 digits
    return phoneRegex.test(phone);
  };

  const handleSave = async () => {
    console.log("Form data before sending:", {
      username,
      programmeCode,
      email,
      phoneNumber,
      profilePicture,
    });

    if (!programmeCode) {
      Alert.alert('Error', 'Programme code cannot be empty');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Phone number must start with +60 and contain 9-11 digits');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Email must be valid format!');
      return;
    }

    try {
      const response = await authService.updateUser({
        username,
        programmeCode,
        email,
        phoneNumber,
        profilePicture,
      });

      if (response.success) {
        Alert.alert('Success', 'Your profile has been updated successfully!');
        navigation.replace('(home)');
      } else {
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  const handleProfilePicturePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const handleTempoSave = async () => {
    if (!programmeCode) {
      Alert.alert('Error', 'Programme code cannot be empty');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Phone number must start with +60 and contain 9-11 digits');
      return;
    }

    try {
      const response = await authService.updateUser({
        username,
        programmeCode,
        email,
        phoneNumber,
        profilePicture,
      });

      if (response.success) {
        navigation.navigate('editPassword', { email });
      } else {
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  const handleResetPassword = async () => {
    // First, attempt to save the user's profile data
    const saveResponse = await handleTempoSave();

    // If saving the data was successful, navigate to the ResetPassword page
    if (saveResponse) {
      navigation.navigate('editPassword', { email }); // Navigate to ResetPassword page with email as parameter
    }
  };

  return (
    <ImageBackground
      source={require('./../../images/editprofilebg.png')}
      style={styles.background}
    >
      <View className="flex justify-center">
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleProfilePicturePick}>
            <View style={styles.profileImageContainer}>
              {profilePicture ? (
                <Image source={{ uri: profilePicture }} style={styles.profileImage} />
              ) : (
                <FontAwesome name="user-circle" size={80} color="#A1335D" style={styles.profileImageFallback} />
              )}
              <FontAwesome name="pencil" size={20} color="#fff" style={styles.editIcon} />
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>Edit Profile</Text>
        </View>

        <View style={styles.form}>
          {/* Reset Password Button */}
          <View style={styles.resetPasswordButtonContainer}>
            <TouchableOpacity style={styles.resetPasswordButton} onPress={handleResetPassword}>
              <Text style={styles.resetPasswordButtonText}>
                Edit Password
              </Text>
              <FontAwesome name="arrow-right" size={20} color="#fff" style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Programme Code</Text>
          <TextInput
            style={styles.input}
            value={programmeCode}
            onChangeText={(value) => setProgrammeCode(value.toUpperCase())}
            placeholder="Programme Code"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              if (validateEmail(value)) {
                setEmailError('');
              }
            }}
            placeholder="Email"
            keyboardType="email-address"
            onBlur={() => {
              if (!validateEmail(email)) {
                setEmailError('Please enter a valid email address');
              }
            }}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(value) => {
              setPhoneNumber(value);
              if (validatePhoneNumber(value)) {
                setPhoneNumberError('');
              }
            }}
            placeholder="e.g: +60124455667"
            keyboardType="phone-pad"
            onBlur={() => {
              if (!validatePhoneNumber(phoneNumber)) {
                setPhoneNumberError('Phone number must start with +60 and contain 9-11 digits');
              }
            }}
          />
          {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
        </View>

        <View style={styles.saveButtonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 15,
    padding: 10,
  },
  profileImageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 110,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#A1335D',
    borderRadius: 50,
    padding: 5,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#A1335D',
  },
  form: {
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
  },
  label: {
    fontSize: 16,
    color: '#343a40',
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: '#A1335D',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  saveButtonContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#A1335D',
    paddingVertical: 10,
    paddingHorizontal: 45,
    borderRadius: 28,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resetPasswordButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resetPasswordButton: {
    borderColor: '#A1335D',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    height: 40,
    backgroundColor: '#944a58',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  resetPasswordButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left', // Align text to the left
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 10,
  },
});

export default EditProfile;
