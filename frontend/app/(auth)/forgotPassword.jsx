import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import passwordService from './../../services/passwordService'; // Ensure this service is correctly implemented
import { sendOtpEmail} from '../../services/resetPasswordService';
import otpService from '../../services/otpService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    console.log("submit -> " + email)
    setErrorMessage('');

    if (!validateEmail(email)) {
        console.log("invalid email format -> " + email)
        setErrorMessage('Invalid email format');
        return;
    }

    try {
        console.log("calling  checkEmailExistence -> " + email)
        const checkResponse = await passwordService.checkEmailExistence({ email });
        console.log("checkResponse -> " + JSON.stringify(checkResponse))

        if (checkResponse?.exists) {
          const otpResponse = await otpService.sendOTP(email);

          if (otpResponse?.success) {
            // Show success message
            Alert.alert('Success', otpResponse.message || 'OTP has been sent to your email.');
            // Navigate to the OTP input screen, passing the email as a parameter
            navigation.navigate('enterOTP', { email });
          } else {
            // If sending OTP failed
            setErrorMessage(otpResponse?.message || 'Failed to send OTP. Please try again.');
          }
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
    height: 40, // Reduce the height for a bar-like appearance
    borderBottomWidth: 1, // Add a bottom border for a minimalistic style
    borderColor: '#ccc',
    paddingHorizontal: 10, // Add horizontal padding for better spacing
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: 'transparent', // Make it transparent for a cleaner look
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