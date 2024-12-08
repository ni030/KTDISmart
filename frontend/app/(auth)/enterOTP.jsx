import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import passwordService from './../../services/passwordService';

const EnterOTP = () => {
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};

  const handleSubmitOTP = async () => {
    if (otp.length !== 4) {
      setErrorMessage('OTP must be 4 digits');
      return;
    }

    try {
      const response = await passwordService.verifyOTP({ email, otp });
      if (response?.status === 'success') {
        Alert.alert('Success', response.message);
        navigation.navigate('resetPassword', { email });
      } else {
        setErrorMessage(response?.message || 'Invalid OTP');
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('./../../images/otpPic.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>A 4-digit code has been sent to your email.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="numeric"
          maxLength={4}
          value={otp}
          onChangeText={setOtp}
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSubmitOTP}>
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
    marginBottom: 10,
    color: '#a02c4c', 
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black', 
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop:20,
    marginBottom: 50,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
  },
  resendText: {
    color: 'gray',
    marginTop: 25,
  },
  button: {
    backgroundColor: '#a02c4c',
    width: '98%',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign:'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EnterOTP;
