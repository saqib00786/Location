import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import Home from '../screens/Home'

const Stack = createNativeStackNavigator()
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                    name='SignIn'
                    component={SignIn}
                />
                <Stack.Screen
                    name='SignUp'
                    component={SignUp}
                />
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{headerShown:false}}
                />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default Navigation

const styles = StyleSheet.create({})