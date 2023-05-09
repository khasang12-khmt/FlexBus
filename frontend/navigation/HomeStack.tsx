import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import RouteScreen from "../screens/Home/RouteScreen";

type LocationName = {
  location_name: string | undefined;
};
type Coord = {
  latitude: number;
  longitude: number;
};
type CoordName = LocationName & Coord;

type HomeStackParamList = {
  Home: undefined;
  Route: { fromLocation: CoordName, toLocation: CoordName };
};

const Stack = createNativeStackNavigator <HomeStackParamList>();

// Navigator for Pre-Login
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Route"
        component={RouteScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
