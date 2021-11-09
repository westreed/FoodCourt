import React, {useContext, useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal,
    FlatList,
    Alert,
} from "react-native";

import BackArrowSvg from '../assets/icons/back-arrow-direction-down-right-left-up-svgrepo-com.svg';
import CheckSvg from '../assets/icons/check-svgrepo-com.svg';
import CardSvg from '../assets/icons/card-svgrepo-com.svg';
import PhoneSvg from '../assets/icons/dismail-svgrepo-com.svg';
import TossSvg from '../assets/icons/toss-svgrepo-com.svg';
import NaverSvg from '../assets/icons/naver-svgrepo-com.svg';
import KaKaoSvg from '../assets/icons/talk_icon-icons.com_53596.svg';
import { SIZES, COLORS, FONTS } from '../constants';
import {AuthContext} from '../navigation/AuthProvider';
import { BlurView } from "@react-native-community/blur";
import firestore from '@react-native-firebase/firestore';
import CRC32 from 'buffer-crc32';
import { Buffer } from 'buffer';
import CheckButton from '../components/CheckButton';
import '../constants/globals.js'

const Payment = ({ route, navigation }) => {

    const {user} = useContext(AuthContext);
    const [isModal, setIsModal] = React.useState(false);
    
    const [food, setFood] = React.useState(route.params.item); //선택한 음식
    const [order, setOrder] = React.useState('NULL'); //주문번호
    const [refresh, setRefresh] = React.useState(false);

    const today = new Date();
    const curYear = today.getFullYear();
    const mon = today.getMonth()+1;
    const time = {
        year : mon+6 > 12 ? curYear+1 : curYear,
        month : mon+6 > 12 ? mon-6 : mon+6,
        day : today.getDate(),
    };

    const [card, setCard] = React.useState(1);
        const cardData = [
            {
                id: 1,
                name: "체크/신용카드",
                icon: CardSvg,
            },
            {
                id: 2,
                name: "휴대폰결제",
                icon: PhoneSvg,
            },
            {
                id: 3,
                name: "토스",
                icon: TossSvg,
            },
            {
                id: 4,
                name: "네이버페이",
                icon: NaverSvg,
            },
            {
                id: 5,
                name: "카카오페이",
                icon: KaKaoSvg,
            },
        ]

    const orderNumber = async() => {
        await firestore().collection('system').doc('order').get().then((documentSnapshot) => {
            if( documentSnapshot.exists ) {
                console.log('order', documentSnapshot.data());
                setOrder(documentSnapshot.data().num);
            }
        })
        .catch(error => {
            console.log('orderNumber Error: ', error);
        })
        setRefresh(false)
    }
    useEffect(async() => {
        await navigation.addListener('focus', async() => {
            setRefresh(true)
            await orderNumber();
            console.log(food);
        })
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
                        <Text style={{ ...FONTS.h2, fontWeight: 'bold' }}>결제하기</Text>
                    </View>
                </View>
            </View>  
        )
    }

    function renderImage() {
        return (
            <View style={{alignItems:"center", marginHorizontal:SIZES.padding, marginBottom:SIZES.padding, ...styles.shadow}}>
                <Image source={{uri:food.icon}} style={{width:"100%", height:SIZES.width/2}} />
                <View style={{position:'absolute', paddingTop:SIZES.width/2-30}}>
                    <Text style={{...FONTS.body4, color:'white'}}>실제 음식과 이미지가 다를 수 있습니다.</Text>
                </View>
            </View>
        )
    }

    function renderContent() {
        return (
            <View style={{marginHorizontal:SIZES.padding+10}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View>
                        <Text style={{...FONTS.body3, letterSpacing:-1.2, color:COLORS.gray1}}>순천대학교 푸드코트</Text>
                        <Text style={{...FONTS.h2, fontWeight: 'bold'}}>{food.name}</Text>
                        <Text style={{...FONTS.h3, fontWeight: 'bold'}}>{food.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/scnufood-4f431.appspot.com/o/etc%2F%EC%88%9C%EC%B2%9C%EB%8C%80%20%EB%A1%9C%EA%B3%A0%202.png?alt=media&token=c9b46e5d-761c-4157-b426-a21b612d9283'}} style={{width:30, height:30}} />
                    </View>
                </View>
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
                    <Text style={{...FONTS.body3}}>{cardData[card-1].name}</Text>
                    <TouchableOpacity onPress={() => {setIsModal(true)}}>
                    <Text style={{...FONTS.body3}}>변경</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    function renderCard(){
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{flexDirection:'row', justifyContent:'space-between', marginVertical:SIZES.padding/4}}
                    onPress={() => {setCard(item.id); setIsModal(false);}}
                >
                    <View style={{flexDirection:'row'}}>
                        <item.icon width={30} height={30} style={{marginRight:SIZES.padding/2}} />
                        <Text style={{...FONTS.body2}}>{item.name}</Text>
                    </View>
                    {(item.id == card) ? <CheckSvg width={30} height={30} fill={COLORS.blue1} /> : <View/>}
                </TouchableOpacity>
            )
        }
        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModal}
                >
                    <BlurView
                        style={{...styles.absolute}}
                        blurType="light"
                        blurAmount={20}
                        reducedTransparencyFallbackColor="white"
                    >  
                    </BlurView>
                    <TouchableOpacity
                        style={{...styles.absolute}}
                        onPress={() => {setIsModal(false)}}
                    >
                    </TouchableOpacity>
                    <View style={{...styles.modal}}>
                        <View style={{ flexDirection: 'row', marginTop:"5%", paddingBottom:"10%" }}>
                            <TouchableOpacity //back button
                                style={{width: 50, left: SIZES.padding/2, justifyContent: 'center'}}
                                onPress={() => {setIsModal(false)}}
                            >
                                <BackArrowSvg width={30} height={30} fill={'#000'}/>
                            </TouchableOpacity>
                            <View style={{ flex:1, left: SIZES.padding/4}}>
                                <View style={{height: 30}}>
                                    <Text style={{ ...FONTS.h2, fontWeight: 'bold' }}>결제수단선택</Text>
                                </View>
                            </View>
                        </View>
                        <FlatList
                            data={cardData}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => `${item.id}`}
                            renderItem={renderItem}
                            style={{margin:SIZES.padding/1.5}}
                        />
                    </View>
                </Modal>
            </View>
        )
    }

    function renderPayment(){
        async function createCoupon(){
            function getUnixTime() {
                const seed = new Date().getTime();
                return seed;
            }
            if (refresh == false && order != 'NULL'){
                const seedData = getUnixTime().toString()+user.displayName+user.email;
        
                let buf = Buffer.from(seedData.toString(16));
                let coupon = CRC32.unsigned(buf);
                let couponNumber = coupon.toString(16);
                console.log('Coupon ', couponNumber);
                
                //firesotre에 쿠폰 발행
                await firestore().collection('system').doc('order').get().then((documentSnapshot) => {
                    if( documentSnapshot.exists ) {
                        setOrder(documentSnapshot.data().num);
                    }
                })
                await firestore().collection('coupon').doc(couponNumber)
                .set({
                    foodOrder : order,
                    foodName : food.name,
                    foodPrice : food.price,
                    foodIcon : food.icon,
                    foodDate : firestore.Timestamp.fromDate(new Date()),
                    foodExpiry : [time.year, time.month, time.day],
                    userUID : user.uid,
                    userName : user.displayName,
                    couponID : coupon,
                    couponUse : false,
                    couponGift : false,
                })
                await firestore().collection('system').doc('order')
                .set({num : order+1,})
                orderRefresh = true;
                return (
                    Alert.alert(
                        `${food.name} 구매 성공!`, "구매하신 쿠폰은 푸드코트에서 사용하실 수 있습니다. 이 앱은 테스트버젼으로 결제모듈을 사용하지 않았습니다.",
                        [{ text: "확인", onPress: () => {
                            const couponStatus = true;
                            navigation.navigate("Coupon", {couponNumber, couponStatus});
                        }}], { cancelable: false }
                    )
                )
            }
            else{console.log('아직 order번호를 로드하지 못했습니다.')}
        }
        return(
            <View style={{ marginTop:"5%", marginBottom:"5%", paddingHorizontal: SIZES.padding}}>
                <TouchableOpacity
                    style={styles.shadow}
                    onPress={() => createCoupon()}
                >
                    <CheckButton
                        buttonTitle="결제하기"
                        type="true"
                    />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <ScrollView style={styles.container}>
            {renderHeader()}
            {renderImage()}
            {renderContent()}
            {renderPay()}
            {renderCard()}
            {renderPayment()}
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
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    modal: { 
        flex: 1,
        borderRadius: 30,
        marginVertical: SIZES.height/6,
        marginHorizontal: SIZES.width/6,
        padding: 5,
        backgroundColor: "white", 
        shadowColor: COLORS.brown, 
        shadowOffset: { width: 0, height: 2, }, 
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 10,
     },
})

export default Payment;