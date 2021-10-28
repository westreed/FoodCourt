import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
} from "react-native";

import functions from '../constants/functions';
import CheckButton4 from '../components/CheckButton4';
import BackArrowSvg from '../assets/icons/back-arrow-direction-down-right-left-up-svgrepo-com.svg';
import CheckSvg from '../assets/icons/check-circle-svgrepo-com.svg';
import CircleSvg from '../assets/icons/circle-svgrepo-com.svg';
import { SIZES, COLORS, FONTS } from '../constants';

const FindPassword = ({ navigation }) => {

    const [email, setEmail] = React.useState('');
    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginTop:"5%", paddingBottom:"10%" }}>
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
                    <CheckButton4
                        buttonTitle="다음으로"
                        email={email}
                        navigation={navigation}
                    />
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderTitle()}
            {renderContent()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
})

export default FindPassword;