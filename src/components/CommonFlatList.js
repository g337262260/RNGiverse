import React, { Component } from 'react'
import { Text, View, FlatList,RefreshControl } from 'react-native'
import { Divider } from 'react-native-elements';
import { pxToDp } from '../utils/styleKits';

/**
 * 封装通用的列表组件，支持下拉刷新，上拉加载
 */



export default class CommonFlatList extends Component {


    state = {
        footType:0
    }

    _renderFooter = () => {
        if (this.state.footType === 1) {
            return (
                <View style={{height:44,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.footType === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.footType === 0){
            return (
                <View >
                    <Text></Text>
                </View>
            );
        }
    }

    onEndReached = () => {
        const {state} = this.state
        const { loadData } = this.props
        if(footType !== 0){
            return;
        }
        if(pageNum!=1 && pageNum >= pageCount){
            return;
        }else{
            pageNum++;
        }
        this.setState({footType:2})
        loadData()
    }


    render() {
        const {dataSource,isRefreshing,renderItem,refreshData} = this.props
        return (
            <View>
                <FlatList
                    data={dataSource}
                    ItemSeparatorComponent={()=><Divider style={{ backgroundColor: '#e6e6e6',marginTop:pxToDp(5) }} />}
                    ListFooterComponent={this._renderFooter}
                    renderItem={renderItem}
                    isRefreshing={isRefreshing}
                    toRefresh={refreshData}
                    refreshControl={
                        <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={refreshData}
                    />
                    }
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={1}

                />

            </View>
        )
    }

}
