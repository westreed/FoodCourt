import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants'

const CheckButton = ({buttonTitle, type}) => {
    if (type == false){
        return (
            <View style={styles.buttonContainer2}>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
            </View>
        );
    }
    return (
        <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </View>
    );
};

export default CheckButton;

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        height: SIZES.height / 15,
        backgroundColor: COLORS.blue1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
    },
    buttonContainer2: {
        width: '100%',
        height: SIZES.height / 15,
        backgroundColor: COLORS.gray1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Roboto-Regular',
    },
});
