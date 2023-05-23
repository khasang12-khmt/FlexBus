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
  Alert,
} from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import CustomImage from "../../components/CustomImage";
import CustomAuthInput from "../../components/CustomAuthInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import axios, { AxiosError } from "axios";
import CustomNavigationHeader from "../../components/CustomNavigationHeader";
import { useDispatch } from "react-redux";
import { setUserEmail } from "../../redux/reducers";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RegisterScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const windowWidth = 0.85 * useWindowDimensions().width;
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const imageSource: ImageSourcePropType = require("../../assets/Register.png");

  const validateEmail = (email: string) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    var re = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/;
    return re.test(password);
  };

  const checkPassword = (password: string, confirm: string) => {
    return password == confirm;
  };

  const handleRegister = async () => {
    setIsLoading(true)
    if (
      !checkPassword(password, confirmPassword) ||
      !validatePassword(password) ||
      !validateEmail(email)
    ) {
      const title = "Registration Failed";
      const message = "You must enter valid email address and password ";
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
        .post("https://be-flexbus-production.up.railway.app/auth/register", {
          email,
          password,
        })
        .then((response) => {
          if (response.data.message === "OK") {
            dispatch(setUserEmail(email));
            navigation.navigate("Verification");
          } else if (response.data.code === 400) {
            const title = "Registration Failed";
            const message = "Email already exist";
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
            console.log(response);
          }
        })
        .catch((e: AxiosError) => {
          console.log(e.message);
        });
    }
    setIsLoading(false)
  };

  return (
    <>
    <CustomNavigationHeader
      name="Register"
      navigateBackEnable={true}
    />
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
    >
    <ScrollView>
      <SafeAreaView
        className="self-center"
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          width: windowWidth,
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <CustomImage source={imageSource} />
            <View className="self-center flex-row flex-wrap">
              <CustomAuthInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                isSecure={false}
                right={
                  (validateEmail(email) && (
                    <TextInput.Icon icon="check-circle" color={() => "green"} />
                  )) || (
                    <TextInput.Icon
                      icon="close-circle"
                      color={() => "#BA1A1A"}
                    />
                  )
                }
              />
              {email === "" && (
                <View className="flex-row justify-center items-center  ml-2 mb-1">
                  {/* <MaterialCommunityIcons
                    name="close-circle"
                    size={18}
                    color="#BA1A1A"
                  /> */}
                  <Text className="text-[#BA1A1A] ml-2">Email is required</Text>
                </View>
              )}
              {email !== "" && !validateEmail(email) && (
                <View className="flex-row justify-center items-center  ml-2 mb-1">
                  {/* <MaterialCommunityIcons
                    name="close-circle"
                    size={18}
                    color="#BA1A1A"
                  /> */}
                  <Text className="text-[#BA1A1A] ml-2">
                    Invalid email address
                  </Text>
                </View>
              )}
              <CustomAuthInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                isSecure={true}
                right={
                  (validatePassword(password) && (
                    <TextInput.Icon icon="check-circle" color={() => "green"} />
                  )) || (
                    <TextInput.Icon
                      icon="close-circle"
                      color={() => "#BA1A1A"}
                    />
                  )
                }
              />
              {!validatePassword(password) && (
                <View className="flex-row justify-center items-center  ml-2 mb-1">
                  <Text className="text-[#BA1A1A] ml-2">
                    Password must be minimum eight characters, at least one
                    letter and one number
                  </Text>
                </View>
              )}
              <CustomAuthInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                isSecure={true}
                right={
                  (checkPassword(password, confirmPassword) &&
                    validatePassword(password) && (
                      <TextInput.Icon
                        icon="check-circle"
                        color={() => "green"}
                      />
                    )) || (
                    <TextInput.Icon
                      icon="close-circle"
                      color={() => "#BA1A1A"}
                    />
                  )
                }
              />
              {!checkPassword(password, confirmPassword) &&
                validatePassword(password) && (
                  <View className="flex-row justify-center items-center  ml-2 mb-1">
                    <Text className="text-[#BA1A1A] ml-2">
                      Confirm password not match
                    </Text>
                  </View>
                )}
            </View>
            <CustomButton text="Register" onPress={handleRegister} loading={isLoading}/>

            <View className="flex-row justify-center mb-10">
              <Text className="text-[#636363]">Join us before ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ScrollView>
    </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;
