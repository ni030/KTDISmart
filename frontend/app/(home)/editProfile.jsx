import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await SecureStore.getItemAsync('userId');
        if (!userId) {
          throw new Error('User ID not found!');
        }
        const response = await authService.getUserById(userId);
        setUser(response.user); // Set the user data
        setProgrammeCode(response.user.programmecode);
        setEmail(response.user.email);
        setProfilePicture(response.user.profile_picture); // Set the initial profile picture
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
        // Only include fields that have values
        const updatedUserData = {
            ...(programmeCode && { programmecode: programmeCode }),
            ...(email && { email }),
            ...(password && { password }),
            ...(profilePicture && { profile_picture: profilePicture })
        };

        const response = await authService.updateUser(user.id, updatedUserData);

        if (response.success) {
            Alert.alert('Success', 'Profile updated successfully.');
            navigation.goBack();
        } else {
            Alert.alert('Error', response.message || 'Failed to update profile. Please try again.');
        }
    } catch (error) {
        console.error('Save error:', error);
        Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleProfilePicturePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri); // Set the picked image
    }
  };

  return (
    <ImageBackground
      source={require('./../../images/editprofilebg.png')} // Use the background image
      style={styles.background}
    >
      <View className="flex justify-center">
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}
            onPress={() => navigation.goBack()} // Go back to the previous screen
          >
            <FontAwesome name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
  
          <TouchableOpacity onPress={handleProfilePicturePick}>
            <View style={styles.profileImageContainer}>
              {profilePicture ? (
                <Image source={{ uri: profilePicture }} style={styles.profileImage}/>
              ) : (
                <FontAwesome name="user-circle" size={80} color="#A1335D" style={styles.profileImageFallback}/>
              )}
              <FontAwesome name="pencil" size={20} color="#fff" style={styles.editIcon}/>
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>Edit Profile</Text>
        </View>
  
        <View style={styles.form}>
          <Text style={styles.label}>Programme Code</Text>
          <TextInput
            style={styles.input}
            value={programmeCode}
            onChangeText={setProgrammeCode}
            placeholder="Programme Code"
          />
  
                <Text style={styles.label}>Email</Text>
                <TextInput
                style={styles.input}
                value={email}
                onChangeText={(value) => {
                    setEmail(value);
                    if (validateEmail(value)) {
                    setEmailError(''); // Clear the error if the email is valid
                    }
                }}
                placeholder="Email"
                keyboardType="email-address"
                onBlur={() => {
                    if (!validateEmail(email)) {
                    setEmailError('Please enter a valid email address'); // Set an error if the email is invalid
                    }
                }}
                />
                {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
                ) : null}

  
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={styles.passwordInput}
                    value={password}
                    onChangeText={(value) => {
                        setPassword(value);
                        if (value.length >= 8) {
                            setPasswordError('');
                        }
                    }}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    onBlur={() => {
                        if (password.length < 8) {
                            setPasswordError('Password must be at least 8 characters long');
                        }
                    }}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <FontAwesome
                        name={showPassword ? 'eye' : 'eye-slash'}
                        size={20}
                        color="#A1335D"
                    />
                </TouchableOpacity>
            </View>
            {passwordError && password.length < 8 ? ( // Show error for password length
                <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={styles.passwordInput}
                    value={confirmPassword}
                    onChangeText={(value) => {
                        setConfirmPassword(value);
                        if (value === password) {
                            setPasswordError(''); // Clear error if passwords match
                        }
                    }}
                    placeholder="Confirm Password"
                    secureTextEntry={!showConfirmPassword}
                    onBlur={() => {
                        if (confirmPassword !== password) {
                            setPasswordError('Passwords do not match');
                        }
                    }}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    <FontAwesome
                        name={showConfirmPassword ? 'eye' : 'eye-slash'}
                        size={20}
                        color="#A1335D"
                    />
                </TouchableOpacity>
            </View>
            {passwordError && confirmPassword !== password && password.length >= 8 ? ( // Show error for mismatch only
                <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
            </View>

        <View style={styles.saveButtonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
  
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
      marginTop: 18,
      marginLeft: 30,
      marginRight: 30,
    },
    label: {
      fontSize: 16,
      color: '#343a40',
      fontWeight: '500',
      marginBottom: 5,
      marginTop:5,
    },
    passwordInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    passwordInput: {
      flex: 1,
      height: 40,
      borderColor: '#A1335D',
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 10,
      paddingRight: 40,
      fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
    },
    eyeIcon: {
      position: 'absolute',
      right: 10,
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
      marginTop: 30,
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
  });
  
  export default EditProfile;
