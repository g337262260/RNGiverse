import * as React from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import PropTypes from 'prop-types';
import { pxToDp } from '../../utils/styleKits';
import NewArticle from './NewArticle';
import System from './System';
import Wechat from './Wechat';
import Project from './Project';


export default class WanAndroid extends React.Component {
  static propTypes = {
    itemWidth: PropTypes.number.isRequired,
  };

  state = {
    index: 0,
    routes: [
        { key: 'article', title: '最新文章' },
        { key: 'system', title: '知识体系' },
        { key: 'wechat', title: '公众号' },
        { key: 'project', title: '导航' },
    ],
  };

  // 这个加进去就行，不用问为啥
  _handleIndexChange = index => this.setState({index});

  _renderTabBar = props => {
    const {itemWidth} = this.props;
    return (
      // 上面导航栏的样式
      <TabBar
        scrollEnabled={true}
        {...props}
        style={{backgroundColor:"#FF0149"}}
        labelStyle={{fontSize: pxToDp(32), fontWeight: 'normal'}}
        activeColor={'#FFFFFF'}
        inactiveColor={'#FFE4D8'}
        indicatorStyle={this.bottomLine}
        tabStyle={{width:Dimensions.get('window').width/4}}
        renderLabel={({route, focused, color}) => (
          <View>
            <Text
              style={{
                fontWeight: focused ? 'bold' : 'normal',
                color,
              }}>
              {route.title}
            </Text>
            <View style={{height: 1}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'transparent',
                }}>
                {route.title}
              </Text>
            </View>
          </View>
        )}
      />
    );
  };

  _renderScene = SceneMap({
    article: NewArticle ,
    system: System,
    wechat: Wechat ,
    project: Project ,
  });

  bottomLine = () => {
    // props中传入的每个item宽度
    const {itemWidth} = this.props;
    return {
      height: 60,
      width: itemWidth * 0.6,
      borderRadius: 30,
      marginLeft: itemWidth * 0.2,
      marginBottom: 18,
      backgroundColor: '#fff',
      elevation: 10,
    };
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        // 选中的颜色
        activeColor={'#000'}
        // 没有选中的颜色
        inactiveTintColor={'#999'}
        // 选中下划线的样式
        indicatorStyle={this.bottomLine}
        // 每一个tab的宽度
        tabStyle={{width: 90}}
        // 懒加载相关代码
        lazy={true}
        lazyPreloadDistance={3}
        initialLayout={{width: Dimensions.get('window').width}}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: pxToDp(20),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});

