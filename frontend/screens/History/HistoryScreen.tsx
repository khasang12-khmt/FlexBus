import React from 'react'
import { Appbar } from 'react-native-paper';
import { ScrollView, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TransactionItemProps = {
    'bus_no': string,
    'timestamp': string,
    'timestart': string,
    'departure': string,
    'timeend': string,
    'arrival': string,
    'class': string,
    'price': string,
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
        'price': '3000'
    },
    {
        'bus_no': '08',
        'timestamp': '7:20:47 20/04/2023',
        'timestart': '5:50',
        'departure': 'KTX khu A',
        'timeend': '7:30',
        'arrival': 'Đh Bách Khoa',
        'class': 'Bussiness Class',
        'price': '3000'
    },
    {
        'bus_no': '08',
        'timestamp': '7:20:47 20/04/2023',
        'timestart': '5:50',
        'departure': 'KTX khu A',
        'timeend': '7:30',
        'arrival': 'Đh Bách Khoa',
        'class': 'Bussiness Class',
        'price': '3000'
    },
    {
        'bus_no': '08',
        'timestamp': '7:20:47 20/04/2023',
        'timestart': '5:50',
        'departure': 'KTX khu A',
        'timeend': '7:30',
        'arrival': 'Đh Bách Khoa',
        'class': 'Bussiness Class',
        'price': '3000'
    },
    {
        'bus_no': '08',
        'timestamp': '7:20:47 20/04/2023',
        'timestart': '5:50',
        'departure': 'KTX khu A',
        'timeend': '7:30',
        'arrival': 'Đh Bách Khoa',
        'class': 'Bussiness Class',
        'price': '3000'
    },
    {
        'bus_no': '08',
        'timestamp': '7:20:47 20/04/2023',
        'timestart': '5:50',
        'departure': 'KTX khu A',
        'timeend': '7:30',
        'arrival': 'Đh Bách Khoa',
        'class': 'Bussiness Class',
        'price': '3000'
    }
]

const TransactionItem = (props: TransactionItemProps) => {
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 3 }}>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{props.timestart}</Text>
                            <Text style={{ fontSize: 12, color: '#767680'}}>{props.departure}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{ width: 45, height: 1, backgroundColor: '#767680'}}></View>
                            <View style={{ width: 32, height: 32, borderRadius: 25, backgroundColor: '#001356', justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                                <Ionicons name="bus" size={15} color="#fff" />
                            </View>
                            <View style={{ width: 45, height: 1, backgroundColor: '#767680'}}></View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'right'}}>{props.timeend}</Text>
                            <Text style={{ fontSize: 12, color: '#767680'}}>{props.arrival}</Text>
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
            </View>
            <View style={{ width: 250, height: 0.5, backgroundColor: '#767680', marginVertical: 15}}></View>
        </>
    )
}

const HistoryScreen = () => {
    return (
        <>
        <Appbar.Header>
            <Appbar.Content 
                title="Transaction History"
                color="#001356"
                titleStyle={{ fontFamily: 'RobotoRegular', fontSize: 22, lineHeight: 28}} />
        </Appbar.Header>
        <ScrollView style={{ margin: 15 }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, paddingTop: 15 }}>
                {Data.map(key => <TransactionItem
                                    bus_no={key.bus_no}
                                    timestamp={key.timestamp}
                                    timestart={key.timestart}
                                    departure={key.departure}
                                    timeend={key.timeend}
                                    arrival={key.arrival}
                                    class={key.class}
                                    price={key.price}
                                    />)}
            </View>
        </ScrollView>
        </>
  )
}

export default HistoryScreen