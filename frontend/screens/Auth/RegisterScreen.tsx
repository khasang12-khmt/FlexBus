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

const RegisterScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const navigation = useNavigation<any>();

  const imageSource: ImageSourcePropType = require("../../assets/Register.png");

  return (
    <KeyboardAvoidingView
      className="flex justify-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <CustomImage source={imageSource} />
      <View>
        <TextInput
          // label={"Phone number"}
          placeholder="Phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
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
      <View className="flex-row items-center ">
        <View className="flex-1 h-0.5 bg-black self-center" />
        <Text
          style={{ alignSelf: "center", paddingHorizontal: 5, fontSize: 15 }}
        >
          Or sign in with
        </Text>
        <View className="flex-1 h-0.5 bg-black self-center" />
      </View>
      <TouchableOpacity className="flex justify-center items-center">
        <Image source={require("../../assets/Google.png")} />
      </TouchableOpacity>
      <View className="flex-row justify-center">
        <Text>Join us before ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
