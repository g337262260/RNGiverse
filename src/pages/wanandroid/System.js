import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationContext } from "@react-navigation/native";
import { Divider } from 'react-native-elements';
import { SYSTEM } from "../../utils/pathMap";
import httpUtil from '../../utils/httpUtil'
import { pxToDp } from '../../utils/styleKits';
/**
 * 知识体系页面
 */
export default class System extends Component {

    static contextType = NavigationContext;

    state = {
        dataSource: [],
    }

    componentDidMount() {
        this.refreshData();
    }


    refreshData = async () => {
        httpUtil.get(SYSTEM).then(
            res => this.setState({ dataSource: res.data.data })
        )
    }

    onTagClick = (ele) => {
        this.context.navigate("SystemList", ele);
    }


    _renderItem = ({ item }) => {
        return (
            <View key={item.id} style={styles.container}>
                <Text style={styles.title}>
                    {item.name}
                </Text>
                <View style={styles.tagGroup}>
                    {
                        item.children.map(ele => (
                            <TouchableOpacity style={styles.tag} key={ele.id}
                                onPress={()=>this.onTagClick(ele)}
                            >
                                <Text style={{ color: "#fff" }}>{ele.name}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }


    render() {

        const { dataSource } = this.state;
        console.log(dataSource);
        return (
            <View>
                <FlatList
                    data={dataSource}
                    ItemSeparatorComponent={() => <Divider style={{ backgroundColor: '#e6e6e6', marginTop: pxToDp(5) }} />}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: pxToDp(12)
    },
    title: {
        fontSize: pxToDp(16),
        color: "#212121",
    },
    tagGroup: {
        flexDirection: "row",
        flexWrap: "wrap"
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
