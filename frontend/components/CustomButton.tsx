import { View, Text } from "react-native";
import React from "react";
import { TextInput, Button } from "react-native-paper";
import { GestureResponderEvent } from "react-native-modal";

type CustomButtonProps = {
  text: string;
  onPress: (e: GestureResponderEvent) => void;
};

const CustomButton: React.FC<CustomButtonProps> = (
  props: CustomButtonProps
) => {
  return (
    <Button
      className="my-8 bg-[#001356] rounded-xl py-1"
      mode="contained"
      onPress={props.onPress}
    >
      <Text className="text-lg ">{props.text}</Text>
    </Button>
  );
};

export default CustomButton;
