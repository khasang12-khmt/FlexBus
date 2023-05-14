import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomLoader from "../components/CustomLoader";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState<boolean>(false);

  const checkForFirstTimeLoaded = async () => {
    const result = await AsyncStorage.getItem("isFirstTimeOpen");
    if (result == null) setIsFirstTimeLoad(true);
    setIsLoading(false);
  };
  useEffect(() => {
    checkForFirstTimeLoaded();
  }, []);

  return (
    <NavigationContainer>
      {/* {userToken !== null ? <AppStack /> : <AuthStack />} */}
      {isLoading && <CustomLoader />}
      <Stack.Navigator>
        {isFirstTimeLoad && (
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="AppStack"
          component={AppStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;
