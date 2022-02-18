


import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './pages/Splash';
import Main from './pages/Main';
import WanAndroid from './pages/wanandroid/WanAndroid';
import KaiYan from './pages/kaiyan/KaiYan';
import TouTiao from './pages/toutiao/TouTiao';
import Douban from './pages/douban/Douban';
import ArticleDetail from './pages/ArticleDetail';
import SystemList from './pages/wanandroid/SystemList';

//创建页面栈
const Stack = createStackNavigator();

export class Nav extends Component {
    render() {
        return (
            <NavigationContainer>
            <Stack.Navigator  headerMode="none" initialRouteName="Splash">
              <Stack.Screen name="Splah" component={Splash} />
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
              <Stack.Screen name="SystemList" component={SystemList} />
            </Stack.Navigator>
          </NavigationContainer>
        )
    }
}

export default Nav

