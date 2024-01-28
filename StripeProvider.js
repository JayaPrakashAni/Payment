import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StripeProvider } from '@stripe/stripe-react-native';
import { SP_KEY, SECRET_KEY  } from '@env';
import PaymentScreen from './PaymentScreen';


const StripeProviders = () => {
    //console.log("secret Keys----->",SECRET_KEY, "publishableKey--->>",SP_KEY)
    return (
       
        <View style={styles.container}>
           
                <StripeProvider
                    publishableKey={SP_KEY}
                    merchantIdentifier="merchant.identifier" // required for Apple Pay
                    urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
                >
                    <PaymentScreen/>
                </StripeProvider>
             
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default StripeProviders;

