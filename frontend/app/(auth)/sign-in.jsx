import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Image, ScrollView, Text, TextInput, View } from 'react-native'

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    alert('Username: ' + username + ' Password: ' + password);
  }

  return (
    <ScrollView className="h-full flex bg-yellow-100">
      <View className="flex-1 flex flex-col justify-center items-center bg-yellow-50">
        <View className="relative w-full h-[250px]">
          <Image 
            source={{ uri: "https://studentaffairs.utm.my/ktdi/wp-content/uploads/sites/10/2021/03/f59ee202-ec84-44fe-86e1-cb2b5f3b0e6a.jpg" }} 
            className="z-0 w-full h-[250px]" 
          />
          <Text className="text-4xl text-yellow-500 absolute bottom-0 px-3 font-extrabold">
            Welcome to KTDI
          </Text>
        </View>
        <View className="h-auto flex flex-col justify-center items-center gap-2 w-4/5">
          <TextInput 
            className="w-full p-2 border-b-2 border-yellow-500" 
            onChangeText={setUsername}
            placeholder="Username"
          />
          <TextInput 
            className="w-full p-3 border-b-2 border-yellow-500" 
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <Button 
            title={"Sign In"} 
            onPress={handleSignIn}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default SignIn