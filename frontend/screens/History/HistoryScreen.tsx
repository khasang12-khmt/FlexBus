import React, { useState } from 'react'
import { ScrollView, View, Text, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TransactionItemProps } from '../../types/TransactionTypes';
import CustomNavigationHeader from '../../components/CustomNavigationHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import NotLoggedScreen from '../Profile/NotLoggedScreen';
import axios from 'axios';

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
        'payment-medthod': 'Credit card'
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
        'payment-medthod': 'Credit card'
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
        'payment-medthod': 'Credit card'
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
        'payment-medthod': 'Credit card'
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
        'payment-medthod': 'Credit card'
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
        'payment-medthod': 'Credit card'
    }
]

const GetTransactionHistory = async (accessToken: string | null, userId: string) => {
    if (accessToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        };
        const response = await axios.get(`https://be-flexbus-production.up.railway.app/booking/user/${userId}`, config)
        return response.data
    } else return null;
}



const TransactionItem = (props: TransactionItemProps) => {
    
    const navigation: NavigationProp<any> = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', props)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#001356', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 24 }}>{props.bus_no}</Text>
            </View>
            <View style={{ marginLeft: 10, flexDirection: 'column', flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
                    <Image
                        source={require("../../assets/bus_routes.png")}
                        className="round-lg mb-1"
                        style={{
                            height: 36,
                            width: 100,
                            resizeMode: "contain",
                        }} />
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
    )
}

const HistoryScreen = () => {
    const accessToken = useSelector(
        (state: RootState) => state.user.accessTokenStore
    );
    const userId = useSelector(
        (state: RootState) => state.user.id
    );
    const ListTransactions = GetTransactionHistory(accessToken, userId)
    console.log(userId)
    console.log(ListTransactions)
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
        accessToken ?
        <>
            <CustomNavigationHeader name='Transaction History' navigateBackEnable={false} elevation={elevation}/>
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
        </> :
        <NotLoggedScreen/>
  )
}

export default HistoryScreen