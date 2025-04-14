import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import NavigationHeader from "../components/NavigationHeader";
import AuthSelectionScreen from "../screens/AuthSelectionScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import FeedScreen from "../screens/FeedScreen";
import TeamsScreen from "../screens/TeamsScreen";
import PlayersScreen from "../screens/PlayersScreen";
import MatchScreen from "../screens/MatchScreen";
import OTPScreen from "../screens/OTPScreen";

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Feed"
        screenOptions={({ navigation }) => ({
          header: () => <NavigationHeader navigation={navigation} />,
        })}
      >
        <Drawer.Screen name="Feed" component={FeedScreen} />
        <Drawer.Screen name="Teams" component={TeamsScreen} />
        <Drawer.Screen name="Players" component={PlayersScreen} />
        <Drawer.Screen name="Match" component={MatchScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Signup" component={SignupScreen} />
        <Drawer.Screen name="OTP" component={OTPScreen} />
        <Drawer.Screen name="AuthSelection" component={AuthSelectionScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
