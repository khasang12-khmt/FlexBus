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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CustomNavigationHeader from "../../components/CustomNavigationHeader";
import axios, { Axios, AxiosError } from "axios";
import { setUserId } from "../../redux/reducers";

const VerificationScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const windowWidth = 0.85 * useWindowDimensions().width;
  const dispatch = useDispatch();

  const [otp, setOTP] = useState<string>("");
  const email = useSelector((state: RootState) => state.user.email);
  const imageSource: ImageSourcePropType = require("../../assets/Verification.png");

  const handleSubmit = async () => {
    setIsLoading(true);
    await axios
      .post("https://be-flexbus-production.up.railway.app/auth/otp", {
        email,
        otp,
      })
      .then((response) => {
        if (response.data.code === 200) {
          navigation.navigate("Login");
        } else {
          const title = "Verify Failed";
          const message = "Please try again";
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
        }
      })
      .catch((e: AxiosError) => {
        console.log(e.message);
      });
    setIsLoading(false);
  };
  return (
    <>
    <CustomNavigationHeader
      name="Verification"
      navigateBackEnable={true}
    />
    <KeyboardAvoidingView
      className="flex-1 self-center"
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        width: windowWidth,
      }}
    >
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <CustomImage source={imageSource} />
            <View className="flex-row flex-wrap">
              <Text className="ml-2 mb-2 text-[#45464F] font-bold">
                An 6 digits code has been sent to {email}
              </Text>
              <CustomAuthInput
                value={otp}
                onChangeText={setOTP}
                placeholder="Enter OTP"
                isSecure={true}
              />
            </View>
            <CustomButton text="Submit" onPress={handleSubmit} loading={isLoading}/>
            {/* <View className="flex-row justify-center">
              <Text className="text-[#636363]">Didn't get the code ? </Text>
              <TouchableOpacity onPress={() => {}}>
                <Text>Resend</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
    </>
  );
};

export default VerificationScreen;
