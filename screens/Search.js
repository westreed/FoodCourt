import React, {useContext, useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
} from "react-native";

import { SIZES, COLORS, FONTS } from '../constants';
import firestore from '@react-native-firebase/firestore';
import SearchSvg from '../assets/icons/search-svgrepo-com.svg'
import MagnetSvg from '../assets/icons/magnet-svgrepo-com.svg'

const Search = () => {
    const [searching, setSearching] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');

    const [categoryFood, setCategoryFood] = React.useState([]); //카테고리 안 메뉴 데이터
    const [searchFood, setSearchFood] = React.useState('');

    function searchFunction(){
        console.log('categoryFood의 데이터');
        console.log(categoryFood);
        if (searchText != ''){
            console.log("검색 시작");
            firestore()
                .collection('foodCourtMenu')
                .doc('foodMenuList')
                .onSnapshot(documentSnapshot => {
                    if(documentSnapshot.exists){
                        setCategoryFood(documentSnapshot.get('foodMenuList'));
                        setSearching(true)
                    }
                });
            if(searching){
                let menu = categoryFood.filter(a => (a.name.includes(searchText)));
                setSearchFood(menu)
            }
        }
    }

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
                <TouchableOpacity onPress={() => searchFunction()}>
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
    function foodSoldout(item){
        if(item.soldout == true){
            return (
                <View style={{
                    position: "absolute",
                    top: -8,
                    height: SIZES.width*24/100+15,
                    width: "100%",
                    backgroundColor: 'rgba(179, 179, 179 ,0.5)'
                }}>
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Text style={{...FONTS.body0, color:COLORS.red2}}>SOLD OUT</Text>
                    </View>
                </View>
            )
        }
    }

    function renderSearch() {
        const renderItem = ({ item }) => (
            <View>
                <TouchableOpacity
                    style={{
                        height: SIZES.width*24/100,
                        //alignItems: "center",
                        justifyContent: "center",
                        marginTop: 7,
                        marginBottom: 7,
                    }}
                    //onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: "center",
                        }}
                    >
                        <View style={{
                            width: SIZES.width*20/100,
                            height: SIZES.width*20/100,
                            marginRight: 10,
                        }}>
                            <Image
                                source={{ uri : item.icon }}
                                resizeMode="cover"
                                style={{
                                    borderRadius: 20,
                                    width: "100%",
                                    height: "100%"
                                }}
                            />
                        </View>
                        <View style={{
                            flexDirection: 'column',
                        }}>
                            <Text style={{...FONTS.body2}}>
                                {item.name}
                            </Text>
                            <Text style={{...FONTS.body2}}>
                                {item.price}원
                            </Text>
                        </View>
                    </View>
                    {foodSoldout(item)}
                </TouchableOpacity>
                <View style={{width:"100%", height:1, backgroundColor:COLORS.gray3}}></View>
            </View>
        )
        return (
            <View style={{marginBottom:120}}>
                <FlatList
                    data={searchFood}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingHorizontal: 7,
                    }}
                />
            </View>
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