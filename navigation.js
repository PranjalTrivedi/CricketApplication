import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import LiveMatchesScreen from './screens/LiveMatchesScreen';
import MatchDetailsScreen from './screens/MatchDetailsScreen';
import AddMatchScreen from './screens/AddMatchScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="LiveMatches" component={LiveMatchesScreen} />
      <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} />
      <Stack.Screen name="AddMatch" component={AddMatchScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
