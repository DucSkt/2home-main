import { StyleSheet } from 'react-native';
import {Colors,Fonts} from '../../../../../themes';
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.backgroundApp,
        flexDirection: 'column'
    },
    swiper:{
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
    },
    infoUnit:{ 
        flex:1 , 
        flexDirection:'column' , 
        paddingTop:16,
        paddingLeft:16,
        paddingRight:16,
    },
    moneyPerMonth:{ 
        flexDirection:'row' , 
        justifyContent:'flex-start'
    }, 
    textmoneyPerMonth:{
        fontSize: Fonts.size.h6,
        fontFamily: Fonts.type.bold,
        color: Colors.black
    },
    totalView:{
        position: 'absolute', 
        right: 0,
        top:0,
        bottom: 0
    },
    texttotalView:{ 
        fontSize: Fonts.size.medium,
        fontFamily: Fonts.type.bold,
        color: Colors.lightGray
    },
    textAddressBlock:{
        fontSize: Fonts.size.instructionTitle,
        fontFamily: Fonts.type.bold,
        marginVertical: 4,
        color: Colors.blacks
    },
    textAddressRoom:{
        color: Colors.gray100
    },
    underlined:{ 
        height:0.5, 
        width:null , 
        backgroundColor: Colors.inActiveSubtitle , 
        marginTop:16
    },
})