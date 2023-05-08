import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button } from "react-native-paper";
import CustomHeader from '../../components/CustomHeader'
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import AutoComplete from '../../components/Map/AutoComplete';
import FindRouteModal from '../../components/Map/FindRouteModal';

type Coord = {
  location_name: string|undefined;
  latitude: number;
  longitude: number;
};

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [currentLocation, setCurrentLocation] = useState<Coord>({
      location_name: "",
      latitude: 0,
      longitude: 0,
    });
    const [destination, setDestination] = useState<Coord>({
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
          /* style={modalVisible?{...styles.map,zIndex:5}:styles.map} */
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
        </MapView>
      )}

      {/* Search */}
      <AutoComplete
        label="Find Location"
        onChange={(data) => setDestination(data)}
      />

      {/* Find Route Modal */}
      <View className={`mt-auto ${modalVisible?"h-full":"h-16"}`}>
        <FindRouteModal visible={modalVisible} setVisible={setModalVisible}/>
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