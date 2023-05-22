import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Menu } from 'react-native-paper'
import React, { useState } from 'react'
import { CoordName } from '../../types/LocationTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import _ from "lodash";
import { MAP_API_KEY } from '../../config/config';
import * as Sentry from "@sentry/react-native";

type Location = {
  display_name: string;
  latitude: string;
  longitude: string;
};
type FindRouteInputProps = {
    tagLocation: string;
    location: CoordName;
    setLocation : (arg:CoordName)=>void;
}

const FindRouteInput: React.FC<FindRouteInputProps> = ({
  tagLocation,
  location,
  setLocation,
}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [data, setData] = useState<Location[]>();
    //Allow 1 API call Per Second
    const getAutoComplete = _.debounce(async (query: string) => {
      let str = `https://api.locationiq.com/v1/autocomplete?key=${MAP_API_KEY}&q=${query}&limit=3&dedupe=1`;
      axios
        .get(str)
        .then((res) =>
          setData(
            res.data.map((item: any) => ({
              ...item,
              latitude: item.lat,
              longitude: item.lon,
            }))
          )
        )
        .catch((err) => {
          Sentry.captureException(err);
          console.log(err);
        });
      // Handle response data here
    }, 1500);
    const getIcon = () => {
        if(location.location_name==="Current Location" || location.location_name==="Recent Location"){
            return "close";
        }
        else{
            return "crosshairs";
        }
    }
  const getLocationData = async () => {
    try {
      // Get the location data from AsyncStorage
      const locationDataString = await AsyncStorage?.getItem(
        tagLocation + "LocationData"
      );

      if (!locationDataString) {
        return null;
      }

      // Parse the location data string to an object
      const locationData = JSON.parse(locationDataString);
      setLocation({
        ...location,
        ...locationData,
        location_name:
          tagLocation == "Home" ? "Current Location" : "Recent Location",
      });
    } catch{(err)=>{Sentry.captureException(err);console.log(err)}}
  };

  return (
    <View>
      {menuVisible && data && (
        <View
          className="px-4 w-full z-5 absolute"
          style={{
            top: -128,
            zIndex: -5,
            flex: 1,
            backgroundColor: "white",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {data.map((datum, i) => (
            <Menu.Item
              key={i}
              style={styles.item}
              titleStyle={{ fontSize: 13, fontFamily: "RobotoRegular" }}
              onPress={() => {
                setLocation({
                  location_name: datum.display_name,
                  latitude: parseFloat(datum.latitude),
                  longitude: parseFloat(datum.longitude),
                });
                setLocation({ ...location, location_name: datum.display_name });
                setMenuVisible(false);
              }}
              title={datum.display_name}
            />
          ))}
        </View>
      )}
      <TextInput
        label={tagLocation == "Home" ? "From [Departure]" : "To [Destination]"}
        mode="flat"
        value={location.location_name}
        textColor="#001356"
        onChangeText={(text) =>
          setLocation({ ...location, location_name: text })
        }
        onKeyPress={() => {
          if (location.location_name) {
            getAutoComplete(location.location_name);
            if (location.location_name.length !== 0) {
              setMenuVisible(true);
            }
          }
        }}
        left={
          <TextInput.Icon icon="map-marker" containerColor="white" size={20} />
        }
        right={
          <TextInput.Icon
            icon={getIcon()}
            containerColor="white"
            size={20}
            onPress={() => {
                if (
                  location.location_name === "Current Location" ||
                  location.location_name === "Recent Location"
                )setLocation(({...location,location_name:""}))
                else getLocationData();
                setMenuVisible(false)
            }}
          />
        }
        theme={{ roundness: 20 }}
        style={{
          overflow: "hidden",
          backgroundColor: "#fff",
          marginBottom: 10,
          height: 50,
          borderRadius: 20,
        }}
        contentStyle={{ backgroundColor: "#fff", borderBottomWidth: 0 }}
        underlineStyle={{ borderColor: "#001356", borderBottomWidth: 0 }}
        underlineColor="transparent"
        activeUnderlineColor="#94A6FD"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    fontSize: 12,
    width: 4000,
    padding: 10,
    borderBottomColor: "#ccc",
  },
});

export default FindRouteInput