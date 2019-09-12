import { StyleSheet } from 'react-native'
import { Metrics , Fonts , Colors} from '../../themes';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    textHeader: {
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size.h6 - 1,
        color: Colors.black
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: Colors.white
    },
    viewUserName: {
        paddingVertical: 20,
        marginBottom: 4,
        marginRight: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textUserName: {
        fontSize: Fonts.size.h3,
        fontFamily: Fonts.type.semiBold,
        color: Colors.black,
    },

    logoutContainer: {
        width: 230,
        height: 80,
        backgroundColor: Colors.white,
        borderRadius: 3,
        flexDirection: 'column',
    },
    logoutText: {
      fontSize: 13,
      fontFamily: Fonts.type.base,
      color: Colors.black,
      marginTop: 10,
      marginLeft: 10
    },
    buttonsContainer: {
      width: 230,
      marginTop: 10,
      height: 30,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    cancelButton: {
      fontSize: 13,
      fontFamily: Fonts.type.base,
      color: Colors.black
    },
    confirmButton: {
      fontSize: 13,
      fontFamily: Fonts.type.base,
      color: Colors.orange
    },

})
