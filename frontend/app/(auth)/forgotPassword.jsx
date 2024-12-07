import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const navigation = useNavigation(); 

  return (
    <ImageBackground
      source={require('./../../images/forgotPic.png')} 
      style={styles.background}
      resizeMode="cover" 
    >
      <View style={styles.overlay} /> 
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password ?</Text>
        <Text style={styles.subtitle}>
          Please enter your account email address for account recovery purpose.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email ID"
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('enterOTP')}
        >
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
});

export default ForgotPassword;
