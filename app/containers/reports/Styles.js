import {StyleSheet} from 'react-native'
import Colors from '../../themes/Colors'
import Fonts from '../../themes/Fonts'

export default StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        width:220,
        height:36,
        backgroundColor:Colors.orange
    },
    textButton:{
        fontSize:Fonts.size.medium,
        color:Colors.white,
        fontWeight:"bold"
    },
    iconButton:{
        tintColor:Colors.white
    },
    lineContainer:{
        flexDirection:'row',
        height:36,
        width:220,
        alignItems:'center',
        justifyContent:'center',
        marginTop:16,
        marginBottom:16,
    },
    line:{
        backgroundColor:Colors.frost,
        height:2,
        width:90
    },
    textMiddleLine:{
        marginRight:8,
        marginLeft:8,
        fontWeight:"bold",
        fontSize:Fonts.size.regular,
        color:Colors.frost
    }
})