import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PaymentScreen from '../screens/Payment/PaymentScreen';
import SuccessScreen from '../screens/Payment/SuccessScreen';
import HomeScreen from "../screens/Home/HomeScreen";
import { BusStep } from "../types/RouteTypes";

type PaymentStackParamList = {
  Payment: BusStep;
  Success: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<PaymentStackParamList>();

const PaymentStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Success" component={SuccessScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default PaymentStack;