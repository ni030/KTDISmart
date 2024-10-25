import React, { useState } from "react";
import { SafeAreaView, TextInput, View, Alert, TouchableOpacity, Text } from "react-native";
import { Button } from "react-native-paper";
import { createUser } from "../../services/manageUser";

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
      const res = await createUser(username, password);
      if (res === "Success") {
        Alert.alert("Success", "User created successfully");
      } else {
        Alert.alert("Error", "Sign up failed");
      }
    } catch (error) {
      console.error("Error at sign-up:", error);
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
        
        <Button icon="camera" mode="contained" onPress={handleSignUp} color="">
          <TouchableOpacity>
            <Text className="text-white">Sign Up</Text>
          </TouchableOpacity>
          </Button>
        
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
