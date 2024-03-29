import { StyleSheet } from 'react-native'
import {Colors , Fonts} from '../../../themes';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingTop: 15,
        backgroundColor: Colors.white
    },
    exitIcon: {
        height: 20,
        width: 20
    },
    userNameView: {
        marginBottom: 10,
    },
    textUserName: {
        fontFamily: Fonts.type.semiBold,
        fontSize: Fonts.size.h4,
        color: Colors.black,
    },
    button: {
        backgroundColor: Colors.orange,
        marginTop: 25,
    },
    textInButton: {
        color: Colors.white,
        fontFamily: Fonts.type.semiBold,
        fontSize: Fonts.size.medium,
        fontWeight: "800",
    },
    exitButton:{ 
        marginVertical: 0,
        marginTop: 30,
        marginLeft: 0,
        marginBottom:17
    },
    textInput:{ 
        marginVertical: 10,
    },
    viewError:{
        marginVertical: 5,
    },
    textError:{
        fontFamily: Fonts.type.base,
        fontSize: Fonts.size.small,
        color: Colors.error,
    }

})