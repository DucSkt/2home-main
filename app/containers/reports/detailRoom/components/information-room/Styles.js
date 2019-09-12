import { StyleSheet } from 'react-native';
import {Colors,Fonts,Metrics} from '../../../../../themes';

export default styles = StyleSheet.create({
     container:{
        flex:1, 
        flexDirection:'column',
        marginBottom: 15, 
        backgroundColor:Colors.backgroundApp
    },
    textinformation:{
        color: Colors.black
    },
    parameterContainer:{ 
        flexDirection:'row' , 
        justifyContent:'center', 
        alignItems:'center' ,
        flex:3,
        marginTop:32,
        marginBottom:32,
        marginRight:16
    },
    iconNextText:{
        width:30 , 
        height:30 , 
    },
    parameterRow:{
        flex:1,
        marginLeft:16,
        flexDirection:"row",
        justifyContent:'center', 
        alignItems:'center' ,
    },
    textNextIcon:{
        marginLeft: 10,
        fontSize: Fonts.size.medium,
        fontFamily: Fonts.type.base,
        color: Colors.black
    },
    textAmenities:{
        color: Colors.black
    },
    viewAllService:{
        flexDirection:'column', 
        marginTop:30
    },
    textService:{
        marginLeft:16,
        marginRight:16,
        fontSize: Fonts.size.h6,
        fontFamily: Fonts.type.semiBold,
        color: Colors.black
    }, 
    underlined:{
        height:0.5 , 
        marginTop:16, 
        marginBottom:16,
        backgroundColor:Colors.divider
      },
    viewRentalStatus:{
        flexDirection:'column',
        marginTop: 20,
        paddingLeft:16,
        paddingRight:16
    },
    textRentalStatus:{
        marginBottom:4,
        fontSize: Fonts.size.h6,
        fontFamily: Fonts.type.bold,
        color: Colors.black
    },
    rightComponentContainer:{
        flexDirection:'row',
        flex:1
    },
    icon: {
        width: Metrics.rightItemIcon.medium,
        height: Metrics.rightItemIcon.medium,
        marginLeft:8
    },
    textRight:{
        fontSize: Fonts.size.medium,
        fontFamily: Fonts.type.light,
        color: Colors.black
    }
})