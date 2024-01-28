import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Button, ImageBackground, ActivityIndicator, ScrollView } from "react-native";
import HomeScreen from "../Screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";



const AllocationList = ({ navigation, route }) => {
  const [dataArray, setDataArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const imagebackground = require('../Images/background/bg0.jpg');
  const userpic = require('../Images/Icons/userimg.png');
  const clockpic = require('../Images/Icons/clockimg.png');
  
  // const getcall = (slotID) => {
  //   navigation.navigate('getcall');
  // };

  const getUserData = async (userId) => {
    try {
      const response = await fetch("https://my.bmusician.com/app/GetUpcomingClassesAllocations/" + userId);    //("https://my.bmusician.com/app/GetUpcomingClassesAllocations/" + userId)
      const myData = await response.json();                                                                   //   https://my.bmusician.com/app/GetUpcomingClassesAllocations/964494a1-956d-4bae-b877-f038ee0e2e48
      setDataArray(myData.AllocationsList);
      setIsLoaded(true);
      console.log('Resultuuu>>>>', myData)
      console.log('value>>>', myData.AllocationsList[1].StudentName)
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    const getUserInfo = async ()=>{
      const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'))
      getUserData(userInfo.userid);
    }
    getUserInfo();
  }, []);

  //const { userId } = route.params;

  if (!isLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={'large'} />
    </View>
  }

  return (

    <ImageBackground source={imagebackground} style={{ width: '100%', height: '100%' }} >
      <ScrollView>
        {dataArray && dataArray.map((item) => {
          //Course Title
        return  <View key={item.AllocationID} style={{ marginTop: 5 }}>

            <Text style={{ fontSize: 20, fontWeight: "bold", color: "yellow", textAlign: 'center', padding: 20 }}>
              {item.CourseName} </Text>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Image style={styles.userimage} source={userpic} />
              <Text style={styles.StudentName}>
                {item.StudentName}
              </Text>
              <View style={styles.Activebutton}>
                <Button
                  onPress={HomeScreen}
                  title="Active"
                  color="green" />
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Image style={styles.clockimage} source={clockpic} />
              <Text style={styles.StatusMessage}>
                {item.StatusMessage} </Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <View style={styles.startButton}>
                <Button
                  //onPress={videocall}
                  //onPress={getcall}
                  onPress={() => {
                    console.log('slotIDTest ----->', item.slotID)
                    navigation.navigate('getcall', {
                      slotID: item.AllocationID,
                    });
                  }}

                  title="StartClass"
                  color="red"
                />
              </View>

              <View style={styles.recordButton}>
                <Button
                  onPress={() => {

                    navigation.navigate('VideoPlayerScreen', {
                      itemId: item.AllocationID,
                    });
                  }}
                  title="My Recordings"
                  color="red"
                />
              </View>
            </View>

            <Button
              onPress={() => {
                navigation.navigate('GCD', {
                
                });
              }}
              title="Image"
              color="green"
            />

            <View style={styles.payment}>
            <Button
              onPress={() => {
                navigation.navigate('SP', {
                });
              }}
              title=" Stripe Payment"
              color="blue"
            />
            </View>

            <View style={styles.paymentrazor}>
            <Button
              onPress={() => {
                navigation.navigate('Payment', {
                });
              }}
              title=" RazorPay Payment"
              color="red"
            />
            </View>
        

          </View>
        })}

      </ScrollView>
    </ImageBackground>

  );


};
const styles = StyleSheet.create({

  userimage: {
    width: 40,
    height: 40,
    marginStart: 10
  },

  StudentName: {
    marginLeft: 5,
    fontSize: 20,
    color: 'black',
    paddingVertical: 10,
  },

  Activebutton: {
    marginEnd: 20,
    paddingLeft: 10,
    paddingTop: 5,
  },

  clockimage: {
    width: 40,
    height: 40,
    marginStart: 11
  },

  StatusMessage: {
    marginLeft: 5,
    fontSize: 20,
    color: 'black',
    paddingVertical: 10,
  },
  startButton: {
    padding: 20,
    marginLeft: 20,
    borderRadius: 12

  },

  recordButton: {
    padding: 20,
    paddingHorizontal: 70,
    borderRadius: 5,
  },
  payment: {
    marginTop: 30,
    marginLeft: 20,
    marginHorizontal: 20,
 
    
  },
  paymentrazor: {
    marginTop: 30,
    marginLeft: 20,
    marginHorizontal: 20,
 
    
  }
});

export default AllocationList;


