import React, {useContext, useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    Modal,
} from "react-native";

import CheckBox from '@react-native-community/checkbox';
import { BlurView } from "@react-native-community/blur";
import CheckButton from '../components/CheckButton';
import BackArrowSvg from '../assets/icons/back-arrow-direction-down-right-left-up-svgrepo-com.svg';
import { images, SIZES, COLORS, FONTS } from '../constants';
import {AuthContext} from '../navigation/AuthProvider';

const Register = ({ navigation }) => {

    const [agree, setAgree] = React.useState(false);
    const [isSelected1, setSelection1] = React.useState(false);
    const [isSelected2, setSelection2] = React.useState(false);
    const [isSelected3, setSelection3] = React.useState(false);
    const [isSelected4, setSelection4] = React.useState(false);
    const [isSelected, setSelection] = React.useState(false);
    const [allSelected, setAllSelection] = React.useState(false);

    const [isModal, setIsModal] = React.useState(false);

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
    function renderAgree() {
        if (allSelected == false && isSelected == true){
            setAllSelection(true)
            setSelection1(true)
            setSelection2(true)
            setSelection3(true)
            setSelection4(true)
        }
        else if(allSelected == true && isSelected == false){
            setAllSelection(false)
            setSelection1(false)
            setSelection2(false)
            setSelection3(false)
            setSelection4(false)
        }
        return (
            <View>
                {/* 내용 */}
                <View style={{ marginTop:"5%", marginBottom:"5%", paddingHorizontal: SIZES.padding, alignItems: 'center',}}>
                    <Text style={{...FONTS.h0}}>약관동의</Text>
                </View>
                <View style={{ marginTop:"5%", marginBottom:"5%", paddingHorizontal: SIZES.padding}}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label1}>아래의 약관에 모두 동의합니다.</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected1}
                            onValueChange={setSelection1}
                            style={styles.checkbox}
                        />
                        <TouchableOpacity onPress={() => setIsModal(true)}>
                            <Text style={styles.label2}>서비스 이용약관 동의 (필수)</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected2}
                            onValueChange={setSelection2}
                            style={styles.checkbox}
                        />
                        <TouchableOpacity onPress={() => setIsModal(true)}>
                            <Text style={styles.label2}>개인정보 처리방침 동의 (필수)</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected3}
                            onValueChange={setSelection3}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label2}>본인 명의를 이용하여 가입을 진행하겠습니다.</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected4}
                            onValueChange={setSelection4}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label2}>만 14세 이상입니다.</Text>
                    </View>
                </View>
                <View style={{ marginTop:"5%", marginBottom:"5%", paddingHorizontal: SIZES.padding}}>
                    <CheckButton
                        buttonTitle="다음으로"
                        check1={isSelected1}
                        check2={isSelected2}
                        onPress={() => setAgree(true)}
                    />
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModal}
                >
                    <BlurView
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        blurType="light"
                        blurAmount={20}
                        reducedTransparencyFallbackColor="white"
                    >
                        {/* <View style={{justifyContent: 'center', paddingHorizontal: SIZES.padding, height: SIZES.height/2, backgroundColor: COLORS.blue1 }}>
                            <Text style={{ marginTop: SIZES.padding, marginHorizontal: SIZES.padding, color: COLORS.white, ...FONTS.body2 }}>이용약관</Text>
                        </View> */}
                        <TouchableOpacity
                            style={styles.absolute}
                            onPress={() => {
                                setIsModal(false)
                            }}
                        >
                        </TouchableOpacity>
                        
                    </BlurView>
                </Modal>
            </View>
        )
    }
    function renderRegister(){
        return(
            <View>
                <Text>동의 후 회원가입단계</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {agree ? renderRegister() : renderAgree()}
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
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
})

export default Register;