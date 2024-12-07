import React, { useEffect, useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { SafeAreaView, Text, View } from 'react-native';
import { PaperProvider, IconButton } from 'react-native-paper';
import Loader from '../../components/root/Loader';
import ActivityTable from '../../components/ktdi-merit/ActivityTable';
import SubMenu from '../../components/ktdi-merit/SubMenu';
import authService from '../../services/authServices';
import * as SecureStore from 'expo-secure-store';

export default function Index() {
  const [userId, setUserId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const changeVisible = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUserId = await SecureStore.getItemAsync('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          const response = await authService.getUserById(storedUserId);
          setUserInfo(response.user); // Set userInfo as an object
          console.log("User info -> ", response.user);
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
    <PaperProvider>
      <SafeAreaView className="w-screen h-screen bg-primary-500 flex justify-start items-center">
        {loading && (
          <Loader
            size="large"
            color="#ffffff"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} 
          />
        )}
        <View className="w-11/12 h-auto p-5 flex flex-row justify-evenly items-center my-3 text-slate-800">
          <View className="mx-3">
            <FontAwesome6 name="bed" size={72} color="white" />
          </View>
          <View className="p-3 mx-4">
            <Text className="font-bold text-xl text-white">Name: {userInfo.name}</Text>
            <Text className="text-white text-base">Matric Number: {userInfo.matricno}</Text>
            <Text className="text-white text-base">Gender: {userInfo.gender}</Text>
          </View>
          <IconButton
            icon={() => <FontAwesome6 name="ellipsis-vertical" size={24} color="white" />}
            onPress={changeVisible}
          />
        </View>
        <ActivityTable userId={userId}/>
        <SubMenu visible={visible} setVisible={setVisible} userId={userId} gender={userInfo.gender}/>
      </SafeAreaView>
    </PaperProvider>
  );
}