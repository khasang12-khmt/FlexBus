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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CustomNavigationHeader from "../../components/CustomNavigationHeader";
import axios, { Axios, AxiosError } from "axios";
import { setUserId } from "../../redux/reducers";

const VerificationScreen = () => {
  const [otp, setOTP] = useState<string>("");
  const navigation = useNavigation<any>();
  const windowWidth = 0.85 * useWindowDimensions().width;
  const email = useSelector((state: RootState) => state.user.email);
  const imageSource: ImageSourcePropType = require("../../assets/Verification.png");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    // const response = await axios.post(
    //   "https://be-flexbus-production.up.railway.app/auth/otp",
    //   {
    //     email,
    //     otp,
    //   }
    // );

    // if (response.data.message === "OK") {
    //   navigation.navigate("Login");
    // }

    await axios
      .post("https://be-flexbus-production.up.railway.app/auth/otp", {
        email,
        otp,
      })
      .then((response) => {
        if (response.data.code === 200) {
          navigation.navigate("Login");
        } else {
          console.log(response.data);
        }
      })
      .catch((e: AxiosError) => {
        console.log(e.message);
      });
  };
  return (
    <KeyboardAvoidingView
      className="flex-1 self-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        width: windowWidth,
      }}
    >
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <CustomNavigationHeader
              name="Verification"
              navigateBackEnable={true}
            />

            <CustomImage source={imageSource} />
            <View className="flex-row flex-wrap">
              <CustomAuthInput
                value={otp}
                onChangeText={setOTP}
                placeholder="Enter OTP"
                isSecure={true}
              />
            </View>
            {/* <Button
        className=""
        mode="contained"
        onPress={() => {
          navigation.navigate("Verification");
        }}
      >
        Send OTP
      </Button> */}
            <CustomButton text="Submit" onPress={handleSubmit} />
            <View className="flex-row justify-center">
              <Text className="text-[#636363]">Didn't get the code ? </Text>
              <TouchableOpacity onPress={() => {}}>
                <Text>Resend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default VerificationScreen;
