import React, {createContext, useState} from 'react';
import {
    Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password, navigation) => {
                    if (email == '' || password == ''){
                        Alert.alert(
                            "로그인", "이메일과 비밀번호를 입력하세요.",[
                                { text: "확인", onPress: () => console.log("그렇다는데") }
                            ],
                            { cancelable: false }
                        );
                    }
                    else{
                        try {
                            await auth().signInWithEmailAndPassword(email, password);
                            Alert.alert(
                                "로그인", "로그인에 성공했습니다.",[
                                    { text: "확인", onPress: () => navigation.goBack() }
                                ],
                                { cancelable: false }
                            );
                        } catch (e) {
                            console.log(e);
                            if (e.code == 'auth/invalid-email' || e.code == 'auth/user-not-found'){
                                Alert.alert(
                                    "로그인 실패", "가입되지 않은 이메일주소입니다.",
                                    [{ text: "확인"}],
                                    { cancelable: false }
                                );
                            }
                            else if (e.code == 'auth/wrong-password'){
                                Alert.alert(
                                    "로그인 실패", "잘못된 비밀번호입니다. 비밀번호를 잊은 경우, '비밀번호 찾기'를 이용하세요.",
                                    [{ text: "비밀번호찾기", onPress: () => console.log("그렇다는데")}, { text: "확인"}],
                                    { cancelable: false }
                                );
                            }
                            else if (e.code == 'auth/too-many-requests'){
                                Alert.alert(
                                    "로그인 실패", "짧은 시간 동안 너무 많은 로그인 실패가 있었습니다. 추후에 다시 시도하세요.",
                                    [{ text: "확인"}],
                                    { cancelable: false }
                                );
                            }
                        }
                    }
                },

                register: async (name, email, password, navigation) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password)
                        .then(() => {
                        //Once the user creation has happened successfully, we can add the currentUser into firestore
                        //with the appropriate details.
                        let user = auth().currentUser
                        user.sendEmailVerification()
                        .then(() => {
                            Alert.alert(
                                "이메일 인증", "입력하신 이메일로 인증번호를 보냈어요!",[
                                    { text: "확인", onPress: () => navigation.navigate("Certification") }
                                ],
                                { cancelable: false }
                            );
                        })
                        firestore().collection('users').doc(auth().currentUser.uid)
                        .set({
                            name: name,
                            email: email,
                            createdAt: firestore.Timestamp.fromDate(new Date()),
                            userImg: null,
                        })
                        //ensure we catch any errors at this stage to advise us if something does go wrong
                        .catch(error => {
                            console.log('Something went wrong with added user to firestore: ', error);
                        })
                        })
                        //we need to catch the whole sign up process if it fails too.
                        .catch(error => {
                            console.log('Something went wrong with sign up: ', error);
                            if (error.code == 'auth/email-already-in-use'){
                                Alert.alert(
                                    "회원가입 실패", "해당 이메일은 이미 가입되어 있습니다.",
                                    [{ text: "확인"}],
                                    { cancelable: false }
                                );
                            }
                            else if (error.code == 'auth/invalid-email'){
                                Alert.alert(
                                    "회원가입 실패", "이메일주소 형식이 맞지 않습니다.",
                                    [{ text: "확인"}],
                                    { cancelable: false }
                                );
                            }
                            else if (error.code == 'auth/weak-password'){
                                Alert.alert(
                                    "회원가입 실패", "패스워드 양식이 맞지 않습니다.",
                                    [{ text: "확인"}],
                                    { cancelable: false }
                                );
                            }
                        });
                        
                    } catch (e) {
                        console.log(e);
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                        Alert.alert(
                            "로그아웃", "정상적으로 로그아웃이 되었어요!",[
                                { text: "확인" }
                            ],
                            { cancelable: false }
                        );
                    } catch (e) {
                        console.log(e);
                    }
                },
            }}>
        {children}
        </AuthContext.Provider>
    );
};
