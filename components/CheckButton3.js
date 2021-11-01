import React, {useContext} from 'react';
import {Alert, View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {COLORS, SIZES} from '../constants'

import {AuthContext} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';

const CheckButton3 = ({buttonTitle, navigation}) => {
    const {user} = useContext(AuthContext);
    
    async function checkUser(){

        await auth().currentUser.reload();
        await auth().currentUser.getIdToken(true);

        console.log('인증계정 : ', auth().currentUser);
        if(auth().currentUser.emailVerified){return true}
        return false
    }
    return (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => checkUser() ? Alert.alert(
                "인증 성공", "순천대학교 푸드코트앱에 가입하셨습니다!",
                [{ text: "확인", onPress: () => navigation.navigate('Home') }],
                { cancelable: false }) : Alert.alert(
                "인증 실패", "인증이메일을 통해 인증을 진행해야 합니다.\n혹시 메일을 받지 못했다면, 다시 송신할 수 있습니다.",
                [{ text: "확인"}, { text: "재전송", onPress: () => user.sendEmailVerification() }],
                { cancelable: false }
            )}
        >
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
    
};

export default CheckButton3;

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