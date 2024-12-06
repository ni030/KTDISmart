import React, { useEffect, useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { SafeAreaView, Text, View } from 'react-native';
import { PaperProvider, IconButton } from 'react-native-paper';
import Loader from '../../components/root/Loader';
import ActivityTable from '../../components/ktdi-merit/ActivityTable';
import SubMenu from '../../components/ktdi-merit/SubMenu';

export default function Index() {
  //Temporary user id
  const user_id = "1a473cd0-9c4d-4a80-bcd6-cfcd2448a430"
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const changeVisible = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      setLoading(false);
    };
    loadData();
  }, []);

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
            <Text className="font-bold text-xl text-white">Name: LIM SI NI</Text>
            <Text className="text-white text-base">Matric Number: A22EC0080</Text>
            <Text className="text-white text-base">Chosen Room: 123, MA4</Text>
          </View>
            <IconButton
              icon={() => <FontAwesome6 name="ellipsis-vertical" size={24} color="white" />}
              onPress={changeVisible}
            />
        </View>
        <ActivityTable user_id={user_id}/>
        <SubMenu visible={visible} setVisible={setVisible} user_id={user_id}/>
      </SafeAreaView>
    </PaperProvider>
  );
}