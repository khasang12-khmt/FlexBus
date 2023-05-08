import { View } from 'react-native'
import React, { useState } from 'react'
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TextInput
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { MAP_API_KEY } from '../../config/config';

type Coord = {
  latitude: number;
  longitude: number;
};
type LocationName = {
  location_name: string | undefined;
};
type FindRouteModalProps = {
  fromLocation: Coord & LocationName;
  toLocation: Coord & LocationName;
  visible: boolean;
  setVisible: (arg: boolean) => void;
  setRoute: (arg: Coord[]) => void;
};

const FindRouteModal : React.FC<FindRouteModalProps> = ({visible,setVisible,setRoute,fromLocation,toLocation}) => {
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [selectedValue, setSelectedValue] = useState("0");

  const handleFind = () => {
    fetchRoute();
    hideModal();
  };

  const fetchRoute = async () => {
    const response = await fetch(
      `https://us1.locationiq.com/v1/directions/driving/${fromLocation.longitude},${fromLocation.latitude};${toLocation.longitude},${toLocation.latitude}?key=${MAP_API_KEY}&steps=true&alternatives=true&geometries=polyline&overview=full`
    );
    const data = await response.json();
    const shape = data.routes[0].legs[0].steps;

    const coordinates = shape?.map((point: any) => {
      const [lat, lng] = point.maneuver.location;
      return { latitude: parseFloat(lng), longitude: parseFloat(lat) };
    });

    setRoute(coordinates);
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
            value={"Current Location" || fromLocation.location_name}
            /* onChangeText={setFromLocation} */
            selectionColor="#001356"
            textColor="#001356"
            left={
              <TextInput.Icon
                icon="location-enter"
                containerColor="white"
                size={20}
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
            activeUnderlineColor="#001356"
          />
          {/* To Input */}
          <TextInput
            label="To [Destination]"
            mode="flat"
            value={toLocation.location_name}
            /* onChangeText={setToLocation} */
            selectionColor="#001356"
            left={
              <TextInput.Icon
                icon="location-exit"
                containerColor="white"
                size={20}
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
            activeUnderlineColor="#001356"
          />

          {/* Maximum Transit */}
          <View className="w-[75%] rounded-[20px] h-1/6 overflow-hidden">
            <Picker
              style={{
                backgroundColor: "white",
                height: 40,
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
            <Text className="text-white" style={{ fontFamily: "RobotoMedium", fontSize: 15 }}>
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