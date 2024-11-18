import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import { useLocationStore } from "../../store";
import { calculateRegion } from "../../lib/map";
import NavigationBottomSheet from "./NavigationBottomSheet";

const NavigationMap=()=>{
    const mapRef = useRef(null);

    const {
        userLongitude, userLatitude, userAddress, destinationLatitude, destinationLongitude, destinationAddress
    } = useLocationStore();

    const regionRef = useRef(null);

    const region = calculateRegion({
        userLongitude, userLatitude, destinationLatitude, destinationLongitude,
    });

    const styles = StyleSheet.create({
        container: {
            ...StyleSheet.absoluteFillObject, // Fill the container
            pointerEvents: "auto", // Allow interactions with the map
        }
    });

    return(
    <View style={styles.container}>
        <MapView
                ref={mapRef} 
                regionRef={regionRef}
                style={StyleSheet.absoluteFillObject}
                provider={PROVIDER_DEFAULT}
                mapType="standard"
                tintColor="default"
                showsPointsOfInterest={false}
                initialRegion={region}
                showsUserLocation={true}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
            >
        </MapView>
        <NavigationBottomSheet
            mapRef={mapRef}
            userLatitude={userLatitude}
            userLongitude={userLongitude}
        />
    </View>
    );
};

export default NavigationMap;