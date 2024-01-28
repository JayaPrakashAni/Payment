import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Vimeo} from 'react-native-vimeo-iframe';



const VideoPlayerPage = ({route}) => {

    const [videoData, setVideoData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);


    const getVideoData = async () => {
        try {
            const response = await fetch("https://my.bmusician.com/app/getvideos/" + itemId);
            const VidData = await response.json();
            setVideoData(VidData);
            setIsLoaded(true);
            console.log('Resultuuu>>>>', VidData)
            console.log('value>>>', VidData.title)
        } catch (error) {
            console.log(error);
        }
    };
  

    useEffect(() => {
        getVideoData();
    }, []);

const {itemId} = route.params;

    if (!isLoaded) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
        </View>
    }

    return (
        <ScrollView>
        
        {videoData.map((item) => (
          <View key={item.id} style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red', textAlign: 'center', padding: 20 }}>
              {item.title}
            </Text>
           
            <Vimeo
              source={{ uri: `https://player.vimeo.com/video/${item.ID}`}}
              style={{ height: 200,}}
            />
          </View>
        ))}
      </ScrollView>
    )
};

export default VideoPlayerPage

const styles = StyleSheet.create({

})