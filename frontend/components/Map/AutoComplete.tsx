import { View } from "react-native";
import { Menu, Searchbar } from "react-native-paper";
import React, { useState } from "react";
import axios from "axios";
import _ from "lodash";
import { StyleSheet } from "react-native";
import { MAP_API_KEY } from "../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Coord = {
  location_name: string | undefined;
  latitude: number;
  longitude: number;
};

type AutoCompleteProps = {
  label: string;
  onChange: (arg:Coord)=>void;
}
type Location = {
  display_name: string;
  lat: string;
  lon: string;
}
const AutoComplete:React.FC<AutoCompleteProps> = ({
  label,
  onChange,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [data, setData] = useState<Location[]>()
  const [searchQuery, setSearchQuery] = useState<string>(label);
  //Allow 1 API call Per Second
  const getAutoComplete = _.debounce(async (query: string) => {
    let str = `https://api.locationiq.com/v1/autocomplete?key=${MAP_API_KEY}&q=${query}&limit=3&dedupe=1`;
    axios
      .get(str)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    // Handle response data here
  }, 1000);

  return (
    <View>
      <Searchbar
        className="mx-4 rounded-xl z-999 bg-white border-sky-100 border"
        placeholder="Find Location"
        onChangeText={(text: string) => setSearchQuery(text)}
        onKeyPress={() => {
          getAutoComplete(searchQuery);
          if (searchQuery.length !== 0) {
            setMenuVisible(true);
          }
        }}
        value={searchQuery}
      />
      {menuVisible && data && (
        <View
        className="px-4 w-full"
          style={{
            flex: 1,
            backgroundColor: "white",
            flexDirection: "column",
            width: "100%"
          }}
        >
          {data.map((datum, i) => (
            <Menu.Item
              key={i}
              style={styles.item}
              titleStyle={{fontSize:13, fontFamily:"RobotoRegular"}}
              onPress={() => {
                onChange({
                  location_name: datum.display_name,
                  latitude: parseFloat(datum.lat),
                  longitude: parseFloat(datum.lon),
                });
                setSearchQuery(datum.display_name);
                setMenuVisible(false);
              }}
              title={datum.display_name}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    fontSize:12,
    width: 4000,
    padding: 10,
    borderBottomColor: "#ccc",
  },
});

export default AutoComplete;