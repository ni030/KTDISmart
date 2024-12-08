import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import passwordService from './../../services/passwordService'; // Ensure this service is correctly implemented

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    setErrorMessage('');

    if (!validateEmail(email)) {
        setErrorMessage('Invalid email format');
        return;
    }

    try {
        const checkResponse = await passwordService.checkEmailExistence({ email });
        console.log('Check Email Response:', checkResponse); // Log the response
        if (checkResponse.exists) {
            const otpResponse = await passwordService.sendOTP({ email });
            console.log('Send OTP Response:', otpResponse); // Log the response
            if (otpResponse?.status === 'success') {
                Alert.alert('Success', otpResponse.message);
                navigation.navigate('enterOTP', { email });
            } else {
                setErrorMessage(otpResponse?.message || 'Failed to send OTP. Please try again.');
            }
        } else {
            setErrorMessage('Email not found!');
        }
    } catch (error) {
        console.error('Error in handleSubmit:', error); // Log the error
        setErrorMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('./../../images/forgotPic.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>Enter your email address to recover your account.</Text>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          keyboardType="email-address"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
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
    marginBottom: 25,
    color: '#a02c4c', 
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black', 
    marginTop: 20,
    marginBottom: 30,
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    color: '#000',
  },
  button: {
    width: '100%', 
    height: 50, 
    backgroundColor: '#a02c4c',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: { color: 'red', marginBottom: 10, textAlign: 'left', width: '100%' },
});

export default ForgotPassword;