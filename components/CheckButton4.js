import React, {useContext} from 'react';
import {Alert, View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {COLORS, SIZES} from '../constants'

import {AuthContext} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import functions from '../constants/functions';

const CheckButton4 = ({buttonTitle, email, navigation}) => {
    const [check, setCheck] = React.useState(false);
    function findPasswordF(email, navigation){
        if (functions.checkCollegeEmail(email)){
            auth()
            .sendPasswordResetEmail(email)
            .then(setCheck(true))
            .catch(err => console.log(err));
            if(check){
                console.log(email, '초기화 이메일을 보냄.')
                return (
                    Alert.alert(
                        "비밀번호 찾기", "입력하신 이메일로 초기화 메일을 보냈어요!",
                        [{ text: "확인", onPress: () => navigation.navigate('Home')}], { cancelable: false }
                    )
                )
            }
        }
        else{
            return (
                Alert.alert(
                    "비밀번호 찾기", "입력하신 이메일은 가입되지 않은 이메일이거나 잘못입력되었습니다.",
                    [{ text: "확인"}],
                    { cancelable: false }
                )
            )
        }
    }
    return (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => findPasswordF(email, navigation)}
        >
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
    
};

export default CheckButton4;

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