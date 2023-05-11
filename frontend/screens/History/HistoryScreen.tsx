import React, { useState } from 'react'
import { Appbar } from 'react-native-paper';
import { ScrollView, View, Text, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type TransactionItemProps = {
    'bus_no': string,
    'timestamp': string,
    'timestart': string,
    'departure': string,
    'timeend': string,
    'arrival': string,
    'class': string,
    'price': string,
    'code': string,
    'payment-method':  {
        'type': string,
        'brand': string,
    }
}

const Data = [
    {
        'bus_no': '08',
        'timestamp': '7:20:47 20/04/2023',
        'timestart': '5:50',
        'departure': 'KTX khu A',
        'timeend': '7:30',
        'arrival': 'Đh Bách Khoa',
        'class': 'Bussiness Class',
        'price': '3000',
        'code': '594594992929',
        'payment-medthod': {
            'type': 'Credit card',
            'brand': 'VISA'
        }
    },
    {
        'bus_no': '08',
        'timestamp': '7:20:47 20/04/2023',
        'timestart': '5:50',
        'departure': 'KTX khu A',
        'timeend': '7:30',
        'arrival': 'Đh Bách Khoa',
        'class': 'Bussiness Class',
        'price': '3000',
        'code': '594594992929',
        'payment-medthod': {
            'type': 'Credit card',
            'brand': 'VISA'
        }
    },
    {
        'bus_no': '08',
        'timestamp': '7:20:47 20/04/2023',
        'timestart': '5:50',
        'departure': 'KTX khu A',
        'timeend': '7:30',
        'arrival': 'Đh Bách Khoa',
        'class': 'Bussiness Class',
        'price': '3000',
        'code': '594594992929',
        'payment-medthod': {
            'type': 'Credit card',
            'brand': 'VISA'
        }
    },
    {
        'bus_no': '08',
        'timestamp': '7:20:47 20/04/2023',
        'timestart': '5:50',
        'departure': 'KTX khu A',
        'timeend': '7:30',
        'arrival': 'Đh Bách Khoa',
        'class': 'Bussiness Class',
        'price': '3000',
        'code': '594594992929',
        'payment-medthod': {
            'type': 'Credit card',
            'brand': 'VISA'
        }
    },
    {
        'bus_no': '08',
        'timestamp': '7:20:47 20/04/2023',
        'timestart': '5:50',
        'departure': 'KTX khu A',
        'timeend': '7:30',
        'arrival': 'Đh Bách Khoa',
        'class': 'Bussiness Class',
        'price': '3000',
        'code': '594594992929',
        'payment-medthod': {
            'type': 'Credit card',
            'brand': 'VISA'
        }
    },
    {
        'bus_no': '08',
        'timestamp': '7:20:47 20/04/2023',
        'timestart': '5:50',
        'departure': 'KTX khu A',
        'timeend': '7:30',
        'arrival': 'Đh Bách Khoa',
        'class': 'Bussiness Class',
        'price': '3000',
        'code': '594594992929',
        'payment-medthod': {
            'type': 'Credit card',
            'brand': 'VISA'
        }
    }
]

const TransactionItem = (props: TransactionItemProps) => {
    const navigation: NavigationProp<any> = useNavigation();
    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate('Detail', props)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#001356', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 24 }}>{props.bus_no}</Text>
                </View>
                <View style={{ marginLeft: 10, flexDirection: 'column', flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{backgroundColor: '#C6FFF3', padding: 5, borderRadius: 8, flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="ios-checkmark-circle" size={12} color="#006B5E" />
                            <Text style={{fontWeight: 'bold', color: '#006B5E', marginLeft: 2, fontSize: 12}}>Payment completed</Text>
                        </View>
                        <Text style={{fontWeight: 'bold', color: '#767680', fontSize: 12}}>{props.timestamp}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 20 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{props.timestart}</Text>
                            <Text style={{ fontSize: 12, color: '#767680', textAlign: 'center'}}>{props.departure}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{ width: 45, height: 1, backgroundColor: '#767680'}}></View>
                            <View style={{ width: 32, height: 32, borderRadius: 25, backgroundColor: '#001356', justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                            <Ionicons name="bus" size={15} color="#fff" />
                            </View>
                            <View style={{ width: 45, height: 1, backgroundColor: '#767680'}}></View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{props.timeend}</Text>
                            <Text style={{ fontSize: 12, color: '#767680', textAlign: 'center'}}>{props.arrival}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}> 
                            <Ionicons name="bus" size={12} color="#767680" />
                            <Text style={{ fontSize: 12, color: '#767680', marginLeft: 5}}>{props.class}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{props.price} VND</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

const HistoryScreen = () => {
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
                <Appbar.Content 
                    title="Transaction History"
                    color="#001356"
                    titleStyle={{ fontFamily: 'RobotoRegular', fontSize: 22, lineHeight: 28}} />
            </Appbar.Header>
            <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
                <View style={{ margin: 15, backgroundColor: '#fff', borderRadius: 18, alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                    {Data.length !== 0 ? Data.map((key, index) => 
                        <React.Fragment key={index}>
                            <TransactionItem
                                bus_no={key.bus_no}
                                timestamp={key.timestamp}
                                timestart={key.timestart}
                                departure={key.departure}
                                timeend={key.timeend}
                                arrival={key.arrival}
                                class={key.class}
                                price={key.price}
                                code={key.code}
                                payment-method={key['payment-medthod']}/>
                            {index !== Data.length - 1 && 
                            <View style={{ width: 250, height: 0.5, backgroundColor: '#767680', marginVertical: 15 }}></View>}
                        </React.Fragment>
                    ) :
                    <Text style={{fontFamily:'RobotoRegular' ,fontSize: 16}}>There is no transaction</Text>
                    }
                </View>
            </ScrollView>
        </>
  )
}

export default HistoryScreen