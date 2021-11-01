import {
    Alert
} from "react-native";

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
                { text: "확인", onPress: () => navigation.navigate("Login") }
            ],
            { cancelable: false }
        );
    }
    else if(user.emailVerified == false){
        Alert.alert(
            "로그인", "인증된 계정만 이용할 수 있습니다.",[
                { text: "확인" }
            ],
            { cancelable: false }
        );
    }
    else{navigation.navigate("Payment", {item})}
}

export default {checkCollegeEmail, checkPassword, paymentStep};