import {
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Avatar, TextInput, Button, Text } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { DatePickerInput } from "react-native-paper-dates";
import { registerTranslation, en } from "react-native-paper-dates";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "../../components/CustomButton";
import CustomLoader from "../../components/CustomLoader";
import axios, { AxiosError } from "axios";
import {
  UserState,
  clearUser,
  setAccessTokenStore,
  setUser,
} from "../../redux/reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useIsFocused } from "@react-navigation/native";

registerTranslation("en", en);

const ProfileScreen = () => {
  // const isFocused = useIsFocused();
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation<any>();

  const [usernameLabel, setUsernameLabel] = useState<string | undefined>(
    "FlexBus User"
  );
  const [username, setUsername] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");
  const [inputDate, setInputDate] = useState<Date>();
  const [email, setEmail] = useState<string>(
    useSelector((state: RootState) => state.user.email)
  );
  const userId = useSelector((state: RootState) => state.user.id);
  const accessToken = useSelector(
    (state: RootState) => state.user.accessTokenStore
  );

  const windowWidth = 0.85 * useWindowDimensions().width;

  const genderList = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Others",
      value: "others",
    },
  ];

  // const [accessToken, setAccessToken] = useState<string | null>(null);

  // let accessToken: string | null = null;
  // const [accessToken, setAccessToken] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(clearUser);
    dispatch(setAccessTokenStore(null));
    await AsyncStorage.removeItem("access_token");
    navigation.navigate("AuthStack");
  };

  const handleUpdate = async () => {
    const response = await axios.patch(
      `https://be-flexbus-production.up.railway.app/user`,
      {
        id: userId,
        name: username,
        phoneNumber: phoneNumber,
        gender: gender,
        birthDay: inputDate,
      }
    );

    const data = response.data.data;

    // const userInfo: UserState = {
    //   id: userId,
    //   email: email,
    //   phoneNumber: data.phoneNumber,
    //   gender: data.gender,
    //   birthday: data.birthDay,
    //   name: data.name,
    // };

    // dispatch(setUser(userInfo));
    await AsyncStorage.setItem("access_token", data.accessToken);
    // await AsyncStorage.setItem("user_info", JSON.stringify(userInfo));

    setUsernameLabel(username);
  };

  const handleDelete = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    await axios
      .delete(`https://be-flexbus-production.up.railway.app/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
      .then(async (response) => {
        if (response.data.code == 200) {
          dispatch(clearUser);
          await AsyncStorage.removeItem("access_token");
          await AsyncStorage.removeItem("user_info");

          navigation.navigate("AuthStack");
        }
      })
      .catch((e: AxiosError) => {
        console.log("Handle delete", e.message);
      });
  };

  const getAccessToken = async () => {
    const value = await AsyncStorage.getItem("access_token");
    dispatch(setAccessTokenStore(value));

    if (accessToken !== null) {
      // console.log(accessToken)
      getInfo();
    }
    setIsLoading(false);
  };

  const getInfo = async () => {
    await axios
      .get(`https://be-flexbus-production.up.railway.app/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setUsername(data.name);
        setPhoneNumber(data.phoneNumber);
        setGender(data.gender);
        setInputDate(JSON.parse(data.birthDay));
      })
      .catch((e: AxiosError) => {
        console.log("Get info:", e.message);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <ScrollView>
      {isLoading && <CustomLoader />}
      {!isLoading && accessToken === null && (
        <View className="flex items-center justify-center self-center mt-60">
          <Text className="text-[#001B3F] text-base">
            Please log in to use many features of FlexBus
          </Text>
          <CustomButton
            text="Login"
            onPress={() => {
              navigation.navigate("AuthStack");
            }}
          />
        </View>
      )}
      {!isLoading && accessToken !== null && (
        <View className="flex-1 self-center" style={{ width: windowWidth }}>
          <TouchableOpacity
            className="flex-row-reverse my-5 mx-3 mt-10"
            onPress={() => {
              handleLogout();
            }}
          >
            <Text className="text-[#001356] font-bold text-base">Log out</Text>
          </TouchableOpacity>
          <View>
            <Avatar.Image
              className="mx-auto my-2"
              size={200}
              source={require("../../assets/Avatar.png")}
            />
          </View>
          <Text
            className="mx-auto text-[#001356] font-bold"
            variant="headlineLarge"
          >
            {usernameLabel}
          </Text>

          <View className="flex flex-row flex-wrap">
            <TextInput
              className="my-1 basis-full"
              mode="outlined"
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              left={<TextInput.Icon icon="phone-outline" />}
              outlineColor="#767680"
              activeOutlineColor="#001356"
              outlineStyle={{
                borderRadius: 12,
                borderWidth: 1,
              }}
            />
            <TextInput
              className="my-1 basis-full"
              mode="outlined"
              label="Username"
              value={username}
              onChangeText={setUsername}
              left={<TextInput.Icon icon="account-outline" />}
              outlineColor="#767680"
              activeOutlineColor="#001356"
              outlineStyle={{
                borderRadius: 12,
                borderWidth: 1,
              }}
            />
            <View className="my-1 basis-full">
              <DropDown
                label="Gender"
                mode="outlined"
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={gender}
                setValue={setGender}
                list={genderList}
                inputProps={{
                  left: <TextInput.Icon icon={"gender-male-female"} />,
                  outlineColor: "#767680",
                  activeOutlineColor: "#001356",
                  outlineStyle: {
                    borderRadius: 12,
                    borderWidth: 1,
                  },
                }}
              />
            </View>
            <DatePickerInput
              className="my-1 basis-full"
              locale="en"
              label="Birthdate"
              mode="outlined"
              value={inputDate}
              onChange={(d) => setInputDate(d)}
              inputMode="start"
              left={<TextInput.Icon icon="cake-variant-outline" />}
              outlineColor="#767680"
              activeOutlineColor="#001356"
              outlineStyle={{
                borderRadius: 12,
                borderWidth: 1,
              }}
            />
            <TextInput
              className="my-1 basis-full"
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={setEmail}
              left={<TextInput.Icon icon="email-outline" />}
              outlineColor="#767680"
              activeOutlineColor="#001356"
              outlineStyle={{
                borderRadius: 12,
                borderWidth: 1,
              }}
              editable={false}
            />
          </View>
          <View className="flex justify-center items-center">
            {/* <Button mode="text" textColor="#BA1A1A" onPress={() => {}}>
            Delete Account
          </Button> */}
            <TouchableOpacity onPress={handleDelete}>
              <Text className="text-[#BA1A1A] font-bold my-3 text-base">
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <CustomButton text="Update" onPress={handleUpdate} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;
