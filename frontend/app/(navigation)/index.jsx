import * as Location from 'expo-location';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Alert, StyleSheet } from "react-native";
import NavigationMap from "../../components/navigation/NavigationMap";
import { useLocationStore } from '../../store';
import React, { useEffect, useState } from 'react';
import { saveCurrentLocation, saveSearchLocation } from '../../services/manageLocation';
import Loader from '../../components/root/Loader';
import authService from '../../services/authServices';
import * as SecureStore from 'expo-secure-store';
import { fetchRecentSearch } from '../../services/manageRecentSearch';

export default function Index() {
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    // const [loading, setLoading] = useState(true);
    const [hasPermissions, setHasPermissions] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const {
        setUserLocation,
    } = useLocationStore();

    // Load user data from SecureStore and API
    useEffect(() => {
        const loadData = async () => {
            try {
                const storedUserId = await SecureStore.getItemAsync('userId');                
                if (storedUserId) {
                    setUserId(storedUserId);
                    const response = await authService.getUserById(storedUserId);
                    setUserInfo(response);
                } else {
                    console.warn('No userId found');
                }
            } catch (error) {
                console.error('Error retrieving userId:', error);
            }
        };

        loadData();
    }, []);

    // Request location and set user location
    useEffect(() => {
        const requestLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    setHasPermissions(false);
                    setErrorMessage('Location access is required to use this feature.');
                    Alert.alert(
                        'Location Permission Required',
                        'Location access is needed to display your current location on the map. Please enable it in your device settings.',
                        [{ text: 'OK' }]
                    );
                    return;
                }

                setHasPermissions(true);

                const location = await Location.getCurrentPositionAsync();
                if (location && location.coords) {
                    const { latitude, longitude } = location.coords;
                    const addressResult = await Location.reverseGeocodeAsync({ latitude, longitude });

                    const address = addressResult.length > 0
                        ? `${addressResult[0].name}, ${addressResult[0].region}`
                        : 'Address not found';

                    setUserLocation({ latitude, longitude, address });
                    console.log("User location updated:", { latitude, longitude, address });

                    if (userId) {
                        saveCurrentLocation(userId, latitude, longitude);
                    }
                }
            } catch (error) {
                console.error('Error retrieving location:', error);
            }
        };
        requestLocation();
    }, [userId]);

    return (
        <GestureHandlerRootView style={styles.container} pointerEvents="box-none">
            <NavigationMap 
                userId={userId}
            />
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
