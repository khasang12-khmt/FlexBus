import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HistoryScreen from '../screens/History/HistoryScreen';
import DetailScreen from '../screens/TransactionDetail/DetailScreen'
import PaymentScreen from "../screens/Payment/PaymentScreen"; // Development only

const Stack = createNativeStackNavigator ();

const HistoryStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="List" component={HistoryScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />{/* Development only */}
        </Stack.Navigator>
    );
};


export default HistoryStack;