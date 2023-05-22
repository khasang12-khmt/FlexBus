import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ImageSourcePropType,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CustomAuthInput from "../../components/CustomAuthInput";
import CustomButton from "../../components/CustomButton";
import CustomImage from "../../components/CustomImage";
import { RootState } from "../../redux/store";
import CustomNavigationHeader from "../../components/CustomNavigationHeader";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState<string>("");
  const navigation = useNavigation<any>();
  const windowWidth = 0.85 * useWindowDimensions().width;
  // const message = useSelector((state: RootState) => state.email.value);
  const imageSource: ImageSourcePropType = require("../../assets/ForgotPassword.png");

  const handleSend = () => {};
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
            <View className="mt-[-28]">
            <CustomNavigationHeader name="Forgot Password" navigateBackEnable={true} />
            </View>

            <CustomImage source={imageSource} />
            <View className="flex-row flex-wrap">
              <CustomAuthInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email address"
                isSecure={false}
              />
            </View>
            <CustomButton text="Send" onPress={handleSend} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
