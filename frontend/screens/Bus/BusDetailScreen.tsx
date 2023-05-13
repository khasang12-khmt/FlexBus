import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BusStep, Route } from '../../types/RouteTypes';
import { SegmentedButtons } from "react-native-paper";
import CustomNavigationHeader from '../../components/CustomNavigationHeader';
import BusDetailInfo from '../../components/BusDetail/BusDetailInfo';

type RootStackParamList = {
  BusDetail: Route;
};

type BusDetailScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "BusDetail"
>;

const BusDetailScreen:React.FC<BusDetailScreenNavigationProp> = ({navigation, route}) => {
  const busSteps: BusStep[] = route.params?.busSteps;
  const buttons: any[] = busSteps.map((step: BusStep) => ({
    value: step.bus_no,
    label: step.bus_no,
    uncheckedColor: "#001356",
    checkedColor: "#6072C4",
    showSelectedCheck: true,
  }));
  const [busStep, setBusStep] = useState<BusStep>(busSteps[0]);
  const [busName, setBusName] = useState<string>(busSteps[0].bus_no);

  useEffect(()=>{
    const step = busSteps.filter((st:BusStep) => st.bus_no === busName)[0]
    setBusStep((prev:BusStep)=>step)
  },[busName])

  return (
    <View className="mx-3">
      <CustomNavigationHeader name="Bus Detail" navigateBackEnable />
      {buttons.length > 1 && (
        <SegmentedButtons
          value={busName}
          onValueChange={setBusName}
          buttons={buttons}
        />
      )}
      <BusDetailInfo info={busStep}/>
    </View>
  );
}

export default BusDetailScreen