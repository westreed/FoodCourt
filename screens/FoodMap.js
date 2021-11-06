import React, {useContext, useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";

import BackArrowSvg from '../assets/icons/back-arrow-direction-down-right-left-up-svgrepo-com.svg';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { SIZES, COLORS, FONTS, images } from '../constants';

const FoodMap = ({ navigation }) => {
    
    const [latitude, setLatitude] = React.useState(34.96859698783065);
    const [longitude, setLongitude] = React.useState(127.48007146641612);

    const [userLatitude, setUserLatitude] = React.useState(latitude);
    const [userLongitude, setUserLongitude] = React.useState(longitude);

    const [delta, setDelta] = React.useState(0.01);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;
                setUserLatitude(latitude);
                setUserLongitude(longitude);
                console.log(position.coords);
                console.log(delta)
            },
            error => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, distanceFilter: 0, interval: 3000, fastestInterval: 2000,},
        );
    }, []);

    function renderHeader() {
        return (
            <View style={{ ...styles.absolute, flexDirection: 'row', marginTop:"5%", paddingBottom:"10%", justifyContent:'center' }}>
                <TouchableOpacity //back button
                    style={{
                        width: 30,
                        left: SIZES.padding/2,
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <BackArrowSvg width={30} height={30} fill={'#000'}/>
                </TouchableOpacity>
                <View style={{ flex:1, left: SIZES.padding, }}>
                    <View style={{height: 30}}>
                        <Text style={{ ...FONTS.h2, fontWeight: 'bold' }}>뒤로가기</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderMain(){
        return(
            <MapView
                style={{flex: 1}}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton={true}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: delta,
                    longitudeDelta: delta,
                }}
            >
                <Marker
                    coordinate={{latitude: latitude, longitude: longitude}}
                    title="순천대학교 푸드코트"
                    pinColor={COLORS.blue1}
                />
            </MapView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderMain()}
            {renderHeader()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white2
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
})

export default FoodMap;