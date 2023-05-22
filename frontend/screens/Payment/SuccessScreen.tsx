import React from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

const SuccessScreen = () => {
    const navigation: NavigationProp<any> = useNavigation();

    return (
        <>
            <View style={{ height: '100%', backgroundColor: '#fff', alignItems: 'center'}}>
                <View style={{position: 'absolute', top: '30%', alignItems: 'center'}}>
                    <Ionicons name="ios-checkmark-circle" size={82} color="#32B768" style={{ marginBottom: 10 }}/>
                    <View style={{ marginBottom: 60 }}>
                        <Text style={{ fontSize: 36 }}>Success</Text>
                    </View>
                    <View style={{ marginBottom: 50 }}>
                        <Text style={{ width: 260, fontSize: 22, color: '#6B7280', textAlign: 'center' }}>
                            Success! Your booking has been confirmed.
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
                        <Text style={{marginRight: 5, color: '#6B7280', fontWeight: 'bold'}}>Have any question?</Text>
                        <Text style={{color: '#001356', fontWeight: 'bold'}}>Contact us</Text>
                    </View>
                    <View style= {{ width: '100%', alignItems: 'center' }}>
                        <Button mode="contained" buttonColor='#001356' onPress={() => navigation.navigate('Home')} style={{ width: '90%', padding: 10, borderRadius: 10 }}>
                            <Text style={{ fontSize: 22 }}>Back Home</Text>
                        </Button>
                    </View>
                </View>
                
            </View>
        </>
  )
}

export default SuccessScreen