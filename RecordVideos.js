import { openBrowserAsync } from 'react-native-webview';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, ActivityIndicator, ScrollView, TouchableOpacity, } from 'react-native';

const List = ({ route }) => {
  const [dataArray, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const recordimage = require('../Images/background/bg2.jpg')

  const getVideoList = async () => {
    try {
      const response = await fetch("https://my.bmusician.com/app/getvideos/" + itemId)   // https://bmusician.com/app/getvideos/1543
      const VideoData = await response.json();
      setData(VideoData);
      setIsLoaded(true);
      console.log('Videotobeloaded>>>>', VideoData)
      console.log('selectedVid%%@', VideoData[0].thumbnail_small)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideoList();
  }, []);

  const { itemId } = route.params;

  const playVideo = (url) => {
   openBrowserAsync(url);
 };

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }


  return (
    <ImageBackground source={recordimage} style={{ width: '100%', height: '100%' }}>
      <ScrollView>
        {dataArray.map((item) => (
          <TouchableOpacity
            key={item.ID} // Don't forget to add a unique key
            onPress={() => playVideo(item.url)}
        >
            <View style={{ marginTop: 3, flexDirection: 'row' }}>
              <Image style={styles.videoimage} source={{ uri: item.thumbnail_medium }} />
              <Text style={styles.titlestyle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  videoimage: {
    marginLeft: 20,
    width: 70,
    height: 70,
    marginTop: 30,
  },
  titlestyle: {
    marginTop: 30,
    paddingLeft: 15,
    fontSize: 15,
    color: 'black'
  }
});

export default List;
