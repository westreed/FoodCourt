import React, {useRef, useContext, useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CheckBox from '@react-native-community/checkbox';
import functions from '../constants/functions';
import { BlurView } from "@react-native-community/blur";
import CheckButton from '../components/CheckButton';
import BackArrowSvg from '../assets/icons/back-arrow-direction-down-right-left-up-svgrepo-com.svg';
import CheckSvg from '../assets/icons/check-circle-svgrepo-com.svg';
import CircleSvg from '../assets/icons/circle-svgrepo-com.svg';
import ShowSvg from '../assets/icons/bullseye-svgrepo-com.svg';
import HideSvg from '../assets/icons/blocked-svgrepo-com.svg';
import { SIZES, COLORS, FONTS } from '../constants';
import {AuthContext} from '../navigation/AuthProvider';

const Register = ({ navigation }) => {

    const [agree, setAgree] = React.useState(false);
    const [isSelected1, setSelection1] = React.useState(false);
    const [isSelected2, setSelection2] = React.useState(false);
    const [isSelected3, setSelection3] = React.useState(false);
    const [isSelected4, setSelection4] = React.useState(false);
    const [isSelected, setSelection] = React.useState(false);
    const [allSelected, setAllSelection] = React.useState(false);

    const {register} = useContext(AuthContext);
    const [isName, setIsName] = React.useState('');
    const [isEmail, setIsEmail] = React.useState('');
    const [isPassword, setIsPassword] = React.useState('');
    const [isCheckPass, setIsCheckPass] = React.useState('');

    const [isHide, setIsHide] = React.useState(true);

    const [isModal, setIsModal] = React.useState(false);
    const [isTerms, setIsTerms] = React.useState(0);

    const ref_input = [];
    ref_input[0] = useRef(null);
    ref_input[1] = useRef(null);
    ref_input[2] = useRef(null);
    ref_input[3] = useRef(null);
  
    const onFocusNext = (index) => {
        if (ref_input[index] && index < ref_input.length) {
            ref_input[index].current?.focus();
            console.log('Focus 작동!');
        }
    };

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

        function checkAgree(check1, check2){
            if (check1 == true && check2 == true){return true}
            else{return false}
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
                        <TouchableOpacity onPress={() => {setIsModal(true); setIsTerms(0);}}>
                            <Text style={styles.label2}>서비스 이용약관 동의 (필수)</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected2}
                            onValueChange={setSelection2}
                            style={styles.checkbox}
                        />
                        <TouchableOpacity onPress={() => {setIsModal(true); setIsTerms(1);}}>
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
                    <TouchableOpacity
                        style={styles.shadow}
                        onPress={() => (
                            checkAgree(isSelected1, isSelected2) ?
                            setAgree(true) :
                            Alert.alert(
                                "약관 동의", "필수 약관은 동의해야 합니다.",
                                [{ text: "확인"}],
                                { cancelable: false }
                            ))}
                    >
                        <CheckButton
                            buttonTitle="다음으로"
                            type={checkAgree(isSelected1, isSelected2)}
                        />
                    </TouchableOpacity>
                </View>
                <functions.termsModal
                    isVisible={isModal}
                    setIsVisible={setIsModal}
                    onClose={() => setIsModal(false)}
                    termsType={isTerms}
                />
            </View>
        )
    }
    function renderRegister(){
        function checkAgree(name, email, password, checkpass){
            if (name.length > 0 && functions.checkCollegeEmail(email) && functions.checkPassword(password) && password == checkpass){return true}
            return false
        }
        return(
            <View>
                {/* 내용 */}
                <View style={{ marginTop:"5%", marginBottom:"5%", paddingHorizontal: SIZES.padding, alignItems: 'center',}}>
                    <Text style={{...FONTS.h0}}>정보입력</Text>
                </View>

                <View style={{ marginTop:"5%", paddingHorizontal: SIZES.padding}}>
                    <View style={styles.checkboxContainer2}>
                        {isName ? <CheckSvg width={30} height={30} fill={COLORS.blue1} style={styles.checkbox}/> : <CircleSvg width={30} height={30} style={styles.checkbox}/>}
                        <Text style={styles.label1}>이름</Text>
                    </View>
                    <TextInput
                        ref={ref_input[0]}
                        onSubmitEditing={() => {onFocusNext(1);}}
                        returnKeyType="next"
                        style={{borderRadius: 10, backgroundColor: COLORS.gray3, height:50}}
                        value={String(isName)}
                        onChangeText={text => setIsName(text)}
                        placeholder="이름을 입력해주세요."
                        multiline={false}
                    />
                </View>
                <View style={{ marginTop:"5%", paddingHorizontal: SIZES.padding}}>
                    <View style={styles.checkboxContainer2}>
                        {functions.checkCollegeEmail(isEmail) ? <CheckSvg width={30} height={30} fill={COLORS.blue1} style={styles.checkbox}/> : <CircleSvg width={30} height={30} style={styles.checkbox}/>}
                        <Text style={styles.label1}>학교이메일</Text>
                    </View>
                    <TextInput
                        ref={ref_input[1]}
                        onSubmitEditing={() => {onFocusNext(2);}}
                        returnKeyType="next"
                        style={{borderRadius: 10, backgroundColor: COLORS.gray3, height:50}}
                        value={String(isEmail)}
                        onChangeText={text => setIsEmail(text)}
                        placeholder="학교이메일을 입력해주세요."
                        multiline={false}
                    />
                </View>
                <View style={{ marginTop:"5%", paddingHorizontal: SIZES.padding}}>
                    <View style={styles.checkboxContainer2}>
                        {functions.checkPassword(isPassword) ? <CheckSvg width={30} height={30} fill={COLORS.blue1} style={styles.checkbox}/> : <CircleSvg width={30} height={30} style={styles.checkbox}/>}
                        <Text style={styles.label1}>비밀번호 (8~20글자, 영문, 숫자, 특수문자)</Text>
                    </View>
                    <TextInput
                        ref={ref_input[2]}
                        onSubmitEditing={() => {onFocusNext(3);}}
                        returnKeyType="next"
                        style={{borderRadius: 10, backgroundColor: COLORS.gray3, height:50}}
                        value={String(isPassword)}
                        onChangeText={text => setIsPassword(text)}
                        secureTextEntry={isHide}
                        placeholder="비밀번호를 입력해주세요."
                        multiline={false}
                    />
                    <TouchableOpacity style={{position: 'absolute', top:55, left:SIZES.width-60}} onPress={() => setIsHide(!isHide)}>
                        {isHide ? <ShowSvg width={20} height={20} fill={COLORS.gray1 }/> : <HideSvg width={20} height={20} fill={COLORS.gray1} />}
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop:"5%", paddingHorizontal: SIZES.padding}}>
                    <View style={styles.checkboxContainer2}>
                        {(isPassword == isCheckPass && isCheckPass.length > 0) ? <CheckSvg width={30} height={30} fill={COLORS.blue1} style={styles.checkbox}/> : <CircleSvg width={30} height={30} style={styles.checkbox}/>}
                        <Text style={styles.label1}>비밀번호 확인</Text>
                    </View>
                    <TextInput
                        ref={ref_input[3]}
                        onSubmitEditing={() => null}
                        returnKeyType="done"
                        style={{borderRadius: 10, backgroundColor: COLORS.gray3, height:50}}
                        value={String(isCheckPass)}
                        onChangeText={text => setIsCheckPass(text)}
                        secureTextEntry={true}
                        placeholder="비밀번호를 한번더 입력해주세요."
                        multiline={false}
                    />
                </View>
                <View style={{ marginTop:"5%", marginBottom:"5%", paddingHorizontal: SIZES.padding}}>
                    <TouchableOpacity
                        style={styles.shadow}
                        onPress={() => (
                            checkAgree(isName, isEmail, isPassword, isCheckPass) ?
                            register(isName, isEmail, isPassword, navigation) :
                            Alert.alert(
                                "회원가입 실패", "양식에 맞춰서 모든 칸을 채워야 합니다.",
                                [{ text: "확인"}],
                                { cancelable: false }
                            )
                        )}
                    >
                        <CheckButton
                            buttonTitle="다음으로"
                            type={checkAgree(isName, isEmail, isPassword, isCheckPass)}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <functions.FocusAwareStatusBar backgroundColor={COLORS.white2} barStyle="dark-content" />
            {renderHeader()}
            {agree ? renderRegister() : renderAgree()}
        </KeyboardAwareScrollView>
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
        height: 40,
        flexDirection: "row",
        alignItems:"center",
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
        elevation: 5, //ANDROID
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
    modal: { 
        flex: 1,
        margin: 40,
        padding: 5,
        height: 500,
        backgroundColor: "white", 
        shadowColor: "black", 
        shadowOffset: { width: 0, height: 2, }, 
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5, 
     },
})

export default Register;