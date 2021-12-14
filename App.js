


import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Nav from './src/nav'

export class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Nav></Nav>
      </View>
    )
  }
}

export default App

