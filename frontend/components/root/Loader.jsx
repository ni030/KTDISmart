import React from 'react'
import { View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Loader = () => {
  return (
    <View className="h-full w-full flex justify-center items-center bg-primary-600">
        <ActivityIndicator animating={true} color="#ffffff" size="large"/>
    </View>
  )
}

export default Loader