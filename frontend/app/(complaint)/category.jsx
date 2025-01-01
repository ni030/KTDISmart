import React, { useEffect, useState } from 'react';
import MyCard from '../../components/complaint/card';
import { SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/root/Loader';
import * as SecureStore from 'expo-secure-store';
import authService from '../../services/authServices';

export default function Category(){
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUserId = await SecureStore.getItemAsync('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          const response = await authService.getUserById(storedUserId);
          setUserInfo(response.user); // Set userInfo as an object
        } else {
          console.log('No userId found');
        }
      } catch (error) {
        console.error('Error retrieving userId:', error);
      }
      await new Promise(resolve => setTimeout(resolve, 200));
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return <Loader />;
  }

    return (
          <SafeAreaView className="w-screen h-screen bg-primary-500">
            <View className="w-full h-auto p-5 flex mt-5">
                <Text className="text-4xl text-white">How can we assist you today?</Text>
            </View>
            <View className="flex flex-row">
              <View className="basis-1/2">
                <MyCard  icon={() => <FontAwesome6 name="plug" size={56} color="black" />} title="Electrical" userId={userId} userInfo={userInfo}/>
              </View>
              <View className="basis-1/2"> 
                <MyCard icon={() => <FontAwesome6 name="bug" size={56} color="black" />} title="Pest Control" userId={userId} userInfo={userInfo}/></View>
            </View>
            <View className="flex flex-row">
              <View className="basis-1/2">
                <MyCard icon={() => <FontAwesome6 name="water" size={56} color="black" />} title="Piping" userId={userId} userInfo={userInfo}/>
              </View>
              <View className="basis-1/2"> 
                <MyCard icon={() => <FontAwesome6 name="toilet" size={56} color="black" />} title="Sanitary" userId={userId} userInfo={userInfo}/>
              </View>
            </View>
            <View className="flex items-center mt-5">
              <TouchableOpacity onPress={() => navigation.navigate('report', {cat:'Other', userId:userId, userInfo:userInfo})}>
                <Text className="text-lg text-white underline">Report other issues?</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        
      );
}