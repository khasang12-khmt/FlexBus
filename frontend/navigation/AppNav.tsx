import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";
//import { AuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

const AppNav = () => {
  //const { isLoading, userToken } = useContext(AuthContext);
  /* if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center flex-col">
        <ActivityIndicator size={"large"} />
      </View>
    );
  } */
  return (
    <NavigationContainer>
      {/* {userToken !== null ? <AppStack /> : <AuthStack />} */}
      {/* <AuthStack/> */}
      {/* <AppStack/> */}
      <Stack.Navigator>
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppStack"
          component={AppStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;
