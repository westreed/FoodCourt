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

import { SIZES, COLORS, FONTS } from '../constants';
import SearchSvg from '../assets/icons/search-svgrepo-com.svg'
import MagnetSvg from '../assets/icons/magnet-svgrepo-com.svg'

const Search = () => {
    const [searching, setSearching] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');

    function renderHeader(){
        return (
            <View style={{ marginTop:"10%", paddingBottom:"10%" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal:SIZES.padding/2, height:50, borderRadius : 30, backgroundColor:COLORS.white }}>
                <TextInput
                    style={{ marginLeft:20,}}
                    value={String(searchText)}
                    onChangeText={text => setSearchText(text)}
                    placeholder="검색할 내용을 입력하세요."
                    multiline={false}
                />
                <TouchableOpacity onPress={() => setSearching(true)}>
                    <SearchSvg width={30} height={30} fill={COLORS.blue1} style={{marginRight: 20,}} />
                </TouchableOpacity>
                </View>
            </View>  
        )
    }
    function renderText(){
        return (
            <View style={{ marginTop:SIZES.padding*2, alignItems:'center'}}>
                <MagnetSvg width={30} height={30} fill={COLORS.gray1} style={{marginBottom:10, transform: [{rotate: '180deg'}]}}/>
                <Text style={{...FONTS.h2, color:COLORS.orange}}>오늘 먹고 싶은 메뉴를</Text>
                <Text style={{...FONTS.h2, color:COLORS.orange}}>입력해보세요!</Text>
            </View>
        )
    }
    function renderSearch(){
        return (
            <Text>서치함수 작동</Text>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {searching ? renderSearch() : renderText()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white2
    },
})

export default Search;