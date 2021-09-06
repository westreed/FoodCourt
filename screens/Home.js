import React, {useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator
} from "react-native";

import firestore from '@react-native-firebase/firestore';

import { icons, images, SIZES, COLORS, FONTS } from '../constants'


const Home = ({ navigation }) => {
    //const ref = firestore().collection('foodCourtMenu').doc('category');
    //const categoryData = firestore().collection('foodCourtMenu').doc('category');
    //const [loading, setLoading] = React.useState(true)
    const [categories, setCategories] = React.useState(null);
    const [foodList, setFoodList] = React.useState(null);
    const [refresh, setRefresh] = React.useState(true); //스크롤을 아래로 쭉 땡겨서 refresh할 때

    useEffect(() => {
        if(refresh == true){
            console.log("useEffect 작동", refresh);
            firestore()
                .collection('foodCourtMenu')
                .doc('36lsMCTfg3IdYIBzOjeL')
                .onSnapshot(documentSnapshot => {
                    console.log('Category exists: ', documentSnapshot.exists);
                    if(documentSnapshot.exists){
                        //const fieldPath = new firebase.firestore.FieldPath('address', 'zip');
                        console.log('Category data: ', documentSnapshot.get('Category'));
                        setCategories(documentSnapshot.get('Category'));
                    }
                });
                firestore()
                .collection('foodCourtMenu')
                .doc('foodMenuList')
                .onSnapshot(documentSnapshot => {
                    console.log('Menu exists: ', documentSnapshot.exists);
                    if(documentSnapshot.exists){
                        //const fieldPath = new firebase.firestore.FieldPath('address', 'zip');
                        console.log('Menu data: ', documentSnapshot.get('foodMenuList'));
                        setFoodList(documentSnapshot.get('foodMenuList'));
                    }
                });
            //firestore().collection('foodCourtMenu').doc('foodMenuList').set({foodMenuList}).then(() => {console.log('User added!');});
            setRefresh(false)
        }
        // Stop listening for updates when no longer required
        return () => {
            console.log("Home useEffect return", refresh);
        }
    }, [refresh]);

    function selectCategory(category){
        let menu = foodList.filter(a => a.categories.includes(category.id))
        navigation.navigate("Category", {category, categories, menu, foodList})
    }
    function renderHeader() {
        return (
            <View style={{flexDirection: 'column', height: "30%", backgroundColor: COLORS.blue1}}>
                <View style={{ flex: 2, alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'center', left: 20}}>
                        <Text style={{...FONTS.h2, color:COLORS.white}}>순천대학교 푸드코트</Text>
                    </View>
                    <TouchableOpacity
                        style={{right: 20}}
                        onPress={() => navigation.navigate("QRScan")}
                    >
                        <View>
                            <Image
                                source={icons.qr_icon}
                                resizeMode="contain"
                                style={{
                                    tintColor: COLORS.white,
                                    width: 30,
                                    height: 30
                                }}
                            />
                        </View>
                        </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: "center"}}>
                    <View style={{height:14, left: 20, right: 20, flexDirection: 'row'}}>
                        <Image
                            source={icons.megaphone}
                            resizeMode="contain"
                            style={{
                                tintColor: COLORS.white,
                                width: 12,
                                height: 12
                            }}
                        />
                        <Text style={{...FONTS.body5, color:COLORS.white}}> 순천대학교 소식</Text>
                    </View>
                    
                </View>
                <View style={{flex: 3}}>
                    <Image
                        source={images.title_image}
                        resizeMode= "cover"
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                    />
                </View>
            </View>
        )
    }

    function renderMain(){
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        paddingLeft: "3%",
                        paddingRight: "3%",
                        paddingTop: "6%",
                        paddingBottom: "6%",
                        //backgroundColor: (selectedCategory?.id == item.id) ? COLORS.blue1 : COLORS.gray1,
                        alignItems: "center",
                        justifyContent: "center",
                        //backgroundColor: COLORS.gray1
                    }}
                    onPress={() => selectCategory(item)}
                >
                    <View
                        style={{
                            width: SIZES.width*24/100,
                            height: SIZES.width*24/100,
                            alignItems: "center",
                            justifyContent: "center",
                            //backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
                        }}
                    >
                        <Image
                            source={item.icon}
                            resizeMode="cover"
                            style={{
                                borderRadius: 20,
                                width: "100%",
                                height: "100%"
                            }}
                        />
                        <Text style={{ marginTop: 5, ...FONTS.body3}}> {item.name} </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        if (refresh) {
            return <ActivityIndicator />;
        }
        return (
            <View style={{marginTop: "4%", marginLeft: "4%", marginRight: "4%", marginBottom:250}}>
                <Text style={{paddingBottom: 10, ...FONTS.h3}}>MENU</Text>
                <View style={{alignItems: "center"}}>
                    <FlatList
                        data={categories}
                        //horizontal={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: "8%" }}
                        numColumns={3}
                        refreshing={refresh}
                        onRefresh={() => {
                            setRefresh(true)
                        }}
                    />
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderMain()}
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

export default Home;