import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {COLORS, SIZES} from '../constants'

const FormButton = ({buttonTitle, ...rest}) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
};

export default FormButton;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: SIZES.height / 15,
        backgroundColor: COLORS.blue1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        shadowColor: COLORS.blue1,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Roboto-Regular',
    },
});
