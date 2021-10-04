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
                            Alert.alert(
                                "로그인", e.message,
                                [{ text: "확인", onPress: () => console.log("그렇다는데") }],
                                { cancelable: false }
                            );
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
