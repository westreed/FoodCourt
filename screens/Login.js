import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from '../constants'

const Login = ({ navigation }) => {

    const [displayName, setDisplayName] = React.useState(null)
    const [email, setEmail] = React.useState(null)
    const [password, setPassword] = React.useState(null)
    const [typingEmail, setTypingEmail] = React.useState(null)
    const [typingPassword, setTypingPassword] = React.useState(null)

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
                        value={{typingEmail}}
                        onChangeText={text => setTypingEmail(text)}
                        placeholder="학교이메일을 입력해주세요."
                        multiline={false}
                    />
                </View>
                <View style={{marginVertical:SIZES.padding/2,paddingHorizontal: SIZES.padding}}>
                    <TextInput
                        style={{borderRadius: 10, backgroundColor: COLORS.gray3}}
                        value={{typingPassword}}
                        onChangeText={text => setTypingPassword(text)}
                        placeholder="비밀번호를 입력해주세요."
                        secureTextEntry={true}
                        multiline={false}
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