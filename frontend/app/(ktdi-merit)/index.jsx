import React, { useEffect, useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { SafeAreaView, Text, View } from 'react-native';
import { PaperProvider, IconButton } from 'react-native-paper';
import Loader from '../../components/root/Loader';
import ActivityTable from '../../components/ktdi-merit/ActivityTable';
import SubMenu from '../../components/ktdi-merit/SubMenu';

export default function Index() {
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
      <SafeAreaView className="w-screen h-screen bg-primary-500">
        {loading && (
          <Loader
            size="large"
            color="#ffffff"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} // Custom background color
          />
        )}
        <View className="w-full h-auto p-5 flex flex-row justify-between items-center text-slate-800">
          <FontAwesome6 name="bed" size={72} color="white" />
          <View className="p-5">
            <Text className="text-xl font-bold text-white">Name: LIM SI NI</Text>
            <Text className="text-white text-base font-rootR">Matric Number: A22EC0070</Text>
            <Text className="text-white text-base font-rootR">Chosen Room: 123, MA4</Text>
          </View>
          <IconButton
            icon={() => <FontAwesome6 name="ellipsis-vertical" size={24} color="white" />}
            onPress={changeVisible}
            className="ml-2"
          />
        </View>
        <ActivityTable />
        <SubMenu visible={visible} setVisible={setVisible} />
      </SafeAreaView>
    </PaperProvider>
  );
}