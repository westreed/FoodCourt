import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from "react-native";

import CheckButton3 from '../components/CheckButton3';
import BackArrowSvg from '../assets/icons/back-arrow-direction-down-right-left-up-svgrepo-com.svg';
import { SIZES, COLORS, FONTS } from '../constants';

const FindPassword = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white2
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    checkboxContainer2: {
        flexDirection: "row",
    },
    checkbox: {
        alignSelf: "center",
    },
    label1: {
        margin: 8,
        ...FONTS.body3,
        fontWeight: 'bold'
    },
    label2: {
        margin: 8,
        ...FONTS.body3,
    },
})

export default FindPassword;