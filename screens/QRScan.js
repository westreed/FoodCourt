import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
} from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from '../constants'

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QRScan = (props) => {
    function success(){
        onSuccess = e => {
            console.log(e)
            Linking.openURL(e.data).catch(err =>
                console.error('An error occured', err)
            );
        };
    }

    return (
        <QRCodeScanner
            onRead={success()}
            flashMode={RNCamera.Constants.FlashMode.auto}
            showMarker={true}
            cameraType={'back'}
            cameraStyle={{
                backgroundColor: 'rgba(50,50,50,0.5)'
            }}
            markerStyle={{
            }}
            bottomContent={
                <TouchableOpacity
                    style={styles.buttonTouchable}
                    onPress={() => props.navigation.goBack()}
                >
                    <Text style={styles.buttonText}>OK. Got it!</Text>
                </TouchableOpacity>
            }
        />
    );
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});

export default QRScan;