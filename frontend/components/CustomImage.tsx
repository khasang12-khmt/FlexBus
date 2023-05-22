import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
import React from "react";

type CustomImageProps = {
  source: ImageSourcePropType;
};

const CustomImage: React.FC<CustomImageProps> = (props: CustomImageProps) => {
  const windowWidth = 0.85 * useWindowDimensions().width;

  return (
    <View >
      <Image
        source={props.source}
        style={{
          resizeMode: "contain",
          width: windowWidth,
          height: 300,
          alignSelf: "center",
        }}
      />
    </View>
  );
};

export default CustomImage;
