import { StyleSheet } from 'react-native'
import Colors from '../../../../themes/Colors'
import Fonts from '../../../../themes/Fonts'
import { Dimensions } from 'react-native'
import Metrics from '../../../../themes/Metrics'
export const itemStyles = StyleSheet.create({
    container: {
        width:  Metrics.screenWidth - 32,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.5
    },
    containerImage: { 
        width: Metrics.screenWidth - 32, 
        height: 125,
        borderRadius: 8,
    },
    title: {
        color: Colors.black
    },
    address: {
        paddingTop: 4,
        color: Colors.gray100
    },
    containerBanner: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 4,
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: Colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: -1
        },
        shadowRadius: 2,
        shadowOpacity: 0.5
    },
    bannerText: {
        color: Colors.white,
    },
    containerInformation: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom:16
    }
})
export const flatListStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:8
    },
    flatList: {
        flex: 1
    }
})

