import React, { useCallback, useMemo, useRef, useState, useEffect } from "react"
import { FlatList, Image, StyleSheet, TouchableOpacity, View, Text, Keyboard } from "react-native";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import GoogleTextInput from "./GoogleTextInput";
import { useLocationStore } from "../../store";
import { saveSearchLocation } from "../../services/manageLocation";
import { getRubbishBin, getShop, getWaterDispenser } from "../../services/manageAmenity";
import { fetchRecentSearch } from "../../services/manageRecentSearch";


const NavigationBottomSheet = ({
    userId,
    mapRef,
    userLatitude,
    userLongitude,
    setLocations,
    setShowWaterDispensers, 
    setShowRubbishBins, 
    setShowShops,
    setDestination,
    handleMarkMyLocation,
    handleShareLocation
}) => {
    //Sprint 3
    const [recentSearches, setRecentSearches] =useState([]);
    const [error, setError] = useState(null);

    const updateRecentSearches = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchRecentSearch(userId);
            console.log('Fetched recent searches:', result);
            if (result && result.locations) {
                setRecentSearches(result.locations); // Store the array directly
            } else {
                setRecentSearches([]);
            }
        } catch (err) {
            console.error('Error fetching recent searches:', err);
            setError('Failed to fetch recent searches. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            updateRecentSearches();
        }
    }, [userId]);

    const markMyLocation = () => {
        if (userLatitude && userLongitude) {
            // Center the map on the user's location
            mapRef.current.animateCamera({
                center: { latitude: userLatitude, longitude: userLongitude },
                zoom: 17, // Adjust zoom level as needed
            });
    
            // Update the bottom sheet state or any relevant data
            bottomSheetRef.current.snapToIndex(0); // Optional: Snap the bottom sheet to index 0
        } else {
            console.warn("User location is not available");
        }
    };

    //
    const snapPoints = useMemo(()=>['22.5%','50.5%','92%']);
    const bottomSheetRef = useRef(null);
    const handleSheetChanges = useCallback((index) => {
        if(index!==2){
            Keyboard.dismiss();
        }
    },[]);
    const { setDestinationLocation } = useLocationStore();

    const [loading, setLoading] = useState(true);
  
    // Function to fetch and set data
    const loadRecentSearches = async () => {
      try {
        const data = await fetchRecentSearch(userId);
        if (data) {
          setRecentSearches(data); // Update state with recent searches
        } else {
          setRecentSearches([]); // Set empty if no data
        }
      } catch (error) {
        console.error("Error fetching recent searches:", error);
      } finally {
        setLoading(false);
      }
    };
  
    // Trigger fetch when bottom sheet opens
    useEffect(() => {
        if (userId) {
            updateRecentSearches();
        }
    }, [userId]);

    useEffect(() => {
        console.log('State updated:', recentSearches);
    }, [recentSearches]);

    console.log(recentSearches[0])
    console.log(recentSearches[1])
    console.log(recentSearches[2])

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity
                    style={styles.recentItem}
                    onPress={() => {
                        moveToLocation(item.latitude,item.longitude)
                        bottomSheetRef.current.snapToIndex(0);
                    }
                }
                >
                    <Text style={styles.addressText}>{item.address}</Text>
                </TouchableOpacity>

                {/* Only add the line divider between items */}
                {index < recentSearches.length - 1 && <View style={styles.divider} />}
            </View>
        );
    };
  
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
        console.log(userId)
        console.log(latitude)
        console.log(longitude)
        console.log(address)
        saveSearchLocation(userId,latitude,longitude,address)
        updateRecentSearches()
    };
    const [activeIcons, setActiveIcons] = useState({
        waterDispenser: false,
        rubbishBin: false,
        shop: false,
    });
    const handleIconPress= async (category)=>{
        setActiveIcons((prev) => ({
            waterDispenser: category === 'waterDispenser' ? !prev.waterDispenser : false,
            rubbishBin: category === 'rubbishBin' ? !prev.rubbishBin : false,
            shop: category === 'shop' ? !prev.shop : false,
        }));

        let fetchedLocations=[];
        bottomSheetRef.current.snapToIndex(0);
        switch(category){
            case 'waterDispenser':
                console.log("Water dispenser")
                fetchedLocations=await getWaterDispenser();
                setShowWaterDispensers(prev => !prev);
                setShowRubbishBins(false);
                setShowShops(false);
                break;
            case 'rubbishBin':
                fetchedLocations=await getRubbishBin();
                setShowRubbishBins(prev => !prev);
                setShowWaterDispensers(false);
                setShowShops(false);
                break;
            case 'shop':
                fetchedLocations=await getShop();
                setShowShops(prev => !prev);
                setShowWaterDispensers(false);
                setShowRubbishBins(false);
                break;
            default:
                break;
        }
        if(fetchedLocations.length>0){
            setLocations(fetchedLocations);
            // moveToLocation(fetchedLocations[0].latitude,fetchedLocations[0].longitude);
            const latitude = 1.5653874070967202;
            const longitude = 103.63521469255664;
            mapRef.current.animateToRegion({latitude,longitude,latitudeDelta:0.005,longitudeDelta:0.005},1000)
            console.log("Fetched Locations:",fetchedLocations);
        }else{
            console.log("No locations found")
        }
    }

    

    const styles = StyleSheet.create({
        handleIndicator: {
            backgroundColor: 'dimgray', // Chansge to your desired color
            marginTop: 3,
        },
        handle: {
            backgroundColor: '#ffedf1', // Change to your desired color
            height: 25, // Adjust height as needed
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
        },
        container: {
            flex:1,
            zIndex:1,
            pointerEvents:'box-none', //alow map below to interact
            // alignContent:'center'
            backgroundColor:'transparent'
        },
        bottomSheet:{
            flex:1,
            zIndex:2,
            pointerEvents:'auto', //ensure bottom sheet itself is interactive
            backgroundColor:'transparent',
        },
        contentContainer: {
            flex: 1,
            zIndex:3,
            alignItems: 'center',
            backgroundColor:'#ffedf1', //ok
            color:'#f7dae5'
        },
        title:{
            marginTop: 13,
            marginLeft: 22,
            marginBottom:10,
            fontWeight:'600',
            textAlignt:'left',
            fontSize:15
        },
        appName:{
            marginTop: 5,
            marginBottom:10,
        },
        label:{
            fontWeight:'500',
            color:'white'
        },
        favouriteContainer: {
            width: "90%",
            // backgroundColor: '#BD708D',
            backgroundColor: '#a1335d',
            borderRadius: 20,
            alignItems: "center",  // Centering the content horizontally
            // marginTop: 10,
            paddingHorizontal: 10,
            paddingVertical: 20,
        }, 
        iconRow: {
            flexDirection: "row", // Layout items in a row (horizontally)
            justifyContent: "space-between", // Evenly distribute columns
            width: "100%",
            marginTop:5,
            marginBottom: 10, // Space between the rows
        },
        iconColumn: {
            flex: 1, // Distribute each column equally
            justifyContent: "center", // Center both the icon and title vertically
            alignItems: "center", // Center both the icon and title horizontally
            marginHorizontal: 10, // Add spacing between columns
            height:100
        },
        iconImage: {
            width: 60,
            height: 60,
            resizeMode: "contain",
        },
        activeIcon: {
            // borderWidth: 1,
            borderColor: "white", // Example highlight color
            borderRadius: 40, // Adjust for rounded icon
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            color: "rgba(0, 0, 0, 0.3)",
        },
        iconTitle: {
            fontSize: 14,
            color: "white",
            fontWeight: "400",
            textAlign: "center", // Horizontally center the title
            alignContent: "center",
            marginTop: 10, // Space between icon and title
        },
        recentsContainer: {
            alignContent:'center',
            justifyContent:'center',
            width:"90%",
            height: 140,           
            backgroundColor:'#a1335d',
            borderRadius:20,
            marginBottom:15
        },
        recentItem: {
            backgroundColor: '#a1335d',
            padding: 9,
            borderRadius: 8,
            marginLeft: 15,
            marginRight: 15,
            alignItems: 'flex-start',
            justifyContent: 'center',
            // marginTop: 3,
            // marginBottom:3
        },
        noRecentImage: {
            width: 90,
            height: 90,
            // resizeMode: "contain",
        },
        divider: {
            marginLeft: 15,
            marginRight: 15,
            borderBottomWidth: 1, // Add a line divider between items
            borderBottomColor: '#ccc', // Set the color of the line
        },
        addressText: {
            fontSize: 14,
            fontWeight: 'bold',
            color: 'white',
        },
        recentsContainerEmpty:{
            alignItems:'center',
            justifyContent:'center',
            flex:1
        },
        recentImage:{
            width: 80,
            height: 80,
            resizeMode: "contain",
            alignContent:'center'
        },
        functionContainer:{
            alignContent:'center',
            justifyContent:'center',
            width:"90%",
            backgroundColor:'#a1335d',
            borderRadius:20,
            marginTop:10,
            marginBottom:10,
            height:50
        },
        buttonText: {
            color: '#FFFFFF',
            fontSize: 13,
            fontWeight: 'bold',
            textAlign:'center'
        },
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
                handleIndicatorStyle={styles.handleIndicator}
                handleStyle={styles.handle}
                backgroundStyle={{
                backgroundColor: '#f7dae5',
                borderTopLeftRadius: 20, // Set consistent border radius
                borderTopRightRadius: 20,
            }}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <GoogleTextInput
                        containerStyle="bg-black shadow-md shadow-neutral-300"
                        handlePress={handleDestinationPress}
                        moveMap={moveToLocation}
                        bottomSheetRef={bottomSheetRef}
                        setDestination={setDestination}
                    />
                    <View className="w-full">
                        <Text style={styles.title}>Favourites</Text>
                    </View>
                    <View style={styles.favouriteContainer}>
                        <View style={styles.iconRow}>
                            <View style={styles.iconColumn}>
                            <TouchableOpacity onPress={() => handleIconPress('waterDispenser')}>
                                <Image
                                source={require("../../assets/waterDispenser.png")}
                                style={[styles.iconImage,activeIcons.waterDispenser && styles.activeIcon]}
                                />
                            </TouchableOpacity>
                            <Text style={styles.iconTitle}>Water Dispenser</Text>
                            </View>
                            <View style={styles.iconColumn}>
                            <TouchableOpacity onPress={() => handleIconPress('rubbishBin')}>
                                <Image
                                source={require("../../assets/rubbishBin.png")}
                                style={[styles.iconImage,activeIcons.rubbishBin && styles.activeIcon]}
                                />
                            </TouchableOpacity>
                            <Text style={styles.iconTitle}>Rubbish{"\n"}Bins</Text>
                            </View>
                            <View style={styles.iconColumn}>
                            <TouchableOpacity onPress={() => handleIconPress('shop')}>
                                <Image
                                source={require("../../assets/shop.png")}
                                style={[styles.iconImage, activeIcons.shop && styles.activeIcon]}
                                />
                            </TouchableOpacity>
                            <Text style={styles.iconTitle}>Shop & Restaurant</Text>
                            </View>
                        </View>
                    </View>
                    <View className="w-full">
                        <Text style={styles.title}>Recents</Text>
                    </View>
                    <View style={styles.recentsContainer}>
                        {recentSearches.length > 0 ? (
                        <View>
                        <FlatList
                            data={recentSearches}
                            keyExtractor={(item, index) => index.toString()}
                             // Items displayed in a row
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderItem}
                        />
                        </View>
                        ) : (
                            <View style={styles.recentsContainerEmpty}>
                                <Image
                                    source={require("../../assets/no-result.png")}
                                    style={styles.noRecentImage}
                                />
                                <Text style={{ color: "white", fontWeight: "400" }}>No recent searches</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.functionContainer}>
                        <TouchableOpacity
                            style={styles.markLocationButton}
                            onPress={() => {
                                handleMarkMyLocation();
                                bottomSheetRef.current.snapToIndex(0)
                            }}
                        >
                            <Text style={styles.buttonText}>Mark My Location</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.functionContainer}>
                    <TouchableOpacity
                            style={styles.markLocationButton}
                            onPress={() => {
                                handleShareLocation();
                            }}
                        >
                            <Text style={styles.buttonText}>Share My Location</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.appName}>
                        <Text style={{color:"#a1335d",fontWeight:400}}>KTDI Smart</Text>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </View>
    )
};

export default NavigationBottomSheet;