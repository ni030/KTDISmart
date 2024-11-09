import { useCallback, useRef } from "react"
import { StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";

const NavigationBottomSheet = () => {
    const bottomSheetRef = useRef(null);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);
    const styles = StyleSheet.create({
        container: {
            flex:1,
        },
        bottomSheet:{
            position:'absolute',
            zIndex: 10,
            
        },
        contentContainer: {
            padding: 15,
            alignItems: 'center',
            justifyContent: 'center'
        },
    });

    return(
        <GestureHandlerRootView style={styles.container}>
            <BottomSheet 
                ref={bottomSheetRef} 
                snapPoints={['10%','50%','90%']} 
                index={1} 
                onChange={handleSheetChanges}
                style={styles.bottomSheet}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text>Awesome</Text>
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    )
};

export default NavigationBottomSheet;