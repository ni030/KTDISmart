import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store';
import authService from '../../services/authServices';

const HomePage = () => {
  const navigation = useNavigation();

  // State to hold the current picture index
  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);

  // Array of picture sources
  const pictures = [
    require('./../../images/home1.png'),
    require('./../../images/home2.png'),
    require('./../../images/home3.png'),
  ];

  // Effect to change the picture every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPictureIndex((prevIndex) => (prevIndex + 1) % pictures.length);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  // Open social media links
  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("Unable to open URL:", url);
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await SecureStore.getItemAsync('userId');
        console.log("Check userId -> " + userId)
        if(!userId){
          throw new Error('userId not found!')
        }
        const response = await authService.getUserById(userId);
        console.log("Check user -> " + JSON.stringify(response.user))
        setUser(response.user);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top row with logo and profile icon */}
      <View style={styles.topRow}>
        <TouchableOpacity style={{padding:16}} onPress={() => navigation.navigate('profile')}>
        {user && user.profile_picture ? (
            <Image
              source={{ uri: user.profile_picture }} // Show the profile picture if available
              style={styles.profileIcon}
            />
          ) : (
            <FontAwesome name="user-circle" size={35} color="#A1335D" style={styles.profileIcon} />
          )}
        </TouchableOpacity>
        <Image
          source={require('./../../images/subLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* (swapping image) */}
      <Image
        source={pictures[currentPictureIndex]} // Use current index for picture
        style={styles.picture}
        resizeMode="cover"
      />

      {/* Social Media Icons */}
      <View style={styles.socialRow}>
        <TouchableOpacity onPress={() => openLink('https://www.instagram.com/ktdi4utm?igsh=MWZ1cW42YnhzeGg4Yg==')}>
          <FontAwesome name="instagram" size={30} color="#C13584" style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.facebook.com/ktdi4utm')}>
          <FontAwesome name="facebook-square" size={30} color="#3b5998" style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://t.me/KTDIUTM')}>
          <FontAwesome name="telegram" size={29} color="#0088cc" style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      {/* Heading */}
      <Text style={styles.heading}>KTDI Smart Services</Text>

      {/* Navigation Rows */}
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('(complaint)')}>
          <FontAwesome name="exclamation-circle" size={45} color="#ffffff" style={styles.icon} />
          <Text style={styles.rowText}>C O M P L A I N T</Text>
          <FontAwesome name="arrow-circle-right" size={25} color="#ffffff" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('(ktdi-merit)')}>
          <FontAwesome name="trophy" size={45} color="#ffffff" style={styles.icon} />
          <Text style={styles.rowText}>K T D I   M e r i t</Text>
          <FontAwesome name="arrow-circle-right" size={25} color="#ffffff" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('(navigation)')}>
          <FontAwesome name="map" size={45} color="#ffffff" style={styles.icon} />
          <Text style={styles.rowText}>F A C I L I T I E S</Text>
          <FontAwesome name="arrow-circle-right" size={25} color="#ffffff" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff', //page backgd
  },
  topRow: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Center items vertically
    width: '100%', // Full width
    paddingHorizontal: 20,
    marginTop: 21,
  },
  profileIcon: {
    height:50,
    width:50,
    borderRadius: 25,
  },
  logo: {
    justifyContent: 'flex-start',
    marginLeft:-23,
    width: '70%',
    height: 150,
  },
  picture: {
    width: '100%',
    height: 260,
    marginTop: -20,
  },
  socialRow: {
    flexDirection: 'row', // Arrange items in a row
    justifyContent: 'center', // Center icons horizontally
    alignItems: 'center',
    marginVertical: 15, // Space between the picture and the icons
  },
  socialIcon: {
    marginHorizontal: 19, // Space between icons
  },
  rowContainer: {
    marginTop: 8,
    width: '100%',
    paddingHorizontal: 20,
  },

  row: {
    backgroundColor: '#A1335D',
    padding: 15,
    borderRadius: 35,
    marginVertical: 12,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensures space between text and arrow icon
    width: '100%',
  },
  icon: {
    marginRight: 15,
  },
  rowText: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 8,
    fontWeight: 'bold',
  },
  arrowIcon: {
    marginLeft: 20, 
    marginRight:2,
    marginTop:8,
    opacity: 0.7,
  },

  heading: {
    fontSize: 22, // Adjust size as needed
    fontWeight: 'bold', // Make it bold
    color: '#A1335D', // Use a color that matches your theme
    marginTop: 12,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
});

export default HomePage;
