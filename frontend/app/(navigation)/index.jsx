

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import NavigationMap from "../../components/navigation/NavigationMap";
import NavigationBottomSheet from "../../components/navigation/NavigationBottomSheet";


export default function index() {
    return(
        <GestureHandlerRootView>
            <NavigationMap/>
            <NavigationBottomSheet/>
        </GestureHandlerRootView>
        // <SafeAreaView>
        //     <View>
        //         <NavigationMap/>
        //         <Text>HAHAHAH</Text>
        //     </View>
        //     <NavigationMap/>
        // </SafeAreaView>
    );
};