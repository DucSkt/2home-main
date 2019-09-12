import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '../../themes';
let width = Dimensions.get("window").width;
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white
    },
    emptyView: {
        flex: 1
    },
    body: {
        flex: 3,
        flexDirection: 'column'
    },
    imageView: {
        flex: 1.3,
        backgroundColor: Colors.yellow,
        padding: 10
    },
    image: {
        flex: 1,
        width: null
    },
    placeholder: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 8
    },
    textNoInternet: {
        fontSize: Fonts.size.regular,
        color: Colors.steel
    },
    textCheckInternet: {
        fontSize: Fonts.size.regular,
        color: Colors.steel, marginTop: 5
    },
    button: {
        width: width / 1.3,
        backgroundColor: Colors.white,
        marginTop: 25,
        borderWidth: 1,
        borderColor: Colors.orange,
        paddingBottom: 10,
        paddingTop: 10
    },
    textButton: {
        fontSize: Fonts.size.regular,
        color: Colors.orange
    }

})