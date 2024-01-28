import { StyleSheet, SafeAreaView, View, Alert } from 'react-native'
import React, { useState } from 'react';
import { CardField,  confirmPayment } from '@stripe/stripe-react-native';
import Button from './button';
import createPaymentIntent from './StripeApi';

const PaymentScreen = () => {

    const [cardInfo, setCardInfo] = useState(null)

    const fetchCardDetail = (cardDetail) => {
        // console.log("my card details", cardDetail)
        if (cardDetail.complete) {
            setCardInfo(cardDetail)
        } else {
            setCardInfo(null)
        }
    }


    const onDone = async () => {

        let apiData = {
            amount: 2500,
            currency: "INR"
        }
        try {
            const res = await createPaymentIntent(apiData)
            console.log("payment intent create successully...!!!", res.data)

            if (res?.data?.paymentIntent) {
                let confirmPaymentIntent = await confirmPayment(res?.data?.paymentIntent, { paymentMethodType: 'Card' })
                console.log("confirmPaymentIntent ------>", confirmPaymentIntent)
                Alert.alert("Payment successfully Done!!!");
            }   
        } catch (error) {
            console.log("Error rasied during payment intent", error)
        }

        // console.log("cardInfo------->", cardInfo)
        // if (!!cardInfo) {
        //     try { 
        //         const resToken = await createToken({ ...cardInfo, type: 'Card'})
        //         console.log("resToken", resToken)
        //     }catch (error) {
        //         Alert("Error raised during create token")
        //     }
        // }
    }

    return (
        <View>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ padding: 20 }}>
                    <CardField
                        postalCodeEnabled={false}
                        placeholders={{
                            number: '4242 4242 4242 4242',
                        }}
                        cardStyle={{
                            backgroundColor: '#FFFFFF',
                            textColor: '#000000',
                        }}
                        style={{
                            width: '100%',
                            height: 50,
                            marginVertical: 30,
                        }}
                        onCardChange={(cardDetails) => {
                            fetchCardDetail(cardDetails)
                            console.log('cardDetails', cardDetails);
                        }}
                        onFocus={(focusedField) => {
                            console.log('focusField', focusedField);
                        }}
                    />
                    <Button
                        onPress={onDone}
                        disabled={!cardInfo}
                    />

                </View>
            </SafeAreaView>

        </View>
    )
};

export default PaymentScreen;

const styles = StyleSheet.create({})