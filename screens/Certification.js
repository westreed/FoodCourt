import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from "react-native";

import CheckButton3 from '../components/CheckButton3';
import BackArrowSvg from '../assets/icons/back-arrow-direction-down-right-left-up-svgrepo-com.svg';
import { SIZES, COLORS, FONTS } from '../constants';

const Certification = ({ navigation }) => {
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
        return(
            <View>
                {/* 내용 */}
                <View style={{ marginTop:"5%", marginBottom:"5%", paddingHorizontal: SIZES.padding}}>
                    <CheckButton3
                        buttonTitle="완료하기"
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
            {renderCertification()}
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

export default Certification;