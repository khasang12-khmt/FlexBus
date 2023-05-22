import React, { useState } from 'react'
import { Appbar, Button } from "react-native-paper";
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { ScrollView, View, Text, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';
import { TransactionItemProps } from '../../types/TransactionTypes';

const DetailScreen = () => {
    const route = useRoute();
    const [showModal, setShowModal] = useState(false);
    const item = route.params as TransactionItemProps;
    const navigation: NavigationProp<any> = useNavigation();
    const [elevation, setElevation] = useState(0);
    const handleCopyCode = () => {
        Clipboard.setStringAsync(item.code);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 1500)
    };
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
                <Appbar.Content title="Transaction Detail" color="#001356" titleStyle={{ fontFamily: 'RobotoRegular', fontSize: 22, lineHeight: 28}} />
            </Appbar.Header>
            <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
                <View style={{ margin: 15, backgroundColor: '#fff', borderRadius: 18, alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                    <Modal visible={showModal} transparent={true}>
                        <View style={{ flex: 1, alignItems: 'center', position: 'relative', top: '80%' }}>
                            <View style={{
                                    borderRadius: 18,
                                    borderColor:'black',
                                    backgroundColor: 'white',
                                    padding: 10,
                                    shadowColor: 'black',
                                    shadowOpacity: 0.2,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowRadius: 4,
                                    elevation: 5, }}>
                                <Text>Copied to clipboard</Text>
                            </View>
                        </View>
                    </Modal>
                    <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#001356', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 45 }}>{item.bus_no}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 20 }}>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15}}> 
                        <Ionicons name="bus" size={12} color="#767680" />
                        <Text style={{ fontSize: 12, color: '#767680', marginLeft: 5}}>{item.class}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold'}}>{item.price} VND</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: 250, justifyContent: 'space-between', marginBottom: 5}}>
                        <Text>Status</Text>
                        <View style={{backgroundColor: '#C6FFF3', padding: 5, borderRadius: 8, flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="ios-checkmark-circle" size={12} color="#006B5E" />
                            <Text style={{fontWeight: 'bold', color: '#006B5E', marginLeft: 2, fontSize: 12}}>Payment completed</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: 250, justifyContent: 'space-between', marginBottom: 5}}>
                        <Text>Time</Text>
                        <View style={{backgroundColor: '#DAD9E4', padding: 5, borderRadius: 8, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', color: '#767680', fontSize: 12}}>{item.timestamp}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: 250, justifyContent: 'space-between', marginBottom: 5}}>
                        <Text>Transaction code</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.code}</Text>
                            <TouchableOpacity onPress={handleCopyCode} style={{marginLeft: 5}}>
                                <Ionicons name="copy-outline" size={16} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: 250, justifyContent: 'space-between', marginBottom: 15}}>
                        <Text>Payment method</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>    
                            <Text style={{marginRight: 3}}>{item['payment-method']}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                        <Text style={{ color: '#001356', fontSize: 13}}>
                            Show this barcode to ticket controller when get on bus
                        </Text>
                        <Ionicons name="md-help-circle" size={18} color="#001356" style={{marginLeft: 3}}/>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <QRCode value={item['code']}/>
                    </View>
                    <View>
                        <Button icon="help" mode="contained" buttonColor='#001356' >
                            <Text >Contact support</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </>
  )
}

export default DetailScreen