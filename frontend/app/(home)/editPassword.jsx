import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import passwordService from './../../services/passwordService';

const editPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    try {
      const response = await passwordService.editPassword({ email, newPassword });
  
      if (response?.success) {
        Alert.alert('Success', response.message || 'Profile updated!');
        navigation.navigate('Home');
      } else {
        setErrorMessage(response?.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    }
  };
  

  return (
    <ImageBackground
      source={require('./../../images/resetPic.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#a02c4c', 
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for input fields
    color: '#000',
  },
  button: {
    width: '100%', 
    height: 50, 
    backgroundColor: '#a02c4c',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default editPassword;
