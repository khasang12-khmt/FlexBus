import React, { useState } from 'react'
import { ScrollView, View, NativeSyntheticEvent, NativeScrollEvent, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { SvgUri } from 'react-native-svg';
import { BusStep } from '../../types/RouteTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomNavigationHeader from '../../components/CustomNavigationHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import NotLoggedScreen from '../Profile/NotLoggedScreen';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const VisaIcon = () => {
		return (
				<SvgUri width="30" height="20" uri="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg"/>
		);
};

const MastercardIcon = () => {
		return (
				<SvgUri width="30" height="20" uri="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"/>
		);
};

type RootStackParamList = {
	Payment: BusStep;
	Success: undefined;
};

type PaymentStackScreenNavigationProp = NativeStackScreenProps<RootStackParamList, "Payment">;

const PaymentScreen: React.FC<PaymentStackScreenNavigationProp> = ({navigation, route}) => {
	const accessToken = useSelector(
        (state: RootState) => state.user.accessTokenStore
    );
    const userId = useSelector(
        (state: RootState) => state.user.id
    );
	const busStepInfo = route.params;
	const formik = useFormik({
        initialValues: {
            cardNumber: '',
            cardHolder: '',
			cvv: '',
			expiryDate: ''
        },
        validationSchema: Yup.object({
            cardNumber: Yup
				.string()
				.required('Card number is required')
				.matches(/^[0-9 ]{19}$/, 'Card number must be 16 digits'),
			cardHolder: Yup
				.string()
				.required('Card holder name is required'),
			cvv: Yup
				.string()
				.required('CVV is required')
				.matches(/^[0-9]{3}$/, 'CVV must be 3 digits'),
			expiryDate: Yup
				.string()
				.required('Expiry date is required'),
        }),
        onSubmit: async (values) => {
            try {
				console.log(accessToken)
                const config = {
					headers: {
					  Authorization: `Bearer ${accessToken}`
					}
				};
				const {uuid, ...busStepInfo_nonUUID} = busStepInfo
				console.log(busStepInfo_nonUUID)
				const data = {
					userId: userId,
					transactionGroup: busStepInfo.uuid,
					busInfo: busStepInfo,
					payment: {
						'method': 'Credit card',
						...values
					}
				}
				await axios.post('https://be-flexbus-production.up.railway.app/booking', data, config);
				navigation.navigate('Success');
            } catch (error) {
                console.error(error.response.data)
            }
        },
    });
	const [elevation, setElevation] = useState(0);
	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { contentOffset } = event.nativeEvent;
		if (contentOffset.y > 0) {
			setElevation(5);
		} else {
			setElevation(0);
		}
	};

	return (
		accessToken ?
		<>
			<CustomNavigationHeader name='Payment' navigateBackEnable={true} elevation={elevation}/>
			<ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
				<View
					style={{
						margin: 15,
						backgroundColor: "#fff",
						borderRadius: 18,
						alignItems: "center",
						padding: 15,
					}}>
					<View
						style={{
							width: "100%",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							marginBottom: 10,
						}}>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Ionicons name="bus" size={15} color="#767680" />
							<Text style={{ color: "#767680", marginLeft: 3 }}>
								{busStepInfo.bus_no}
							</Text>
						</View>
						<Text style={{ color: "#767680" }}>{busStepInfo.duration}</Text>
					</View>
					<View
						style={{
							width: "100%",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							marginBottom: 10,
						}}>
						<View style={{ flex: 1, justifyContent: "center" }}>
							<Text
								style={{
									fontSize: 20,
									fontWeight: "bold",
									textAlign: "center",
								}}>
								{busStepInfo.timestart}
							</Text>
							<Text
								style={{ fontSize: 12, color: "#767680", textAlign: "center" }}>
								{busStepInfo.departure}
							</Text>
						</View>
						<Image
							source={require("../../assets/bus_routes.png")}
							className="round-lg mb-1"
							style={{
								height: 36,
								width: 100,
								resizeMode: "contain",
							}} />
						<View style={{ flex: 1, justifyContent: "center" }}>
							<Text
								style={{
									fontSize: 20,
									fontWeight: "bold",
									textAlign: "center",
								}}>
								{busStepInfo.timeend}
							</Text>
							<Text
								style={{ fontSize: 12, color: "#767680", textAlign: "center" }}>
								{busStepInfo.arrival}
							</Text>
						</View>
					</View>
					<View
						style={{
							width: "90%",
							height: 0.5,
							backgroundColor: "#767680",
							marginVertical: 7,
						}}
					></View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							width: "100%",
							justifyContent: "space-between",
							marginBottom: 20,
						}}>
						<Text style={{ fontSize: 20, fontWeight: "bold" }}>Total</Text>
						<Text style={{ fontSize: 20, fontWeight: "bold" }}>
							{busStepInfo.price} VND
						</Text>
					</View>

					{/* Form */}
					<View style={{width: '100%'}}>

						{/* Card number */}
						<View style={{ width: "100%", marginBottom: 10 }}>
							<TextInput
								mode="outlined"
								label="Card number"
								maxLength={19}
								value={formik.values.cardNumber}
								outlineColor="#001356"
								activeOutlineColor="#001356"
								placeholder='0000 0000 0000 0000'
								keyboardType='numeric'
								error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
								onChangeText={(value) => {
									let formattedValue = value.replace(/\s/g, '');
									formattedValue = formattedValue.replace(/\D/g, '');
									if (formattedValue.length > 0) {
										formattedValue = formattedValue.match(/.{1,4}/g)?.join(' ');
										if (formattedValue?.length > 19) {
										  	formattedValue = formattedValue.slice(0, 19);
										}
									}
									formik.handleChange('cardNumber')(formattedValue);
								}}
								onBlur={formik.handleBlur('cardNumber')}
								outlineStyle={{
									borderRadius: 5,
									borderWidth: 0.5,
								}}
								style={{ width: "100%", backgroundColor: "#fff" }}
							/>
							{formik.touched.cardNumber && formik.errors.cardNumber && (
								<HelperText type="error">{formik.errors.cardNumber}</HelperText>
							)}
						</View>

						{/* Card holder name */}
						<View style={{ width: "100%", marginBottom: 10 }}>
							<TextInput
								mode="outlined"
								label="Card holder name"
								value={formik.values.cardHolder}
								outlineColor="#001356"
								activeOutlineColor="#001356"
								error={formik.touched.cardHolder && Boolean(formik.errors.cardHolder)}
								onChangeText={formik.handleChange('cardHolder')}
								onBlur={formik.handleBlur('cardHolder')}
								outlineStyle={{
									borderRadius: 5,
									borderWidth: 0.5,
								}}
								style={{ width: "100%", backgroundColor: "#fff" }}
							/>
							{formik.touched.cardHolder && formik.errors.cardHolder && (
								<HelperText type="error">{formik.errors.cardHolder}</HelperText>
							)}
						</View>

						{/* CVV and Expiry date */}
						<View style={{ marginBottom: 15 }}>
							<View style={{
								width: "100%",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}>

								{/* CVV */}
								<TextInput
									mode="outlined"
									label="CVV"
									value={formik.values.cvv}
									outlineColor="#001356"
									activeOutlineColor="#001356"
									keyboardType='numeric'
									error={formik.touched.cvv && Boolean(formik.errors.cvv)}
									onChangeText={formik.handleChange('cvv')}
									onBlur={formik.handleBlur('cvv')}
									outlineStyle={{
										borderRadius: 5,
										borderWidth: 0.5,
									}}
									style={{ width: "24%", backgroundColor: "#fff" }}
								/>

								{/* Expiry date */}
								<TextInput
									mode="outlined"
									label="Expiry date (MM / YY)"
									maxLength={7}
									value={formik.values.expiryDate}
									outlineColor="#001356"
									activeOutlineColor="#001356"
									keyboardType='numeric'
									placeholder='MM / YY'
									error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
									onChangeText={(value) => {
										let formattedValue = value;
										formattedValue = formattedValue.replace(/\D/g, '');
										if (formattedValue.length >= 2) {
										  	formattedValue = formattedValue.replace(/(\d{2})(\d{0,2})/, '$1 / $2');
										}
										if (value.length === 4 && value.includes('/')) {
											formattedValue = formattedValue.replace(/\s?\/\s?/, '');
										}
										formik.handleChange('expiryDate')(formattedValue);
									  }}
									onBlur={formik.handleBlur('expiryDate')}
									outlineStyle={{
										borderRadius: 5,
										borderWidth: 0.5,
									}}
									style={{ width: "72%", backgroundColor: "#fff" }}
								/>
							</View>
							{formik.touched.cvv && formik.errors.cvv && (
								<HelperText type="error">{formik.errors.cvv}</HelperText>
							)}
							{formik.touched.expiryDate && formik.errors.expiryDate && (
								<HelperText type="error">{formik.errors.expiryDate}</HelperText>
							)}
						</View>

						{/* Card icons */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "flex-start",
								width: "100%",
								marginBottom: 20,
							}}>
							<View style={{ marginRight: 10 }}>
								<VisaIcon />
							</View>
							<View>
								<MastercardIcon />
							</View>
						</View>

						{/* Confirm */}
						<View style={{ width: "100%", marginBottom: 10 }}>
							<Button
								mode="contained"
								buttonColor="#001356"
								onPress={(values: any) => formik.handleSubmit(values)}
								style={{ borderRadius: 10, padding: 5 }}>
								<Text style={{ fontSize: 20 }}>Confirm</Text>
							</Button>
						</View>

						{/* Cancel */}
						<View style={{ width: "100%" }}>
							<Button
								mode="contained"
								buttonColor="#fff"
								onPress={() => navigation.goBack()}
								style={{
									borderRadius: 10,
									padding: 5,
									borderColor: "#001356",
									borderWidth: 1,
								}}>
								<Text style={{ fontSize: 20, color: "#001356" }}>Cancel</Text>
							</Button>
						</View>
					</View>	
				</View>
			</ScrollView>
		</> :
		<NotLoggedScreen/>
	);
};

export default PaymentScreen