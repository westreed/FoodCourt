import React from "react";
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

const Setting = ({ navigation }) => {

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', top:"5%", paddingBottom:"10%" }}>
                <View style={{ flex:1, left: SIZES.padding/2 }}>
                    <View style={{height: 30}}>
                        <Text style={{ ...FONTS.h2 }}>더보기</Text>
                    </View>
                </View>
            </View>
        )
    }
    function renderContent() {
        return (
            <View style={{ paddingHorizontal: SIZES.padding }}>
                <View style={{ marginVertical: 4 }}>
                    <TouchableOpacity //profile
                        style={{height: 50, flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => navigation.goBack()}
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
            {renderContent()}
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

export default Setting;