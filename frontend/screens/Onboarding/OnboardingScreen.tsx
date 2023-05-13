import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Onboarding from "react-native-onboarding-swiper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { IconButton, Button } from "react-native-paper";

const OnboardingScreen = () => {
  const navigation = useNavigation<any>();
  const windowWidth = 0.85 * useWindowDimensions().width;

  const DotComponent = ({ selected }: { selected: boolean }) => {
    return (
      <View
        className={`w-[10px] h-[10px] m-[10px] flex items-center justify-center rounded-full bg-[#E0E3E2] ${
          selected ? "bg-[#001356] w-5" : ""
        }`}
      ></View>
    );
  };

  const Next = ({ ...props }) => (
    <View className="bg-[#001356] rounded-lg h-12 w-12 justify-center items-center mr-5">
      <IconButton
        icon="chevron-right"
        iconColor="#F7FAF9"
        size={40}
        {...props}
      ></IconButton>
    </View>
  );

  const Skip = ({ ...props }) => (
    <View className="ml-2 rounded-lg">
      <Button textColor="#001356" labelStyle={{ fontSize: 17 }} {...props}>
        Skip
      </Button>
    </View>
  );

  const Done = ({ ...props }) => (
    <View className="bg-[#001356] rounded-lg h-12 w-12 justify-center items-center mr-5">
      <IconButton
        icon="check-bold"
        iconColor="#F7FAF9"
        size={25}
        {...props}
      ></IconButton>
    </View>
  );

  return (
    <Onboarding
      onSkip={() => navigation.replace("AppStack")}
      onDone={() => navigation.replace("AppStack")}
      bottomBarColor="#F7FAF9"
      bottomBarHeight={80}
      NextButtonComponent={Next}
      SkipButtonComponent={Skip}
      DotComponent={DotComponent}
      DoneButtonComponent={Done}
      containerStyles={{
        backgroundColor: "#F7FAF9",
        // justifyContent: "flex-start",
      }}
      imageContainerStyles={{
        height: 300,
        // backgroundColor: "#000000"
      }}
      titleStyles={{
        fontFamily: "RobotoBold",
        color: "#001356",
      }}
      subTitleStyles={{
        fontFamily: "RobotoRegular",
        color: "#001B3F",
        maxWidth: "70%",
      }}
      pages={[
        {
          backgroundColor: "#FFFFFF",
          image: (
            <Image
              source={require("../../assets/Onboarding1.png")}
              className="w-10/12"
              style={{
                resizeMode: "contain",
              }}
            />
          ),
          title: "Open FlexBus",
          subtitle:
            "Download the FlexBus application, check the bus stops, and track the bus arrival locations",
        },
        {
          backgroundColor: "#FFFFFF",
          image: (
            <Image
              source={require("../../assets/Onboarding2.png")}
              className="w-10/12"
              style={{
                resizeMode: "contain",
              }}
            />
          ),
          title: "Wait at closest",
          subtitle:
            "Wait at the bus stop closest to the your location indicated in the application",
        },
        {
          backgroundColor: "#FFFFFF",
          image: (
            <Image
              source={require("../../assets/Onboarding3.png")}
              className="w-10/12"
              style={{
                resizeMode: "contain",
              }}
            />
          ),
          title: "Take right bus",
          subtitle: "Board the bus and enjoy the ride to your destination",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
