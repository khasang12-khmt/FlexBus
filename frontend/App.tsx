import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNav from "./navigation/AppNav";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import * as Sentry from "@sentry/react-native";
import * as Updates from "expo-updates"
import { useEffect, useState } from "react";
import { PRODUCTION } from "./config/config";

Sentry.init({
  dsn: "https://234c11ea782f41fb8bd972fb0627f62d@o4505222238896128.ingest.sentry.io/4505222244204544",
  enableNative: PRODUCTION, // SET THIS TO "FALSE" in config.ts IF RUN ON DEV MODE
  integrations: [new Sentry.ReactNativeTracing()],
  tracesSampleRate: 1.0,
});

const App = () => {
  const [loaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(()=>{
    reactToUpdates();
  },[])

  const reactToUpdates = async () => {
    Updates.addListener((event)=>{
      if(event.type === Updates.UpdateEventType.UPDATE_AVAILABLE){
        alert("An update is available. Please restart now.")
      }
    })
  }

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store} >
      <AppNav />
    </Provider>
  );
}

export default Sentry.wrap(App);
