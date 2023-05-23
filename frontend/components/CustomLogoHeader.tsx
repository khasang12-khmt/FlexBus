import { View, Text, Image, StatusBar } from 'react-native'
import React from 'react'

const CustomHeader = () => {
  return (
    <View className="bg-[#001356] flex flex-col p-1 pl-12 h-[150px]">
      <StatusBar backgroundColor="#001356" barStyle="light-content"/>
      <View className="flex flex-row gap-x-5">
        <Image
          source={require("../assets/icon.png")}
          className="round-lg mb-2"
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
    </View>
  );
}

export default CustomHeader