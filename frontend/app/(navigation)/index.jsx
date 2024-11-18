import * as Location from 'expo-location'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import NavigationMap from "../../components/navigation/NavigationMap";
import { useLocationStore } from '../../store';
import React, { useEffect, useState } from 'react';

export default function index() {
    const {
        userLongitude, userLatitude, userAddress, destinationLatitude, destinationLongitude, destinationAddress
    } = useLocationStore();

    const { setUserLocation, setDestinationLocation } = useLocationStore();
    const { hasPermissions, setHasPermissions } = useState(false);
    useEffect(()=>{
        const requestLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if(status!='granted'){
                setHasPermissions(false)
                return;
            }

            let location = await Location.getCurrentPositionAsync();

            if(location&&location.coords){
                const address = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                //Check if the address array is not empty
                if(address.length>0){
                    setUserLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        address: '${address[0].name}, ${address[0].region}',
                    });
                }else{
                    //Handle the case where no address is found
                    setUserLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        address: 'Address not found',
                    });
                }
            }
        };

        requestLocation();
    }, []);
    return(
        <GestureHandlerRootView style={styles.container} pointerEvents="box-none">
            <NavigationMap/>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})