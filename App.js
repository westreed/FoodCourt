import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

import Tabs from "./navigation/tabs"
import { Search, Category, Order, Setting, QRScan, Login } from './screens'

const Stack = createStackNavigator();

const App = () => {
    
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initalRouteName={"Home"}
            >
                <Stack.Screen name="Home" component={Tabs} />
                <Stack.Screen name="Category" component={Category} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Order" component={Order} />
                <Stack.Screen name="Setting" component={Setting} />
                <Stack.Screen name="QRScan" component={QRScan} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;