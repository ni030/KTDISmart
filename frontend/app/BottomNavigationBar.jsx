import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomNavigationBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Function to check if the current screen is active
  const isActive = (screen) => route.name === screen;

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('(home)')}
      >
        <MaterialCommunityIcons
          name="home"
          size={isActive('(home)') ? 34 : 28} // Bigger size when active
          color={isActive('(home)') ? '#A1335D' : 'gray'}
        />
        <Text style={[styles.navText, isActive('(home)') && styles.activeText]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('(complaint)')}
      >
        <MaterialCommunityIcons
          name="clipboard-alert"
          size={isActive('(complaint)') ? 34 : 28} // Bigger size when active
          color={isActive('(complaint)') ? '#A1335D' : 'gray'}
        />
        <Text style={[styles.navText, isActive('(complaint)') && styles.activeText]}>
          Complaint
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('(ktdi-merit)')}
      >
        <MaterialCommunityIcons
          name="star"
          size={isActive('(ktdi-merit)') ? 34 : 28} // Bigger size when active
          color={isActive('(ktdi-merit)') ? '#A1335D' : 'gray'}
        />
        <Text style={[styles.navText, isActive('(ktdi-merit)') && styles.activeText]}>
          Merit
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('(navigation)')}
      >
        <MaterialCommunityIcons
          name="map"
          size={isActive('(navigation)') ? 34 : 28} // Bigger size when active
          color={isActive('(navigation)') ? '#A1335D' : 'gray'}
        />
        <Text style={[styles.navText, isActive('(navigation)') && styles.activeText]}>
          Faci
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    bottom: 0, // Fix to the bottom of the screen
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: 'gray',
  },
  activeText: {
    color: '#A1335D',
  },
});

export default BottomNavigationBar;
