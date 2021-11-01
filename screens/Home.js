import React, {useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    FlatList,
    ActivityIndicator,
    ScrollView
} from "react-native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import TicketSvg from '../assets/icons/ticket-svgrepo-com.svg';
import QRCodeSvg from '../assets/icons/qr-svgrepo-com.svg';
import firestore from '@react-native-firebase/firestore';
import { SIZES, COLORS, FONTS } from '../constants'

const Home = ({ navigation }) => {
    const bottomHeight = useBottomTabBarHeight();
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
            setRefresh(false)
        }
    }, [refresh]);

    function selectCategory(category){
        let menu = foodList.filter(a => a.categories.includes(category.id))
        navigation.navigate("Category", {category, categories, menu, foodList})
    }
    function renderHeader() {
        return (
            <View>
                <View style={{flexDirection: 'column', height: SIZES.height*20/100, backgroundColor: COLORS.blue1, justifyContent: 'center', ...styles.shadow}}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'center', left: 20}}>
                            <Text style={{...FONTS.h2, color:COLORS.white, fontWeight: 'bold'}}>순천대학교 푸드코트</Text>
                        </View>
                        <TouchableOpacity
                            style={{right: 20}}
                            onPress={() => navigation.navigate("QRScan")}
                        >
                            <QRCodeSvg width={30} height={30} fill={COLORS.white}/>
                            </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{...FONTS.h4, color:COLORS.white, fontWeight: 'bold'}}>2021 졸업작품 프로젝트</Text>
                    </View>
                </View>
                <Text style={{marginTop: "4%", marginLeft: "4%",paddingBottom: 10, ...FONTS.h3, fontWeight: 'bold'}}>푸드코트 카테고리</Text>
            </View>
        )
    }

    function renderMain(){
        const ViewCategory = ({ category }) => {
            if (foodList){
                let menu = foodList.filter(a => a.categories.includes(category.id))
                if (menu.length > 0){
                    if (menu.length <= 3){
                        return (
                            <View>
                                {menu.map((item, index) => (
                                    <View
                                        key={`${index}`}
                                        style={{paddingLeft: "8%", flexDirection: 'row'}}
                                    >
                                        <TicketSvg width={25} height={25} fill={COLORS.gray1} />
                                        <Text style={{...FONTS.body3}}> {item.name} </Text>
                                    </View>
                                ))}
                            </View>
                        )
                    }
                    else{
                        return (
                            <View>
                                {menu.map((item, index) => {
                                    if (index <= 2) {
                                        return(
                                            <View
                                                key={`${index}`}
                                                style={{paddingLeft: "8%", flexDirection: 'row'}}
                                            >
                                                <TicketSvg width={25} height={25} fill={COLORS.gray1} />
                                                <Text style={{...FONTS.body3}}> {item.name} </Text>
                                            </View>
                                        )
                                    }
                                })}
                            </View>
                        )
                    }
                }
                else{
                    return(
                        <View style={{paddingLeft: "8%", flexDirection: 'row'}}>
                            <TicketSvg width={25} height={25} fill={COLORS.gray1} />
                            <Text style={{...FONTS.body3}}> 아직 메뉴가 없네요. </Text>
                        </View>
                    )
                }
            }
            else{
                return <ActivityIndicator />;
            }
        }
        const renderItem = ({ item }) => {
            return (
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor={COLORS.white2}
                    style={{ paddingLeft: "3%", paddingRight: "3%", paddingTop: "2%", paddingBottom: "2%", alignItems: "center", justifyContent: "center",}}
                    onPress={() => selectCategory(item)}>
                    <View style={{borderRadius:10, backgroundColor: COLORS.white, ...styles.shadow2}}>
                        <View
                            style={{
                                width: SIZES.width*90/100,
                                height: SIZES.width*35/100,
                                alignItems: "center",
                                flexDirection: 'row',
                            }}
                        >
                            <Image
                                source={{uri : item.icon}}
                                resizeMode="cover"
                                style={{
                                    marginLeft: 20,
                                    borderRadius: 20,
                                    width: SIZES.width*24/100,
                                    height: SIZES.width*24/100,
                                }}
                            />
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{...FONTS.h2, paddingLeft: "4%", fontWeight:'bold'}}> {item.name} </Text>
                                <ViewCategory category={item} />
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }
        
        if (refresh) {
            return <ActivityIndicator />;
        }
        return (
            <View>
                <FlatList
                    ListHeaderComponent={renderHeader()}
                    data={categories}
                    //horizontal={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    style={{}}
                    //numColumns={3}
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
            {/* {renderHeader()} */}
            {renderMain()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white2,
    },
    shadow: {
        shadowColor: COLORS.blue1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.34,
        shadowRadius: 3.27,

        elevation: 10,
    },
    shadow2: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.34,
        shadowRadius: 3.27,

        elevation: 5,
    }
})

export default Home;