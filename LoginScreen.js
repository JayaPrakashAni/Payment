 import React, { useState, useContext } from "react";
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Linking } from "react-native";
//import { openBrowserAsync } from 'react-native-webview'
import { AuthContext } from "../Networking/AuthContext";

const LoginScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext);
    const localImage = require('../Images/Icons/signinimg.jpg');
    const signInLogo = require('../Images/Icons/signinlogo.png');

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <ImageBackground source={localImage} style={{ width: '100%', height: '100%' }} >
            <Image style={styles.logo} source={signInLogo} />
            <View style={styles.container}>
                <View style={styles.wrapper}>

                    <TextInput style={styles.input}
                        placeholder="Enter Username"
                        placeholderTextColor="white"
                        value={username}
                        onChangeText={text => setUsername(text)} />

                    <TextInput style={styles.input}
                        placeholder="Enter Password" secureTextEntry
                        placeholderTextColor="white"
                        value={password}
                        onChangeText={text => setPassword(text)} />

                    <Button title="Sign In"
                        onPress={async () => {
                            const success = await login(username, password);
                            if (success) {
                                navigation.navigate('Home'); // Navigate to home page on successful login
                            }
                        }}/>
                        
                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <Text style={styles.text}>Don't have an Account?</Text>
                        <TouchableOpacity onPress={() => Linking.openURL("https://my.bmusician.com/Account/Register")}>
                            <Text style={styles.link}> Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {

        width: '80%',
        padding: 5,
    },
    input: {

        paddingVertical: 10,
        borderWidth: 1,
        marginBottom: 30,
        borderColor: '#bbb',
        paddingHorizontal: 25,
        borderRadius: 5,

    },
    link: {
        color: 'blue',
        fontSize: 18,
    },
    logo: {
        width: null,
        height: 100,
        resizeMode: "stretch",
        marginTop: 70,
        padding: 70,
        paddingBottom: 0,
        
    },
    text: {
        fontSize: 18,
        color: 'white'
    }
});

export default LoginScreen;