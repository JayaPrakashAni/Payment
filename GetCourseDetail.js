import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from "react-native";



const Coursedetails = ({ navigation }) => {
    const [dataArray, setDataArray] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const imageUrl = 'https://my.bmusician.com/assets/images/CourseImages/violin.jpg';


    // const getcall = (slotID) => {
    //   navigation.navigate('getcall');
    // };


    const getUserData = async () => {
        try {
            const response = await fetch("https://my.bmusician.com/app/getcoursedetails/29");
            const myData = await response.json();
            setDataArray([myData.coursedetails]);
            setIsLoaded(true);
            console.log('coursedetail----->>', myData)
            console.log('coursedetailsvalue------>', myData.coursedetails.CourseName)
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getUserData();
    }, []);

    if (!isLoaded) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
        </View>
    }
    

    return (


        <ScrollView>
            {Array.isArray(dataArray) && dataArray.map((item) => {
                //Course Title
                return (
                    <View style={{ marginTop: 15 }} key={item.ID}>

                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "green", textAlign: 'center', padding: 20 }}>
                            {item.CourseName}  </Text>
                            <View>
                            <Image
                            source={{ uri: imageUrl}}
                            style={styles.image}
                        
                        />
                            </View>
                     

                    </View>
                );
            })}

        </ScrollView>


    );
};
const styles = StyleSheet.create({
    image: {
        marginLeft: 55,
        width: 300,
        height: 300,
    }

});

export default Coursedetails;



