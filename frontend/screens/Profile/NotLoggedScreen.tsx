import { View, Text, ImageSourcePropType, Image } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import CustomImage from "../../components/CustomImage";

const NotLoggedScreen = () => {
  const navigation = useNavigation<any>();
  const imageSource: ImageSourcePropType = require("../../assets/Profile.png");

  return (
    <View className="flex items-center justify-center self-center mt-48">
      <Image
        source={imageSource}
        style={{
          resizeMode: "contain",
          height: 200,
          alignSelf: "center",
          marginBottom: 50,
        }}
      />
      <Text className="text-[#001B3F] text-base">
        Please login to use many features of FlexBus
      </Text>
      <CustomButton
        text="Login"
        onPress={() => {
          navigation.navigate("AuthStack");
        }}
      />
    </View>
  );
};

export default NotLoggedScreen;
