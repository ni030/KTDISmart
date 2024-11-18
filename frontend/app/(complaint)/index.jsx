import MyCard from '../../components/complaint/card';
import { SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

export default function Index(){
  const navigation = useNavigation();
    return (
          <SafeAreaView className="w-screen h-screen bg-primary-500">
            <View className="w-full h-auto p-5 flex mt-5">
                <Text className="text-4xl text-white">How can we assist you today?</Text>
            </View>
            <View className="flex flex-row">
              <View className="basis-1/2">
                <MyCard  icon={() => <FontAwesome6 name="plug" size={56} color="black" />} title="Electrical"/>
              </View>
              <View className="basis-1/2"> 
                <MyCard icon={() => <FontAwesome6 name="bug" size={56} color="black" />} title="Pest Control"/></View>
            </View>
            <View className="flex flex-row">
              <View className="basis-1/2">
                <MyCard icon={() => <FontAwesome6 name="water" size={56} color="black" />} title="Piping"/>
              </View>
              <View className="basis-1/2"> 
                <MyCard icon={() => <FontAwesome6 name="toilet" size={56} color="black" />} title="Sanitary"/>
              </View>
            </View>
            <View className="flex items-center mt-5">
              <TouchableOpacity onPress={() => navigation.navigate('report', {cat:'Other'})}>
                <Text className="text-lg text-white underline">Report other issues?</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        
      );
}