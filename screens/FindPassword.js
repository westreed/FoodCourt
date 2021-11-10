import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    ScrollView,
} from "react-native";

import auth from '@react-native-firebase/auth';
import functions from '../constants/functions';
import CheckButton from '../components/CheckButton';
import BackArrowSvg from '../assets/icons/back-arrow-direction-down-right-left-up-svgrepo-com.svg';
import CheckSvg from '../assets/icons/check-circle-svgrepo-com.svg';
import CircleSvg from '../assets/icons/circle-svgrepo-com.svg';
import { SIZES, COLORS, FONTS } from '../constants';

const FindPassword = ({ navigation }) => {

    const [email, setEmail] = React.useState('');
    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginTop:"5%", paddingBottom:"10%", alignItems:'center' }}>
                <TouchableOpacity //back button
                    style={{
                        width: 30,
                        left: SIZES.padding/2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <BackArrowSvg width={30} height={30} fill={'#000'}/>
                </TouchableOpacity>
                <View style={{ flex:1, left: SIZES.padding }}>
                    <View style={{height: 30}}>
                        <Text style={{ ...FONTS.h2, fontWeight: 'bold' }}>비밀번호찾기</Text>
                    </View>
                </View>
            </View>
        )
    }
    function renderTitle() {
        return (
            <View style={{ marginTop:"15%", marginBottom:"10%", paddingHorizontal: SIZES.padding}}>
                <Text style={{ ...FONTS.h2 }}>비밀번호를 잊어버리셨나요?</Text>
                <Text style={{ ...FONTS.h3 }}>학교이메일로 인증번호를 보내드릴게요!</Text>
            </View>
        )
    }
    function renderContent() {
        const [check, setCheck] = React.useState(false);
        function requestPasswordEmail(email){
            if (functions.checkCollegeEmail(email)){
                auth()
                .sendPasswordResetEmail(email)
                .then(setCheck(true))
                .catch(err => console.log(err));
                if(check){
                    console.log(email, '초기화 이메일을 보냄.');
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
                        "비밀번호 찾기", "잘못입력한 이메일이거나 가입되지 않은 이메일입니다.",
                        [{ text: "확인"}],
                        { cancelable: false }
                    )
                )
            }
        }
        return (
            <View>
                <View style={{marginVertical:SIZES.padding/2, paddingHorizontal: SIZES.padding}}>
                    <View style={styles.checkboxContainer2}>
                        {functions.checkCollegeEmail(email) ? <CheckSvg width={30} height={30} fill={COLORS.blue1} style={styles.checkbox}/> : <CircleSvg width={30} height={30} style={styles.checkbox}/>}
                        <Text style={styles.label1}>학교이메일</Text>
                    </View>
                    <TextInput
                        style={{borderRadius: 10, backgroundColor: COLORS.gray3}}
                        value={String(email)}
                        onChangeText={text => setEmail(text)}
                        placeholder="학교이메일을 입력해주세요."
                        multiline={false}
                    />
                </View>
                <View style={{ marginTop:"5%", marginBottom:"5%", paddingHorizontal: SIZES.padding}}>
                    <TouchableOpacity
                        style={styles.shadow}
                        onPress={() => requestPasswordEmail(email)}
                    >
                        <CheckButton
                            buttonTitle="다음으로"
                            type={true}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <ScrollView style={styles.container}>
            {renderHeader()}
            {renderTitle()}
            {renderContent()}
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
    label1: {
        margin: 8,
        ...FONTS.body3,
        fontWeight: 'bold'
    },
    label2: {
        margin: 8,
        ...FONTS.body3,
    },
    shadow: {
        backgroundColor: COLORS.brown,
        shadowColor: COLORS.blue1, // IOS
        shadowOffset: { width: 0, height: 5, }, // IOS
        shadowOpacity: 0.34, // IOS
        shadowRadius: 6.27, // IOS
        elevation: 10, //ANDROID
    },
})

export default FindPassword;