import { Image, View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { icons } from "../../constants/index";
import { useState } from "react";
import { saveSearchLocation } from "../../services/manageLocation";


const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY

const styles = StyleSheet.create({
    viewContainer:{
        flexDirection:'row',
        borderRadius:20,
        backgroundColor:'#a1335d',
        marginTop:10,
        marginBottom:10,
        width:'90%',
        // zIndex:50,
        shadowColor: "#d4d4d4", // neutral-300 color approximation
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,  // Opacity to give a softer shadow
        shadowRadius: 4,     // Blur effect similar to medium shadow
        elevation: 6,
    },
});

const GoogleTextInput=({
    initialLocation,
    textInputBackgroundColor,
    handlePress,
    moveMap,
    bottomSheetRef,

})=>{
    const handleFocus = () => {
        bottomSheetRef.current.snapToIndex(2); // Snap to 90% when input is focused
    };

    const handleBlur = () => {
        bottomSheetRef.current.snapToIndex(1);// Snap to 50% when input is blurred
    };

    return(
        <View style={styles.viewContainer}>
        <GooglePlacesAutocomplete 
            fetchDetails={true}
            placeholder="Search Maps"
            debounce={200}
            styles={{
                textInputContainer:{
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:20,
                    marginHorizontal:15,
                    position:'relative',
                    
                },
                textInput:{
                    backgroundColor:textInputBackgroundColor||'#a1335d',
                    fontSize:16,
                    fontWeight:'400',
                    marginTop:5,
                    width:"100%",
                    borderRadius:200,
                    color:'white'
                },
                listView: {
                    backgroundColor: textInputBackgroundColor || 'white',
                    position:'relative',
                    top: 0,
                    width:"100%",
                    borderBottomRadius:10,
                    shadowColor:'black',
                    zIndex:99,
                    shadowColor: "#d4d4d4", // neutral-300 color approximation
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,  // Opacity to give a softer shadow
                    shadowRadius: 4,     // Blur effect similar to medium shadow
                    elevation: 6,
                }
            }}
            onPress={(data,details=null)=>{
                bottomSheetRef.current.snapToIndex(0);
                moveMap(details?.geometry.location.lat,details?.geometry.location.lng);
                handlePress({
                    latitude: details?.geometry.location.lat,
                    longitude: details?.geometry.location.lng,
                    address: data.description,
                });
            }}
            query={{
                key: googlePlacesApiKey,
                language: 'en',
            }}
            renderLeftButton={()=>(
                <View className="justify-center items-center w-6 h-6">
                    <Image 
                        source={require("../../assets/search.png")} 
                        className="w-5 h-5" 
                        resizeMode="contain" 
                        backgroundColor="#a1335d"
                        zIndex={100}
                    />
                </View>
            )}
            textInputProps={{
                placeholderTextColor:'white',
                placeholder: initialLocation?? "Search Maps",
                onFocus: handleFocus, // Call handleFocus on input focus
                onBlur: handleBlur,   // Call handleBlur on input blur
            }}
        />
        </View>
    )
}

export default GoogleTextInput;