import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNav from './navigation/AppNav';
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoSemiBold: require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return <AppNav />;
}
