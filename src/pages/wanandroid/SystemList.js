import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {SYSTEM_LIST} from '../../utils/pathMap';
import TabBar from '../../components/TabBar';
import httpUtil from '../../utils/httpUtil';
import CommonFlatList from '../../components/CommonFlatList';

/**
 * 体系文章列表
 */

export default class SystemList extends Component {


    state = {
        dataSource: [],
        isRefreshing:false,
        footType:0,     // 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        isLoading:false,
    }


    componentDidMount() {
        const { id } = this.props.route.params;
        httpUtil.get(SYSTEM_LIST.replace("page",0),{cid:60}).then(
            res=>console.log(res.data)
        )
    }

    refreshData = () => {
        this.setState({ isRefreshing: true });
        const { id } = this.props.route.params;
        pageNum = 0
        httpUtil.get(SYSTEM_LIST.replace("page",pageNum),{cid:id}).then(
            res=>{
                this.setState({
                    dataSource: res.data.data.datas,
                    footType:0
                })
                pageNum +=1;
            }
        )
        this.setState({ isRefreshing: false });
    }

    loadData = () => {
        const { id } = this.props.route.params;
        httpUtil.get(SYSTEM_LIST.replace("page",pageNum),{cid:id}).then(
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

        const { name } = this.props.route.params
        const {dataSource,isRefreshing } = this.state
        return (
            <View>
                <TabBar title={name} />
                <CommonFlatList
                    dataSource= {dataSource}
                    isRefreshing = {isRefreshing}
                
                />
            </View>
        )
    }
}
