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
import axios from "axios";

const RegisterScreen = () => {
  // const [phoneNumber, setPhoneNumber] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // const [username, setUsername] = useState<string>();
  const windowWidth = 0.85 * useWindowDimensions().width;

  const navigation = useNavigation<any>();

  const imageSource: ImageSourcePropType = require("../../assets/Register.png");

  const handleRegister = async () => {
    // const response = await axios.post("http://10.0.2.2:9008/auth/register", {
    //   email,
    //   password,
    // });

    if (password !== confirmPassword) {
      console.log("Passwoad and confirm password should be same.");
    } else {
      navigation.navigate("Verification");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex self-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 64}
      style={{
        width: windowWidth,
        // backgroundColor: "#FFFFFF"
      }}
    >
      <CustomImage source={imageSource} />
      <View className="flex flex-row flex-wrap">
        {/* <TextInput placeholder="Email" value={email} onChangeText={setEmail} /> */}
        <CustomAuthInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          isSecure={false}
        />
        <CustomAuthInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          isSecure={true}
        />
        <CustomAuthInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          isSecure={true}
        />
        {/* <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        /> */}
      </View>
      {/* <Button className="" mode="contained" onPress={handleRegister}>
        Register
      </Button> */}
      <CustomButton text="Register" onPress={handleRegister} />

      <View className="flex-row  items-center ">
        <View className="flex-1 h-0.5 bg-[#757171] self-center" />
        <Text className="self-center px-2 text-xs text-[#757171]">
          Or sign in with
        </Text>
        <View className="flex-1 h-0.5 bg-[#757171] self-center" />
      </View>
      <TouchableOpacity className="flex justify-center items-center my-3">
        <Image source={require("../../assets/Google.png")} />
      </TouchableOpacity>
      <View className="flex-row justify-center">
        <Text className="text-[#636363]">Join us before ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
