import React, { useEffect } from 'react';
import {StyleSheet} from 'react-native';
import Navigation from './Music/Navigation/NavigationToScreens';
import SplashScreen from 'react-native-splash-screen'
import { AuthProvider } from './Music/Networking/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';


const App = () => {
  useEffect(
    () => {
      SplashScreen.hide();
    }, []
  )
  return (
    
      <NavigationContainer>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default App;
