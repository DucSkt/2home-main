import {StyleSheet } from 'react-native';
import Colors from '../../themes/Colors';
import Fonts from '../../themes/Fonts';

export default styles = StyleSheet.create({
    ButtonLogin:{
        backgroundColor: Colors.orange,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    TextLogin:{
        textAlign: 'center',
        fontSize: Fonts.size.medium,
        color: Colors.white
    }
})