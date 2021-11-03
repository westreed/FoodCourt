import React, {useContext, useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";

import BackArrowSvg from '../assets/icons/back-arrow-direction-down-right-left-up-svgrepo-com.svg';
import { SIZES, COLORS, FONTS } from '../constants';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import functions from '../constants/functions';

const Order = ({ navigation }) => {
    const {user} = useContext(AuthContext);
    const [foodList, setFoodList] = React.useState(null);
    const [couponList, setCouponList] = React.useState(null);
    const [refresh, setRefresh] = React.useState(false) //스크롤을 아래로 쭉 땡겨서 refresh할 때

    var map = new functions.HashMap(); //불러온 쿠폰 데이터 저장소

    useEffect(async() => {
        navigation.addListener('focus', () => {setRefresh(true)});
        if(refresh == true){
            let tempFood = [];
            await firestore().collection('foodmenu').get().then(function(querySnapshot) {
                if (querySnapshot) {
                    querySnapshot.forEach(function(doc){
                        tempFood.push(doc.data());
                    })
                }
            }).catch(err => console.log('foodmenu', err));
            await tempFood.sort(function(a,b){
                if (a.id > b.id) return 1;
                else return -1;
            });
            await setFoodList(tempFood);

            var coupon = [];
            await firestore().collection('coupon')
            .where("userUID", "==", user.uid)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    map.put(doc.id, doc.data());
                    coupon.push(doc.data());
                    console.log(doc.id, " => ", doc.data());
                });
            })
            await coupon.sort(function(a,b){
                if (a.foodDate > b.foodDate) return 1;
                else return -1;
            });
            console.log('coupon', coupon);
            await setCouponList(coupon);
            await setRefresh(false)
            //console.log("HashMap", map.getAll());
        }
    }, [refresh]);

    function renderCoupon(){
        const renderItem = ({ item }) => (
            <TouchableOpacity>
                <View>
                    <Text>{item.foodName}</Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <View>
                <FlatList
                    data={couponList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.foodOrder}`}
                    renderItem={renderItem}
                    style={{margin:SIZES.padding/1.5}}
                    refreshing={refresh}
                    onRefresh={() => {setRefresh(true)}}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Order</Text>
            </View>
            {renderCoupon()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white2
    },
    shadow: {
        backgroundColor: COLORS.brown,
        shadowColor: COLORS.blue1, // IOS
        shadowOffset: { width: 0, height: 5, }, // IOS
        shadowOpacity: 0.34, // IOS
        shadowRadius: 6.27, // IOS
        elevation: 10, //ANDROID
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

export default Order;