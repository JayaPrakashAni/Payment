import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
//import { TouchableOpacity } from 'react-native-gesture-handler'

const Button = ({
    text = 'DONE',
    onPress = () => { },
    disabled = false
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...styles.container,
                backgroundColor: !disabled? '#D7654D' : 'grey',
            }}
            disabled={disabled}
        >
            <Text style={styles.textStyle}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 42,
        //backgroundColor: '#D7654D',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    }
})
export default Button;