import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import CustomImage from "../../components/CustomImage";
import CustomAuthInput from "../../components/CustomAuthInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import CustomNavigationHeader from "../../components/CustomNavigationHeader";
import { useDispatch } from "react-redux";
import { setUserEmail } from "../../redux/reducers";

const RegisterScreen = () => {
  // const [phoneNumber, setPhoneNumber] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // const [username, setUsername] = useState<string>();
  const windowWidth = 0.85 * useWindowDimensions().width;

  const navigation = useNavigation<any>();

  const imageSource: ImageSourcePropType = require("../../assets/Register.png");

  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      console.log("Passwoad and confirm password should be same.");
      return;
    }

    const response = await axios.post("http://10.0.2.2:9008/auth/register", {
      email,
      password,
    });

    // console.log(response.data.code)
    if (response.data.code === 200) {
      dispatch(setUserEmail(email));
      navigation.navigate("Verification");
    }
  };

  return (
    <KeyboardAvoidingView
      className="self-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 100}
      style={{
        flex: 1,
        width: windowWidth,
      }}
    >
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <CustomNavigationHeader name="Register" navigateBackEnable={true} />
            <CustomImage source={imageSource} />
            <View className="flex-row flex-wrap">
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
            </View>
            <CustomButton text="Register" onPress={handleRegister} />

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
              <Text className="text-[#636363]">Join us before ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
