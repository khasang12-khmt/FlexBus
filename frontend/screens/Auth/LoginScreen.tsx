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
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";
import CustomImage from "../../components/CustomImage";
import CustomAuthInput from "../../components/CustomAuthInput";
import CustomButton from "../../components/CustomButton";
import axios from "axios";
import CustomNavigationHeader from "../../components/CustomNavigationHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setUserEmail } from "../../redux/reducers";
import { useDispatch } from "react-redux";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const windowWidth = 0.85 * useWindowDimensions().width;

  const navigation = useNavigation<any>();
  const imageSource: ImageSourcePropType = require("../../assets/Login.png");
  const dispatch = useDispatch();
  const handleLogin = async () => {
    const response = await axios.post("http://10.0.2.2:9008/auth/login", {
      email,
      password,
    });
    dispatch(setUserEmail(email));
    if (!response.data.data.active) {
      navigation.navigate("Verification");
    } else {
      navigation.navigate("AppStack");
    }
  };
  return (
    <KeyboardAvoidingView
      className="flex self-center"
      style={{
        flex: 1,
        width: windowWidth,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <CustomNavigationHeader name="Login" navigateBackEnable={true} />
            <CustomImage source={imageSource} />
            <View
              className="flex flex-row flex-wrap"
              style={{ width: windowWidth }}
            >
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
            <TouchableOpacity
              className="flex-row-reverse"
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
            >
              <Text className="text-[#4658A9] font-bold">
                Forgot password ?
              </Text>
            </TouchableOpacity>
            {/* <Button className="" mode="contained" onPress={handleLogin}>
        Login
      </Button> */}
            <CustomButton text="Login" onPress={handleLogin} />
            <View className="flex-row  items-center ">
              <View className="flex-1 h-[1] bg-[#757171] self-center" />
              <Text className="self-center px-2 text-xs text-[#757171]">
                Or sign in with
              </Text>
              <View className="flex-1 h-[1] bg-[#757171] self-center" />
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
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
