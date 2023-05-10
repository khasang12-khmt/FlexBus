import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerContentComponentProps, createDrawerNavigator } from "@react-navigation/drawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TabNavigator from "./TabNavigator";
import HistoryScreen from "../screens/History/HistoryScreen";
import DetailScreen from "../screens/TransactionDetail/DetailScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

// Sidebar Navigator
const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawer {...props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#001356",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -10,
          fontFamily: "RobotoMedium",
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="clock" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="clock" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
