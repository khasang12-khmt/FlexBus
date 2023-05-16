import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HistoryScreen from '../screens/History/HistoryScreen';
import DetailScreen from '../screens/TransactionDetail/DetailScreen'

const Stack = createNativeStackNavigator ();

const HistoryStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="List" component={HistoryScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    );
};


export default HistoryStack;