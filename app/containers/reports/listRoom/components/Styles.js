import { StyleSheet } from 'react-native'
import Colors from '../../../../themes/Colors'
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
        shadowOpacity: 0.5,
        paddingBottom:8
    },
    containerImage: { 
        width: Metrics.screenWidth - 32, 
        height: 125,
        borderRadius: 8,
    },
    title: {
        color: Colors.black,
        flex:1
    },
    address: {
        paddingTop: 4,
        color: Colors.gray100
    },
    containerBanner: {
        paddingTop: 4,
        paddingBottom: 4,
        position: "absolute",
        bottom: 0,
        right: 0,
        width:120,
        backgroundColor: Colors.red,//green
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
        paddingTop: 8,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    containerRoomInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        paddingBottom:4
    },
    containerRoomInfoDetail: {
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
    },
    price:{
        color:Colors.red, // green
        alignSelf:'center'
    },
    containerTitle:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:6,
        paddingTop:4
    },
    viewAmount:{
        color:'#155e63'
    },
    containerUserInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerUser: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 8,
    },
    userName: {
        color: Colors.black,
    },
    phoneNumber: {
        color: Colors.lightGray,
        marginTop: 2,
    },
    callButton:{
        width:Metrics.avatars.medium,
        height:Metrics.avatars.medium,
        tintColor:"#41612B"
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

