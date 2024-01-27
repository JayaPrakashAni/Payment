import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, ActivityIndicator, ScrollView, StyleSheet} from "react-native";

const BMirdangam = ({}) => {
  const [dataArray, setDataArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagebackground = require('../Images/background/bg0.jpg');


  const getUserData = async () => {
    try {
      const response = await fetch("https://my.bmusician.com/app/getcourses/4");
      const myData = await response.json();
      if (myData && myData.CourseList) {
        setDataArray([myData.CourseList]); // Assuming coursedetails is an object, not an array
      }
      setIsLoaded(true);
      console.log('Resultuuu>>>>', myData);
     // console.log('value>>>', myData?.CourseList[0].CourseName);
      //console.log('value>>>', myData?.CourseList[0].ID);
     // console.log('value>>>', myData?.CourseList[0].CourseDescription);

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
                          
                            {item[0].CourseName}

                        </Text>

                        <Text style={{ fontSize: 25, marginLeft: 20, color: 'white', marginTop:30,}}>Course Description</Text>
                        <Text style={{fontSize: 25, marginLeft: 20, color: 'white', marginTop:30}} key={item.id}>
                            {item[0].CourseDescription}
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



export default BMirdangam;
