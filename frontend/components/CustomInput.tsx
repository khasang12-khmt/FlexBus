import { View, Text } from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import React, { useState } from "react";

type CustomInputProps = {
  searchText: string | undefined;
  setSearchText: (arg0: string) => void;
};

const CustomInput: React.FC<CustomInputProps> = ({
  searchText,
  setSearchText,
}) => {
  return (
    <TextInput
      label="Search"
      value={searchText}
      onChangeText={(text) => setSearchText(text)}
      right={
        <IconButton
          icon="magnify"
          onPress={() => {
            // Call your search function here with the searchText variable
          }}
        />
      }
    />
  );
};

export default CustomInput;
