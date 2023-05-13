import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";
import CustomImage from "../../components/CustomImage";
import CustomAuthInput from "../../components/CustomAuthInput";
import CustomButton from "../../components/CustomButton";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const windowWidth = 0.85 * useWindowDimensions().width;

  const navigation = useNavigation<any>();
  const imageSource: ImageSourcePropType = require("../../assets/Login.png");
  const handleLogin = async () => {
    const { data } = await axios.post("http://10.0.2.2:9008/auth/login", {
      email,
      password,
    });
    // console.log()
  };
  return (
    <KeyboardAvoidingView
      className="flex self-center"
      style={{
        width: windowWidth,
        // backgroundColor: "#FFFFFF"
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <CustomImage source={imageSource} />
      <View className="flex flex-row flex-wrap" style={{ width: windowWidth }}>
        <CustomAuthInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email address/Phone number"
          isSecure={false}
        />
        <CustomAuthInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          isSecure={true}
        />
      </View>
      <TouchableOpacity className="flex-row-reverse">
        <Text className="text-[#4658A9] font-bold">Forgot password ?</Text>
      </TouchableOpacity>
      {/* <Button className="" mode="contained" onPress={handleLogin}>
        Login
      </Button> */}
      <CustomButton text="Login" onPress={handleLogin} />
      <View className="flex-row  items-center ">
        <View className="flex-1 h-0.5 bg-[#757171] self-center" />
        <Text
          className="self-center px-2 text-xs text-[#757171]"
        >
          Or sign in with
        </Text>
        <View className="flex-1 h-0.5 bg-[#757171] self-center" />
      </View>
      <TouchableOpacity className="flex justify-center items-center my-3">
        <Image source={require("../../assets/Google.png")} />
      </TouchableOpacity>
      <View className="flex-row justify-center">
        <Text className="text-[#636363]">Not register yet ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>Create Account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
