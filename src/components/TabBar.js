import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import { pxToDp } from '../utils/styleKits'
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationContext } from "@react-navigation/native";

/**自定义Tabbar*/

export default class TabBar extends Component {

    static contextType = NavigationContext;

    render() {
        const { title } = this.props
        return (
            <View style={styles.container}>
                <Icon name="arrowleft" size={28} color="#fff" onPress={this.context.goBack}/>
                <Text style={styles.title} numberOfLines={1}> {title} </Text>
                <Icon name="none" size={28} color="#FF0149"  />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:pxToDp(44),
        backgroundColor:"#FF0149",
        flexDirection:"row",
        paddingLeft:pxToDp(15),
        paddingRight:pxToDp(15),
        alignItems:"center",
        justifyContent:"space-between"
    },
    title:{
        fontSize:pxToDp(16),
        color:"#fff",
        width:"70%",
        overflow:"hidden",
    }
    
})
