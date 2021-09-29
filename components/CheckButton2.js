import React from 'react';
import {Alert, View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {COLORS, SIZES} from '../constants'
import functions from '../constants/functions';

const CheckButton2 = ({buttonTitle, name, email, password, checkpass, ...rest}) => {
    if (name.length > 0 && functions.checkCollegeEmail(email) && functions.checkPassword(password) && password == checkpass){
        return (
            <TouchableOpacity style={styles.buttonContainer} {...rest}>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        );
    }
    return (
        <TouchableOpacity
            style={styles.buttonContainer2}
            onPress={() => Alert.alert(
                "회원가입 실패", "양식에 맞춰서 모든 칸을 채워야 합니다.",
                [{ text: "확인"}],
                { cancelable: false }
            )}
        >
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
    
};

export default CheckButton2;

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
