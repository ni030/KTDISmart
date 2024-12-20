import React, { useRef, useState } from "react";
import { Share, Text, TouchableOpacity, StyleSheet, View, Modal } from "react-native";
import MapView, { PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import { useLocationStore } from "../../store";
import { calculateRegion } from "../../lib/map";
import NavigationBottomSheet from "./NavigationBottomSheet";
import MapViewDirections from "react-native-maps-directions";

const NavigationMap = ({userId}) => {
    const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY
    const mapRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [origin, setOrigin] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [navigating, setNavigating] = useState(false); // Track navigation state
    const [showTerminatePrompt, setShowTerminatePrompt] = useState(false);
    const [showUserMarker, setShowUserMarker] = useState(false);
    const [isMarkerVisible, setIsMarkerVisible] = useState(false);

    const {
        userLongitude, userLatitude, userAddress, destinationLatitude, destinationLongitude, destinationAddress
    } = useLocationStore();

    const regionRef = useRef(null);

    const region = calculateRegion({
        userLongitude, userLatitude, destinationLatitude, destinationLongitude,
    });

    const [locations, setLocations] = useState([]);
    const [showWaterDispensers, setShowWaterDispensers] = useState(false);
    const [showRubbishBins, setShowRubbishBins] = useState(false);
    const [showShops, setShowShops] = useState(false);

    const styles = StyleSheet.create({
        container: {
            ...StyleSheet.absoluteFillObject, // Fill the container
            pointerEvents: "auto", // Allow interactions with the map
        },
        modalContainer: {
            position: 'absolute', // Position the modal on top of the map
            top: 0, // Ensure it's at the top of the screen
            left: 0,
            right: 0,
            bottom: 0, // Cover the whole screen
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background overlay
            zIndex: 999, // Ensure the modal appears above everything else
        },
        modalContent: {
            backgroundColor: "#f7dae5",
            padding: 20,
            borderRadius: 15, // Border radius for the modal
            width: 300,
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 15,
        },
        modalMessage: {
            fontSize: 16,
            marginBottom: 20,
            textAlign: "center",
        },
        boldText: {
            fontWeight: "bold", // Apply bold style to the location name
        },
        modalButton: {
            backgroundColor: "#a1335d",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginVertical: 5, // Add spacing between buttons
        },
        buttonText: {
            color: "white",
            fontSize: 14,
            fontWeight: "600",
        },
        terminateButton: {
            position: "absolute",
            top: 10, // Position from the top
            left: 10, // Position from the left
            backgroundColor: "#a1335d", // Red button to indicate termination
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
            zIndex: 1000, // Ensure it appears above the map
        },
        terminateButtonText: {
            color: "#fff",
            fontSize: 13,
            fontWeight: "bold",
        },
    });

    const handleMarkMyLocation = () => {
        setIsMarkerVisible((prevState) => !prevState);
        setShowUserMarker((prevState) => !prevState);
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: userLatitude,
                longitude: userLongitude,
                latitudeDelta: 0.0015,
                longitudeDelta: 0.0015,
            });
        }
    };

    const handleShareLocation = async () => {
        if (userLatitude && userLongitude) {
            const locationUrl = `https://www.google.com/maps?q=${userLatitude},${userLongitude}`;
            try {
                await Share.share({
                    message: `Here's my current location: ${locationUrl}`,
                });
            } catch (error) {
                console.error("Error sharing location: ", error);
            }
        } else {
            console.warn("User location not available.");
        }
    }

    // Function to handle marker press and show custom modal
    const handleMarkerPress = (loc) => {
        setSelectedLocation(loc);
        setModalVisible(true);
    };

    // Function to confirm navigation and close modal
    const handleConfirmNavigation = () => {
        setModalVisible(false);
        if (selectedLocation) {
            console.log("Navigating to ", selectedLocation.name);
            // setSelectedLocation({
            //     latitude: 1.5659228300297865, 
            //     longitude: -122.0805944502857,
            //     name: selectedLocation.name,
            // });
            setSelectedLocation({
                latitude: selectedLocation.latitude, 
                longitude: selectedLocation.longitude,
                name: selectedLocation.name,
            });
            setOrigin({
                latitude: userLatitude,
                longitude: userLongitude,
            })
            console.log("Origin: ",origin)
            console.log("Destination:",selectedLocation)
            setNavigating(true);
        }
    };
    const handleCancelNavigation = () => {
        setModalVisible(false);
    };
    const handleTerminateRouting = () => {
        setShowTerminatePrompt(true); // Show the confirmation prompt
    };

    const confirmTerminate = () => {
        setShowTerminatePrompt(false); // Close the prompt
        setNavigating(false); // Terminate routing
        setOrigin(null);
        setSelectedLocation(null);
    };

    const cancelTerminate = () => {
        setShowTerminatePrompt(false); // Close the prompt without terminating
    };

    return (
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
                {/* Marker for User's Current Location */}
                {showUserMarker && (
                    <Marker
                        coordinate={{
                            latitude: userLatitude,
                            longitude: userLongitude,
                        }}
                        title="My Location"
                        description="This is my current location"
                    />
                )}
                {/* MapViewDirections and other markers */}

                {/* Conditionally render markers based on the toggled states */}
                {showWaterDispensers && locations.filter(loc => loc.id === 'WD').map((loc, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                        title={loc.name}
                        onPress={() => handleMarkerPress(loc)} // Attach the onPress event to Marker
                    />
                ))}
                {showRubbishBins && locations.filter(loc => loc.id === 'RB').map((loc, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                        title={loc.name}
                        onPress={() => handleMarkerPress(loc)} // Attach the onPress event to Marker
                    />
                ))}
                {showShops && locations.filter(loc => loc.id === 'SHOP').map((loc, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                        title={loc.name}
                        onPress={() => handleMarkerPress(loc)} // Attach the onPress event to Marker
                    />
                ))}
                <MapViewDirections
                    origin={origin}
                    destination={selectedLocation}
                    apikey={googlePlacesApiKey}
                    strokeWidth={5}
                    strokeColor="red"
                    optimizeWaypoints={true}
                    onStart={(params) => {
                        console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                    }}
                    onReady={(result) => {
                        mapRef.current.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                                right: 30,
                                bottom: 30,
                                left: 30,
                                top: 30,
                            },
                        });
                    }}
                      onError={(errorMessage) => {
                        console.log('GOT AN ERROR');
                      }}
                />
            </MapView>

            {modalVisible && (
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Are you ready to go?</Text>
                        <Text style={styles.modalMessage}>
                            You are about to navigate to <Text style={styles.boldText}>{selectedLocation?.name}</Text>. Do you want to proceed?
                        </Text>
                        <TouchableOpacity style={styles.modalButton} onPress={handleConfirmNavigation}>
                            <Text style={styles.buttonText}>Yes, take me there!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleCancelNavigation}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Terminate Button */}
            {navigating && (
                <TouchableOpacity
                    style={styles.terminateButton}
                    onPress={handleTerminateRouting}
                >
                    <Text style={styles.terminateButtonText}>Terminate Routing</Text>
                </TouchableOpacity>
            )}

            {/* Confirmation Prompt */}
            {showTerminatePrompt && (
                <Modal transparent={true} animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
                                Confirm Termination
                            </Text>
                            <Text style={{ textAlign: "center", marginBottom: 20 }}>
                                Are you sure you want to terminate the navigation?
                            </Text>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={confirmTerminate}
                            >
                                <Text style={styles.buttonText}>Yes, Terminate</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={cancelTerminate}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

            <NavigationBottomSheet
                userId={userId}
                mapRef={mapRef}
                userLatitude={userLatitude}
                userLongitude={userLongitude}
                setLocations={setLocations}
                setShowWaterDispensers={setShowWaterDispensers}
                setShowRubbishBins={setShowRubbishBins}
                setShowShops={setShowShops}
                handleMarkMyLocation={handleMarkMyLocation}
                handleShareLocation={handleShareLocation}
            />
        </View>
    );
};

export default NavigationMap;

