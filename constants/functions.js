

function checkCollegeEmail(email){
    if (email.includes('scnu.ac.kr')){return true}
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

export default {checkCollegeEmail, checkPassword};