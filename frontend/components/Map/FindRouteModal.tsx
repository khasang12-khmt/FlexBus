import { View, TouchableOpacity } from 'react-native'
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
import { MAP_API_KEY } from '../../config/config';
import AutoComplete from './AutoComplete';
import FindRouteInput from './FindRouteInput';

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

  const [limit, setLimit] = useState<string>("999");
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
    navigation.navigate("Route", { fromLocation, toLocation, limit });
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
          location_name: tag=="Home"?"Current Location":"Recent Location",
        });
      }
      else{
        setToLocation({
          ...toLocation,
          ...locationData,
          location_name: tag == "Home" ? "Current Location" : "Recent Location",
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
          <FindRouteInput
            location={fromLocation}
            setLocation={setFromLocation}
            tagLocation="Home"
          />
          {/* To Input */}
          <FindRouteInput
            location={toLocation}
            setLocation={setToLocation}
            tagLocation="To"
          />

          {/* Maximum Transit */}
          <View className="w-[80%] rounded-[20px] overflow-hidden">
            <Picker
              style={{
                backgroundColor: "white",
                height: 45,
                margin: 0,
                zIndex: 1,
              }}
              className="mr-2 w-1/3 h-1/4 rounded-xl pb-1"
              placeholder="Maximum Transits"
              selectedValue={limit}
              onValueChange={(itemValue) => setLimit(itemValue)}
            >
              <Picker.Item label="Maximum Transits - All" value="999" />
              <Picker.Item label="Maximum Transits - 1" value="1" />
              <Picker.Item label="Maximum Transits - 2" value="2" />
              <Picker.Item label="Maximum Transits - 3" value="3" />
            </Picker>
          </View>

          <TouchableOpacity onPress={handleFind}>
            <Button className="flex items-center justify-center flex-row mx-auto bg-[#465BA9] mt-3 px-10">
              <Text
                className="text-white"
                style={{ fontFamily: "RobotoMedium", fontSize: 15 }}
              >
                Find Route
              </Text>
            </Button>
          </TouchableOpacity>
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