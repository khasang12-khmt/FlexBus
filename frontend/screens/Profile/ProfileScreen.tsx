import { View } from "react-native";
import React, { useState } from "react";
import { Avatar, TextInput, Button, Text } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { DatePickerInput } from "react-native-paper-dates";
import { registerTranslation, en } from "react-native-paper-dates";

registerTranslation("en", en);

const ProfileScreen = () => {
  const [username, setUsername] = useState<string>("FlexBus User");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");
  const [inputDate, setInputDate] = useState<Date | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);

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

  return (
    <View className="flex-1">
      <View>
        <Avatar.Image
          className="m-auto"
          size={200}
          source={require("../../assets/Avatar.png")}
        />
      </View>
      <Text className="mx-auto" variant="headlineLarge">
        {username}
      </Text>

      <View className="mx-3">
        <TextInput
          mode="outlined"
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          mode="outlined"
          label="Username"
          value={username}
          onChangeText={setUsername}
        />
        <DropDown
          label={"Gender"}
          mode={"outlined"}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={gender}
          setValue={setGender}
          list={genderList}
        />
        <DatePickerInput
          locale="en"
          label="Birthdate"
          mode="outlined"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
        />
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View className="m-auto w-fit">
        <Button mode="text" textColor="#BA1A1A" onPress={() => {}}>
          Delete Account
        </Button>
      </View>
      <View className="m-auto w-fit">
        <Button
          mode="contained"
          textColor="#FFFFFF"
          buttonColor="#001356"
          onPress={() => {}}
        >
          UPDATE
        </Button>
      </View>
    </View>
  );
};

export default ProfileScreen;
