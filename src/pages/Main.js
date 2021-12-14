/** 主页面*/

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Svg from "react-native-svg-uri";
import TabNavigator from 'react-native-tab-navigator';
import { wanandroid, selectedWanandroid, kaiyan, selectedKaiyan, toutiao, selectedToutiao, douban, selectedDouban } from "../res/fonts/iconSvg";
import Douban from './douban/Douban';
import KaiYan from './kaiyan/KaiYan';
import TouTiao from './toutiao/TouTiao';
import WanAndroid from './wanandroid/WanAndroid';
import { pxToDp } from '../utils/styleKits'

export default class Main extends Component {


    state = {
        pages: [
            {
                selected: "wanandroid",
                title: "学习",
                // 未选中的样式
                renderIcon: () => <Svg width="25" height="25" svgXmlData={wanandroid} />,
                // 选中之后的样式
                renderSelectedIcon: () => <Svg width="25" height="25" svgXmlData={selectedWanandroid} />,
                onPress: () => this.setState({ selectedTab: 'wanandroid' }),
                component: <WanAndroid  itemWidth={30}/>
            },
            {
                selected: "kaiyan",
                title: "开眼",
                renderIcon: () => <Svg width="20" height="20" svgXmlData={kaiyan} />,
                renderSelectedIcon: () => <Svg width="20" height="20" svgXmlData={selectedKaiyan} />,
                onPress: () => this.setState({ selectedTab: 'kaiyan' }),
                component: <KaiYan />
            },
            {
                selected: "toutiao",
                title: "头条",
                renderIcon: () => <Svg width="20" height="20" svgXmlData={toutiao} />,
                renderSelectedIcon: () => <Svg width="20" height="20" svgXmlData={selectedToutiao} />,
                onPress: () => this.setState({ selectedTab: 'toutiao' }),
                component: <TouTiao />
            },
            {
                selected: "douban",
                title: "豆瓣",
                renderIcon: () => <Svg width="20" height="20" svgXmlData={douban} />,
                renderSelectedIcon: () => <Svg width="20" height="20" svgXmlData={selectedDouban} />,
                onPress: () => this.setState({ selectedTab: 'douban' }),
                component: <Douban />
            }
        ],
        selectedTab:"wanandroid"
    }




    render() {


        const { selectedTab, pages } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }} >
                <TabNavigator >
                    {pages.map((v, i) => <TabNavigator.Item key={i}
                        selected={selectedTab === v.selected}
                        title={v.title}
                        renderIcon={v.renderIcon}
                        renderSelectedIcon={v.renderSelectedIcon}
                        // titleStyle={{color:'2c2c2c'}}
                        onPress={v.onPress}
                        //选中以后字体的颜色，就是下面文字的颜色
                        selectedTitleStyle={{ color: "#FF0149",fontSize:pxToDp(14) }}
                        tabStyle={{
                            backgroundColor: "#eee", justifyContent: "center"
                        }}
                    >
                        {v.component}
                    </TabNavigator.Item>)}
                </TabNavigator>
            </View>
        )
    }
}

