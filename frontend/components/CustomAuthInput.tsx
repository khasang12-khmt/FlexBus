import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

type CustomAuthInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  isSecure: boolean;
};

const CustomAuthInput: React.FC<CustomAuthInputProps> = (
  props: CustomAuthInputProps
) => {
  return (
    <TextInput
      // label={"Email"}
      className="basis-full my-1 border bg-white rounded-xl border-[#767680]"
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      underlineColor="transparent"
      secureTextEntry={props.isSecure}
    />
  );
};

export default CustomAuthInput;
