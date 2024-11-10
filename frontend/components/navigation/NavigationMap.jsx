import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import { useLocationStore } from "../../store";
import { calculateRegion } from "../../lib/map";

const NavigationMap=()=>{
    const {
        userLongitude, userLatitude, destinationLatitude, destinationLongitude,
    } = useLocationStore();

    const region = calculateRegion({
        userLongitude, userLatitude, destinationLatitude, destinationLongitude,
    });

    const styles = StyleSheet.create({
        map:{
            flex:1,
            position:"relative"
        },
    });

    return(
        <View style={styles.container}>
        
        <MapView 
                style={styles.map}
                provider={PROVIDER_DEFAULT}
                // tintColor="black"
                // mapType="mutedStandard"
                showsPointsOfInterest={false}
                initialRegion={region}
                showsUserLocation={true}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
            >
            <Text>Map</Text>
        </MapView>
        </View>
    );
};

export default NavigationMap;