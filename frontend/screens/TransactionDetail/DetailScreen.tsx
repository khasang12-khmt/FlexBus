import React from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
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

const DetailScreen = () => {
    const navigation = useNavigation();
    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction color="#001356" onPress={() => navigation.goBack()} />
                <Appbar.Content 
                    title="Transaction Detail"
                    color="#001356"
                    titleStyle={{ fontFamily: 'RobotoRegular', fontSize: 22, lineHeight: 28}} />
            </Appbar.Header>
        </>
  )
}

export default DetailScreen