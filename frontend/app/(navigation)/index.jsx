import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import GoogleTextInput from './GoogleTextInput';
import Map from './map'

export default function index() {
  const handleDestinationPress=()=>{

  };

  return (
    <SafeAreaView>
      <Text>Welcome to Navigation Page hahaha</Text>
      <GoogleTextInput 
        containerStyle="bg-white shadow-md shadow-neutral-300"
        handlePress={handleDestinationPress}
      />
      <Text>
        Your Current Location
      </Text>
      <View className="flex flex-row items-center bg-transparent h-[300px]">
        <Map />
      </View>
      <Text>
        Recent Searches
      </Text>
    </SafeAreaView>
  );
}