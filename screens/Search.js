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
import functions from '../constants/functions';
import SearchSvg from '../assets/icons/search-svgrepo-com.svg'
import MagnetSvg from '../assets/icons/magnet-svgrepo-com.svg'
import RingSvg from '../assets/icons/spin5-svgrepo-com.svg'
import {AuthContext} from '../navigation/AuthProvider';

const Search = ({ navigation }) => {
    const {user} = useContext(AuthContext);

    const [searching, setSearching] = React.useState(false);
    const [searchText, setSearchText] = React.useState(''); //검색어

    const [categoryFood, setCategoryFood] = React.useState([]); //카테고리 안 메뉴 데이터
    const [searchFood, setSearchFood] = React.useState('');

    const [notReset, setNotReset] = React.useState(false);

    // useEffect(() => {
    //     //다시 이 화면이 활성화 됬을 때 작동함
    //     navigation.addListener('focus', () => {
    //         if(notReset == false){
    //             setSearching(false);
    //             setSearchText('');
    //         }
    //         else{
    //             console.log('갱신금지 변수 작동');
    //             setNotReset(false);
    //         }
    //     });
    // }, []);

    useEffect( async() => {
        await searchFunction();
    },[searchText]);

    async function searchFunction(){
        async function searching(categoryFood, searchText){
            if(categoryFood){
                let menu = await categoryFood.filter(a => (a.name.includes(searchText)));
                await setSearchFood(menu);
                console.log('검색결과', categoryFood);
                await setSearching(true);
            }
        }
        if (searchText != ''){
            console.log("검색 시작");
            let tempFood = [];
            await firestore().collection('foodmenu').get().then(function(querySnapshot) {
                if (querySnapshot) {
                    querySnapshot.forEach(function(doc){
                        tempFood.push(doc.data());
                    })
                }
            })
            tempFood.sort(function(a,b){
                if (a.id > b.id) return 1;
                else return -1;
            });
            await setCategoryFood(tempFood);
            await searching(categoryFood, searchText);
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
                    height: SIZES.width*20/100+15,
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
                        height: SIZES.width*20/100,
                        //alignItems: "center",
                        justifyContent: "center",
                        marginTop: 7,
                        marginBottom: 7,
                    }}
                    onPress={() => {setNotReset(true); functions.paymentStep(navigation, user, item);}}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            paddingHorizontal: SIZES.padding/2,
                        }}
                    >
                        <View style={{
                            width: SIZES.width*18/100,
                            height: SIZES.width*18/100,
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
                            <Text style={{...FONTS.body3}}>
                                {item.name}
                            </Text>
                            <Text style={{...FONTS.body3}}>
                                {item.price}원
                            </Text>
                        </View>
                    </View>
                    {foodSoldout(item)}
                </TouchableOpacity>
                <View style={{width:"100%", height:1, backgroundColor:COLORS.gray3}}></View>
            </View>
        )
        if(searchFood.length == 0){
            return (
                <View style={{ marginTop:SIZES.padding*2, alignItems:'center'}}>
                    <RingSvg width={30} height={30} fill={COLORS.gray1} style={{marginBottom:10}}/>
                    <Text style={{...FONTS.h2, color:COLORS.orange}}>아쉽게도 검색한 메뉴는</Text>
                    <Text style={{...FONTS.h2, color:COLORS.orange}}>없네요...</Text>
                </View>
            )
        }
        return (
            <View style={{marginBottom:120}}>
                <FlatList
                    data={searchFood}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {searchText ? renderSearch() : renderText()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 50,
        backgroundColor: COLORS.white2
    },
})

export default Search;