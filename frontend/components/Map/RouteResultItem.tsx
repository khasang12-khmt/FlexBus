import { View, Text, Image, TouchableOpacity } from 'react-native'
import {Button, Divider} from 'react-native-paper'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type BusStep = {
  bus_no: string;
  departure: string;
  arrival: string;
  timestart: string;
  timeend: string;
  distance: string;
  duration: string;
};
type Route = {
  price: string;
  departure: string;
  arrival: string;
  timestart: string;
  timeend: string;
  duration: string;
  distance: string;
  busSteps: BusStep[];
};

type RouteResultItemProps = {
  route: Route;
  limit: string;
}
type RootStackParamList = {
  BusDetail: Route;
};

type BusDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BusDetail"
>;
const RouteResultItem: React.FC<RouteResultItemProps> = ({route, limit}) => {
  const navigation = useNavigation<BusDetailScreenNavigationProp>();
  if (!limit || limit=="" || route.busSteps.length!=parseInt(limit) || route.busSteps.length==0) return null;
  const calcWalkingTime = () => {
    const total = parseFloat(route.distance.split(" ")[0]);
    const sum = route.busSteps.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue.distance.split(" ")[0]);
    }, 0);
    if (total < sum) return "0 km";
    let res = (total - sum).toFixed(1);
    return res.toString() + " km";
  };
  return (
    <View className="flex flex-col m-5">
      {route.busSteps.map((busStep, index: number) => (
        <View key={index} className="flex">
          {/* Title */}
          <View className="flex flex-row justify-between mb-3">
            <View className="flex flex-row">
              <MaterialCommunityIcons name="bus" size={20} />
              <Text style={{ fontFamily: "RobotoMedium", fontSize: 16 }}>
                {busStep.bus_no} Line
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 14,
                color: "#767680",
              }}
            >
              {busStep.duration}
            </Text>
          </View>

          {/* From - To */}
          <View className="flex-row justify-between mb-3">
            <View className="flex flex-col w-[100px]">
              <Text style={{ fontFamily: "RobotoMedium", fontSize: 16 }}>
                {busStep.timestart}
              </Text>
              <Text
                style={{
                  fontFamily: "RobotoRegular",
                  fontSize: 12,
                  color: "#555555",
                }}
              >
                {busStep.departure}
              </Text>
            </View>

            <Image
              source={require("../../assets/bus_routes.png")}
              className="round-lg mb-1"
              style={{
                height: 36,
                width: 100,
                resizeMode: "contain",
              }}
            />

            <View className="flex flex-col items-end w-[100px]">
              <Text style={{ fontFamily: "RobotoMedium", fontSize: 16 }}>
                {busStep.timeend}
              </Text>
              <Text
                style={{
                  fontFamily: "RobotoRegular",
                  fontSize: 12,
                  color: "#555555",
                }}
              >
                {busStep.arrival}
              </Text>
            </View>
          </View>
        </View>
      ))}

      {/* Distance & Time & Price */}
      <View className="flex flex-col gap-y-1">
        <View className="flex flex-row justify-between mx-2">
          <View className="flex flex-row gap-x-2">
            <MaterialCommunityIcons name="clock-outline" size={20} />
            <Text
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 12,
                color: "#555555",
              }}
            >
              Duration (Walking Included)
            </Text>
          </View>
          <Text>{route.duration}</Text>
        </View>
        <View className="flex flex-row justify-between mx-2">
          <View className="flex flex-row gap-x-2">
            <MaterialCommunityIcons name="map-marker-distance" size={20} />
            <Text
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 12,
                color: "#555555",
              }}
            >
              Total Distance
            </Text>
          </View>
          <Text>{route.distance}</Text>
        </View>
        <View className="flex flex-row justify-between mx-2">
          <View className="flex flex-row gap-x-2">
            <MaterialCommunityIcons name="walk" size={20} />
            <Text
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 12,
                color: "#555555",
              }}
            >
              Walking Distance
            </Text>
          </View>
          <Text>{calcWalkingTime()}</Text>
        </View>
        <View className="flex flex-row justify-between mx-2">
          <View className="flex flex-row gap-x-2">
            <MaterialCommunityIcons name="school-outline" size={20} />
            <Text
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 12,
                color: "#555555",
              }}
            >
              Student
            </Text>
          </View>
          <Text>{3000 * route.busSteps.length} VND</Text>
        </View>
        <View className="flex flex-row justify-between mx-2">
          <View className="flex flex-row gap-x-2">
            <MaterialCommunityIcons name="human-male" size={20} />
            <Text
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 12,
                color: "#555555",
              }}
            >
              Economy
            </Text>
          </View>
          <Text>{route.price} VND</Text>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity onPress={() => navigation.navigate("BusDetail", route)}>
        <Button className="flex items-center justify-center flex-row mx-auto bg-[#001356] mt-3 px-20 mb-6 rounded-md">
          <Text
            className="text-white"
            style={{ fontFamily: "RobotoMedium", fontSize: 18 }}
          >
            Check
          </Text>
        </Button>
      </TouchableOpacity>

      <Divider />
    </View>
  );
}

export default RouteResultItem