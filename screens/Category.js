import React, {useRef, useEffect} from "react";
import { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from "react-native";

import firestore from '@react-native-firebase/firestore';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

const itemWidth = 78;
const Category = ({ route, navigation }) => {

    const flatList = useRef(null);
    //const [loading, setLoading] = React.useState(true)
    const [categories, setCategories] = React.useState(route.params.category); //선택한 카테고리
    const [selectFood, setSelectFood] = React.useState(route.params.menu); //선택한 카테고리의 메뉴
    const [categoryData, setCategoryData] = React.useState(route.params.categories); //카테고리 데이터
    const [categoryFood, setCategoryFood] = React.useState(route.params.foodList); //카테고리 안 메뉴 데이터
    const [refresh, setRefresh] = React.useState(false) //스크롤을 아래로 쭉 땡겨서 refresh할 때

    useEffect(() => {
        if(refresh == true){
        console.log("Category useEffect 작동", refresh);
        const subscriber = firestore()
            .collection('foodCourtMenu')
            .doc('foodMenuList')
            .onSnapshot(documentSnapshot => {
                if(documentSnapshot.exists){
                    //const fieldPath = new firebase.firestore.FieldPath('address', 'zip');
                    //console.log('Menu data: ', documentSnapshot.get('Menu'));
                    //console.log('select Menu: ', selectFood);
                    setCategoryFood(documentSnapshot.get('foodMenuList'));
                    onSelectCategory(categories)
                    setRefresh(false);
                }
            });
        }
    }, [refresh]);

    
    useEffect(() => { //리스트 이동 연출
        if(flatList.current){
            flatList.current.scrollToIndex({index:categories.id-1, viewOffset:(itemWidth-4)*2});
        }
    })
    
    function onSelectCategory(category) {
        //filter restaurant
        //let menu = categoryFood.filter(a => a.categories.includes(category.id))
        let menu = categoryFood.filter(a => (a.categories) == (category.id));
        setSelectFood(menu)
        console.log("CategoryTab menu:", menu);
        setCategories(category)
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', top:"5%", paddingBottom:"10%" }}>
                <TouchableOpacity //back button
                    style={{
                        width: 30,
                        left: SIZES.padding,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back_arrow}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        flex:1,
                        right: SIZES.padding,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding,
                            //backgroundColor: COLORS.gray2
                        }}
                    >
                        <Text style={{ ...FONTS.h2 }}>{categories?.name}</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderCategoryList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    height: 30,
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginLeft: 7,
                    marginRight: 7,
                }}
                onPress={() => onSelectCategory(item)}
            >
                <View
                    style={{
                        width: 60,
                        alignItems: "center",
                    }}
                >
                    <Text style={{...FONTS.body3}}>
                        {item.name}
                    </Text>
                    <View style={{width: 60, height:5, backgroundColor: (categories?.id == item.id) ? COLORS.blue1 : COLORS.white2}}></View>
                </View>
            </TouchableOpacity>
        )
        return (
            <View>
                <FlatList
                    ref={flatList}
                    data={categoryData}
                    getItemLayout={(data, index) => (
                        {length: itemWidth, offset: itemWidth*index, index}
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingHorizontal: 7,
                    }}
                />
                <View style={{width:"100%", height:2, backgroundColor:COLORS.gray3}}></View>
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

    function renderFoodItem() {
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
                                source={item.icon}
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
            <View>
                <FlatList
                    data={selectFood}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingHorizontal: 7,
                    }}
                    refreshing={refresh}
                    onRefresh={() => {
                        setRefresh(true)
                    }}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderCategoryList()}
            {renderFoodItem()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white2
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default Category;