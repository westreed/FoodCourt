import React, {useRef, useContext, useEffect, useCallback} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
} from "react-native";

import RefreshSvg from '../assets/icons/refresh-svgrepo-com.svg';
import { SIZES, COLORS, FONTS } from '../constants';
import functions from '../constants/functions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-easy-toast';
import '../constants/globals.js';

const Order = ({ navigation }) => {
    //const {user} = useContext(AuthContext);
    const toastRef = useRef();
    
    const [foodList, setFoodList] = React.useState(null);
    const [couponList, setCouponList] = React.useState(null);
    const [expiryList, setExpiryList] = React.useState(null);

    const flatList = useRef(null);
    const [tab, setTab] = React.useState(0);
    const [refresh, setRefresh] = React.useState(true); //스크롤을 아래로 쭉 땡겨서 refresh할 때
    const [notScroll, setNotScroll] = React.useState(false);

    // Toast 메세지 출력
    const showDisableToast = useCallback(() => {
        toastRef.current.show('아직 완성되지 않은 기능입니다. X﹏X');
    }, []);

    const showCouponToast = useCallback(() => {
        toastRef.current.show('해당 기능은 이용할 수 없습니다.');
    }, []);

    const showDeleteToast = useCallback(() => {
        toastRef.current.show('식권이 환불처리되었습니다.');
    }, []);

    useEffect(async() => {
        await navigation.addListener('focus', async() => {
            if(orderRefresh == true){
                console.log('1orderRefresh', orderRefresh);
                orderRefresh = false;
                setRefresh(true);
                console.log('2orderRefresh', orderRefresh);
            }
        })
    });

    useEffect(async() => {
        if(auth().currentUser){
            if(refresh == true){
                const today = new Date();
                console.log(today);
                let tempFood = [];
                await firestore().collection('foodmenu').get().then(function(querySnapshot) {
                    if (querySnapshot) {
                        querySnapshot.forEach(function(doc){
                            tempFood.push(doc.data());
                        })
                    }
                }).catch(err => console.log('foodmenu', err));
                tempFood.sort(function(a,b){
                    if (a.id > b.id) return 1;
                    else return -1;
                });
                setFoodList(tempFood);

                var coupon = [];
                var expiry = [];
                await firestore().collection('coupon')
                .where("userUID", "==", auth().currentUser.uid)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        const tempCoupon = doc.data();
                        const expiryDate = new Date(tempCoupon.foodExpiry[0], tempCoupon.foodExpiry[1], tempCoupon.foodExpiry[2]);
                        if (tempCoupon.couponUse == false && today <= expiryDate){
                            coupon.push(tempCoupon);
                            console.log("사용가능 :",doc.id, " => ", tempCoupon);
                        }else{
                            expiry.push(tempCoupon);
                            console.log("사용불가 :",doc.id, " => ", tempCoupon);
                        }
                    });
                })
                coupon.sort(function(a,b){
                    if (a.foodDate > b.foodDate) return 1;
                    else return -1;
                });
                //console.log('coupon', coupon);
                setCouponList(coupon);
                setExpiryList(expiry);
                setRefresh(false);
                //제일 상단으로 스크롤
                if (notScroll == false){await flatList.current.scrollToOffset(0);}
                else{setNotScroll(false);}
                //console.log("HashMap", map.getAll());
            }
        }
        else{setRefresh(false);}
    }, [refresh]);

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', top:"5%", paddingBottom:"10%", alignItems:'center' }}>
                <View style={{marginHorizontal: SIZES.padding/2 }}>
                    <View style={{height: 30}}>
                        <Text style={{ ...FONTS.h2, fontWeight: 'bold' }}>주문내역</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{marginLeft:SIZES.padding/2}}
                    onPress={() => (setRefresh(true))}
                >
                    <RefreshSvg width={25} height={25} fill={COLORS.blue1} />
                </TouchableOpacity>
            </View>
        )
    }

    function renderTab(){
        return(
            <View style={{marginTop:SIZES.padding}}>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity
                        style={{flex:1, alignItems:'center'}}
                        onPress={() => (setTab(0))}
                    >
                        <Text style={{...FONTS.h3, fontWeight:'bold', letterSpacing:1}}>사용가능한 식권</Text>
                        <View style={{width: (SIZES.width/2-SIZES.padding*2), height:5, backgroundColor: (tab == 0) ? COLORS.blue1 : COLORS.white2}}></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex:1, alignItems:'center'}}
                        onPress={() => (setTab(1))}
                    >
                        <Text style={{...FONTS.h3, fontWeight:'bold', letterSpacing:1}}>사용/기간초과</Text>
                        <View style={{width: (SIZES.width/2-SIZES.padding*2), height:5, backgroundColor: (tab == 1) ? COLORS.blue1 : COLORS.white2}}></View>
                    </TouchableOpacity>
                </View>
                <View style={{width:"100%", height:2, backgroundColor:COLORS.gray3}}></View>
            </View>
        )
    }

    const renderFooter = () => (
        <View style={{height:SIZES.padding*5}}></View>
    )
    const rnederEmpty = () => (
        <View style={{ marginTop:SIZES.padding*2, alignItems:'center'}}>
            {tab == 0 ? <Text style={{...FONTS.h2, color:COLORS.orange}}>(*￣3￣)</Text> : <Text style={{...FONTS.h2, color:COLORS.orange}}>(ﾉ*･ω･)ﾉ</Text>}
            {tab == 0 ? <Text style={{...FONTS.h2, color:COLORS.orange}}>식권이 없네요..?</Text> : <Text style={{...FONTS.h2, color:COLORS.orange}}>아무것도 없네요.</Text>}
        </View>
    )

    async function counponCancel(id){
        Alert.alert(
            "구매 취소", "식권을 환불하실 건가요?",[
                { text: "네", onPress: () => {
                    firestore().collection('coupon').doc(id).delete();
                    showDeleteToast();
                    console.log('식권삭제', id);
                    setNotScroll(true);
                    setRefresh(true);
                }},
                { text: "아니오"}
            ],
            { cancelable: false }
        );
    }

    function renderCoupon(){
        //const renderItem = ({ item }) => (
        function renderItem({item}){
            return (
                <View>
                    <View style={{marginHorizontal:SIZES.padding}}>
                        <TouchableOpacity
                            style={{
                                height: SIZES.width*20/100,
                                //alignItems: "center",
                                justifyContent: "center",
                                marginTop: 7,
                                marginBottom: 7,
                            }}
                            onPress={() => {
                                const couponNumber = item.couponID.toString(16);
                                const couponStatus = true;
                                navigation.navigate("Coupon", {couponNumber, couponStatus})
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: "center",}}>
                                <View style={{
                                    width: SIZES.width*18/100,
                                    height: SIZES.width*18/100,
                                    marginRight: 10,
                                }}>
                                    <Image
                                        source={{ uri : item.foodIcon }}
                                        resizeMode="cover"
                                        style={{borderRadius: 20, width: "100%", height: "100%"}}
                                    />
                                </View>
                                <View style={{flexDirection: 'column',}}>
                                    <Text style={{...FONTS.body3}}>{item.foodName}</Text>
                                    <Text style={{...FONTS.body4}}>교환처 : 순천대학교 푸드코트</Text>
                                    <Text style={{...FONTS.body4}}>유효기간 : ~{item.foodExpiry[0]}.{item.foodExpiry[1].toString().padStart(2,'0')}.{item.foodExpiry[2].toString().padStart(2,'0')}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row', justifyContent:'center', marginBottom:SIZES.padding}}>
                            <TouchableOpacity
                                style={{...styles.button, ...styles.shadow, backgroundColor:COLORS.blue1,}}
                                onPress={() => {
                                    const couponNumber = item.couponID.toString(16);
                                    const couponStatus = true;
                                    navigation.navigate("Coupon", {couponNumber, couponStatus})
                                }}
                            >
                                <Text style={{...FONTS.body4, fontWeight:'bold', color:'white'}}>식권 보기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{...styles.button, borderWidth:1, borderColor:COLORS.gray1}}
                                onPress={showDisableToast}
                            >
                                <Text style={{...FONTS.body4, fontWeight:'bold', color:'black'}}>식권 저장</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{...styles.button, borderWidth:1, borderColor:COLORS.gray1}}
                                onPress={() => counponCancel(item.couponID.toString(16))}
                                >
                                    <Text style={{...FONTS.body4, fontWeight:'bold', color:'black'}}>구매 취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{width:"100%", height:1, backgroundColor:COLORS.gray3}}></View>
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    ref={flatList}
                    data={couponList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.couponID}`}
                    renderItem={renderItem}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={rnederEmpty}
                    refreshing={false}
                    onRefresh={() => {setRefresh(true)}}
                />
            </View>
        )
    }

    function renderExpiry(){
        function renderItem({item}){
            return (
                <View>
                    <View style={{marginHorizontal:SIZES.padding}}>
                        <TouchableOpacity
                            style={{
                                height: SIZES.width*20/100,
                                justifyContent: "center",
                                marginTop: 7,
                                marginBottom: 7,
                            }}
                            onPress={() => {
                                const couponNumber = item.couponID.toString(16);
                                const couponStatus = false;
                                navigation.navigate("Coupon", {couponNumber, couponStatus})
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: "center",}}>
                                <View style={{
                                    width: SIZES.width*18/100,
                                    height: SIZES.width*18/100,
                                    marginRight: 10,
                                }}>
                                    <Image
                                        source={{ uri : item.foodIcon }}
                                        resizeMode="cover"
                                        style={{borderRadius: 20, width: "100%", height: "100%"}}
                                    />
                                </View>
                                <View style={{flexDirection: 'column',}}>
                                    <Text style={{...FONTS.body3, textDecorationLine:'line-through'}}>{item.foodName}</Text>
                                    <Text style={{...FONTS.body4, textDecorationLine:'line-through'}}>교환처 : 순천대학교 푸드코트</Text>
                                    <Text style={{...FONTS.body4, textDecorationLine:'line-through'}}>유효기간 : ~{item.foodExpiry[0]}.{item.foodExpiry[1].toString().padStart(2,'0')}.{item.foodExpiry[2].toString().padStart(2,'0')}</Text>
                                </View>
                            </View>
                            
                        </TouchableOpacity>
                        <View style={{flexDirection:'row', justifyContent:'center', marginBottom:SIZES.padding}}>
                            <TouchableOpacity
                                style={{...styles.button, ...styles.shadow, backgroundColor:COLORS.blue1,}}
                                onPress={() => {
                                    const couponNumber = item.couponID.toString(16);
                                    const couponStatus = false;
                                    navigation.navigate("Coupon", {couponNumber, couponStatus})
                                }}
                            >
                                <Text style={{...FONTS.body4, fontWeight:'bold', color:'white'}}>식권 보기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{...styles.button, backgroundColor:COLORS.gray1}}
                                onPress={showCouponToast}
                            >
                                <Text style={{...FONTS.body4, fontWeight:'bold', color:'white'}}>식권 저장</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{...styles.button, backgroundColor:COLORS.gray1}}
                                onPress={showCouponToast}
                            >
                                <Text style={{...FONTS.body4, fontWeight:'bold', color:'white'}}>구매 취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{width:"100%", height:1, backgroundColor:COLORS.gray3}}></View>
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    ref={flatList}
                    data={expiryList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.couponID}`}
                    renderItem={renderItem}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={rnederEmpty}
                    refreshing={false}
                    onRefresh={() => setRefresh(true)}
                />
            </View>
        )
    }
    function renderLogin(){
        return (
            <View style={{ marginTop:SIZES.padding*4, alignItems:'center'}}>
                <Text style={{...FONTS.h2, color:COLORS.orange}}>주문내역을 보시려면,</Text>
                <Text style={{...FONTS.h2, color:COLORS.orange}}>먼저 로그인을 해주셔야 해요.</Text>
                <TouchableOpacity
                    style={{marginTop:SIZES.padding*2, flexDirection:'row', alignItems:'center'}}
                    onPress={() => navigation.navigate("Login")}
                >
                    <View style={{backgroundColor:COLORS.blue1, borderRadius:5, paddingHorizontal:10, paddingVertical:5}}>
                        <Text style={{...FONTS.body3, color:COLORS.white}}>로그인</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <functions.FocusAwareStatusBar backgroundColor={COLORS.white2} barStyle="dark-content" />
            {renderHeader()}
            {renderTab()}
            {auth().currentUser == null ? renderLogin() : (tab == 0 ? renderCoupon() : renderExpiry())}
            <Toast ref={toastRef}
                positionValue={SIZES.height * 0.15}
                fadeInDuration={200}
                fadeOutDuration={1000}
                style={{backgroundColor:'rgba(33, 87, 243, 0.8)'}}
            />
            {functions.renderLoading(refresh, true)}
        </SafeAreaView>
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
        elevation: 5,
     },
     button: {
        width:SIZES.width/3-SIZES.padding,
        marginHorizontal:SIZES.padding/4,
        height:30,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
     },
})

export default Order;