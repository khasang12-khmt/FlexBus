import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Button } from "react-native-paper";
import CustomHeader from '../../components/CustomLogoHeader'
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import AutoComplete from '../../components/Map/AutoComplete';
import FindRouteModal from '../../components/Map/FindRouteModal';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LocationName = {
  location_name: string | undefined;
};
type Coord = {
  latitude: number;
  longitude: number;
};
type CoordName = LocationName & Coord;

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const navigation = useNavigation();
    const [route, setRoute] = useState<Coord[]>([])
    const [currentLocation, setCurrentLocation] = useState<CoordName>({
      location_name: "",
      latitude: 0,
      longitude: 0,
    });
    const [destination, setDestination] = useState<CoordName>({
      location_name: "",
      latitude: 0,
      longitude: 0,
    });

    const mapRef = useRef<any>(null)
    const onRegionChange=()=>{
      mapRef?.current?.animateToRegion({
        latitude: destination.latitude,
        longitude: destination.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    }

    useEffect(() => {
      requestLocationPermission();
      getCurrentLocation();
    }, []);

    useEffect(()=>{
        if(destination.latitude!=0){
            onRegionChange()
            saveLocationData(destination,"To")
        }
    },[destination])

    const saveLocationData = async (locationData:Coord, tag: string) => {
      try {
        // Convert the location data to a string
        const locationDataString = JSON.stringify(locationData);

        // Save the location data to AsyncStorage
        await AsyncStorage.setItem(tag + "LocationData", locationDataString);
        console.log(locationDataString);
      } catch (error) {
        console.error(error);
      }
    };

    const getCurrentLocation = async () => {
      const { coords } = await getCurrentPositionAsync({});
      setCurrentLocation({...coords,location_name:""});
      saveLocationData(coords,"Home")
      mapRef?.current?.animateToRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    };
    const requestLocationPermission = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    };
    
    

  return (
    <View className="flex flex-1">
      {/* Header */}
      <CustomHeader />

      {/* Map + Current Location */}
      {currentLocation && (
        <MapView
          style={styles.map}
          ref={mapRef}
          initialRegion={{
            ...currentLocation,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          mapPadding={{ top: 80, right: 0, left: 0, bottom: 0 }}
        >
          <Marker
            title="You are here"
            description={`Lat: ${Number(
              currentLocation.latitude.toFixed(2)
            )} Lon: ${Number(currentLocation.longitude.toFixed(2))}`}
            coordinate={currentLocation}
          />
          {destination.latitude !== 0 && (
            <Marker
              title={destination.location_name}
              description={`Lat: ${Number(
                destination.latitude.toFixed(2)
              )} Lon: ${Number(destination.longitude.toFixed(2))}`}
              coordinate={destination}
            />
          )}
          {route.length != 0 && (
            <Polyline
              coordinates={route}
              strokeColor="#001296"
              strokeWidth={5}
              zIndex={10000}
            />
          )}
        </MapView>
      )}

      {/* Search */}
      <AutoComplete
        label="Find Location"
        onChange={(data) => setDestination(data)}
      />

      {/* Find Route Modal */}
      <View className={`mt-auto ${modalVisible ? "h-full" : "h-16"}`}>
        <FindRouteModal
          visible={modalVisible}
          setVisible={setModalVisible}
          navigation={navigation}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 80
  },
});

export default HomeScreen