import React, {useContext, useEffect} from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";

import FormButton from '../components/FormButton';
import BackArrowSvg from '../assets/icons/back-arrow-direction-down-right-left-up-svgrepo-com.svg';
import { SIZES, COLORS, FONTS } from '../constants';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import QRCode from 'react-native-qrcode';

const Coupon = ({ route, navigation }) => {

    const couponN = parseInt(route.params.couponNumber, 16);
    const [couponData, setCouponData] = React.useState(null);

    useEffect(async() => {
        await navigation.addListener('focus', async() => {
            const today = new Date();
            console.log(today);

            await firestore().collection('coupon')
            .where("couponID", "==", couponN)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log('쿠폰정보 로드됨 ', doc.data());
                    setCouponData(doc.data());
                });
            })
        });
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
                    <BackArrowSvg width={30} height={30} fill={'#000'}/>
                </TouchableOpacity>
                <View style={{ flex:1, left: SIZES.padding }}>
                    <View style={{height: 30}}>
                        <Text style={{ ...FONTS.h2, fontWeight: 'bold' }}>쿠폰정보</Text>
                    </View>
                </View>
            </View>  
        )
    }
    function renderImage() {
        return (
            <View style={{alignItems:"center", marginHorizontal:SIZES.padding, marginBottom:SIZES.padding, ...styles.shadow}}>
                <Image source={{uri:couponData.foodIcon}} style={{width:"100%", height:SIZES.width/2}} />
            </View>
        )
    }

    function renderContent() {
        return (
            <View style={{marginHorizontal:SIZES.padding+10, flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <Text style={{...FONTS.body3, letterSpacing: -1, color:COLORS.gray1}}>순천대학교 푸드코트</Text>
                    <Text style={{...FONTS.h2, fontWeight: 'bold'}}>{couponData.foodName}</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/scnufood-4f431.appspot.com/o/etc%2F%EC%88%9C%EC%B2%9C%EB%8C%80%20%EB%A1%9C%EA%B3%A0%202.png?alt=media&token=c9b46e5d-761c-4157-b426-a21b612d9283'}} style={{width:30, height:30}} />
                </View>
            </View>
        )
    }

    function renderQRCode(){
        return (
            <View>
                <QRCode
                    value={couponN}
                    size={200}
                    bgColor='purple'
                    fgColor='white'/>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            {renderHeader()}
            {couponData ? renderImage() : false}
            {couponData ? renderContent() : false}
            {renderQRCode()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white2
    },
})

export default Coupon;