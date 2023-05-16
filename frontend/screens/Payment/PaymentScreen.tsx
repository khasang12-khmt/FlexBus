import React, { useState } from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation  } from '@react-navigation/native';
import { ScrollView, View, NativeSyntheticEvent, NativeScrollEvent, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const PaymentScreen = () => {
    const navigation = useNavigation();
    const [elevation, setElevation] = useState(0);
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
        if (contentOffset.y > 0) {
            setElevation(5);
        } else {
            setElevation(0);
        }
    };


    return (
        <>
            <Appbar.Header style={{ elevation, zIndex: 1 }}>
                <Appbar.BackAction color="#001356" onPress={() => navigation.goBack()} />
                <Appbar.Content title="Payment" color="#001356" titleStyle={{ fontFamily: 'RobotoRegular', fontSize: 22, lineHeight: 28}} />
            </Appbar.Header>
            <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
                <View style={{ margin: 15, backgroundColor: '#fff', borderRadius: 18, alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="bus" size={15} color="#767680" />
                            <Text style={{color: '#767680', marginLeft: 3}}>Bus {item.bus_no}</Text>
                        </View>
                        <Text style={{color: '#767680'}}>{item.duration}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{item.timestart}</Text>
                            <Text style={{ fontSize: 12, color: '#767680', textAlign: 'center'}}>{item.departure}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{ width: 45, height: 1, backgroundColor: '#767680'}}></View>
                            <View style={{ width: 32, height: 32, borderRadius: 25, backgroundColor: '#001356', justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                            <Ionicons name="bus" size={15} color="#fff" />
                            </View>
                            <View style={{ width: 45, height: 1, backgroundColor: '#767680'}}></View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{item.timeend}</Text>
                            <Text style={{ fontSize: 12, color: '#767680', textAlign: 'center'}}>{item.arrival}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
  )
}

export default PaymentScreen