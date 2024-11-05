import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

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
    source={require('./../../images/backg.png')}
      style={{ flex: 1 }} 
      resizeMode="cover" 
    >
      <StatusBar style="dark" />
      <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.6)', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <Image 
            style={{ width: 270, height: 200, marginBottom: 22}} 
            source={require('./../../images/mainLogo.png')}
            resizeMode="cover" 
          />
          <Text style={{ fontSize: 29, fontWeight: 'bold', color: '#A1335D' }}>Resident LOGIN</Text>
          <Text style={{ fontSize: 18, color: 'gray', marginTop: 8 }}>Wel9come to KTDI Smart !</Text>
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
            <Text style={{ marginLeft: 8, color: '#A1335D', fontWeight: 'bold' }}>Sign in with Google</Text>
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

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View style={{ marginTop: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Octicons name={icon} size={30} color="#A1335D" style={{ marginRight: 8 }} />
        <Text style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}>{label}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderColor: '#D1D5DB', padding: 8 }}>
        <TextInput 
          style={{ flex: 1, fontSize: 18 }}
          placeholderTextColor="#a1a1a1"
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color="#a1a1a1" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Login;
