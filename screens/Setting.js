import React, {useContext} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../navigation/AuthProvider';
import firebase from '../firebaseConfig';

const Setting = ({ navigation }) => {

    const [displayName, setDisplayName] = React.useState(null);
    const {user, logout} = useContext(AuthContext);

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', top:"5%", paddingBottom:"10%" }}>
                <View style={{ flex:1, left: SIZES.padding/2 }}>
                    <View style={{height: 30}}>
                        <Text style={{ ...FONTS.h2, fontWeight: 'bold' }}>더보기</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderLogin() {
        //const user = auth().currentUser;
        console.debug(user)
        if(user){ //로그인했을 때
            return (
                <View style={{ paddingHorizontal: SIZES.padding }}>
                    <View style={{ marginVertical: 4 }}>
                        <TouchableOpacity //profile
                            style={{height: 50, flexDirection: 'row', alignItems: 'center'}}
                            onPress={() => logout()}
                        >
                            <Image
                                source={icons.profile}
                                resizeMode="contain"
                                style={{width: 50, height: 50}}
                            />
                            <Text style={{ paddingLeft: SIZES.padding/2, paddingRight: SIZES.padding, ...FONTS.h2 }}>로그인상태 {user.id}</Text>
                            <View style={{position: 'absolute', right: 0}}>
                                <Image
                                    source={icons.right_arrow}
                                    resizeMode="contain"
                                    style={{width: 25, height: 25}}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: SIZES.padding*3, height: 1, backgroundColor:COLORS.gray1 }}></View>
                </View>
            )
        }
        else{
            return (
                <View style={{ paddingHorizontal: SIZES.padding }}>
                    <View style={{ marginVertical: 4 }}>
                        <TouchableOpacity //profile
                            style={{height: 50, flexDirection: 'row', alignItems: 'center'}}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Image
                                source={icons.profile}
                                resizeMode="contain"
                                style={{width: 50, height: 50}}
                            />
                            <Text style={{ paddingLeft: SIZES.padding/2, paddingRight: SIZES.padding, ...FONTS.h2 }}>로그인 / 회원가입</Text>
                            <View style={{position: 'absolute', right: 0}}>
                                <Image
                                    source={icons.right_arrow}
                                    resizeMode="contain"
                                    style={{width: 25, height: 25}}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: SIZES.padding*3, height: 1, backgroundColor:COLORS.gray1 }}></View>
                </View>
            )
        }
    }
    function renderContent() {
        return (
            <View style={{ paddingHorizontal: SIZES.padding }}>
                <View style={{ height: 1, backgroundColor:COLORS.gray1 }}></View>
                <View style={{ marginVertical: 4 }}>
                    <TouchableOpacity //profile
                        style={{height: 50, flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ paddingLeft: SIZES.padding/2, paddingRight: SIZES.padding, ...FONTS.h2 }}>공지사항</Text>
                        <View style={{position: 'absolute', right: 0}}>
                            <Image
                                source={icons.right_arrow}
                                resizeMode="contain"
                                style={{width: 25, height: 25}}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 4 }}>
                    <TouchableOpacity //profile
                        style={{height: 50, flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ paddingLeft: SIZES.padding/2, paddingRight: SIZES.padding, ...FONTS.h2 }}>자주 묻는 질문</Text>
                        <View style={{position: 'absolute', right: 0}}>
                            <Image
                                source={icons.right_arrow}
                                resizeMode="contain"
                                style={{width: 25, height: 25}}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 4 }}>
                    <TouchableOpacity //profile
                        style={{height: 50, flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ paddingLeft: SIZES.padding/2, paddingRight: SIZES.padding, ...FONTS.h2 }}>문의하기</Text>
                        <View style={{position: 'absolute', right: 0}}>
                            <Image
                                source={icons.right_arrow}
                                resizeMode="contain"
                                style={{width: 25, height: 25}}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 4 }}>
                    <TouchableOpacity //profile
                        style={{height: 50, flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ paddingLeft: SIZES.padding/2, paddingRight: SIZES.padding, ...FONTS.h2 }}>버전정보</Text>
                        <View style={{position: 'absolute', right: 0}}>
                            <Image
                                source={icons.right_arrow}
                                resizeMode="contain"
                                style={{width: 25, height: 25}}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{  height: 1, backgroundColor:COLORS.gray1 }}></View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderLogin()}
            {renderContent()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white2
    },
})

export default Setting;