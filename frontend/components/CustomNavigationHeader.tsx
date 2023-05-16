import { View, Text, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

type HeaderProps = {
    name: string
    navigateBackEnable: boolean
}
const CustomNavigationHeader: React.FC<HeaderProps> = ({name,navigateBackEnable}) => {
    const navigation = useNavigation();
  return (
    <View className="flex flex-row pt-4 pb-4 justify-between items-center mt-7">
      {
        navigateBackEnable && 
        <TouchableOpacity className="ml-6" onPress={()=>navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={25} />
        </TouchableOpacity>
      }
      
      <Text
        style={{
          marginRight: 40,
          fontSize: 22,
          fontFamily: "RobotoRegular",
        }}
      >
        {name}
      </Text>
      <View></View>
    </View>
  );
};

export default CustomNavigationHeader;
