import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Appbar } from 'react-native-paper';

type HeaderProps = {
    name: string
    navigateBackEnable: boolean,
    elevation?: number
}
const CustomNavigationHeader: React.FC<HeaderProps> = ({ name, navigateBackEnable, elevation }) => {
    const navigation = useNavigation();
  return (
      <Appbar.Header style={{ elevation, zIndex: 1 }}>
				{navigateBackEnable && <Appbar.BackAction
					color="#001356"
					onPress={() => navigation.goBack()}
				/>}
				<Appbar.Content
					title={name}
					color="#001356"
					titleStyle={{
						fontFamily: "RobotoRegular",
						fontSize: 22,
						lineHeight: 28,
					}}
				/>
			</Appbar.Header>
  );
};

export default CustomNavigationHeader;
