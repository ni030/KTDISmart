import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EnterOTP = () => {

  const navigation = useNavigation(); 

  return (
    <ImageBackground
      source={require('./../../images/otpPic.png')} 
      style={styles.background}
      resizeMode="cover" 
    >
      <View style={styles.overlay} /> 
      <View style={styles.container}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>
          A 4-digit code has been sent to your email.
        </Text>
        <View style={styles.otpContainer}>
          {[...Array(4)].map((_, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('resetPassword')}
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
