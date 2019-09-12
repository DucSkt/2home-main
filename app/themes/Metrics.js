import {Dimensions, Platform} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const {width, height} = Dimensions.get('window')
const statusBarHeight = getStatusBarHeight()

const metrics = {
    marginHorizontal: 10,
    marginVertical: 10,
    section: 25,
    baseMargin: 10,
    doubleBaseMargin: 20,
    tripleBaseMargin: 30,
    smallMargin: 5,
    tinyMargin: 3,
    doubleSection: 50,
    horizontalLineHeight: 1,
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    statusBarHeight: statusBarHeight,
    navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
    buttonRadius: 4,
    icons: {
        tiny: 15,
        small: 20,
        medium: 30,
        large: 45,
        xl: 50
    },
    images: {
        small: 20,
        medium: 40,
        large: 60,
        logoWidth: width * 0.6,
        logoHeight: width * 0.6 * 0.575,
        smallLogoWidth: width * 0.25,
        smallLogoHeight: (width * 0.25) / 2.3
    },
    avatars:{
        small:24,
        medium:36
    },
    text: {

    },
    rightItemIcon:{
        medium:18
    },
    closeSize:18,
    closeButtonMarginTop:(Platform.OS === 'ios') ? 24 : 14,
}

export default metrics
