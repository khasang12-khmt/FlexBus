import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

type CustomAuthInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  isSecure: boolean;
  right?: React.ReactNode;
};

const CustomAuthInput: React.FC<CustomAuthInputProps> = (
  props: CustomAuthInputProps
) => {
  return (
    <TextInput
      // label={"Email"}
      mode="outlined"
      // className="basis-full my-1 border bg-white rounded-xl border-[#767680]"
      className="basis-full my-1"
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      secureTextEntry={props.isSecure}
      right={props.right}
      activeOutlineColor="#001356"
      outlineStyle={{
        borderRadius: 12,
      }}
      contentStyle={{
        height: 54,
      }}
    />
  );
};

export default CustomAuthInput;
