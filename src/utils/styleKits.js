import { PixelRatio, Dimensions, Platform, StatusBar } from "react-native";
//手机中元素的宽度 = 手机屏幕 * 元素宽度/设计稿

export let DEVICE_WIDTH = Dimensions.get('window').width;
export let DEVICE_HEIGHT = Dimensions.get('window').height;
export const isAndroid = Platform.OS === 'android';

/**
 * 将px转成dp
 * @param {number} elePx 元素的高度或者宽度
 */
export const pxToDp = (elePx) => {
    return DEVICE_WIDTH*elePx/375
}

// 是否iphoneX系列（iPhone X, XS, XS Max & XR）
export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (dimen.height === 812 ||
        dimen.width === 812 ||
        (dimen.height === 896 || dimen.width === 896))
    );
  }
  
  // 获取状态栏高度
  export function getStatusBarHeight() {
    return Platform.select({
      ios: ifIphoneX(44, 20),
      android: StatusBar.currentHeight,
    });
  }
  
  // 适配iphoneX屏幕底部距离
  export function getBottomSpace() {
    return ifIphoneX(34, 0);
  }
  
  /**
   * 根据是否是iPhoneX返回不同的样式
   * @param iphoneXStyle
   * @param iosStyle
   * @param androidStyle
   * @returns {*}
   */
  export function ifIphoneX(iphoneXStyle, iosStyle = {}, androidStyle) {
    if (isIphoneX()) {
      return iphoneXStyle;
    } else if (Platform.OS === 'ios') {
      return iosStyle;
    } else {
      if (androidStyle) {
        return androidStyle;
      }
      return iosStyle;
    }
  }


  export function getRandowColor(){
      var r = Math.floor(Math.random()*256);
			var g = Math.floor(Math.random()*256);
			var b = Math.floor(Math.random()*256);
			var color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
			return color;
  }
