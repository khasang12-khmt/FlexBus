import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BusStep, Route } from "../../types/RouteTypes";
import {
  Divider,
  TextInput,
  Button
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from 'axios';
import { BusDetail, Facility, Schedule } from '../../types/BusDetailTypes';
import BusSchedule from './BusSchedule';

type BusDetailInfoProps = {
    info: BusStep
}

const BusDetailInfo: React.FC<BusDetailInfoProps> = ({info}) => {
  const [busDetail, setBusDetail] = useState<BusDetail>();
  const getBusDetail = () => {
    axios.get(`https://be-flexbus-production.up.railway.app/bus/${info.bus_no}`)
        .then((res)=>setBusDetail(res.data.data[0]))
        .catch((err)=>console.log(err))
  }
  const getDate = ()=>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: months are zero-indexed
    const day = currentDate.getDate();
    return `${day}/${month}/${year}`;
  }

  const getFactIconByName = (name: string) => {
    if (name === "Air conditioner") return "air-conditioner";
    if (name === "Luggage storage") return "bag-suitcase-outline";
    if (name === "Wifi") return "wifi";
    if (name === "Power outlets") return "power-plug-outline";
    return "devices";
  }
  
  useEffect(()=>{
    getBusDetail();
  },[])
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
            value={getDate()}
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
      {busDetail?.schedule && (
        <View className="flex flex-col justify-start items-start">
          <Text
            style={{
              fontSize: 20,
              fontFamily: "RobotoRegular",
              marginBottom: 5,
            }}
          >
            Bus Schedule
          </Text>
          <View>
            {/* Header */}
            <View className="flex flex-row mb-2">
              <Text
                style={{ fontSize: 12, fontFamily: "RobotoRegular" }}
                className="w-20 text-center"
              >
                Day
              </Text>

              <Text
                style={{ fontSize: 12, fontFamily: "RobotoRegular" }}
                className="w-24 text-center"
              >
                Operating Hours
              </Text>
              <Text
                style={{ fontSize: 12, fontFamily: "RobotoRegular" }}
                className="w-20 text-center"
              >
                Frequency
              </Text>
            </View>
            {/* Rows */}
            {busDetail?.schedule.map((item: Schedule, index: number) => (
              <BusSchedule schedule={item} key={index} />
            ))}
          </View>
        </View>
      )}
      {busDetail?.facilities && (
        <View className="flex flex-col justify-start items-start ml-10 mt-2">
          <Text
            style={{
              fontSize: 20,
              fontFamily: "RobotoRegular",
              marginBottom: 5,
            }}
          >
            Facilities
          </Text>
          <View className="flex flex-row flex-wrap">
            {busDetail?.facilities.map((item: Facility, index: number) => (
              <View key={index} className="flex-row p-2 w-1/2 gap-x-2">
                <MaterialCommunityIcons
                  name={getFactIconByName(item)}
                  size={20}
                />
                <Text style={{ fontSize: 12, fontFamily: "RobotoRegular" }}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => console.log(info)} // Navigate to PaymentScreen
      >
        <Button className="flex items-center justify-center flex-row mx-auto bg-[#001356] mt-2 px-20 rounded-md py-1">
          <Text
            className="text-white"
            style={{ fontFamily: "RobotoMedium", fontSize: 21 }}
          >
            Book
          </Text>
        </Button>
      </TouchableOpacity>
    </View>
  );
}

export default BusDetailInfo