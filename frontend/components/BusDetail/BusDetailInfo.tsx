import { View, Text } from 'react-native'
import React from 'react'
import { BusStep, Route } from "../../types/RouteTypes";
import {
  Avatar,
  Card,
  IconButton,
  Divider,
  TextInput,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type BusDetailInfoProps = {
    info: BusStep
}

const BusDetailInfo: React.FC<BusDetailInfoProps> = ({info}) => {
  return (
    <View className="flex flex-col items-center">
      {/* Card */}
      <View className="flex flex-col items-center p-6 rounded-xl border-1 border-gray-700 shadow-lg">
        <View className="flex flex-row items-center pb-2">
          <MaterialCommunityIcons name="bus" size={36} />
          <Text style={{ fontSize: 36, fontFamily: "RobotoRegular" }}>
            {info.bus_no} Line
          </Text>
        </View>

        <Divider />

        <View className="flex flex-row gap-x-2">
          <TextInput
            label="Date"
            value={info.timestart}
            disabled
            mode="outlined"
            left={
              <TextInput.Icon
                icon="calendar-today"
                containerColor="white"
                size={20}
              />
            }
          />
          <TextInput
            label="Time"
            value={info.timestart}
            disabled
            mode="outlined"
            left={
              <TextInput.Icon icon="clock" containerColor="white" size={20} />
            }
          />
        </View>
      </View>
      {/* Schedule */}
      {/* Facilities */}
    </View>
  );
}

export default BusDetailInfo