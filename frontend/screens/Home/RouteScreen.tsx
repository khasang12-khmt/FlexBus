import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { GOOGLE_API_KEY } from '../../config/config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomNavigationHeader from '../../components/CustomNavigationHeader';

type LocationName = {
  location_name: string | undefined;
};
type Coord = {
  latitude: number;
  longitude: number;
};
type CoordName = LocationName & Coord;

type RootStackParamList = {
  Route: { fromLocation: CoordName; toLocation: CoordName };
};

type RouteScreenProps = NativeStackScreenProps<RootStackParamList, "Route">;

const RouteScreen: React.FC<RouteScreenProps> = ({ navigation, route }) => {
  const { fromLocation, toLocation } = route.params;

  const fetchLocationByAddress = (typ:string, address:string|undefined) => {
    console.log(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const location = data.results[0]?.geometry.location;
        if (!location) {
          alert("Location Not Found");
          navigation.goBack();
        }
        if(typ==="from"){
            fromLocation.latitude = location.lat;
            fromLocation.longitude = location.lng;
        }
        else {
            toLocation.latitude = location.lat;
            toLocation.longitude = location.lng;
        }
      })
      .catch((error) => console.error(error));
  }

  const fetchRoute = () => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${fromLocation.latitude},${fromLocation.longitude}&destination=${toLocation.latitude},${toLocation.longitude}&mode=transit&transit_mode=bus&key=${GOOGLE_API_KEY}&alternatives=true`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Extract the relevant information from the response
        const routes = data.routes;
        routes.forEach((route:any, index:number)=>{
          console.log("Alternative " + (index + 1));
          const legs = route?.legs;

          console.log("Price: ", route.fare.value);
          const busSteps = legs?.flatMap((leg: any) => {
            console.log("From: ", leg.start_address);
            console.log("To: ", leg.end_address);
            console.log("Trip Departure Time: ", leg.departure_time?.text);
            console.log("Trip Arrival Time: ", leg.arrival_time?.text);
            console.log("Trip Duration: ", leg.duration?.text);
            console.log("Trip Distance: ", leg.distance?.text);

            const busSteps = leg.steps.filter(
              (step: any) =>
                step.travel_mode === "TRANSIT" &&
                step.transit_details.line.vehicle.type === "BUS"
            );

            // Log the bus routes and stops
            console.log("Bus routes:");
            if (!busSteps || busSteps.length == 0) console.log("No bus routes found");
            else {
              busSteps.forEach((step: any) => {
                console.log("Bus No.:", step.transit_details.line.short_name);
                console.log("From:", step.transit_details.departure_stop.name);
                console.log("To:", step.transit_details.arrival_stop.name);
                console.log(
                  "Bus Departure Time: ",
                  step.transit_details.departure_time.text
                );
                console.log("Bus Arrival Time: ", step.transit_details.arrival_time.text);
                console.log("Duration:", step.duration.text);
                console.log("----------------------------------");
              });
            }
          });
        })
        
      })
      .catch((error) => console.error(error));
  }

  useEffect(()=>{
    if (
      fromLocation.location_name != "Current Location" &&
      fromLocation.location_name != "To Location"
    )
      fetchLocationByAddress("from", fromLocation.location_name);
    if (
      toLocation.location_name != "Current Location" &&
      toLocation.location_name != "To Location"
    )
      fetchLocationByAddress("to", toLocation.location_name);
    fetchRoute();
  },[])
  return (
    <View className="flex flex-1 flex-col">
      <CustomNavigationHeader name="Search Result" navigateBackEnable={true} />
      <View className="bg-gray-200"></View>
    </View>
  );
};

export default RouteScreen