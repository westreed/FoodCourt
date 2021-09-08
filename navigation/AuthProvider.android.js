import React, {createContext, useState} from 'react';
import {
    Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import firebase from '../firebaseConfig';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
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

                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password)
                        .then(() => {
                        //Once the user creation has happened successfully, we can add the currentUser into firestore
                        //with the appropriate details.
                        firestore().collection('users').doc(auth().currentUser.uid)
                        .set({
                            fname: '',
                            lname: '',
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
                        console.log('logout');
                    } catch (e) {
                        console.log(e);
                    }
                    console.log('로그아웃 시도는 한듯..?');
                },
            }}>
        {children}
        </AuthContext.Provider>
    );
};
