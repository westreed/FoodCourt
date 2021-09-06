import React, {useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    Button,
} from "react-native";

import firebase from '../firebaseConfig'
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

const Login = ({ navigation }) => {

    const [displayName, setDisplayName] = React.useState('');
    const [user, setUser] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [hasAccount, setHasAccount] = React.useState(false);

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }
    
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin = () => {
        console.debug("로그인시도 ", email, password)
        clearErrors();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code){
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const handleSignup = () => {
        clearErrors();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code){
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const handleLogout = () => {
        firebase.auth().signOut();
    };

    const authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                clearInputs();
                setUser(user);
                console.debug("로그인성공 ", user)
            } else{
                setUser('');
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);

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
                    <Image
                        source={icons.back_arrow}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
                <View style={{ flex:1, left: SIZES.padding }}>
                    <View style={{height: 30}}>
                        <Text style={{ ...FONTS.h2 }}>로그인</Text>
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
                        style={{borderRadius: 10, backgroundColor: COLORS.gray3}}
                        value={{email}}
                        onChangeText={text => setEmail(text)}
                        placeholder="학교이메일을 입력해주세요."
                        multiline={false}
                    />
                </View>
                <View>
                    <Text>{emailError}</Text>
                </View>
                <View style={{marginVertical:SIZES.padding/2,paddingHorizontal: SIZES.padding}}>
                    <TextInput
                        style={{borderRadius: 10, backgroundColor: COLORS.gray3}}
                        value={{password}}
                        onChangeText={text => setPassword(text)}
                        placeholder="비밀번호를 입력해주세요."
                        secureTextEntry={true}
                        multiline={false}
                    />
                </View>
                <View>
                    <Text>{passwordError}</Text>
                </View>
                <View style={{marginVertical:SIZES.padding/2,paddingHorizontal: SIZES.padding}}>
                    <Button
                        onPress={() => handleLogin()}
                        title="로그인"
                        color={COLORS.blue1}
                        accessibilityLabel="Learn more about this purple button"
                        />
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderTitle()}
            {renderLogin()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white2
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default Login;