import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MyTextInput from '../../components/auth_component/LoginForm';
import { useNavigation } from '@react-navigation/native';
import authService from '../../services/authServices';
import * as SecureStore from 'expo-secure-store'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {

    const METHOD = "handleLogin"

    console.log(`${METHOD} | start`)
    console.log(`${METHOD} | username -> ${username} | password -> ${password}`)
    // Input validation
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      // Call the login service
      const response = await authService.login({ username: username, password });
      console.log(`${METHOD} | response -> ${JSON.stringify(response)}`)

      // Save the token securely
      await SecureStore.setItemAsync('token', response.token);
      await SecureStore.setItemAsync('userId', response.userId);

      Alert.alert('Congrats!', 'Login successful!');
      navigation.navigate('(home)');
  
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Invalid username and password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('forgot');
  };

  const handleSignUp = () => navigation.navigate('register');

  return (
    <ImageBackground
      className="w-full h-full"
      source={require('./../../images/backg.png')}
      resizeMode="cover"
    >
      <View className="w-full h-full bg-white/60 flex justify-center items-center">
        <View className="w-full flex justify-end items-center gap-3">
          <Image
            style={{ width: 320, height: 300 }}
            resizeMode="contain"
            source={require('./../../images/mainLogo.png')}
          />
          <Text className="text-3xl text-primary-400 font-bold">Resident LOGIN</Text>
          <Text style={{ fontSize: 18, color: 'gray', marginTop: 8 }}>Welcome to KTDI Smart !</Text>
        </View>

        <View style={{ width: '80%', marginTop: 24 }}>
          <MyTextInput
            label="  Username"
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            keyboardType="default"
            icon="user"
            iconType="FontAwesome"
            editable={!isLoading}
          />
          <MyTextInput
            label="    Password"
            placeholder="**********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
            icon="lock"
            isPassword={true}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
            editable={!isLoading}
          />
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 8 }}>...</Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#A1335D',
              padding: 12,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 16,
              opacity: isLoading ? 0.7 : 1,
              flexDirection: 'row',
              justifyContent: 'center'
            }}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ActivityIndicator color="white" style={{ marginRight: 8 }} />
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Logging in...</Text>
              </>
            ) : (
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
            <View style={{ height: 1, flex: 1, backgroundColor: '#D1D5DB' }} />
            <Text style={{ marginHorizontal: 8, color: 'gray' }}>OR</Text>
            <View style={{ height: 1, flex: 1, backgroundColor: '#D1D5DB' }} />
          </View>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F3F4F6',
              padding: 12,
              borderRadius: 8,
              marginTop: 16
            }}
            onPress={handleForgotPassword}
            disabled={isLoading}
          >
            <AntDesign name="questioncircle" size={20} color="#AA4760" />
            <Text style={{ marginLeft: 8, color: '#A1335D', fontWeight: 'bold' }}>Forgot Password</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
            <Text style={{ color: 'gray' }}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp} disabled={isLoading}>
              <Text style={{ color: '#A1335D', fontWeight: 'bold' }}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;
