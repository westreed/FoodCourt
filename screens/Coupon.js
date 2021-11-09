import React, {useContext, useEffect} from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";

import BackArrowSvg from '../assets/icons/back-arrow-direction-down-right-left-up-svgrepo-com.svg';
import { SIZES, COLORS, FONTS } from '../constants';
import firestore from '@react-native-firebase/firestore';
import QRCode from 'react-native-qrcode-svg';

const Coupon = ({ route, navigation }) => {

    const couponN = parseInt(route.params.couponNumber, 16);
    const couponSt = route.params.couponStatus;
    const [couponData, setCouponData] = React.useState(null);

    useEffect(async() => {
        await navigation.addListener('focus', async() => {
            const today = new Date();
            console.log(today);
            console.log('couponN :', couponN);

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
            <View style={{ flexDirection: 'row', marginTop:"5%", paddingBottom:"10%", alignItems:'center' }}>
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
                <View style={{position:'absolute', paddingTop:SIZES.width/2-30}}>
                    <Text style={{...FONTS.body4, color:'white'}}>실제 음식과 이미지가 다를 수 있습니다.</Text>
                </View>
            </View>
        )
    }

    function renderContent() {
        return (
            <View style={{marginHorizontal:SIZES.padding+10, flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <Text style={{...FONTS.body3, letterSpacing: -1.2, color:COLORS.gray1}}>순천대학교 푸드코트</Text>
                    <Text style={{...FONTS.h2, fontWeight: 'bold'}}>{couponData.foodName}</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/scnufood-4f431.appspot.com/o/etc%2F%EC%88%9C%EC%B2%9C%EB%8C%80%20%EB%A1%9C%EA%B3%A0%202.png?alt=media&token=c9b46e5d-761c-4157-b426-a21b612d9283'}} style={{width:30, height:30}} />
                </View>
            </View>
        )
    }

    function renderNotUse(){
        if(couponSt == false){
            return(
                <View style={{
                    position: "absolute",
                    marginTop:SIZES.width/12,
                    height: SIZES.width*20/100+15,
                    width: "100%",
                    backgroundColor: 'rgba(150, 150, 150, 0.5)'
                }}>
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        {couponData.couponUse == false ?
                            <Text style={{...FONTS.body0, fontWeight:'bold', color:COLORS.red2}}>유효기간이 지남</Text> :
                            <Text style={{...FONTS.body0, fontWeight:'bold', color:COLORS.red2}}>사용된 쿠폰</Text>
                        }
                    </View>
                </View>
            )
        }
        return (
            <View></View>
        )
    }

    function renderQRCode(){
        const couponData_ = couponData.couponID.toString(16).toUpperCase();
        const slicingData1 = couponData_.substring(0,2);
        const slicingData2 = couponData_.substring(2,4);
        const slicingData3 = couponData_.substring(4,6);
        const slicingData4 = couponData_.substring(6,8);

        return (
            <View>
                <View style={{alignItems:'center',margin:SIZES.padding/2, backfaceVisibility:'visible'}}>
                    <View style={{...styles.shadow, width:SIZES.width/3, height:SIZES.width/3}}>
                        <QRCode
                            value={couponN.toString()}
                            size={SIZES.width/3}
                        />
                    </View>
                    <View style={{marginTop:5,}}>
                        <Text style={{...FONTS.body3}}>{slicingData1}-{slicingData2}-{slicingData3}-{slicingData4}</Text>
                    </View>
                </View>
                {renderNotUse()}
            </View>
        )
    }

    function renderCoupon(){
        return (
            <View style={{marginHorizontal:SIZES.padding+10}}>
                <View style={{marginTop:SIZES.padding, flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text>교환처</Text>
                    <Text style={{fontWeight:'bold'}}>순천대학교 푸드코트</Text>
                </View>
                <View style={{marginTop:SIZES.padding/2, flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text>유효기간</Text>
                    <Text style={{fontWeight:'bold'}}>~{couponData.foodExpiry[0]}.{couponData.foodExpiry[1].toString().padStart(2,'0')}.{couponData.foodExpiry[2].toString().padStart(2,'0')}</Text>
                </View>
                <View style={{marginTop:SIZES.padding/2, flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text>주문번호</Text>
                    <Text style={{fontWeight:'bold'}}>{couponData.foodOrder}</Text>
                </View>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            {renderHeader()}
            {couponData ? renderImage() : false}
            {couponData ? renderContent() : false}
            {couponData ? renderQRCode() : false}
            {couponData ? renderCoupon() : false}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 50,
        backgroundColor: COLORS.white2
    },
    shadow: {
        backgroundColor: COLORS.brown,
        shadowColor: COLORS.blue1, // IOS
        shadowOffset: { width: 0, height: 5, }, // IOS
        shadowOpacity: 0.34, // IOS
        shadowRadius: 6.27, // IOS
        elevation: 5, //ANDROID
    },
})

export default Coupon;