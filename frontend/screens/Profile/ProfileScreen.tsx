import {
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Avatar, TextInput, Button, Text } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { DatePickerInput } from "react-native-paper-dates";
import { registerTranslation, en } from "react-native-paper-dates";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "../../components/CustomButton";

registerTranslation("en", en);

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  const userId = useSelector((state: RootState) => state.user.id);
  // if (userId === "") {
  //   Alert.alert("Please login", "", [
  //     {
  //       text: "Cancel",
  //       onPress: () => {
  //         navigation.goBack();
  //       },
  //       style: "cancel",
  //     },
  //     {
  //       text: "OK",
  //       onPress: () => {
  //         navigation.navigate("AuthStack");
  //       },
  //     },
  //   ]);
  // }

  const [usernameLabel, setUsernameLabel] = useState<string | undefined>(
    "FlexBus User"
  );
  const [username, setUsername] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");
  const [inputDate, setInputDate] = useState<Date>();
  const [email, setEmail] = useState<string>();

  const windowWidth = 0.85 * useWindowDimensions().width;

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

  const handleLogout = async () => {};

  return (
    <ScrollView className="">
      <View className="flex self-center" style={{ width: windowWidth }}>
        <TouchableOpacity
          className="flex-row-reverse my-5 mx-3"
          onPress={() => {
            handleLogout();
          }}
        >
          <Text className="text-[#001356] font-bold">Log out</Text>
        </TouchableOpacity>
        <View>
          <Avatar.Image
            className="mx-auto my-2"
            size={200}
            source={require("../../assets/Avatar.png")}
          />
        </View>
        <Text
          className="mx-auto text-[#001356] font-bold"
          variant="headlineLarge"
        >
          {usernameLabel}
        </Text>

        <View className="flex flex-row flex-wrap">
          <TextInput
            className="my-1 basis-full"
            mode="outlined"
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            left={<TextInput.Icon icon="phone-outline" />}
            outlineColor="#767680"
            activeOutlineColor="#001356"
            outlineStyle={{
              borderRadius: 12,
              borderWidth: 1,
            }}
          />
          <TextInput
            className="my-1 basis-full"
            mode="outlined"
            label="Username"
            value={username}
            onChangeText={setUsername}
            left={<TextInput.Icon icon="account-outline" />}
            outlineColor="#767680"
            activeOutlineColor="#001356"
            outlineStyle={{
              borderRadius: 12,
              borderWidth: 1,
            }}
          />
          <View className="my-1 basis-full">
            <DropDown
              label="Gender"
              mode="outlined"
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={gender}
              setValue={setGender}
              list={genderList}
              inputProps={{
                left: <TextInput.Icon icon={"gender-male-female"} />,
                outlineColor: "#767680",
                activeOutlineColor: "#001356",
                outlineStyle: {
                  borderRadius: 12,
                  borderWidth: 1,
                },
              }}
            />
          </View>
          <DatePickerInput
            className="my-1 basis-full"
            locale="en"
            label="Birthdate"
            mode="outlined"
            value={inputDate}
            onChange={(d) => setInputDate(d)}
            inputMode="start"
            left={<TextInput.Icon icon="cake-variant-outline" />}
            outlineColor="#767680"
            activeOutlineColor="#001356"
            outlineStyle={{
              borderRadius: 12,
              borderWidth: 1,
            }}
          />
          <TextInput
            className="my-1 basis-full"
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={setEmail}
            left={<TextInput.Icon icon="email-outline" />}
            outlineColor="#767680"
            activeOutlineColor="#001356"
            outlineStyle={{
              borderRadius: 12,
              borderWidth: 1,
            }}
          />
        </View>
        <View className="flex justify-center items-center">
          {/* <Button mode="text" textColor="#BA1A1A" onPress={() => {}}>
            Delete Account
          </Button> */}
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-[#BA1A1A] font-bold ">Delete Account</Text>
          </TouchableOpacity>
        </View>
        <View>
          <CustomButton
            text="Update"
            onPress={() => setUsernameLabel(username)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
