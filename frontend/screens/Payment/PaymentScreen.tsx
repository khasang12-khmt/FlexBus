import React, { useState } from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation, NavigationProp  } from '@react-navigation/native';
import { ScrollView, View, NativeSyntheticEvent, NativeScrollEvent, Text } from 'react-native';
import { DatePickerInput } from "react-native-paper-dates";
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native-paper';
import { SvgUri } from 'react-native-svg';
import { BusStep } from '../../types/RouteTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type BookingProps = {
    'bus_no': string,
    'duration': string,
    'timestamp': string,
    'timestart': string,
    'departure': string,
    'timeend': string,
    'arrival': string,
    'class': string,
    'price': string,
}

const item = {
    'bus_no': '08',
    'duration': '01 hr 40 min',
    'timestamp': '7:20:47 20/04/2023',
    'timestart': '5:50',
    'departure': 'KTX khu A',
    'timeend': '7:30',
    'arrival': 'Đh Bách Khoa',
    'class': 'Bussiness Class',
    'price': '3000',
}

const VisaIcon = () => {
    return (
        <SvgUri width="30" height="20" uri="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg"/>
    );
};

const MastercardIcon = () => {
    return (
        <SvgUri width="30" height="20" uri="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"/>
    );
};

type RootStackParamList = {
  Payment: {busStep: BusStep};
  Success: undefined;
};

type PaymentStackScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "Payment"
>;

const PaymentScreen: React.FC<PaymentStackScreenNavigationProp> = ({navigation, route}) => {
  //const navigation: NavigationProp<any> = useNavigation();
  const busStepInfo = route.params;
  console.log(busStepInfo); // use data here

  const [elevation, setElevation] = useState(0);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y > 0) {
      setElevation(5);
    } else {
      setElevation(0);
    }
  };
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [CVV, setCVV] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<Date>();
  const handleConfirm = () => {
    navigation.navigate("Success");
  };

  return (
    <>
      <Appbar.Header style={{ elevation, zIndex: 1 }}>
        <Appbar.BackAction
          color="#001356"
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title="Payment"
          color="#001356"
          titleStyle={{
            fontFamily: "RobotoRegular",
            fontSize: 22,
            lineHeight: 28,
          }}
        />
      </Appbar.Header>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View
          style={{
            margin: 15,
            backgroundColor: "#fff",
            borderRadius: 18,
            alignItems: "center",
            padding: 15,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="bus" size={15} color="#767680" />
              <Text style={{ color: "#767680", marginLeft: 3 }}>
                Bus {item.bus_no}
              </Text>
            </View>
            <Text style={{ color: "#767680" }}>{item.duration}</Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {item.timestart}
              </Text>
              <Text
                style={{ fontSize: 12, color: "#767680", textAlign: "center" }}
              >
                {item.departure}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ width: 45, height: 1, backgroundColor: "#767680" }}
              ></View>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 25,
                  backgroundColor: "#001356",
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 5,
                }}
              >
                <Ionicons name="bus" size={15} color="#fff" />
              </View>
              <View
                style={{ width: 45, height: 1, backgroundColor: "#767680" }}
              ></View>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {item.timeend}
              </Text>
              <Text
                style={{ fontSize: 12, color: "#767680", textAlign: "center" }}
              >
                {item.arrival}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "90%",
              height: 0.5,
              backgroundColor: "#767680",
              marginVertical: 7,
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Total</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {item.price} VND
            </Text>
          </View>
          <View style={{ width: "100%", marginBottom: 10 }}>
            <TextInput
              mode="outlined"
              label="Card number"
              value={cardNumber}
              onChangeText={setCardNumber}
              outlineColor="#001356"
              activeOutlineColor="#001356"
              outlineStyle={{
                borderRadius: 5,
                borderWidth: 0.5,
              }}
              style={{ width: "100%", backgroundColor: "#fff" }}
            />
          </View>
          <View style={{ width: "100%", marginBottom: 10 }}>
            <TextInput
              mode="outlined"
              label="Card holder name"
              value={cardName}
              onChangeText={setCardName}
              outlineColor="#001356"
              activeOutlineColor="#001356"
              outlineStyle={{
                borderRadius: 5,
                borderWidth: 0.5,
              }}
              style={{ width: "100%", backgroundColor: "#fff" }}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 15,
            }}
          >
            <TextInput
              mode="outlined"
              label="CVV"
              value={CVV}
              onChangeText={setCVV}
              outlineColor="#001356"
              activeOutlineColor="#001356"
              outlineStyle={{
                borderRadius: 5,
                borderWidth: 0.5,
              }}
              style={{ width: "24%", backgroundColor: "#fff" }}
            />
            <View style={{ width: "72%" }}>
              <DatePickerInput
                locale="en"
                label="Expiry date"
                mode="outlined"
                value={expiryDate}
                onChange={(d) => setExpiryDate(d)}
                inputMode="start"
                outlineColor="#001356"
                activeOutlineColor="#001356"
                outlineStyle={{
                  borderRadius: 5,
                  borderWidth: 0.5,
                }}
                style={{ backgroundColor: "#fff" }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              marginBottom: 20,
            }}
          >
            <View style={{ marginRight: 10 }}>
              <VisaIcon />
            </View>
            <View>
              <MastercardIcon />
            </View>
          </View>
          <View style={{ width: "100%", marginBottom: 10 }}>
            <Button
              mode="contained"
              buttonColor="#001356"
              onPress={handleConfirm}
              style={{ borderRadius: 10, padding: 5 }}
            >
              <Text style={{ fontSize: 20 }}>Confirm</Text>
            </Button>
          </View>
          <View style={{ width: "100%" }}>
            <Button
              mode="contained"
              buttonColor="#fff"
              onPress={() => navigation.goBack()}
              style={{
                borderRadius: 10,
                padding: 5,
                borderColor: "#001356",
                borderWidth: 1,
              }}
            >
              <Text style={{ fontSize: 20, color: "#001356" }}>Cancel</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default PaymentScreen