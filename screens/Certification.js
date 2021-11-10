import React, {useContext} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";

import CheckButton from '../components/CheckButton';
import { SIZES, COLORS, FONTS } from '../constants';
import auth from '@react-native-firebase/auth';
import functions from '../constants/functions';

const Certification = ({ navigation }) => {
    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginTop:"5%", paddingBottom:"10%", alignItems:'center' }}>
                <View style={{ flex:1, left: SIZES.padding, }}>
                    <View style={{height: 30}}>
                        <Text style={{ ...FONTS.h2, fontWeight: 'bold' }}>회원가입</Text>
                    </View>
                </View>
            </View>  
        )
    }
    function renderTitle() {
        return (
            <View style={{ marginTop:"15%", marginBottom:"15%", paddingHorizontal: SIZES.padding}}>
                <Text style={{ ...FONTS.h1 }}>마지막 단계입니다.</Text>
                <Text style={{ ...FONTS.h3 }}>학교이메일로 인증메일이 발송되었어요!</Text>
            </View>
        )
    }
    function renderCertification(){
        async function checkUser(){
            await auth().currentUser.reload();

            console.log('auth().currentUser : ', auth().currentUser);

            if(auth().currentUser.emailVerified == true){
                Alert.alert(
                "인증 성공", "순천대학교 푸드코트앱에 가입하셨습니다!",
                [{ text: "확인", onPress: () => navigation.navigate('Home') }],
                { cancelable: false })
            }
            else{
                Alert.alert(
                "인증 실패", "인증이메일을 통해 인증을 진행해야 합니다.\n혹시 메일을 받지 못했다면, 다시 송신할 수 있습니다.",
                [{ text: "확인"}, { text: "재전송", onPress: () => {
                    auth().currentUser.sendEmailVerification().then(() => {
                        Alert.alert(
                            "이메일 인증", "입력하신 이메일로 인증번호를 보냈어요!",[{ text: "확인" }],
                            { cancelable: false }
                        );
                    }).catch(error => {
                        if(error.code == 'auth/too-many-requests'){
                            Alert.alert(
                                "인증 오류", "비정상적인 활동으로 인해 해당 기기의 모든 요청을 차단했습니다. 나중에 다시 시도하세요.",[{ text: "확인" }],
                                { cancelable: false }
                            );
                        }
                        else{
                            Alert.alert(
                                "인증 오류", "알 수 없는 오류가 발생했습니다.",[{ text: "확인" }],
                                { cancelable: false }
                            );
                        }
                    }); }}],
                { cancelable: false })
            }
        }
        return(
            <View>
                {/* 내용 */}
                <View style={{ marginTop:"5%", marginBottom:"5%", paddingHorizontal: SIZES.padding}}>
                    <TouchableOpacity
                        style={styles.shadow}
                        onPress={() => checkUser()}
                    >
                        <CheckButton
                            buttonTitle="완료하기"
                            type={false}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <functions.FocusAwareStatusBar backgroundColor={COLORS.white2} barStyle="dark-content" />
            {renderHeader()}
            {renderTitle()}
            {renderCertification()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginBottom: 50,
        backgroundColor: COLORS.white2
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    checkboxContainer2: {
        flexDirection: "row",
    },
    checkbox: {
        alignSelf: "center",
    },
    shadow: {
        backgroundColor: COLORS.brown,
        shadowColor: COLORS.blue1, // IOS
        shadowOffset: { width: 0, height: 5, }, // IOS
        shadowOpacity: 0.34, // IOS
        shadowRadius: 6.27, // IOS
        elevation: 10, //ANDROID
    },
    label1: {
        margin: 8,
        ...FONTS.body3,
        fontWeight: 'bold'
    },
    label2: {
        margin: 8,
        ...FONTS.body3,
    },
})

export default Certification;