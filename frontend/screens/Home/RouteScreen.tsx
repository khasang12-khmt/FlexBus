import { View, Text, ScrollView } from "react-native";
import React, {useEffect, useState} from 'react'
import { GOOGLE_API_KEY } from '../../config/config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomNavigationHeader from '../../components/CustomNavigationHeader';
import RouteResultItem from '../../components/Map/RouteResultItem';

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

type BusStep = {
  bus_no: string;
  departure: string;
  arrival: string;
  timestart: string;
  timeend: string;
  duration: string;
  distance: string;
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

const RouteScreen: React.FC<RouteScreenProps> = ({ navigation, route }) => {
  const { fromLocation, toLocation } = route.params;
  const [routes,setRoutes] = useState<Route[]>([]);

  const fetchLocationByAddress = (typ:string, address:string|undefined) => {
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
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let routeSaves: Route[] = [];
        
        // Extract the relevant information from the response
        const routes = data.routes;
        routes.forEach((route:any, index:number)=>{
          let routeSave: Route = {
            price: "0",
            departure: "0",
            arrival: "0",
            timestart: "0",
            timeend: "0",
            duration: "0",
            distance: "0",
            busSteps: [],
          };
          const legs = route?.legs;

          legs?.flatMap((leg: any) => {
            routeSave.price = route.fare.value;
            routeSave.departure = leg.start_address;
            routeSave.arrival = leg.end_address;
            routeSave.timestart = leg.departure_time?.text;
            routeSave.timeend = leg.arrival_time?.text;
            routeSave.duration = leg.duration?.text;
            routeSave.distance = leg.distance?.text;

            const busSteps = leg.steps.filter(
              (step: any) =>
                step.travel_mode === "TRANSIT" &&
                step.transit_details.line.vehicle.type === "BUS"
            );

            if (!busSteps || busSteps.length == 0) console.log("No bus routes found");
            else {
              let busStep: BusStep = {
                bus_no: "0",
                departure: "0",
                arrival: "0",
                timestart: "0",
                timeend: "0",
                distance: "0",
                duration: "0"
              };
              busSteps.forEach((step: any) => {
                busStep.bus_no = step.transit_details.line.short_name;
                busStep.departure = step.transit_details.departure_stop.name;
                busStep.arrival = step.transit_details.arrival_stop.name;
                busStep.timestart = step.transit_details.departure_time.text;
                busStep.timeend = step.transit_details.arrival_time.text;
                busStep.distance = step.distance.text;
                busStep.duration = step.duration.text;
                routeSave.busSteps.push(JSON.parse(JSON.stringify(busStep)));
              });
            }
            routeSaves.push(routeSave);
          });
        })
        setRoutes(routeSaves);
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
      <ScrollView>
        {routes &&
          routes.length > 0 &&
          routes.map((route: Route, index) => (
            <RouteResultItem key={index} route={route} />
          ))}
      </ScrollView>
    </View>
  );
};

export default RouteScreen