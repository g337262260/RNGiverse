import React, { Component } from 'react'
import {
    Text, View, FlatList, RefreshControl,
    StyleSheet, TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native'
import { Divider } from 'react-native-elements';
import { pxToDp } from '../../utils/styleKits';
import { Banner, HomeList } from '../../utils/pathMap'
import Swiper from 'react-native-swiper'
import HeadBanner from '../../components/HeadBanner';
import httpUtil from '../../utils/httpUtil';
import CommonFlatList from '../../components/CommonFlatList';
import ArticleRow from '../../components/ArticleRow';

/**
 * 最新文章页
 */


let pageNum  = 0;
let pageCount = 0;


export default class NewArticle extends Component {


    state = {
        banner: [],
        dataSource: [],
        isRefreshing:false,
        footType:0,     // 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        isLoading:false,
    }

    async componentDidMount() {
        this.refreshData()
    }






    _renderHeader = (banner) => {
        if (banner) {
            return (
                banner ? <HeadBanner bannerArr={banner} /> : <></>
            )
        }
    }

    _renderItem = ({ item }) => {
        return (
           <ArticleRow key={item.id} item={item}/>
        )
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
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }


    refreshData = async () => {
        this.setState({ isRefreshing: true });
        pageNum = 0;
        Promise.all([httpUtil.get(Banner), httpUtil.get(HomeList.replace('page',pageNum))]).then(
            values => {
                this.setState({
                    banner: values[0].data.data,
                    dataSource: values[1].data.data.datas,
                    footType:0
                })
                // pageCount = values[1].data.data.pageCount;
                pageCount =3;
            }
        )
        this.setState({ isRefreshing: false });
    }

    loadData = async () => {
        httpUtil.get(HomeList.replace('page',pageNum)).then(
            res=>{
                let foot = 0;
                if(pageNum>=pageCount){
                    foot = 1;
                }
                this.setState({
                    dataSource : this.state.dataSource.concat(res.data.data.datas),
                    isLoading:false,
                    footType:foot,
                })
            }
        ).catch((error)=>console.log(error))
    }

    onEndReached = () => {
        const { footType} = this.state
    
        if(footType !== 0){
            return;
        }
        if(pageNum!=1 && pageNum >= pageCount){
            return;
        }else{
            pageNum++
        }
        this.setState({footType:2})
        this.loadData();
    }

    render() {

        const { banner, dataSource,isRefreshing } = this.state
        return (
            <View>
                <FlatList
                    data={dataSource}
                    ItemSeparatorComponent={()=><Divider style={{ backgroundColor: '#e6e6e6',marginTop:pxToDp(5) }} />}
                    ListHeaderComponent={this._renderHeader(banner)}
                    ListFooterComponent={this._renderFooter}
                    renderItem={this._renderItem}
                    isRefreshing={isRefreshing}
                    toRefresh={this.refreshData}
                    refreshControl={
                        <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={this.refreshData}
                    />
                    }
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={1}
                />

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 15,
        color: 'blue',
    },
    footer:{
        flexDirection:'row',
        height:44,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    content: {
        fontSize: 15,
        color: 'black',
    }
});