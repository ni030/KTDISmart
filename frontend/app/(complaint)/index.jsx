import MyCard from '../../components/complaint/card';
import { SafeAreaView, Text, View} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export default function Index(){
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
          </SafeAreaView>
        
      );
}