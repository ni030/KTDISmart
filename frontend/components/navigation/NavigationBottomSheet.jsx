import { useCallback, useMemo, useRef } from "react"
import { StyleSheet, View, Text, Keyboard } from "react-native";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import GoogleTextInput from "./GoogleTextInput";
import { useLocationStore } from "../../store";

const NavigationBottomSheet = ({
    mapRef,
    userLatitude,
    userLongitude
}) => {
    console.log(userLatitude)
    console.log(userLongitude)
    const snapPoints = useMemo(()=>['14%','50%','92%']);
    const bottomSheetRef = useRef(null);
    const handleSheetChanges = useCallback((index) => {
        if(index!==2){
            Keyboard.dismiss();
        }
    },[]);
    const { setDestinationLocation } = useLocationStore();

    async function moveToLocation(latitude,longitude){
        let latitudeDelta;
        let longitudeDelta;
        const R = 6371; // Radius of the earth in km
        const dLat = (latitude - userLatitude) * (Math.PI / 180);
        const dLon = (longitude - userLongitude) * (Math.PI / 180);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(userLatitude * (Math.PI / 180)) * Math.cos(latitude * (Math.PI / 180)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
        const distance = R * c; // Distance in km
        if (distance > 10) {  // City-level
            latitudeDelta = 0.05;
            longitudeDelta = 0.05;
        } else if (distance > 1) {  // Neighborhood-level
            latitudeDelta = 0.01;
            longitudeDelta = 0.01;
        } else {  // Very close zoom (e.g., building)
            latitudeDelta = 0.005;
            longitudeDelta = 0.005;
        }
        mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
        },2000);
    }

    const handleDestinationPress=({latitude,longitude,address})=>{
        setDestinationLocation(latitude,longitude,address);
        moveToLocation(latitude,longitude)
    };

    const Row = ({ children }) => (
        <View style={styles.row}>{children}</View>
    );

    const Col = ({ numRows, children }) => {
        return  (
          <View style={styles[`${numRows}col`]}>{children}</View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex:1,
            zIndex:1,
            pointerEvents:'box-none', //alow map below to interact
            // alignContent:'center'
        },
        bottomSheet:{
            flex:1,
            zIndex:2,
            backgroundColor:'transparent',
            pointerEvents:'auto', //ensure bottom sheet itself is interactive
        },
        contentContainer: {
            flex: 1,
            zIndex:3,
            alignItems: 'center',
            backgroundColor:'white',
            borderRadius:15,
        },
        title:{
            marginTop: 13,
            marginLeft: 22,
            marginBottom:10,
            fontWeight:'500',
            textAlignt:'left'
        },
        appName:{
            marginTop: 13,
            marginBottom:10,
        },
        label:{
            fontWeight:'200',
        },
        favouriteContainer: {
            // flex:3,
            // marginLeft: 22,
            alignContent:'center',
            justifyContent:'center',
            width:"90%",
            height: 160,           
            backgroundColor:'lightgray',
            borderRadius:20,
            marginBottom:10
        },
        recentsContainer: {
            // flex:3,
            // marginLeft: 22,
            alignContent:'center',
            justifyContent:'center',
            width:"90%",
            height: 160,           
            backgroundColor:'lightgray',
            borderRadius:20,
            marginBottom:15
        },
        functionContainer:{
            alignContent:'center',
            justifyContent:'center',
            width:"90%",
            backgroundColor:'lightgray',
            borderRadius:20,
            marginTop:10,
            marginBottom:10,
            height:50
        }
    });

    return(
        <View style={styles.container}>
            <BottomSheet 
                ref={bottomSheetRef} 
                snapPoints={snapPoints} 
                index={1} 
                onChange={handleSheetChanges}
                style={styles.bottomSheet}
                enablePanDownToClose={false}
                animateOnMount={false}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <GoogleTextInput
                        containerStyle="bg-black shadow-md shadow-neutral-300"
                        handlePress={handleDestinationPress}
                        moveMap={moveToLocation}
                        bottomSheetRef={bottomSheetRef}
                    />
                    <View className="w-full">
                        <Text style={styles.title}>Favourites</Text>
                    </View>
                    <View style={styles.favouriteContainer}>
                        <Text></Text>
                    </View>
                    <View className="w-full">
                        <Text style={styles.title}>Recents</Text>
                    </View>
                    <View style={styles.recentsContainer}>
                        <Text></Text>
                    </View>
                    <View style={styles.functionContainer}>
                        <Text className="text-center font-medium">Mark My Location</Text>
                    </View>

                    <View style={styles.functionContainer}>
                        <Text className="text-center font-medium">Share My Location</Text>
                    </View>
                    <View style={styles.appName}>
                        <Text style={styles.label}>KTDI Smart</Text>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </View>
    )
};

export default NavigationBottomSheet;