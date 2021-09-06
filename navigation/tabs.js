import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator, BottomTabBar} from "@react-navigation/bottom-tabs"
import {isIphoneX} from "react-native-iphone-x-helper";

import {Home, Search, Order, Setting, Category } from "../screens";
import {COLORS, icons} from "../constants"

const Tab = createBottomTabNavigator();


const CustomTabBar = (props) => {
    if (isIphoneX()) {
        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: COLORS.white
                    }}
                ></View>
                <BottomTabBar
                    {...props.props}
                />
            </View>
        )
    } else {
        return (
            <BottomTabBar
                {...props.props}
            />
        )
    }
}

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: true,
                style: {
                    borderTopWidth: 0,
                    backgroundColor: "white",
                    elevation: 0
                }
            }}
            tabBar={(props) => (
                <CustomTabBar
                    props={props}
                />
            )}
        >
            <Tab.Screen
                name="메인"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.food}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.blue1 : COLORS.gray2
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="검색"
                component={Search}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.lollipop}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.blue1 : COLORS.gray2
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="주문"
                component={Order}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.list_order}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.blue1 : COLORS.gray2
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="설정"
                component={Setting}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.setting}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.blue1 : COLORS.gray2
                            }}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;