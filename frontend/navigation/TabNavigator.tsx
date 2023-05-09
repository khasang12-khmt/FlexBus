import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import HistoryScreen from "../screens/History/HistoryScreen";
import HomeStack from "./HomeStack";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
    const myNavigationTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        notification: "rgba(255, 255, 255, 0.5)",
        secondaryContainer: "transparent",
      },
    };
  return (
    <PaperProvider theme={myNavigationTheme}>
        <Tab.Navigator
        activeColor="#fff"
        inactiveColor="#767680"
        shifting
        screenOptions={{ tabBarColor: "#001356" }}
        barStyle={{ backgroundColor: "#001356", padding: 0 }}
        >
        <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
            }}
        />
        <Tab.Screen
            name="History"
            component={HistoryScreen}
            options={{
            tabBarLabel: "History",
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="clock" color={color} size={26} />
            ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
            }}
        />
        </Tab.Navigator>
    </PaperProvider>
  );
};

export default TabNavigator;
