import React, {useRef, useEffect, useContext} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
} from "react-native";

import firestore from '@react-native-firebase/firestore';
import functions from '../constants/functions';
import BackArrowSvg from '../assets/icons/back-arrow-direction-down-right-left-up-svgrepo-com.svg';
import { images, SIZES, COLORS, FONTS } from '../constants';
import {AuthContext} from '../navigation/AuthProvider';


const itemWidth = 78;
const Category = ({ route, navigation }) => {
    const {user} = useContext(AuthContext);

    const flatList = useRef(null);
    //const [loading, setLoading] = React.useState(true)
    const [categories, setCategories] = React.useState(route.params.category); //선택한 카테고리
    const [selectFood, setSelectFood] = React.useState(route.params.menu); //선택한 카테고리의 메뉴
    const [categoryData, setCategoryData] = React.useState(route.params.categories); //카테고리 데이터
    const [categoryFood, setCategoryFood] = React.useState(route.params.foodList); //카테고리 안 메뉴 데이터
    const [refresh, setRefresh] = React.useState(false) //스크롤을 아래로 쭉 땡겨서 refresh할 때

    useEffect(async() => {
        if(refresh == true){
            console.log("Category useEffect 작동", refresh);
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
            setCategoryFood(tempFood);
            onSelectCategory(categories);
            setRefresh(false);
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
                        left: SIZES.padding/2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <BackArrowSvg width={30} height={30} fill={'#000'}/>
                </TouchableOpacity>
                <View
                    style={{
                        flex:1,
                        left: SIZES.padding,
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            height: 30,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h2, fontWeight: 'bold' }}>{categories?.name}</Text>
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
                    onPress={() => functions.paymentStep(navigation, user, item)}
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
                                {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                            </Text>
                        </View>
                    </View>
                    {foodSoldout(item)}
                </TouchableOpacity>
                <View style={{width:"100%", height:1, backgroundColor:COLORS.gray3}}></View>
            </View>
        )
        if (refresh) {
            return <ActivityIndicator />;
        }
        return (
            <View style={{marginBottom:100}}>
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
})

export default Category;