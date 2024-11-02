import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import Map from './map'

export default function index() {
  const handleDestinationPress=()=>{

  };

  return (
    <SafeAreaView>
      <Text>Welcome to Navigation Page hahaha</Text>
      
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