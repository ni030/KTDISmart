import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, Alert, Scro, ScrollView} from 'react-native';
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';
import MyTextInput from '../../components/auth_component/LoginForm';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = () => {
    // Handle login logic here
    Alert.alert("Login Info", `Email: ${email}\nPassword: ${password}`);
  };
  
  return (
      <ImageBackground
        className="w-full h-full " 
        source={require('./../../images/backg.png')}
        resizeMode="cover" 
      >
        <View className="w-full h-full bg-white/60 flex justify-center items-center">
          <View className="w-full flex justify-end items-center gap-3">
            <Image 
              style = {{ width: 320, height: 300 }}
              resizeMode="resize"
              source={require('./../../images/mainLogo.png')}
            />
            <Text className="text-3xl text-primary-400 font-bold">Resident LOGIN</Text>
            <Text style={{ fontSize: 18, color: 'gray', marginTop: 8 }}>Welcome to KTDI Smart !</Text>
          </View>
          
          <View style={{ width: '80%', marginTop: 24 }}>
            <MyTextInput
              label="  Email Address"
              placeholder="centerpoint@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              icon="mail"
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
            />
            <Text style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>...</Text>

            <TouchableOpacity 
              style={{ backgroundColor: '#A1335D', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 16 }}
              onPress={handleLogin}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
              <View style={{ height: 1, flex: 1, backgroundColor: '#D1D5DB' }} />
              <Text style={{ marginHorizontal: 8, color: 'gray' }}>OR</Text>
              <View style={{ height: 1, flex: 1, backgroundColor: '#D1D5DB' }} />
            </View>

            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6', padding: 12, borderRadius: 8, marginTop: 16 }}
            >
              <Fontisto name="google" size={23} color="#AA4760" />
              <Text style={{ marginLeft: 8, color: '#A1335D', fontWeight: 'bold' }}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
              <Text style={{ color: 'gray' }}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={{ color: '#A1335D', fontWeight: 'bold' }}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
      </ImageBackground>
  );
};


export default Login;
