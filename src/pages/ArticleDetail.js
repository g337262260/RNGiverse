import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { WebView } from 'react-native-webview';
import TabBar from '../components/TabBar'


/**文章详情页*/
export default class ArticleDetail extends Component {



    render() {

        const { title, url } = this.props.route.params

        return (
            <View style={{ flex: 1 }}>
                <TabBar title={title} />
                <WebView
                    javaScriptEnabled={true}
                    androidHardwareAccelerationDisabled={false}
                    allowFileAccessFromFileURLs={true}
                    allowUniversalAccessFromFileURLs={true}
                    allowFileAccess={true}
                    allowsFullscreenVideo={false}
                    saveFormDataDisabled={true}
                    cacheEnabled={true}
                    keyboardDisplayRequiresUserAction={false}
                    allowsLinkPreview={true}
                    mixedContentMode={'always'}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    webContentsDebuggingEnabled={true}
                    nativeConfig={{ props: { webContentsDebuggingEnabled: true } }}
                    style={{ flex: 1, backgroundColor: "#eee" }}
                    source={{ uri: url }}
                    scalesPageToFit={false}
                />
            </View>
        )
    }
}
