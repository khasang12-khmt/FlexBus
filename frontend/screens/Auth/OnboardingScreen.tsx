import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Onboarding from "react-native-onboarding-swiper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const OnboardingScreen = () => {
  const navigation = useNavigation<any>();

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
    <View>
      <MaterialCommunityIcons name="chevron-right" size={40} color={'#001356'} {...props}/>
    </View>
  );

  return (
    <Onboarding
      onSkip={() => navigation.replace("AppStack")}
      onDone={() => navigation.replace("AppStack")}
      bottomBarColor="#FFFFFF"
      NextButtonComponent={Next}
      DotComponent={DotComponent}
      pages={[
        {
          backgroundColor: "#FFFFFF",
          image: (
            <Image
              source={require("../../assets/Onboarding1.png")}
              className="object-none"
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
              className="object-none"
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
              className="object-none"
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
