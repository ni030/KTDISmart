import * as Location from 'expo-location'
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import GoogleTextInput from '../../components/GoogleTextInput';
import Map from '../../components/Map';
import { useLocationStore } from '../../store';
import { useEffect, useState } from 'react';

export default function index() {
    const { setUserLocation, setDestinationLocation } = useLocationStore();
    const { hasPermissions, setHasPermissions } = useState(false);
    const handleDestinationPress=()=>{};
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
    }, [])

    return (
         <SafeAreaView className="mr-3 ml-3">
            <GoogleTextInput 
                containerStyle="bg-white shadow-md shadow-neutral-300"
                handlePress={handleDestinationPress}
            />
            <Text className="text-xl font-rootSB mt-5 mb-3">
                Your Current Location
            </Text>
            <View className="flex flex-row items-center bg-transparent h-[400px]">
                <Map/>
            </View>
            <Text className="text-xl font-rootSB mt-5 mb-3 mr-3">
                Recent Searches
            </Text>
        </SafeAreaView>
    );
}