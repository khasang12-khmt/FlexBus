import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import CustomImage from "../../components/CustomImage";
import { useNavigation } from "@react-navigation/native";

const VerificationScreen = () => {
  const [code, setCode] = useState<string>();
  const navigation = useNavigation<any>();

  const imageSource: ImageSourcePropType = require("../../assets/Verification.png");

  return (
    <KeyboardAvoidingView
      className="flex justify-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <CustomImage source={imageSource} />
      <View>
        <TextInput
          //   label={"OTP"}
          placeholder="Enter OTP"
          value={code}
          onChangeText={setCode}
        />
      </View>
      <Button
        className=""
        mode="contained"
        onPress={() => {
          navigation.navigate("Verification");
        }}
      >
        Send OTP
      </Button>
      <View className="flex-row justify-center">
        <Text>Didn't get the code ? </Text>
        <TouchableOpacity onPress={() => {}}>
          <Text>Resend</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerificationScreen;
