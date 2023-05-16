import { View, Text, ScrollView, StatusBar } from "react-native";
import React, {useEffect, useState} from 'react'
import { GOOGLE_API_KEY } from '../../config/config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomNavigationHeader from '../../components/CustomNavigationHeader';
import RouteResultItem from '../../components/Map/RouteResultItem';
import CustomLoader from "../../components/CustomLoader";
import { Title, Subheading } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import {routeData} from "../../data"
import { Coord, CoordName } from "../../types/LocationTypes";
import { BusStep, Route } from "../../types/RouteTypes";

type RootStackParamList = {
  Route: { fromLocation: CoordName; toLocation: CoordName, limit: string };
};

type RouteScreenProps = NativeStackScreenProps<RootStackParamList, "Route">;

const RouteScreen: React.FC<RouteScreenProps> = ({ navigation, route }) => {
  const { fromLocation, toLocation, limit } = route.params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    console.log(url);
    // Testing
    const test = false;

    if(test){
      const routes = routeData.routes;
      parseRoute(routes);
      setIsLoading((load) => false);
    }
    else{
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Extract the relevant information from the response
          let routes = data.routes;
          // Use Fake data instead of real data if limit exceeded
          if (data.status == "OVER_QUERY_LIMIT") routes = routeData.routes;

          parseRoute(routes);

          setIsLoading((load) => false);
        })
        .catch((error) => console.error(error));
    }
    
  }

  const parseRoute = (routes: any) => {
    let routeSaves: Route[] = [];
    routes.forEach((route: any) => {
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
        const busSteps = leg.steps.filter(
          (step: any) =>
            step.travel_mode === "TRANSIT" &&
            step.transit_details.line.vehicle.type === "BUS"
        );
        if (!busSteps || busSteps.length == 0 || busSteps.length > eval(limit))
          console.log("No bus routes found");
        else {
          routeSave.price = route.fare?.value;
          routeSave.departure = leg.start_address;
          routeSave.arrival = leg.end_address;
          routeSave.timestart = leg.departure_time?.text;
          routeSave.timeend = leg.arrival_time?.text;
          routeSave.duration = leg.duration?.text;
          routeSave.distance = leg.distance?.text;
          let busStep: BusStep = {
            bus_no: "0",
            departure: "0",
            arrival: "0",
            timestart: "0",
            timeend: "0",
            distance: "0",
            duration: "0",
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
          if (routeSave.price) routeSaves.push(routeSave);
        }
      });
    });
    setRoutes(routeSaves);
  }
  

  useEffect(()=>{
    setIsLoading(true);
    if (
      fromLocation.location_name != "Current Location" &&
      fromLocation.location_name != "Recent Location" &&
      fromLocation.latitude == 0
    )
      fetchLocationByAddress("from", fromLocation.location_name);
    if (
      toLocation.location_name != "Current Location" &&
      toLocation.location_name != "Recent Location" &&
      toLocation.latitude == 0
    )
      fetchLocationByAddress("to", toLocation.location_name);
    fetchRoute();
  },[])

  return (
    <View className="flex flex-1 flex-col">
      <StatusBar
        backgroundColor="#000"
        translucent={true}
        barStyle="light-content"
      />
      <CustomNavigationHeader name="Search Result" navigateBackEnable={true} />
      {isLoading ? (
        <CustomLoader />
      ) : (
        <ScrollView className="flex flex-1">
          {routes.length == 0 && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: "auto",
              }}
            >
              <Icon name="error-outline" size={50} color="#888" />
              <Title>Oops!</Title>
              <Subheading>No bus routes found.</Subheading>
            </View>
          )}
          {routes &&
            routes.length > 0 &&
            routes.map((route: Route, index) => (
              <RouteResultItem key={index} route={route} />
            ))}
        </ScrollView>
      )}
    </View>
  );
};

export default RouteScreen