import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { GOOGLE_API_KEY } from '../../config/config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const location = data.results[0].geometry.location;
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
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${fromLocation.latitude},${fromLocation.longitude}&destination=${toLocation.latitude},${toLocation.longitude}&mode=transit&transit_mode=bus&key=${GOOGLE_API_KEY}&transit_routing_preference=less_walking`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Extract the relevant information from the response
        const routes = data.routes;
        const legs = routes[0]?.legs;
        const busSteps = legs?.flatMap((leg:any) =>
          leg.steps.filter(
            (step: any) =>
              step.travel_mode === "TRANSIT" &&
              step.transit_details.line.vehicle.type === "BUS"
          )
        );

        // Log the bus routes and stops
        console.log("Bus routes:");
        if(busSteps.length==0) console.log("No bus routes found");
        busSteps.forEach((step: any) => {
          console.log(step.transit_details.line.short_name);
          console.log("From:", step.transit_details.departure_stop.name);
          console.log("To:", step.transit_details.arrival_stop.name);
          console.log("Duration:", step.duration.text);
          console.log("Number of stops:", step.transit_details.num_stops);
          console.log("----------------------------------");
        });
      })
      .catch((error) => console.error(error));
  }

  useEffect(()=>{
    if (fromLocation.location_name!="Current Location")
        fetchLocationByAddress("from", fromLocation.location_name);
    if (toLocation.location_name != "Current Location")
        fetchLocationByAddress("to", toLocation.location_name);
    fetchRoute();
  },[])
  return (
    <View>
      <Text>RouteScreen</Text>
    </View>
  );
};

export default RouteScreen