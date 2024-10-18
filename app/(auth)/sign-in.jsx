import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native'

const SignIn = () => {
  return (
    <SafeAreaView className="flex h-screen justify-center items-center">
        <Text className="text-xl text-yellow-600">Halo, Welcome to Sign In</Text>
    </SafeAreaView>
  )
}

export default SignIn