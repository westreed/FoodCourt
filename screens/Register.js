import React, {useContext, useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
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
    const [isModal2, setIsModal2] = React.useState(false);

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
                        <TouchableOpacity onPress={() => setIsModal2(true)}>
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

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModal}
                >
                    <BlurView
                        style={{...styles.absolute}}
                        blurType="light"
                        blurAmount={20}
                        reducedTransparencyFallbackColor="white"
                    >  
                    </BlurView>
                    <TouchableOpacity
                        style={{...styles.absolute}}
                        onPress={() => {setIsModal(false)}}
                    >
                    </TouchableOpacity>
                    <View style={{...styles.modal}}>
                        <View style={{ flexDirection: 'row', marginTop:"5%", paddingBottom:"10%" }}>
                            <TouchableOpacity //back button
                                style={{width: 30, left: SIZES.padding/2, justifyContent: 'center'}}
                                onPress={() => {setIsModal(false)}}
                            >
                                <BackArrowSvg width={20} height={20} fill={'#000'}/>
                            </TouchableOpacity>
                            <View style={{ flex:1, left: SIZES.padding/4}}>
                                <View style={{height: 24}}>
                                    <Text style={{ ...FONTS.h4, fontWeight: 'bold' }}>서비스 이용약관</Text>
                                </View>
                            </View>
                        </View>
                        <ScrollView>
                            <Text>{`제 1조 (목적)
이 약관은 회사와 이용고객간에 서비스의 이용저건 및 절차, 회사와 회원간의 권리, 의무 및 기타 필요한 사항을 규정함을 목적으로 합니다. 본 약관은 PC통신, 스마트폰 앱 등을 이용하는 전저상거래에 대해서도 그 성질에 반하지 않는 한 준용됩니다.

제2조 (용어의 정의)
“사이트”란 “업주”가 재화 또는 서비스 상품을 “이용자”에게 판매하기 위하여 “회사”가 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정하여 제공하는 가상의 영업장을 말합니다.
“회원”이라 함은 “푸드코트 어플”에 개인정보를 제공하여 회원등록을 한 자로서, “푸드코트 어플”의 정보를 지속적으로 제공 받으며 “푸드코트 어플”이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 의미합니다.
“비밀번호”라 함은 회원의 동일성 확인과 회원의 권익 및 비밀번호를 위해 회원 스스로가 설정하여 사이트에 등록한 영문과 숫자 등의 조합을 말합니다.

제 3조 (약관의 명시와 개정)
1. “회사”는『전자상거래 등에서의 소비자보호에 관한 법률』, 『약관의 규제등에 관한 법률』, 『전보통신망 이용촉진 등에 관한 법률』,『전자서명법』, 『정보통신망 이용촉진 등에 관한 법률』,『소비자기본법』등 관련법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
2. “회사”는 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 “사이트”의 초기홤녀에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, “이용자”에게 불리하게 약관애용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 “회사”는 개정 전과 개정 후 내용을 “이용자”가 알기 쉽도록 표시합니다.
3. 이 약관에서 정하지 않은 사항과 이 약관의 해석에 관하여는 『전자상거래 등에서의 소비자보호에 관한 법률』, 『약관의 규제 등에 관한 법률』, 공정거래위원회가 정하는 『전자상거래 등에서의 소비자보호지침』 및 관계 법령 또는 상관례에 따릅니다.

제 4조 (관련법령과의 관계)
이 약관 또는 개별약관에서 정하지 않은 사항은 전기통신사업법, 전자거래기본법, 정보통신망법, 전자상거래 등에서의 소비자보호에 관한 법률, 개인정보 보호법 등 관련 법령의 규정과 일반적인 상관례에 의합니다.

제 5조 (서비스 이용시간 및 중단)
1. “서비스”의 이용은 “회사”의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간을 원칙으로 합니다. 3ㅏ만, 정기 점검 등의 필요로 “회사”가 정한 날이나 시간은 제외됩니다. 정기점검시간은 서비스제공화면에 공지한 바에 따릅니다.
2. “회사”는 “서비스”의 원활한 수행을 위하여 필요한 기간을 정하여 사전에 공지하고 서비스를 중지할 수 있습니다. 단, 불가피하게 긴급한 조치를 필요로 하는 경우 사후에 통지할 수 있습니다.

제 6조 (이용계약의 성립)
이용계약은 “회원”이 되고자 하는 자가 약관의 내용에 동의 하고, “회사”가 정한 가입 양식에 따라 회원정보를 기입하여 회원가입신청을 하고 “회사”가 이러한 신청에 대하여 승인함으로써 체결됩니다.

제 7조  (이용계약의 종료)
1. “회원”의 해지
1) “회원”은 언제든지 “회사”에게 해지의사를 통지함으로써 이용계약을 해지할 수 있습니다.
2) “회사”는 제 1호에 따른 “회원”의 해지요청에 대해 특별한 사정이 없는 한 이를 즉시 처리합니다.
3) “회원”이 계약을 해지하는 경우 “회원”이 작성한 게시물은 삭제되지 않습니다.`}</Text>
                        </ScrollView>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModal2}
                >
                    <BlurView
                        style={{...styles.absolute}}
                        blurType="light"
                        blurAmount={20}
                        reducedTransparencyFallbackColor="white"
                    >  
                    </BlurView>
                    <TouchableOpacity
                        style={{...styles.absolute}}
                        onPress={() => {setIsModal2(false)}}
                    >
                    </TouchableOpacity>
                    <View style={{...styles.modal}}>
                        <View style={{ flexDirection: 'row', marginTop:"5%", paddingBottom:"10%" }}>
                            <TouchableOpacity //back button
                                style={{width: 30, left: SIZES.padding/2, justifyContent: 'center'}}
                                onPress={() => {setIsModal2(false)}}
                            >
                                <BackArrowSvg width={20} height={20} fill={'#000'}/>
                            </TouchableOpacity>
                            <View style={{ flex:1, left: SIZES.padding/4}}>
                                <View style={{height: 24}}>
                                    <Text style={{ ...FONTS.h4, fontWeight: 'bold' }}>개인정보 수집 및 이용</Text>
                                </View>
                            </View>
                        </View>
                        <ScrollView>
                            <Text>{`개인정보보호법 등 관련 법령에 따라 이용자의 개인정보를 보호하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침을 수립합니다.

개인정보처리방침은 이용자가 언제나 쉽게 열람할 수 있도록 서비스 초기화면을 통해 공개하고 있으며 관련법령, 지침, 고시 또는 학식어플 서비스 정책의 변경에 따라 달라질 수 있습니다.

개인정보의 수집·이용
다음과 같이 이용자의 개인정보를 수집합니다. 처리 하고 있는 개인정보는 다음의 수집·이용·목적이 변경되는 경우에는 개인정보보호법에 따라 별도의 동의를 받는 등 필요한 조치를 이행합니다.

 (1) 서비스 제공시 아래와 같이 개인정보를 수집 이용합니다
-이메일을 통한 회원가입 : 이름, 이메일주소, 비밀번호, 프로필 이미지
 (2) 서비스 이용과정에서 아래 자동 수집 정보가 생성되어 수집 저장, 조합, 분석될 수 있습니다.
-IP주소, 쿠키, 방문기록, 서비스 이용기록, 기기정보,통신기록 등
 (3) 서비스 제공을 위하여 수집한 모든 개인정보와 생성정보를 아래 목적으로 이용합니다.
-회원 가입 의사 확인, 동의 의사 확인, 회원관리
-이용자 식별, 본인인증
-서비스 제공 및 관리(결제/환불 등), 서비스 개선, 신규 서비스 개발
-민원처리 및 고객상담
-고지사항 전달
-불법 및 부정이용 방지, 부정 사용자 차단 및 관리, 특정금융 거래정보의 보고 및 이용 등에 관한 법률에 따른 고객 확인, 의심거래보고 등 자금세탁방지
-서비스 방문 및 이용기록 통계 및 분석

 2. 개인정보의 제 3자 제공
이용자의 개인정보를 개인정보 수집·이용 목적에서 명시한 범위 내에서만 사용하며, 이용자의 사전 동의 없이 개인정보 수집·이용 목적 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 제공하지 않습니다.

3. 개인정보의 파기절차 및 방법
이용자의 개인정보를 원칙적으로 보유·이용기간의 경과, 처리목적 달성, 서비스 이용약관에 따른 계약해지 등 개인정보가 불필요하게 됐을 때 지체없이 해당 개인정보를 파기합니다.`}</Text>
                        </ScrollView>
                    </View>
                </Modal>
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
                        style={{borderRadius: 10, backgroundColor: COLORS.gray3}}
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
                        style={{borderRadius: 10, backgroundColor: COLORS.gray3}}
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
                        style={{borderRadius: 10, backgroundColor: COLORS.gray3}}
                        value={String(isPassword)}
                        onChangeText={text => setIsPassword(text)}
                        secureTextEntry={isHide}
                        placeholder="비밀번호를 입력해주세요."
                        multiline={false}
                    />
                    <TouchableOpacity style={{position: 'absolute', top:50, left:SIZES.width-60}} onPress={() => setIsHide(!isHide)}>
                        {isHide ? <ShowSvg width={20} height={20} fill={COLORS.gray1 }/> : <HideSvg width={20} height={20} fill={COLORS.gray1} />}
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop:"5%", paddingHorizontal: SIZES.padding}}>
                    <View style={styles.checkboxContainer2}>
                        {(isPassword == isCheckPass && isCheckPass.length > 0) ? <CheckSvg width={30} height={30} fill={COLORS.blue1} style={styles.checkbox}/> : <CircleSvg width={30} height={30} style={styles.checkbox}/>}
                        <Text style={styles.label1}>비밀번호 확인</Text>
                    </View>
                    <TextInput
                        style={{borderRadius: 10, backgroundColor: COLORS.gray3}}
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
            {renderHeader()}
            {agree ? renderRegister() : renderAgree()}
        </KeyboardAwareScrollView>
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