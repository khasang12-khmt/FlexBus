import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TextInput, Button } from "react-native-paper";
import { GestureResponderEvent } from "react-native-modal";

type CustomButtonProps = {
  text: string;
  onPress: (e: GestureResponderEvent) => void;
  loading?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = (
  props: CustomButtonProps
) => {
  return (
    <Button
      mode="contained"
      onPress={props.onPress}
      loading={props.loading}
      style={{
        backgroundColor: "#001356",
        marginVertical: 32,
        borderRadius: 12,
      }}
    >
      <Text className="text-lg" style={{ lineHeight: 36, borderRadius: 12 }}>
        {props.text}
      </Text>
    </Button>
  );
};

export default CustomButton;
