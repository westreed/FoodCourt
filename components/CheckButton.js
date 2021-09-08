import React from 'react';
import {Alert, View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {COLORS, SIZES} from '../constants'

let boxColor = false

const CheckButton = ({buttonTitle, check1, check2, ...rest}) => {
    if (check1 == true && check2 == true){
        if(boxColor == false){boxColor = true;}
    }
    else{
        if(boxColor == true){boxColor = false;}
    }
    if(boxColor == false){
        return (
            <TouchableOpacity
                style={styles.buttonContainer2}
                onPress={() => Alert.alert(
                    "약관동의", "필수 약관을 동의해주셔야 합니다.",
                    [{ text: "확인", onPress: () => console.log("그렇다는데") }],
                    { cancelable: false }
                )}
            >
                <Text style={styles.buttonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        );
    }
    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
};

export default CheckButton;

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
    buttonContainer2: {
        marginTop: 10,
        width: '100%',
        height: SIZES.height / 15,
        backgroundColor: COLORS.gray1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        shadowColor: COLORS.gray1,
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
