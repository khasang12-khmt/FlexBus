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
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";
import CustomImage from "../../components/CustomImage";
import CustomAuthInput from "../../components/CustomAuthInput";
import CustomButton from "../../components/CustomButton";
import axios, { AxiosError } from "axios";
import CustomNavigationHeader from "../../components/CustomNavigationHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  UserState,
  setAccessTokenStore,
  setUserEmail,
  setUserId,
} from "../../redux/reducers";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const windowWidth = 0.85 * useWindowDimensions().width;
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const imageSource: ImageSourcePropType = require("../../assets/Login.png");

  const validateEmail = (email: string) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    if (!validateEmail(email)) {
      const title = "Invalid Email";
      const message =
        "You have entered an invalid email address. Please try again.";
      Alert.alert(
        title,
        message,
        [
          {
            text: "OK",
          },
        ],
        {
          cancelable: true,
        }
      );
    } else {
      await axios
        .post("https://be-flexbus-production.up.railway.app/auth/login", {
          email,
          password,
        })
        .then(async (response) => {
          if (response.data.code === 200) {
            const data = response.data.data;
            await AsyncStorage.setItem("access_token", data.accessToken);
            dispatch(setUserEmail(email));
            dispatch(setUserId(data.id));
            dispatch(setAccessTokenStore(data.accessToken));

            if (!data.active) {
              navigation.navigate("Verification");
            } else {
              navigation.navigate("AppStack");
            }
          } else if (response.data.code === 401) {
            const title = "Login failed";
            const message = "Wrong email address or password";
            Alert.alert(
              title,
              message,
              [
                {
                  text: "OK",
                },
              ],
              {
                cancelable: true,
              }
            );
          } else {
            console.log(response.data);
          }
        })
        .catch((e: AxiosError) => {
          console.log(e.message);
        });
    }
    setIsLoading;
  };

  return (
    <ScrollView

    // behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView
        className="self-center"
        style={{
          flex: 1,
          width: windowWidth,
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <View>
              <CustomNavigationHeader name="Login" navigateBackEnable={true} />
            </View>
            <CustomImage source={imageSource} />
            <View
              className="self-center flex-row flex-wrap"
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
            {/* <TouchableOpacity
              className="flex-row-reverse"
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
            >
              <Text className="text-[#4658A9] font-bold">
                Forgot password ?
              </Text>
            </TouchableOpacity> */}
            <CustomButton
              text="Login"
              onPress={handleLogin}
              loading={isLoading}
            />
            <View className="flex-row justify-center">
              <Text className="text-[#636363]">Not register yet ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginScreen;
