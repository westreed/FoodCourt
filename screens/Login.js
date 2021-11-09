import React, {useRef, useContext, useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";

// import firebase from '../firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../components/FormButton';
import BackArrowSvg from '../assets/icons/back-arrow-direction-down-right-left-up-svgrepo-com.svg';
import { SIZES, COLORS, FONTS } from '../constants';
import {AuthContext} from '../navigation/AuthProvider';

const Login = ({ navigation }) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {login} = useContext(AuthContext);

    const ref_input = [];
    ref_input[0] = useRef(null);
    ref_input[1] = useRef(null);
  
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
                <View style={{ flex:1, left: SIZES.padding }}>
                    <View style={{height: 30}}>
                        <Text style={{ ...FONTS.h2, fontWeight: 'bold' }}>로그인</Text>
                    </View>
                </View>
            </View>  
        )
    }
    function renderTitle() {
        return (
            <View style={{ marginTop:"15%", marginBottom:"15%", paddingHorizontal: SIZES.padding}}>
                <Text style={{ ...FONTS.h1 }}>멀리서 확인하고</Text>
                <Text style={{ ...FONTS.h1 }}>미리 구매하자.</Text>
            </View>
        )
    }
    function renderLogin() {
        return (
            <View>
                <View style={{marginVertical:SIZES.padding/2, paddingHorizontal: SIZES.padding}}>
                    <TextInput
                        ref={ref_input[0]}
                        onSubmitEditing={() => {onFocusNext(1);}}
                        returnKeyType="next"
                        style={{borderRadius: 10, backgroundColor: COLORS.gray3}}
                        value={String(email)}
                        onChangeText={text => setEmail(text)}
                        placeholder="학교이메일을 입력해주세요."
                        multiline={false}
                    />
                </View>
                <View style={{marginVertical:SIZES.padding/2,paddingHorizontal: SIZES.padding}}>
                    <TextInput
                        ref={ref_input[1]}
                        returnKeyType="done"
                        style={{borderRadius: 10, backgroundColor: COLORS.gray3}}
                        value={String(password)}
                        onChangeText={text => setPassword(text)}
                        placeholder="비밀번호를 입력해주세요."
                        secureTextEntry={true}
                        multiline={false}
                    />
                </View>
                <View style={{marginVertical:SIZES.padding/2,paddingHorizontal: SIZES.padding}}>
                    <FormButton 
                        buttonTitle="로그인"
                        onPress={() => login(email, password, navigation)}
                    />
                </View>
                <View style={{paddingHorizontal: SIZES.padding}}>
                    <FormButton 
                        buttonTitle="회원가입"
                        onPress={() => navigation.navigate("Register")}
                    />
                </View>
                <View style={{flexDirection: 'row', marginVertical:SIZES.padding/2, paddingHorizontal: SIZES.padding, justifyContent: 'center'}}>
                    <Text style={{...FONTS.body4}}>계정을 잊으셨나요? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("FindPassword")}><Text style={{...FONTS.body4, color:COLORS.orange }}>비밀번호 찾기</Text></TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <KeyboardAwareScrollView style={styles.container}>
            {renderHeader()}
            {renderTitle()}
            {renderLogin()}
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white2
    },
})

export default Login;