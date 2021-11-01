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

const Payment = ({ route, navigation }) => {
    
    const [food, setFood] = React.useState(route.params.item); //선택한 음식
    console.log(food);

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
            <View>
                <Text>Hello</Text>
            </View>
        )
    }
    return (
        <ScrollView style={styles.container}>
            {renderHeader()}
            {renderImage()}
            {renderContent()}
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