import {
  Alert,
  Dimensions,
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
  setUserId,
} from "../../redux/reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotLoggedScreen from "./NotLoggedScreen";
import { BarCodeScanner } from "expo-barcode-scanner";
import Icon from "react-native-paper/lib/typescript/src/components/Icon";
import { SafeAreaView } from "react-native-safe-area-context";

registerTranslation("en", en);

const ProfileScreen = () => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
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
  const [studentID, setStudentID] = useState<string>("");
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

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (type == "org.iso.Code128" || type == "1") {
      setStudentID(data);
      Alert.alert(`Scan Successfully`, `Student ID: ${data}`, [
        {
          text: "OK",
          onPress: () => setIsScanning(false),
        },
      ]);
    } else {
      Alert.alert(`Scan Failed`, `Invalid type: ${type}`, [
        {
          text: "OK",
          onPress: () => setIsScanning(false),
        },
      ]);
    }
  };

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const dispatch = useDispatch();

  const handleLogout = async () => {
    Alert.alert("Log out", "You will be returned to the login screen", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Log out",
        onPress: async () => {
          dispatch(clearUser);
          dispatch(setAccessTokenStore(null));
          await AsyncStorage.removeItem("access_token");
          navigation.navigate("AuthStack");
        },
        style: "destructive",
      },
    ]);
  };

  const handleUpdate = async () => {
    await axios
      .patch(
        `https://be-flexbus-production.up.railway.app/user`,
        {
          id: userId,
          name: username,
          phoneNumber: phoneNumber,
          gender: gender,
          birthDay: inputDate,
          student_no: studentID,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((response) => {
        if (response.data.code == 200) {
          Alert.alert("Update Successfully", "", [
            {
              text: "OK",
              onPress: () => {
                setUsernameLabel(username);
              },
            },
          ]);
        }
      })
      .catch((e: AxiosError) => {
        console.log("Handle update:", e.message);
      });
  };

  const handleDelete = async () => {
    Alert.alert("Delete Account", "You cannot undo this action", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          // const access_token = await AsyncStorage.getItem("access_token");
          await axios
            .delete(
              `https://be-flexbus-production.up.railway.app/user/${userId}`,
              {
                headers: {
                  Authorization: "Bearer " + accessToken,
                },
              }
            )
            .then(async (response) => {
              if (response.data.code == 200) {
                dispatch(clearUser);
                await AsyncStorage.removeItem("access_token");
                navigation.navigate("AuthStack");
              }
            })
            .catch((e: AxiosError) => {
              console.log("Handle delete:", e.message);
            });
        },
        style: "destructive",
      },
    ]);
  };

  const getAccessToken = async () => {
    const value = await AsyncStorage.getItem("access_token");
    dispatch(setAccessTokenStore(value));
    if (accessToken !== null) {
      await getInfo();
    }
    setIsLoading(false);
  };

  const getInfo = async () => {
    const userIdAsyncStorage = await AsyncStorage.getItem("user_id");
    await axios
      .get(
        `https://be-flexbus-production.up.railway.app/user/${userIdAsyncStorage}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((response) => {
        const data = response.data.data;
        setUsername(data.name);
        setPhoneNumber(data.phoneNumber);
        setGender(data.gender);
        setInputDate(new Date(data.birthDay));
        setEmail(data.email);
        setUsernameLabel(data.name);
        setStudentID(data.student_no);
      })
      .catch((e: AxiosError) => {
        console.log("Get info:", e.message);
      });

    // setIsLoading(false);
  };

  useEffect(() => {
    getAccessToken();
  }, [accessToken]);

  return (
    <SafeAreaView className="flex flex-col">
      {isScanning && (
        <View>
          <TouchableOpacity
            onPress={() => {
              setIsScanning(false);
              setScanned(true);
            }}
            style={{ marginBottom: 10, marginLeft: 10 }}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={22}
              color="#001356"
            />
          </TouchableOpacity>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{
              flexBasis: "100%",
            }}
          />
        </View>
      )}
      {!isScanning && (
        <ScrollView>
          {isLoading && <CustomLoader />}
          {!isLoading && accessToken === null && <NotLoggedScreen />}
          {!isLoading && accessToken !== null && (
            <View className="flex-1 self-center" style={{ width: windowWidth }}>
              <TouchableOpacity
                className="flex-row-reverse mb-5 mx-3"
                onPress={() => {
                  handleLogout();
                }}
              >
                <Text className="text-[#001356] font-bold text-base">
                  Log out
                </Text>
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
                    dropDownStyle={{
                      backgroundColor: "#DDE1FF",
                      borderRadius: 12,
                    }}
                    dropDownItemStyle={{
                      backgroundColor: "#DDE1FF",
                    }}
                    dropDownItemSelectedStyle={{
                      backgroundColor: "#001356",
                    }}
                    activeColor="#FFFFFF"
                  />
                </View>
                <DatePickerInput
                  className="my-1 basis-full"
                  locale="en"
                  label="Birthday"
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
                <TextInput
                  className="my-1 basis-full"
                  mode="outlined"
                  label="Student ID"
                  value={studentID}
                  onChangeText={setStudentID}
                  left={<TextInput.Icon icon="card-account-details-outline" />}
                  right={
                    <TextInput.Icon
                      icon="barcode-scan"
                      onPress={() => {
                        getBarCodeScannerPermissions();
                        setScanned(false);
                        setIsScanning(true);
                      }}
                    />
                  }
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
          {/* {!isLoading && accessToken !== null && isScanning && (
          <View>
            {scanned && <Text>True </Text>}
            {!scanned && <Text>False </Text>}
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{
                // height: `${deviceHeight}`,
                // width: `${deviceWidth}`,
                height: 300,
                width: "100%",
              }}
            />
          </View>
        )} */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
