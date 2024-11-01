import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import googleTextInput from './googleTextInput';

export default function index() {
  const handleDestinationPress=()=>{

  };

  return (
    <SafeAreaView>
      <Text>Welcome to Navigation Page</Text>
      <googleTextInput
        containerStyle="bg-white shadow-md shadow-neutral-300"
        handlePress={handleDestinationPress}
      />
      <Text className="text-xl font-JakartaBold mt-5 mb-3">
        Your Current Location
      </Text>
      <View className="flex flex-row items-center bg-transparent h-[300px]">
        <Map />
      </View>
      <Text className="text-xl font-JakartaBold mt-5 mb-3">
        Recent Searches
      </Text>
    </SafeAreaView>
  );
}