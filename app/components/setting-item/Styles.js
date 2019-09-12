import { StyleSheet} from 'react-native';
import {Colors , Metrics , Fonts} from '../../themes';

export default styles = StyleSheet.create({
    container:{
        marginTop: 4,
        paddingVertical: 2,
    },
    underlined:{
        height: 0.5,
        backgroundColor: Colors.gray,
        marginBottom: 5,
    },
    itemView:{
        flexDirection: 'row',
        paddingVertical: 13
    },
    textInItem:{
        fontSize: Fonts.size.regular,
        fontFamily: Fonts.type.base,
        color: Colors.black,
        marginLeft: 40
    },
    iconView:{
        position: 'absolute',
        top: 11,
        bottom: 0,
        left: 0
    },
    icon:{
        width: Metrics.icons.medium,
        height: Metrics.icons.medium
    },
    text:{
        fontSize: Fonts.size.regular,
        fontFamily: Fonts.type.base,
        color: Colors.lightGray,
        paddingTop: 8
    }
})
