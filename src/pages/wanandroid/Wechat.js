import React, { Component } from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import httpUtil from "../../utils/httpUtil";
import {WECHAT_AUTHOR} from "../../utils/pathMap";
import {pxToDp} from "../../utils/styleKits";
import {NavigationContext} from "@react-navigation/native";
/**
 * 微信公众号页面
 */
export default class Wechat extends Component {

    static contextType = NavigationContext;

    state = {
        dataSource:[]
    }

    componentDidMount() {
        this.refreshData()
    }

    refreshData = async () => {
        httpUtil.get(WECHAT_AUTHOR).then(
            res => this.setState({ dataSource: res.data.data })
        )
    }

    onTagClick = (ele) => {
        this.context.navigate("SystemList", ele);
    }

    _renderItem = () => {
        const {dataSource} = this.state;
        return (
            <View style={styles.container} >
                {
                    dataSource.map(ele => (
                        <TouchableOpacity style={styles.tag} key={ele.id}
                                          onPress={()=>this.onTagClick(ele)}
                        >
                            <Text style={{ color: "#fff" }}>{ele.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }


    render() {
        return (
            <View>
                {this._renderItem()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: pxToDp(12),
        flexDirection: "row",
        flexWrap: "wrap"

    },
    title: {
        fontSize: pxToDp(16),
        color: "#212121",
    },
    tag: {
        marginTop: pxToDp(8),
        marginBottom: pxToDp(8),
        backgroundColor: "#817F7F",
        borderRadius: pxToDp(16),
        paddingStart: pxToDp(8),
        paddingEnd: pxToDp(8),
        paddingBottom: pxToDp(4),
        paddingTop: pxToDp(4),
        marginLeft: pxToDp(6),
    }
})
