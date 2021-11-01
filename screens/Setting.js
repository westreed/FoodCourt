import React, {useContext, useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
} from "react-native";

import RightArrowSvg from '../assets/icons/right-arrow-svgrepo-com.svg';
import SignInSvg from '../assets/icons/sign-in-svgrepo-com.svg';
import SignOutSvg from '../assets/icons/sign-out-svgrepo-com.svg';
import EditSvg from '../assets/icons/edit-svgrepo-com.svg';
import BellSvg from '../assets/icons/bell-outlined-svgrepo-com.svg';
import ChatSvg from '../assets/icons/comment-outlined-svgrepo-com.svg';
import PlaneSvg from '../assets/icons/paper-plane-outlined-svgrepo-com.svg';
import MapSignSvg from '../assets/icons/map-signs-svgrepo-com.svg';

import { SIZES, COLORS, FONTS } from '../constants'
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const Setting = ({ navigation }) => {

    const {user, logout} = useContext(AuthContext);
    const [userData, setUserData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if(user){getUser();}
        navigation.addListener("focus", () => setLoading(!loading));
    }, [navigation, loading]);

    const getUser = async() => {
        await firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
            if( documentSnapshot.exists ) {
                console.log('firebase', user);
                console.log('User Data', documentSnapshot.data());
                setUserData(documentSnapshot.data());
            }
        })
        .catch(error => {
            console.log('getUser Error: ', error);
        })
    }

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
        if(user){ //로그인했을 때
            return (
                <View style={{ paddingHorizontal: SIZES.padding }}>
                    <View>
                        <TouchableOpacity //profile
                            style={{marginTop:20, alignItems: 'center', justifyContent: "flex-end",}}
                            onPress={() => logout()}
                        >   
                            <View style={{flexDirection:'row'}}>
                                <Text style={{ ...FONTS.h2, fontWeight:'bold', paddingRight:10 }}>{user.displayName} 님</Text>
                                <SignOutSvg width={30} height={30} fill={COLORS.gray1}/>
                            </View>
                            <View style={{width: "50%", height:5, backgroundColor: COLORS.blue1}}></View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ top:-1, marginBottom: SIZES.padding*2, height: 1, backgroundColor:COLORS.gray1 }}></View>
                </View>
            )
        }
        else{
            return (
                <View style={{ paddingHorizontal: SIZES.padding }}>
                    <View>
                        <TouchableOpacity //profile
                            style={{marginTop:20, alignItems: 'center', justifyContent: "flex-end",}}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <View style={{flexDirection:'row'}}>
                                <Text style={{ ...FONTS.h2, fontWeight:'bold', paddingRight:10 }}>로그인 / 회원가입</Text>
                                <SignInSvg width={30} height={30} fill={COLORS.gray1}/>
                            </View>
                            <View style={{width: "70%", height:5, backgroundColor: COLORS.blue1}}></View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ top:-1, marginBottom: SIZES.padding*2, height: 1, backgroundColor:COLORS.gray1 }}></View>
                </View>
            )
        }
    }
    function renderMypage() {
        if (user){
            return (
                <View style={{ paddingHorizontal: SIZES.padding }}>
                    <View style={{ marginVertical: 4 }}>
                        <TouchableOpacity //profile
                            style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: user ? COLORS.white : COLORS.white2, borderRadius:10}}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={{ paddingLeft: SIZES.padding/2, paddingRight: SIZES.padding/2, ...FONTS.h2 }}>마이페이지</Text>
                            <EditSvg width={30} height={30} fill={COLORS.gray1} />
                            <View style={{position: 'absolute', right: 0}}>
                                <RightArrowSvg width={25} height={25} fill={COLORS.blue1} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
    function renderContent() {
        return (
            <View style={{ paddingHorizontal: SIZES.padding }}>
                {/* <View style={{ height: 1, backgroundColor:COLORS.gray1 }}></View> */}
                <View style={{ marginVertical: 4 }}>
                    <TouchableOpacity //profile
                        style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: user ? COLORS.white2 : COLORS.white, borderRadius:10}}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ paddingLeft: SIZES.padding/2, paddingRight: SIZES.padding/2, ...FONTS.h2 }}>공지사항</Text>
                        <BellSvg width={30} height={30} fill={COLORS.gray1} />
                        <View style={{position: 'absolute', right: 0}}>
                            <RightArrowSvg width={25} height={25} fill={COLORS.blue1} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 4 }}>
                    <TouchableOpacity //profile
                        style={{height: 50, flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ paddingLeft: SIZES.padding/2, paddingRight: SIZES.padding/2, ...FONTS.h2 }}>자주 묻는 질문</Text>
                        <ChatSvg width={30} height={30} fill={COLORS.gray1} />
                        <View style={{position: 'absolute', right: 0}}>
                        <RightArrowSvg width={25} height={25} fill={COLORS.blue1} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 4 }}>
                    <TouchableOpacity //profile
                        style={{height: 50, flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ paddingLeft: SIZES.padding/2, paddingRight: SIZES.padding/2, ...FONTS.h2 }}>문의하기</Text>
                        <PlaneSvg width={30} height={30} fill={COLORS.gray1} />
                        <View style={{position: 'absolute', right: 0}}>
                        <RightArrowSvg width={25} height={25} fill={COLORS.blue1} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 4 }}>
                    <TouchableOpacity //profile
                        style={{height: 50, flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => console.log(user)}
                    >
                        <Text style={{ paddingLeft: SIZES.padding/2, paddingRight: SIZES.padding/2, ...FONTS.h2 }}>버전정보</Text>
                        <MapSignSvg width={30} height={30} fill={COLORS.gray1} />
                        <View style={{position: 'absolute', right: 0}}>
                        <RightArrowSvg width={25} height={25} fill={COLORS.blue1} />
                        </View>
                    </TouchableOpacity>
                    {/* <View style={{  height: 1, backgroundColor:COLORS.gray1 }}></View> */}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{...FONTS.body4}}>혹시 푸드코트 위치를 모르시나요? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("FoodMap")}
                    >
                        <Text style={{...FONTS.body4, color:COLORS.orange}}>위치확인하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <ScrollView style={styles.container}>
            {renderHeader()}
            {renderLogin()}
            {renderMypage()}
            {renderContent()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white2
    },
})

export default Setting;