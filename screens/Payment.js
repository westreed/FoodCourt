import React, {useContext, useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
} from "react-native";

import BackArrowSvg from '../assets/icons/back-arrow-direction-down-right-left-up-svgrepo-com.svg';
import { SIZES, COLORS, FONTS } from '../constants';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const Payment = ({ route, navigation }) => {
    
    const [food, setFood] = React.useState(route.params.item); //선택한 음식
    const [order, setOrder] = React.useState('NULL'); //주문번호
    console.log(food);

    const today = new Date();
    const curYear = today.getFullYear();
    const mon = today.getMonth()+1;
    const time = {
        year : mon+6 > 12 ? curYear+1 : curYear,
        month : mon+6 > 12 ? mon-6 : mon+6,
        day : today.getDate(),
    };

    const orderNumber = async() => {
        await firestore()
        .collection('system')
        .doc('order')
        .get()
        .then((documentSnapshot) => {
            if( documentSnapshot.exists ) {
                console.log('order', documentSnapshot.data());
                return documentSnapshot.data();
            }
        })
        .catch(error => {
            console.log('orderNumber Error: ', error);
        })
    }
    useEffect(() => {
        const temp = orderNumber();
        if (temp){setOrder(temp.num)};
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
                        <Text style={{ ...FONTS.h2, fontWeight: 'bold' }}>결제하기</Text>
                    </View>
                </View>
            </View>  
        )
    }

    function renderImage() {
        return (
            <View style={{alignItems:"center", marginHorizontal:SIZES.padding, marginBottom:SIZES.padding, ...styles.shadow}}>
                <Image source={{uri:food.icon}} style={{width:"100%", height:SIZES.height/3}} />
            </View>
        )
    }

    function renderContent() {
        return (
            <View style={{marginHorizontal:SIZES.padding+10}}>
                <Text style={{...FONTS.body3, letterSpacing: -1}}>순천대학교 푸드코트</Text>
                <Text style={{...FONTS.h2, fontWeight: 'bold'}}>{food.name}</Text>
                <Text style={{...FONTS.h2, fontWeight: 'bold'}}>{food.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                <View style={{marginTop:SIZES.padding, flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text>교환처</Text>
                    <Text style={{fontWeight:'bold'}}>순천대학교 푸드코트</Text>
                </View>
                <View style={{marginTop:SIZES.padding/2, flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text>유효기간</Text>
                    <Text style={{fontWeight:'bold'}}>~{time.year}.{time.month.toString().padStart(2,'0')}.{time.day.toString().padStart(2,'0')}</Text>
                </View>
                <View style={{marginTop:SIZES.padding/2, flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text>주문번호</Text>
                    <Text style={{fontWeight:'bold'}}>{order}</Text>
                </View>
            </View>
        )
    }

    function renderPay(){
        return(
            <View style={{marginTop:SIZES.padding, marginHorizontal:SIZES.padding+10}}>
                <Text style={{fontWeight:'bold'}}>결제수단</Text>
                <View style={{marginTop:5, borderWidth: 2, borderRadius:20, height:30, justifyContent:'center'}}>
                    <View style={{flexDirection:'row', marginHorizontal:SIZES.padding, justifyContent:'space-between'}}>
                    <Text style={{...FONTS.body3}}>신용/체크카드</Text>
                    <Text style={{...FONTS.body3}}>변경</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <ScrollView style={styles.container}>
            {renderHeader()}
            {renderImage()}
            {renderContent()}
            {renderPay()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white2
    },
    shadow: {
        elevation: 5, 
     },
})

export default Payment;