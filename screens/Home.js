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
import TicketSvg from '../assets/icons/fiber_manual_record_black_48dp.svg';
import QRCodeSvg from '../assets/icons/qr-svgrepo-com.svg';
import firestore from '@react-native-firebase/firestore';
import { SIZES, COLORS, FONTS } from '../constants'

const Home = ({ navigation }) => {
    const bottomHeight = useBottomTabBarHeight();
    const [categories, setCategories] = React.useState(null);
    const [foodList, setFoodList] = React.useState(null);
    const [refresh, setRefresh] = React.useState(true); //스크롤을 아래로 쭉 땡겨서 refresh할 때

    useEffect(async() => {
        navigation.addListener('focus', () => {setRefresh(true)})
        if(refresh == true){
            console.log("refresh 작동", refresh);
            let tempCategory = [];
            await firestore().collection('category').get().then(function(querySnapshot) {
                if (querySnapshot) {
                    querySnapshot.forEach(function(doc){
                        tempCategory.push(doc.data());
                    })
                }
            }).catch(err => console.log('category', err));
            await tempCategory.sort(function(a,b){
                if (a.id > b.id) return 1;
                else return -1;
            });
            await setCategories(tempCategory);

            let tempFood = [];
            await firestore().collection('foodmenu').get().then(function(querySnapshot) {
                if (querySnapshot) {
                    querySnapshot.forEach(function(doc){
                        tempFood.push(doc.data());
                    })
                }
            }).catch(err => console.log('foodmenu', err));
            await tempFood.sort(function(a,b){
                if (a.id > b.id) return 1;
                else return -1;
            });
            await setFoodList(tempFood);
            await setRefresh(false)
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
                            <View style={{paddingLeft: SIZES.padding/2, flexDirection: 'row',}}>
                                {menu.map((item, index) => (
                                    <View
                                        key={`${index}`}
                                        style={{marginRight: -15, width:40}}
                                    >
                                        <Image source={{ uri : item.icon }} resizeMode="cover" style={{borderRadius: 40, width:40, height:40, borderWidth:2, borderColor:COLORS.black3}}/>
                                        {/* <Text style={{...FONTS.body4}} numberOfLines={1}> {item.name}</Text> */}
                                    </View>
                                ))}
                            </View>
                        )
                    }
                    else{
                        return (
                            <View style={{paddingLeft: SIZES.padding/2, flexDirection: 'row',}}>
                                {menu.map((item, index) => {
                                    if (index <= 2) {
                                        return(
                                            <View
                                                key={`${index}`}
                                                style={{marginRight: -15, width:40}}
                                            >
                                                <Image source={{ uri : item.icon }} resizeMode="cover" style={{borderRadius: 40, width:40, height:40, borderWidth:2, borderColor:COLORS.black3}}/>
                                                {/* <Text style={{...FONTS.body5, color:"white"}} numberOfLines={1}> {item.name}</Text> */}
                                            </View>
                                        )
                                    }
                                })}
                                <View style={{paddingLeft: SIZES.padding/1.5, flexDirection: 'row', alignItems:'flex-end'}}>
                                    <Text style={{...FONTS.body3, color:"white"}}>+{menu.length-3}</Text>
                                </View>
                            </View>
                        )
                    }
                }
                else{
                    return(
                        <View style={{paddingLeft: SIZES.padding/2, flexDirection: 'row'}}>
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
                                    borderRadius: 10,
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                            <View style={{position:'absolute', justifyContent:'flex-end', height:"100%", width: SIZES.width*90/100,}}>
                                <View style={{flexDirection:'row', alignItems:'center', padding:5, backgroundColor:'rgba(25,25,25,0.5)', borderRadius:10, }}>
                                    <Text style={{...FONTS.h2, paddingLeft: SIZES.padding/3, fontWeight:'bold', color:COLORS.white2}}> {item.name} </Text>
                                    <ViewCategory category={item} />
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }
        const renderListHeader = () => (
            <Text style={{marginTop: "4%", marginLeft: "4%",paddingBottom: 10, ...FONTS.h3, fontWeight: 'bold'}}>푸드코트 카테고리</Text>
        )
        const renderFooter = () => (
            <View style={{height:SIZES.padding*7}}></View>
        )
        
        if (refresh) {
            return <ActivityIndicator />;
        }
        
        return (
            <View>
                <FlatList
                    data={categories}
                    //horizontal={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    ListHeaderComponent={renderListHeader()}
                    ListFooterComponent={renderFooter()}
                    //numColumns={3}
                    refreshing={refresh}
                    onRefresh={() => {setRefresh(true)}}
                />
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

        elevation: 5,
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
    },
})

export default Home;