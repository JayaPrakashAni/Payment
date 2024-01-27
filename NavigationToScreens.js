import React, { useContext, useEffect } from "react";
import { View,  ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../Screens/LoginScreen";
import HomeScreen from "../Screens/HomeScreen";
import { AuthContext } from "../Networking/AuthContext";
import AllocationList from "../Networking/AllocationList";
import List from "../Networking/RecordVideos";
import BCGuitar from "../ApiPage/BcGuitar";
import BCViolin from "../ApiPage/BcViolin";
import ICVocal from "../ApiPage/IcVocal";
import BMirdangam from "../ApiPage/BMirdangam";
import VideoCallPage from "../Screens/VideoCallPage";
import GetClassId from "../Screens/GetClassId";
import VideoPlayerPage from "../Screens/VideoPlayerPage";
import Coursedetails from "../Screens/GetCourseDetail";
import StripeProviders from "../Payment/StripeProvider";
import RazorPay from "../Payment/RazorPay/RazorPay";
import MyComponent from "../Payment/RazorPay/subscriptionPage";


//const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
const Navigation = () => {
    const { isLoading, userInfo } = useContext(AuthContext);
    const { isLoggedInUser } = useContext(AuthContext);

    useEffect(() => {
        console.log(userInfo);
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    return (
        // {userInfo !== null ? <LoginScreen/> : <HomeScreen/>}
        //    <stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>


        <Stack.Navigator>
            {isLoggedInUser ? (
                <Stack.Screen name="fetch" component={HomeScreen} options={{ headerShown: true }} />
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            )}
            
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Videolist" component={List} options={{ headerShown: true }} />
            <Stack.Screen name="allocation" component={AllocationList} options={{ headerShown: true }} />
            <Stack.Screen name="BCV" component={BCViolin} options={{ headerShown: true }} />
            <Stack.Screen name="BCG" component={BCGuitar} options={{ headerShown: true }} />
            <Stack.Screen name="ICV" component={ICVocal} options={{ headerShown: false }} />
            <Stack.Screen name="BM" component={BMirdangam} options={{ headerShown: true}} />
            <Stack.Screen name="VideoCallPage" component={VideoCallPage} options={{ headerShown: true }} />
            <Stack.Screen name="getcall" component={GetClassId} options={{ headerShown: true }} />
            <Stack.Screen name="VideoPlayerScreen" component={VideoPlayerPage} options={{ headerShown: true }} />
            <Stack.Screen name="GCD" component={Coursedetails} options={{ headerShown: true }} />
            <Stack.Screen name="CourseImage" component={MyComponent} options={{ headerShown: true }} />
            <Stack.Screen name="SP" component={StripeProviders} options={{ headerShown: true }} />
            <Stack.Screen name="Payment" component={RazorPay} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
};
export default Navigation;


 // <NavigationContainer>
 //<Stack.Navigator>
  //    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
   //   <Stack.Screen name='course' component={Course} />
  //</Stack.Navigator>
//</NavigationContainer>

//  