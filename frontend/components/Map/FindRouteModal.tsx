import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TextInput
} from "react-native-paper";
import _ from "lodash";
import { Picker } from "@react-native-picker/picker";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { GOOGLE_API_KEY } from '../../config/config';

type FindRouteModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  navigation: NavigationProp<any>;
};

type LocationName = {
  location_name: string | undefined;
};
type Coord = {
  latitude: number;
  longitude: number;
};
type CoordName = LocationName & Coord;

const FindRouteModal : React.FC<FindRouteModalProps> = ({visible,setVisible,navigation}) => {
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [selectedValue, setSelectedValue] = useState("0");
  const [fromLocation, setFromLocation] = useState<CoordName>({
    location_name: "",
    latitude: 0,
    longitude: 0,
  });
  const [toLocation, setToLocation] = useState<CoordName>({
    location_name: "",
    latitude: 0,
    longitude: 0,
  });

  useEffect(()=>{
    getLocationData("from","Home");
    getLocationData("to", "To");
  },[visible])

  const handleFind = () => {
    navigation.navigate("Route", { fromLocation, toLocation });
    hideModal();
  };

  const getLocationData = async (msg: string, tag:string) => {
    try {
      // Get the location data from AsyncStorage
      const locationDataString = await AsyncStorage?.getItem(tag+"LocationData");

      if (!locationDataString) {
        return null;
      }

      // Parse the location data string to an object
      const locationData = JSON.parse(locationDataString);
      if(msg==="from"){
        setFromLocation({
          ...fromLocation,
          ...locationData,
          location_name: tag=="Home"?"Current Location":"To Location",
        });
      }
      else{
        setToLocation({
          ...toLocation,
          ...locationData,
          location_name: tag == "Home" ? "Current Location" : "To Location",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          {/* From Input */}
          <TextInput
            label="From [Departure]"
            mode="flat"
            value={fromLocation.location_name}
            textColor="#001356"
            onChangeText={(text) =>
              setFromLocation({ ...fromLocation, location_name: text })
            }
            left={
              <TextInput.Icon
                icon="map-marker"
                containerColor="white"
                size={20}
              />
            }
            right={
              <TextInput.Icon
                icon="crosshairs"
                containerColor="white"
                size={20}
                onPress={() => getLocationData("from","Home")}
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
          {/* To Input */}
          <TextInput
            label="To [Destination]"
            mode="flat"
            value={toLocation.location_name}
            onChangeText={(text) =>
              setToLocation({ ...toLocation, location_name: text })
            }
            left={
              <TextInput.Icon
                icon="map-marker"
                containerColor="white"
                size={20}
              />
            }
            right={
              <TextInput.Icon
                icon="crosshairs"
                containerColor="white"
                size={20}
                onPress={() => getLocationData("to","Home")}
              />
            }
            textColor="#001356"
            theme={{ roundness: 20 }}
            style={{
              overflow: "hidden",
              backgroundColor: "#fff",
              borderRadius: 20,
              marginBottom: 10,
              height: 50,
              width: "100%",
              borderBottomWidth: 0,
            }}
            contentStyle={{ backgroundColor: "#fff", borderBottomWidth: 0 }}
            underlineStyle={{ borderColor: "#001356", borderBottomWidth: 0 }}
            underlineColor="transparent"
            activeUnderlineColor="#94A6FD"
          />

          {/* Maximum Transit */}
          <View className="w-[75%] rounded-[20px] overflow-hidden">
            <Picker
              style={{
                backgroundColor: "white",
                height: 45,
                margin: 0,
              }}
              className="mr-2 w-1/3 h-1/4 rounded-xl pb-1"
              placeholder="Maximum Transits"
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="Maximum Transits - 1" value="1" />
              <Picker.Item label="Maximum Transits - 2" value="2" />
              <Picker.Item label="Maximum Transits - 3" value="3" />
            </Picker>
          </View>

          {/* Transits */}
          <Button
            className="flex items-center justify-center flex-row mx-auto bg-[#465BA9] mt-3 px-10"
            onPress={handleFind}
          >
            <Text
              className="text-white"
              style={{ fontFamily: "RobotoMedium", fontSize: 15 }}
            >
              Find Route
            </Text>
          </Button>
        </Modal>
      </Portal>

      <Button
        className="mt-auto mb-3 flex items-center justify-center flex-row mx-auto bg-[#001356] text-white"
        icon="map-marker-path"
        mode="elevated"
        textColor="#fff"
        onPress={showModal}
      >
        <Text className="text-white">Find Route</Text>
      </Button>
    </Provider>
  );
}

const containerStyle = {
  backgroundColor: "#001356",
  padding: 20,
  marginTop: "auto",
};


export default FindRouteModal