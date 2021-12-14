import { transform } from '@babel/core'
import React, { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet, Image,Animated} from 'react-native'
import { pxToDp } from '../utils/styleKits'


/** 
* 闪屏页 
*/


export default class Splash extends Component {

    constructor(props){
        super(props);
        this.scale = new Animated.Value(0);
    }


    componentDidMount() {
        //执行定时任务 3秒后进入首页
       this.goMain()
       // 动画
       Animated.timing(this.scale,{
           toValue:1,
           duration:1500,
       }).start();
    }
    
    goMain = () => {
        let timeId = setInterval(() => {
            this.props.navigation.navigate("Main")
            clearInterval(timeId);
        }, 2000);
    }


    render() {
        return (
            <View >
                <ImageBackground style={styles.imgBack} source={require('../res/splash.jpg')}>
                    <Animated.Image style={{transform:[{scale:this.scale}],...styles.icon}} source={require('../res/icon.png')} />
                    <View style={styles.hint}>
                    <Text style={styles.hintTx}>
                        Was mich nicht umbringt, macht mich stärker
                    </Text>
                    <Text style={styles.hintTx}>
                        凡不能毁灭我的，必使我强大
                    </Text>
                    </View>
                    
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imgBack: {
        height: "100%",
        position: "relative",
        alignItems: "center"
    },
    icon: {
        height: pxToDp(60),
        width: pxToDp(60),
        position: "absolute",
        top: "40%",
    },
    hint:{
        position:"absolute",
        bottom:pxToDp(46),
        alignItems: "center",
    },
    hintTx:{
        color:"#fff",
        marginBottom:pxToDp(16),
        textAlign:"center",
        fontSize:pxToDp(14),
    }
})
