import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator, BottomTabBar} from "@react-navigation/bottom-tabs"
import {isIphoneX} from "react-native-iphone-x-helper";

import {Home, Search, Order, Setting } from "../screens";
import {COLORS, FONTS} from "../constants"

import HomeSvg from "../assets/icons/home-svgrepo-com.svg";
import SearchSvg from "../assets/icons/search-svgrepo-com.svg";
import FileSvg from "../assets/icons/file-svgrepo-com.svg";
import ThreeDotsSvg from "../assets/icons/three-small-dots-svgrepo-com.svg";

const Tab = createBottomTabNavigator();


const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: true,
                style: {
                    height:50,
                    borderTopWidth: 0,
                    backgroundColor: "white",
                    elevation: 0,
                    borderTopLeftRadius:40,
                    borderTopRightRadius:40,
                }
            }}
        >
            <Tab.Screen
                name="홈"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <HomeSvg width={30} height={30} fill={focused ? COLORS.blue1 : COLORS.gray2}/>
                    )
                }}
            />
            <Tab.Screen
                name="검색"
                component={Search}
                options={{
                    tabBarIcon: ({focused}) => (
                        <SearchSvg width={30} height={30} fill={focused ? COLORS.blue1 : COLORS.gray2}/>
                    )
                }}
            />
            <Tab.Screen
                name="주문"
                component={Order}
                options={{
                    tabBarIcon: ({focused}) => (
                        <FileSvg width={30} height={30} fill={focused ? COLORS.blue1 : COLORS.gray2}/>
                    )
                }}
            />
            <Tab.Screen
                name="더보기"
                component={Setting}
                options={{
                    tabBarIcon: ({focused}) => (
                        <ThreeDotsSvg width={30} height={30} fill={focused ? COLORS.blue1 : COLORS.gray2}/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;