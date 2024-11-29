import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text, StyleSheet } from "react-native";
import Home from "../(home)/Home";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Trending":
              iconName = focused ? "trending-up" : "trending-up-outline";
              break;
            case "Saved":
              iconName = focused ? "bookmark" : "bookmark-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ children, color, focused }) => (
          <Text
            style={{
              fontSize: 10,
              color,
              fontWeight: focused ? "bold" : "normal",
            }}
          >
            {children}
          </Text>
        ),
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarActiveBackgroundColor: "#ca8a04",
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#0007",
        headerTintColor: "#ca8a04",
        headerTitleAlign: "center",
        headerStyle: styles.headerStyle,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Trending" component={Home} />
      <Tab.Screen name="Saved" component={Home} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    backgroundColor: "#fefce8",
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    borderRadius: 40,
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  tabBarItemStyle: {
    paddingVertical: 10,
    margin: 10,
    borderRadius: 40,
  },
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: "transparent",
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default HomeTabs;
