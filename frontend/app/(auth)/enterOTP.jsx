import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EnterOTP = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');

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
        <TextInput
          style={styles.otpInput}
          maxLength={4}
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
          placeholder="OTP"
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (otp === '2234') {
              navigation.navigate('resetPassword');
            } else {
              Alert.alert('Invalid OTP', 'The OTP you entered is incorrect.');
            }
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
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
});

export default EnterOTP;
