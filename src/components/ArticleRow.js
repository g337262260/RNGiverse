import React, { Component } from 'react'
import { Text, View,TouchableOpacity,StyleSheet } from 'react-native'
import { NavigationContext } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { pxToDp } from '../utils/styleKits';
import Color from '../utils/Color';
/**文章条目*/
export default class ArticleRow extends Component {

    static contextType = NavigationContext;

    onItemClick =(item) => {
        params={
            title:item.title,
            url:item.link,
        }
        this.context.navigate("ArticleDetail", params);
    }

    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={()=>this.onItemClick(item)}>
                <View style={styles.line1}>
                    <View style={{flexDirection:"row"}}>
                    <Icon name="person-circle-sharp" size={20} color={Color.MAIN}/>
                    <Text style={styles.user}>{item.shareUser||item.author}</Text>
                    </View>
                    <Text style={styles.chapter}>{item.superChapterName}</Text>
                </View>
                <View style={styles.line2}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                </View>
                <View style= {styles.line3}>
                    <View style={{flex:1}}></View>
                    <Fontisto name="clock" size={16} color="#e6e6e6"/>
                    <Text style={{marginLeft:pxToDp(5)}}>{item.niceShareDate}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        padding:pxToDp(10),
        position:"relative"
    },
    line1:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    user:{
        marginLeft:pxToDp(5),
        color:Color.TEXT_MAIN,
        fontSize:pxToDp(14)
    },
    chapter:{
        color:Color.TEXT_MAIN,
        fontSize:pxToDp(14)
    },
    line2:{
        marginTop:pxToDp(10)
    },
    title:{
        color:Color.TEXT_MAIN,
        fontSize:pxToDp(16)
    },
    line3:{
        flexDirection:"row",
        marginTop:pxToDp(8),
        marginRight:pxToDp(8),
        alignItems:"center",
        justifyContent:"center"
    }

})

