import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import HomeTabs from "./navigators/HomeTabs";

export default function App() {
  return (
    <NavigationContainer>
      <HomeTabs />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
