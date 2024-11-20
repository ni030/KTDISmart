import * as Location from 'expo-location'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Alert, StyleSheet } from "react-native";
import NavigationMap from "../../components/navigation/NavigationMap";
import { useLocationStore } from '../../store';
import React, { useEffect, useState } from 'react';
import { saveCurrentLocation } from '../../services/manageLocation';

export default function index() {
    const matric = 'A22EC0001';
    const {
        userLongitude, userLatitude, userAddress, destinationLatitude, destinationLongitude, destinationAddress
    } = useLocationStore();

    const { setUserLocation, setDestinationLocation } = useLocationStore();
    const [ hasPermissions, setHasPermissions ] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(()=>{
        const requestLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if(status!='granted'){
                setHasPermissions(false)
                setErrorMessage('Location access is required to use this feature. Please enable it in settings.');
                Alert.alert(
                    'Location Permission Required',
                    'Location access is needed to display your current location on the map. Please enable it in your device settings.',
                    [{ text: 'OK' }]
                );
                return;
            }

            setHasPermissions(true);

            let location = await Location.getCurrentPositionAsync();

            if(location&&location.coords){
                const address = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
                const latitude = location.coords.latitude;
                const longitude = location.coords.longitude;

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
                saveCurrentLocation(matric,latitude,longitude)
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