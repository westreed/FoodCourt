import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';

import { Search, Category, Order, Setting, QRScan, Login, Register, Certification } from '../screens';
import Tabs from './tabs';


const Stack = createStackNavigator();

const Routes = () => {
    const {user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

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
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Certification" component={Certification} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
