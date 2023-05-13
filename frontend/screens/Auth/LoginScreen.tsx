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

const LoginScreen = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const windowWidth = 0.85 * useWindowDimensions().width;

  const navigation = useNavigation<any>();
  const imageSource: ImageSourcePropType = require("../../assets/Login.png");

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
        <TextInput
          // label={"Email"}
          className="basis-full"
          placeholder="Email address/Phone number"
          value={email}
          onChangeText={setEmail}
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#000000",
            borderRadius: 15,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            marginVertical: 5,
          }}
          underlineColor="transparent"
          // activeUnderlineColor="transparent"
        />
        <TextInput
          // label={"Password"}
          className="basis-full"
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#000000",
            borderRadius: 15,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            marginVertical: 5,
          }}
          underlineColor="transparent"
        />
      </View>
      <TouchableOpacity className="flex-row-reverse">
        <Text>Forgot password ?</Text>
      </TouchableOpacity>
      <Button className="" mode="contained" onPress={() => {}}>
        Login
      </Button>
      <View className="flex-row  items-center ">
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
        <Text>Not register yet ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>Create Account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
