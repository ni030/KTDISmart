import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import otpService from '../../services/otpService';
import passwordService from './../../services/passwordService';
import { OtpInput } from "react-native-otp-entry";

const EnterOTP = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const route = useRoute();
  const { email } = route.params || {};

  const handleSubmit = async () => {
    if (otp.length !== 4) {
      Alert.alert('Invalid OTP', 'OTP must be 4 digits.');
      return;
    }
    
    try {
      console.log(`email -> ${email} | otp -> ${otp}`)
      const response = await otpService.verifyOTP(email, otp)
      console.log(`response -> ${JSON.stringify(response)}`)
      if (response.success) {
        Alert.alert('Success', 'OTP verified successfully.');
        navigation.navigate('resetPassword', { email });
      } else {
        Alert.alert('Invalid OTP', response.data.message || 'The OTP is incorrect.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
      console.log("submit -> " + email)
  
      try {
          console.log("calling  checkEmailExistence -> " + email)
          const checkResponse = await passwordService.checkEmailExistence({ email });
          console.log("checkResponse -> " + JSON.stringify(checkResponse))
  
          if (checkResponse?.exists) {
            const otpResponse = await otpService.sendOTP(email);
  
            if (otpResponse?.success) {
              // Show success message
              Alert.alert('Success', otpResponse.message || 'OTP has been sent to your email.');
            } else {
              // If sending OTP failed
              Alert.alert('Unsuccessful', otpResponse.message || 'Failed to send OTP. Please try again.');
            }
          }
          
      } catch (error) {
          console.error('Error in handleSubmit:', error); // Log the error
      }
    };

  return (
    <ImageBackground
      source={require('./../../images/otpPic.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>
          A 4-digit code has been sent to your email or phone.
        </Text>
        {/* <TextInput
          style={styles.otpInput}
          maxLength={4}
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
          placeholder="OTP"
          placeholderTextColor="#ccc"
        /> */}
        <OtpInput 
          onTextChange={setOtp}
          numberOfDigits={4}
          containerStyle={styles.otpContainer}
          inputStyle={styles.otpInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={()=>handleSubmit()}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleResendOtp()}>
          <Text style={styles.resendText}>Resend OTP</Text>
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
  otpInput: {
    width: '50%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 15,
    paddingHorizontal: 10,
    color: 'black',
  },
  resendText: {
    color: 'gray',
    marginTop: 18,
  },
  button: {
    backgroundColor: '#a02c4c',
    width: '98%',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    margin: 5,
    borderWidth: 1,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'white',
    color: 'black',
  },
});

export default EnterOTP;
