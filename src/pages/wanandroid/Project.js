import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Divider } from 'react-native-elements';
import { NAV } from '../../utils/pathMap'
import { getRandowColor, pxToDp } from '../../utils/styleKits'
import httpUtil from '../../utils/httpUtil'
import { color } from 'react-native-reanimated';
import { NavigationContext } from "@react-navigation/native";
/**
 * wanandroid-项目页面
 */
export default class Project extends Component {

    static contextType = NavigationContext;
    state = {
        dataSource: [],
    }

    componentDidMount() { 
        httpUtil.get(NAV).then(
            res => this.setState({ dataSource: res.data.data })
        )
    }

    _renderItem = ({ item,index }) => {
        return (
            <View key={item.id}>
                <TouchableOpacity onPress={()=>{this.rightList.scrollToIndex({index: index, animated: true})}}>
                    <Text style = {styles.left_menu} >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    onTagClick = (ele) => {  
        const params = ele;
        ele.url = ele.link;
        this.context.navigate("ArticleDetail", params);
    }  

    /**右侧内容渲染*/
    _renderRightItem = ({item}) => { 
        return (
            <View>
                <Text style={styles.right_title}>{item.name}</Text>
                <View style={styles.right_tags_container}>
                {
                    item.articles.map(ele => (
                        <TouchableOpacity  key={ele.id} style={styles.right_tag}
                            onPress= {()=>this.onTagClick(ele)}
                        >
                            <Text style={{color:getRandowColor()}}>{ele.title}</Text>
                        </TouchableOpacity>
                    ))
                }
                </View>
            </View>
        )
    }


    render() {

        const { dataSource } = this.state;
        return (
            <View style = {styles.container}>
                <View style={styles.left_wrap}>
                <FlatList
                    data={dataSource}
                    ref={ (e) => this.leftList = e }
                    ItemSeparatorComponent={() => <Divider style={{ backgroundColor: '#e6e6e6', marginTop: pxToDp(5) }} />}
                    renderItem={this._renderItem}
                />
                </View>
                <View style={styles.right_wrap}>
                    <FlatList
                        data={dataSource}
                        ref={ (e) => this.rightList = e }
                        renderItem = {this._renderRightItem}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        display:'flex',
        height:'100%',
        flexDirection:'row'
    },
    left_wrap:{
        height:'100%',
        width:pxToDp(100),
    },
    right_wrap:{
        flex:1,
        height:"100%",
    },
    left_menu:{
        height:pxToDp(40),
        textAlign:"center",
        textAlignVertical:"center",
        color:"#000000"
    },
    right_title:{
        padding:pxToDp(20),
        color:"black",
        fontSize:pxToDp(16)
    },
    right_tags_container:{
        flexDirection: "row",
        flexWrap: "wrap",
        paddingLeft:pxToDp(20),
        paddingRight:pxToDp(20)
    },
    right_tag:{
        paddingRight:pxToDp(10),
        paddingLeft:pxToDp(10),
        paddingTop:pxToDp(5),
        paddingBottom:pxToDp(5),
        marginBottom:pxToDp(5),
        marginLeft:pxToDp(5),
        backgroundColor:"#d0d0d0",
        borderRadius:pxToDp(10),
        textAlign:"center"
        
    },
})