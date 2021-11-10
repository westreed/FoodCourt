import React, {useContext, useEffect, useCallback } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    Pressable,
} from "react-native";

import RightArrowSvg from '../assets/icons/right-arrow-svgrepo-com.svg';
import SignInSvg from '../assets/icons/sign-in-svgrepo-com.svg';
import SignOutSvg from '../assets/icons/sign-out-svgrepo-com.svg';
import GallerySvg from '../assets/icons/portfolio-image-work-gallery-svgrepo-com.svg';
import CameraSvg from '../assets/icons/dslr-camera-svgrepo-com.svg';


import { SIZES, COLORS, FONTS } from '../constants'
import {AuthContext} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import functions from '../constants/functions';
import Modal from "react-native-modal";
import * as ImagePicker from 'react-native-image-picker';

const Setting = ({ navigation }) => {

    const {user, logout} = useContext(AuthContext);
    const [userData, setUserData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [isModal, setIsModal] = React.useState(false);
    const [isModal2, setIsModal2] = React.useState(false);
    const [isTerms, setIsTerms] = React.useState(0);
    const [pickerResponse, setPickerResponse] = React.useState(null);
    const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

    useEffect(() => {
        if(user){setUserData(functions.getUser(user.uid))}
        console.log('user',auth().currentUser);
        navigation.addListener("focus", () => setLoading(!loading));
    }, [navigation, loading]);

    useEffect(() => {
        if(user && pickerResponse && uri){
            setIsModal(false);
            const update = {photoURL: uri,};
            auth().currentUser.updateProfile(update);
            console.log('유저프로필 사진 업데이트', uri);
        }
    }, [pickerResponse])

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
    function renderTitle() {
        if(user){ //로그인했을 때
            return (
                <View style={{ marginTop:"5%", marginBottom:"5%", paddingHorizontal: SIZES.padding}}>
                    <Text style={{ ...FONTS.h2 }}>안녕하세요.</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{ ...FONTS.h2, color:COLORS.blue1, fontWeight:'bold' }}>{user.displayName}</Text>
                        <Text style={{ ...FONTS.h2 }}>님</Text>
                    </View>
                </View>
            )
        }
        return (
            <View style={{ marginTop:"5%", marginBottom:"5%", paddingHorizontal: SIZES.padding}}>
                <Text style={{ ...FONTS.h2 }}>안녕하세요.</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{ ...FONTS.h4, color:COLORS.blue1, fontWeight:'bold' }}>푸드코트</Text>
                    <Text style={{ ...FONTS.h4 }}>를 이용하시려면, 먼저 로그인을 해야합니다.</Text>
                </View>
            </View>
        )
    }

    function renderProfileImg(){
        function changeImage(){
            if(user){
                setIsModal(true);
            }
            else{
                Alert.alert(
                    "프로필 사진변경", "먼저 로그인을 해야 이용하실 수 있어요.",[
                        { text: "로그인", onPress: () => navigation.navigate("Login")},
                        { text: "확인"}
                    ],
                    { cancelable: false }
                );
            }
        }
        if(user && user.photoURL != null){
            return (
                <View style={{alignItems:'center'}}>
                    <Image
                        source={{uri:user.photoURL}}
                        style={{width:SIZES.width/4, height:SIZES.width/4, backgroundColor:COLORS.blue2, borderRadius:50, borderWidth:4, borderColor:'rgb(28,77,114)'}}
                        resizeMode='cover'
                    />
                    <TouchableOpacity
                        style={{...styles.shadow, left:SIZES.width/14, top:-SIZES.padding, padding:4, backgroundColor:'white',borderRadius:50,borderWidth:1, borderColor:COLORS.black3, backfaceVisibility:'visible'}}
                        onPress={() => changeImage()}
                    >
                        <CameraSvg width={18} height={18} fill={COLORS.black3}/>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View style={{alignItems:'center'}}>
                <Image
                    source={{uri:'https://firebasestorage.googleapis.com/v0/b/scnufood-4f431.appspot.com/o/etc%2Fface.png?alt=media&token=9011df8c-f77c-446f-b158-d193c1ce14e1'}}
                    style={{width:SIZES.width/4, height:SIZES.width/4, backgroundColor:COLORS.blue2, borderRadius:50, borderWidth:4, borderColor:'rgb(28,77,114)'}}
                />
                <TouchableOpacity
                    style={{...styles.shadow, left:SIZES.width/14, top:-SIZES.padding, padding:4, backgroundColor:'white',borderRadius:50,borderWidth:1, borderColor:COLORS.black3, backfaceVisibility:'visible'}}
                    onPress={() => changeImage()}
                >
                    <CameraSvg width={18} height={18} fill={COLORS.black3}/>
                </TouchableOpacity>
            </View>
        )
    }
    function renderLogin() {
        if(user){ //로그인했을 때
            return (
                <View style={{ marginTop:5, marginBottom:20, paddingHorizontal: SIZES.padding, alignItems: 'center' }}>
                    <Text style={{...FONTS.h3, marginBottom:15,}}>{user.email}</Text>
                    <TouchableOpacity //profile
                        style={{backgroundColor:COLORS.blue1, paddingHorizontal:15, paddingVertical:10,borderRadius:5, ...styles.shadow}}
                        onPress={() => logout()}
                    >
                        <Text style={{...FONTS.body3,color:'white'}}>로그아웃</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return (
                <View style={{ marginTop:5, marginBottom:20, paddingHorizontal: SIZES.padding, alignItems: 'center' }}>
                    <Text style={{...FONTS.h2, marginBottom:15,}}>손님</Text>
                    <TouchableOpacity //profile
                        style={{backgroundColor:COLORS.blue1, paddingHorizontal:15, paddingVertical:10,borderRadius:5, ...styles.shadow}}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{...FONTS.body3,color:'white'}}>로그인</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    function renderMap() {
        return (
            <View style={{ marginHorizontal: SIZES.padding, marginVertical: SIZES.padding/2 }}>
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
    function renderUserPage(){
        if(user){
            return (
                <View>
                    <View style={{marginTop:SIZES.padding/2, paddingHorizontal: SIZES.padding}}>
                        <Text style={{...FONTS.h3, fontWeight:'bold', color:COLORS.blue1}}>계정설정</Text>
                    </View>
                    <View style={{height:1, backgroundColor:COLORS.gray4}}></View>
                    <View style={{marginVertical:SIZES.padding/2,paddingHorizontal: SIZES.padding}}>
                        <TouchableOpacity onPress={() => null}>
                            <Text style={{...FONTS.body4}}>비밀번호 재설정</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:1, backgroundColor:COLORS.gray3}}></View>
                    <View style={{marginVertical:SIZES.padding/2,paddingHorizontal: SIZES.padding}}>
                        <TouchableOpacity onPress={() => null}>
                            <Text style={{...FONTS.body4}}>회원탈퇴하기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:1, backgroundColor:COLORS.gray3}}></View>
                </View>
            )
        }
        return (
            <View></View>
        )
    }
    function renderPage() {
        return (
            <View>
                {renderUserPage()}
                <View style={{marginTop:SIZES.padding/2, paddingHorizontal: SIZES.padding}}>
                    <Text style={{...FONTS.h3, fontWeight:'bold', color:COLORS.blue1}}>이용약관</Text>
                </View>
                <View style={{height:1, backgroundColor:COLORS.gray4}}></View>
                <View style={{marginVertical:SIZES.padding/2,paddingHorizontal: SIZES.padding}}>
                    <TouchableOpacity onPress={() => {setIsModal2(true); setIsTerms(0);}}>
                        <Text style={{...FONTS.body4}}>서비스 이용약관</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height:1, backgroundColor:COLORS.gray3}}></View>
                <View style={{marginVertical:SIZES.padding/2,paddingHorizontal: SIZES.padding}}>
                    <TouchableOpacity onPress={() => {setIsModal2(true); setIsTerms(1);}}>
                        <Text style={{...FONTS.body4}}>개인정보 수집 및 이용</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height:1, backgroundColor:COLORS.gray3}}></View>
            </View>
        )
    }
    const onImageLibraryPress = useCallback(() => {
        const options = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
        };
        ImagePicker.launchImageLibrary(options, setPickerResponse);
    }, []);
    
    const onCameraPress = React.useCallback(() => {
        const options = {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
        };
        ImagePicker.launchCamera(options, setPickerResponse);
    }, []);
    
    function ImagePickerModal({
        isVisible,
        onClose,
        onImageLibraryPress,
        onCameraPress,
      }) {
        return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            backdropTransitionOutTiming={0}
            style={{justifyContent: 'flex-end', margin: 0,}}>
            <SafeAreaView style={{backgroundColor: 'white', flexDirection: 'row', borderTopRightRadius: 30, borderTopLeftRadius: 30,}}>
                <Pressable style={{flex: 1, justifyContent: 'center', alignItems: 'center',}} onPress={onImageLibraryPress}>
                    <GallerySvg style={{margin: 10}} width={30} height={30} fill={COLORS.blue2} />
                    <Text style={{fontSize: 14, fontWeight: '600',}}>갤러리</Text>
                </Pressable>
                <Pressable style={{flex: 1, justifyContent: 'center', alignItems: 'center',}} onPress={onCameraPress}>
                    <CameraSvg style={{margin: 10}} width={30} height={30} fill={COLORS.blue2} />
                    <Text style={{fontSize: 14, fontWeight: '600',}}>카메라</Text>
                </Pressable>
            </SafeAreaView>
        </Modal>
        );
    }
    return (
        <ScrollView style={styles.container}>
            {renderHeader()}
            {renderTitle()}
            {renderProfileImg()}
            {renderLogin()}
            {renderMap()}
            {renderPage()}
            <ImagePickerModal
                isVisible={isModal}
                onClose={() => setIsModal(false)}
                onImageLibraryPress={onImageLibraryPress}
                onCameraPress={onCameraPress}
            />
            <functions.termsModal
                isVisible={isModal2}
                setIsVisible={setIsModal2}
                onClose={() => setIsModal2(false)}
                termsType={isTerms}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white2,
        marginBottom: 50,
    },
    shadow: {
        shadowColor: COLORS.black, // IOS
        shadowOffset: { width: 0, height: 5, }, // IOS
        shadowOpacity: 0.34, // IOS
        shadowRadius: 6.27, // IOS
        elevation: 5, //ANDROID
    },
})

export default Setting;