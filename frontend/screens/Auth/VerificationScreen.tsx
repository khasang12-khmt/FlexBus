import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import CustomImage from "../../components/CustomImage";
import CustomAuthInput from "../../components/CustomAuthInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const VerificationScreen = () => {
  const [code, setCode] = useState<string>("");
  const navigation = useNavigation<any>();
  const windowWidth = 0.85 * useWindowDimensions().width;

  const imageSource: ImageSourcePropType = require("../../assets/Verification.png");

  const handleSubmit = () => {};
  return (
    <KeyboardAvoidingView
      className="flex self-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        width: windowWidth,
        // backgroundColor: "#FFFFFF"
      }}
    >
      <CustomImage source={imageSource} />
      <View className="flex flex-row flex-wrap">
        {/* <TextInput
          //   label={"OTP"}
          placeholder="Enter OTP"
          value={code}
          onChangeText={setCode}
        /> */}
        <CustomAuthInput
          value={code}
          onChangeText={setCode}
          placeholder="Enter OTP"
          isSecure={true}
        />
      </View>
      {/* <Button
        className=""
        mode="contained"
        onPress={() => {
          navigation.navigate("Verification");
        }}
      >
        Send OTP
      </Button> */}
      <CustomButton text="Submit" onPress={handleSubmit} />
      <View className="flex-row justify-center">
        <Text className="text-[#636363]">Didn't get the code ? </Text>
        <TouchableOpacity onPress={() => {}}>
          <Text>Resend</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerificationScreen;
