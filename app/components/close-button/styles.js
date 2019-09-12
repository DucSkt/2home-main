import {StyleSheet } from 'react-native';
import { Metrics,Colors,Fonts } from '../../themes';

export default styles = StyleSheet.create({
    container:{
        marginTop:Metrics.closeButtonMarginTop+Metrics.statusBarHeight,
        marginBottom:Metrics.closeButtonMarginTop,
        marginLeft:16,
        padding:2
    },
    close:{
        tintColor:Colors.black,
        width:Metrics.closeSize,
        height:Metrics.closeSize
    }
})