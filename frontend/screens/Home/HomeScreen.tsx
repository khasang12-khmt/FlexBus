import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Button } from "react-native-paper";
import CustomHeader from '../../components/CustomHeader'
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import AutoComplete from '../../components/Map/AutoComplete';
import FindRouteModal from '../../components/Map/FindRouteModal';

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

    useEffect(()=>{
        if(destination.latitude!=0){
            onRegionChange()
        }
    },[destination])

    const getCurrentLocation = async () => {
      const { coords } = await getCurrentPositionAsync({});
      setCurrentLocation({...coords,location_name:""});
    };
    const requestLocationPermission = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    };
    
    useEffect(() => {
      requestLocationPermission();
      getCurrentLocation();
    }, []);

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
          zoomControlEnabled={true}
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
      {destination.latitude !== 0 && (
        <View className={`mt-auto ${modalVisible ? "h-full" : "h-16"}`}>
          <FindRouteModal
            fromLocation={currentLocation}
            toLocation={destination}
            visible={modalVisible}
            setVisible={setModalVisible}
            setRoute={setRoute}
          />
        </View>
      )}
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