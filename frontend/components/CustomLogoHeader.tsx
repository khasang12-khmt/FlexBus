import { View, Text, Image } from 'react-native'
import React from 'react'

const CustomHeader = () => {
  return (
    <View className="bg-[#001356] flex flex-row items-center gap-x-5 p-1 pl-12 max-h-100">
      <Image
        source={require("../assets/icon.png")}
        className="round-lg mb-1"
        style={{
          height: 70,
          width: 70,
        }}
      />
      <View>
        <Text
          className="text-white"
          style={{
            fontSize: 32,
            fontFamily: "RobotoRegular",
          }}
        >
          FlexBus
        </Text>
        <Text
          className="text-white uppercase"
          style={{
            fontSize: 11,
            fontFamily: "RobotoMedium",
          }}
        >
          Bus With Us, Arrive On Time
        </Text>
      </View>
    </View>
  );
}

export default CustomHeader