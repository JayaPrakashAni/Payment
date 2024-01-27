import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, ActivityIndicator, ScrollView, StyleSheet} from "react-native";

const ICVocal = ({}) => {
  const [dataArray, setDataArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagebackground = require('../Images/background/bg2.jpg');


  const getUserData = async () => {
    try {
      const response = await fetch("https://my.bmusician.com/app/getcoursedetails/50");
      const myData = await response.json();
      if (myData && myData.coursedetails) {
        setDataArray([myData.coursedetails]); // Assuming coursedetails is an object, not an array
      }
      setIsLoaded(true);
      console.log('Resultuuu>>>>', myData);
      console.log('value>>>', myData?.coursedetails?.CourseName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <ImageBackground source={imagebackground} style={{ width: '100%', height: '100%' }}>
      <ScrollView>
      <View>
            <Text style={{ fontSize: 25, marginLeft: 80, color: 'white'}}>BMusician Courses</Text>
            <View style={{flex:1, }}>
                {
                    dataArray.map((item)=>(
                      <View>
                        <Text style={styles.Item} key={item.ID}>
                            {item.CourseName}
                        </Text>

                        <Text style={{ fontSize: 25, marginLeft: 20, color: 'white', marginTop:30,}}>Course Description</Text>
                        <Text style={{fontSize: 25, marginLeft: 20, color: 'white', marginTop:30}} key={item.id}>
                            {item.CourseDescription}
                        </Text>
                        <Text style={{ fontSize: 25, marginLeft: 20, color: 'green', marginTop:40,}}>Prerequisite:</Text>
                        <Text style={{fontSize: 25, marginLeft: 20, color: 'white', marginTop:10}} key={item.id}>
                            {item.Prerequisite}
                        </Text>
                    </View>
                    ))  
                }
            </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    Item: {
        fontSize: 25,
        margin: 5,
        color: 'red',
        padding: 5,
        textAlign: 'center',
        
    }
});



export default ICVocal;
