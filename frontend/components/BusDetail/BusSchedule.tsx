import { View, Text } from 'react-native'
import React from 'react'
import { Schedule } from '../../types/BusDetailTypes'
import { Divider } from "react-native-paper";

type BusScheduleProps = {
    schedule: Schedule
}

const BusSchedule: React.FC<BusScheduleProps> = ({ schedule }) => {
  return (
    <View className="">
      <View className="flex flex-row">
        <Text
          style={{ fontSize: 12, fontFamily: "RobotoLight" }}
          className="w-20 text-center"
        >
          {schedule.day}
        </Text>

        <Text
          style={{ fontSize: 12, fontFamily: "RobotoLight" }}
          className="w-24 text-center"
        >
          {schedule.operatingHours}
        </Text>
        <Text
          style={{ fontSize: 12, fontFamily: "RobotoLight" }}
          className="w-20 text-center"
        >
          {schedule.frequency}
        </Text>
      </View>
      <Divider/>
    </View>
  );
};

export default BusSchedule