import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HistoryScreen from '../screens/History/HistoryScreen';
import DetailScreen from '../screens/TransactionDetail/DetailScreen'

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

type HistoryStackParamList = {
    List: undefined;
    Detail: { item: TransactionItemProps };
};

const Stack = createNativeStackNavigator <HistoryStackParamList>();

const HistoryStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="List" component={HistoryScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    );
};


export default HistoryStack;