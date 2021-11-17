import React from "react";
import {
    StatusBar,
    Alert,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SIZES, COLORS, FONTS } from '../constants'
import Modal from "react-native-modal";
import AnimatedLoader from 'react-native-animated-loader';
import BackArrowSvg from '../assets/icons/back-arrow-direction-down-right-left-up-svgrepo-com.svg';

function checkCollegeEmail(email){
    if (email.includes('scnu.ac.kr') || email.includes('naver')){return true}
    return false
}
function checkPassword(password){
    const regex1 = /[0-9]+/g; //0~9 숫자가 있는지
    const regex2 = /[a-zA-Z]/g; //영문자가 있는지
    const regex3 = /[`~!@#$%^&*(),<.>/?]+/g; //특수문자가 있는지
    if (8 > password.length || password.length > 20 && !regex1.test(password) && !regex2.test(password)){
        return false
    }
    else if(!regex3.test(password)){
        return false
    }
    return true
}

function paymentStep(navigation, user, item){
    if(item.soldout == true){
        Alert.alert(
            "Soldout", "해당 메뉴는 품절되었습니다.",[
                { text: "확인"}
            ],
            { cancelable: false }
        );
    }
    else if(user == null){
        Alert.alert(
            "로그인", "로그인 후 이용가능합니다.",[
                { text: "로그인", onPress: () => navigation.navigate("Login")},
                { text: "확인"}
            ],
            { cancelable: false }
        );
    }
    else if(user.emailVerified == false){
        Alert.alert(
            "로그인", "인증된 계정만 이용할 수 있습니다.",[
                { text: "인증하기", onPress: () => navigation.navigate("Certification")},
                { text: "확인" }
            ],
            { cancelable: false }
        );
    }
    else{navigation.navigate("Payment", {item})}
}

// const getUser = async(uid) => {
//     await firestore()
//     .collection('users')
//     .doc(uid)
//     .get()
//     .then((documentSnapshot) => {
//         if( documentSnapshot.exists ) {
//             console.log('firebase', uid);
//             console.log('User Data', documentSnapshot.data());
//             return documentSnapshot.data();
//         }
//     })
//     .catch(error => {
//         console.log('getUser Error: ', error);
//     })
// }

function termsModal({
    isVisible,
    setIsVisible,
    onClose,
    termsType,
  }) {
    return (
    <Modal
        isVisible={isVisible}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        backdropTransitionOutTiming={0}
        style={{margin: 0,}}>
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.white2,}}>
            <View style={{ flexDirection: 'row', marginTop:"5%", paddingBottom:"5%" }}>
                <TouchableOpacity //back button
                    style={{width: 30, left: SIZES.padding/2, justifyContent: 'center'}}
                    onPress={() => {setIsVisible(false)}}
                >
                    <BackArrowSvg width={30} height={30} fill={'#000'}/>
                </TouchableOpacity>
                <View style={{ flex:1, left: SIZES.padding}}>
                    <View style={{height: 30}}>
                        {termsType == 0 ? <Text style={{ ...FONTS.h2, fontWeight: 'bold' }}>서비스 이용약관</Text> : <Text style={{ ...FONTS.h2, fontWeight: 'bold' }}>개인정보 수집 및 이용</Text>}
                    </View>
                </View>
            </View>
            <View style={{height:1, backgroundColor:COLORS.gray2}}></View>
            <ScrollView>
                {termsType == 0 ? <Text style={{marginHorizontal:SIZES.padding/2}}>{`\n  제 1조 (목적)
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
3) “회원”이 계약을 해지하는 경우 “회원”이 작성한 게시물은 삭제되지 않습니다.\n\n`}</Text> :              
<Text style={{marginHorizontal:SIZES.padding/2}}>{`\n  개인정보보호법 등 관련 법령에 따라 이용자의 개인정보를 보호하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침을 수립합니다.

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
이용자의 개인정보를 원칙적으로 보유·이용기간의 경과, 처리목적 달성, 서비스 이용약관에 따른 계약해지 등 개인정보가 불필요하게 됐을 때 지체없이 해당 개인정보를 파기합니다.\n\n`}</Text>}
            </ScrollView>
        </SafeAreaView>
    </Modal>
    );
}

function renderLoading(visible, clear){
    return (
        <AnimatedLoader
            visible={visible}
            overlayColor={clear ? "transparent" : "rgba(150,150,150,0.75)"}
            source={require("../assets/loadings/9844-loading-40-paperplane.json")}
            animationStyle={{width: 200,height: 200}}
            speed={1}
        >
        </AnimatedLoader>
    )
}

import { useIsFocused } from '@react-navigation/native';
function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
}

export default {checkCollegeEmail, checkPassword, paymentStep, termsModal, renderLoading, FocusAwareStatusBar};