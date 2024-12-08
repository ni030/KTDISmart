import { Text, View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NoComplaint = () => {
    const navigation = useNavigation();
    return(
        <View>
            <View className="w-full h-auto p-5 flex items-center mt-5">
                <Text className="text-xl text-white">No complaints yet.</Text>
            </View>
            <View className="flex items-center mt-5">
              <TouchableOpacity onPress={() => navigation.navigate('category')}>
                <Text className="text-lg text-white underline">Report issues?</Text>
              </TouchableOpacity>
            </View>
        </View>  
    )
};

export default NoComplaint;