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

type FindRouteModalProps = {
    visible: boolean;
    setVisible: (arg:boolean)=>void;
}

const genderList = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Others",
    value: "others",
  },
];

const FindRouteModal : React.FC<FindRouteModalProps> = ({visible,setVisible}) => {
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState("0");

  const handleFind = () => {
    console.log(fromLocation,toLocation,selectedValue);
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
            label="From"
            mode="flat"
            value={fromLocation}
            onChangeText={setFromLocation}
            selectionColor="#001356"
            textColor="#001356"
            left={
              <TextInput.Icon
                icon="location-enter"
                containerColor="white"
                size={20}
              />
            }
            style={{ backgroundColor: "#fff", marginBottom: 10 }}
            contentStyle={{ backgroundColor: "#fff" }}
            underlineStyle={{ borderColor: "#001356", borderRadius: 20 }}
          />
          {/* To Input */}
          <TextInput
            label="To"
            mode="flat"
            value={toLocation}
            onChangeText={setToLocation}
            selectionColor="#001356"
            left={
              <TextInput.Icon
                icon="location-exit"
                containerColor="white"
                size={20}
              />
            }
            textColor="#001356"
            style={{ backgroundColor: "#fff", marginBottom: 10 }}
            contentStyle={{ backgroundColor: "#fff" }}
            underlineStyle={{ borderColor: "#001356" }}
          />

          {/* Maximum Transit */}
          <View className="w-3/4 rounded-lg">
            <Picker
              style={{ backgroundColor: "white", borderRadius: 50 }}
              className="mr-2 w-1/2"
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
            className="mt-auto flex items-center justify-center flex-row mx-auto bg-[#465BA9] mt-3 px-10"
            onPress={handleFind}
          >
            <Text className="text-white" style={{ fontFamily: "RobotoMedium" }}>
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