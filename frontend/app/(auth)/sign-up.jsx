import React, { useState } from "react";
import { SafeAreaView, TextInput, Button, View, Alert } from "react-native";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }
  
    setLoading(true);
  
    try {
      // Replace with 10.0.2.2 for Android emulator, or your machine's IP for physical devices
      const response = await axios.post("http://10.0.2.2:3000/api/signup", {
        username,
        password,
      });
  
      if (response.status === 201) {
        Alert.alert("Success", "Sign up successful");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      Alert.alert("Error", "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: "80%" }}>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#000",
            marginBottom: 10,
            padding: 10,
          }}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#000",
            marginBottom: 20,
            padding: 10,
          }}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title={loading ? "Signing up..." : "Sign Up"} onPress={handleSignUp} disabled={loading} />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
