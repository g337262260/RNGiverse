
 import React, {PureComponent} from 'react';
 import {
   View,
   FlatList,
   RefreshControl,
   StyleSheet,
   TouchableWithoutFeedback,
 } from 'react-native';
 import PropTypes from 'prop-types';
 import Color from '../utils/Color';
 import {DEVICE_HEIGHT, pxToDp} from '../utils/styleKits';
 import Icon from 'react-native-vector-icons/Ionicons';
 import {i18n} from '../utils/Utility';
 
 
 /**
  * FlatList通用组件
  */
 class CommonFlatList extends PureComponent {
   constructor(props) {
     super(props);
   }
 
  
 
   render() {
     console.log(this.props);
     return (
       <View style={styles.container}>
         <FlatList
           {
             ...this.props
           }
         />
       </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor:"#ccc"
   },
 });
  
 export default CommonFlatList;
 