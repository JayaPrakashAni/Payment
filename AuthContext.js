import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from './Config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);

 

  const login = async (username, password) => {
    try {
      setIsLoading(true);
      axios.post(`${BASE_URL}/account/MobileLogin`, {
        username,
        password
      })
        .then(res => {
          let userInfo = res.data;
          setUserInfo(userInfo);
          console.log('JSON.stringify(userInfo) in AuthContext',JSON.stringify(userInfo))
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            .then(() => {
              console.log('Data saved successfully 1');
              console.log('Login credential------>', userInfo.userid)

              // console.log('result$$$',userInfo.success)
              if (userInfo.success) {
                setIsLoggedInUser(true);
                
                return true;
              } else {
                return false;
              }
            })
        })
        .catch(error => {
          console.error('Error saving data 1:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };


  const logout = async () => {
    setIsLoading(true);

    await AsyncStorage.removeItem('useInfo');

    setIsLoading(false);
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      ;
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
        setIsLoggedInUser(true);
      }
      else {
        setIsLoggedInUser(false);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`isLogged in error ${e}`);
    }
  }
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoggedIn, isLoggedInUser, setIsLoggedInUser, isLoading, userInfo, }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}