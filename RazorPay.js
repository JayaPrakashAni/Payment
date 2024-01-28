import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET} from '@env'
import RazorpayCheckout from 'react-native-razorpay';

const RazorPay = () => {
    //console.log(RAZORPAY_KEY_ID,RAZORPAY_KEY_SECRET )
    let razorpaykeyId = RAZORPAY_KEY_ID
    let razorpaykeySecret = RAZORPAY_KEY_SECRET
    const amount = 500;
    const currency = "INR";

    const razorPayment = () => {
        var options = {
            description: 'Course fee',
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: currency,
            key: razorpaykeyId,
            amount: amount*100,
            name: 'BMusician',
            order_id: '',//Replace this with an order_id created using Orders API.
            prefill: {
              email: 'jpg@example.com',
              contact: '9655493521',
              name: 'JayaPrakash'
            },
            theme: {color: '#53a20e'}
          }
          RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
          }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
    }
  return (
    <View>
    
      <Text onPress={razorPayment}
      style={{backgroundColor: 'green', color:'white', padding: 10, margin: 10, }}>
        Pay Now
      </Text>
    </View>
  )
}

export default RazorPay

const styles = StyleSheet.create({})