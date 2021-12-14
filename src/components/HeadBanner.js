import React, { Component, PureComponent } from 'react'
import { Text, View,StyleSheet,TouchableOpacity ,Image} from 'react-native'
import { NavigationContext } from "@react-navigation/native";
import Swiper from 'react-native-swiper';
import { pxToDp,DEVICE_WIDTH } from '../utils/styleKits';
import Color from '../utils/Color'

/**
 * 轮播组件
 */
export default class HeadBanner extends PureComponent {

    static contextType = NavigationContext;
    state = {
      currentBannerIndex: 0,
    };

    getCurrentImgIndex=(imageIndex) => {
        this.setState({currentBannerIndex: imageIndex});
    }

    toShowWebView = (el) => {
      this.context.navigate("ArticleDetail", el);
    }

    render() {

        const {bannerArr} = this.props;
        if (!bannerArr.length) {
          return <View style={styles.defaultBg} />;
        }
        return (
            <View style={styles.bannerContainer}>
                <Swiper
                    style={styles.imgCarousel}
                    horizontal={true}
                    loop={true}
                    autoplay={true}
                    showsPagination={false}
                    removeClippedSubviews={false} // 处理ios切换页面白屏
                    onIndexChanged={this.getCurrentImgIndex}>
                    {bannerArr.map(el => (
                        <TouchableOpacity
                            key={el.id}
                            isWithoutFeedback={true}
                            onPress={() => this.toShowWebView(el)}>
                            <Image style={styles.imgBanner} source={{ uri: el.imagePath }} />
                        </TouchableOpacity>
                    ))}
                </Swiper>
                <View style={styles.bannerHint}>
                    <Text style={styles.bannerText} numberOfLines={1}>
                        {bannerArr[this.state.currentBannerIndex].title}
                    </Text>
                    <Text style={styles.bannerText}>
                        {this.state.currentBannerIndex + 1}/{bannerArr.length}
                    </Text>
                </View>
            </View>
        )
    }
}
const imageHeight = pxToDp(200);
const styles = StyleSheet.create({
  defaultBg: {
    height: imageHeight,
    backgroundColor: Color.DEFAULT_BG,
  },
  bannerContainer: {
    height: imageHeight,
    backgroundColor: Color.DEFAULT_BG,
  },
  imgCarousel: {
    height: imageHeight,
  },
  imgBanner: {
    width: DEVICE_WIDTH,
    height: imageHeight,
    resizeMode: 'stretch',
  },
  bannerHint: {
    flex: 1,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: pxToDp(20),
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: pxToDp(44),
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  bannerText: {
    color: Color.WHITE,
    fontSize: pxToDp(16),
  },
});