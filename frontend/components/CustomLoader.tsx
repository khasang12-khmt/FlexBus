import { View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const CustomLoader = () => (
  <View className="flex flex-1 flex-col items-center justify-center">
    <ActivityIndicator animating={true} color='#001219' size="large" />
  </View>
);

export default CustomLoader;
