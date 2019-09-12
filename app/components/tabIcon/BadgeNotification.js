import React,{Component} from 'react'
import {Platform} from 'react-native'
import {Badge} from 'react-native-elements'
import {Colors,Fonts} from '../../themes'

const BadgeNotification =({style,badgeNumber,focused})=>{
    if (focused || badgeNumber === undefined || badgeNumber <= 0){
        return null
    }
    let wh = 20
    let badgeNum = badgeNumber
    if (badgeNum > 99) {
        badgeNum = "99+";
        wh = Platform.OS === "ios"?20:18
    }
    return <Badge 
            value={badgeNum} 
            textStyle={[{color: Colors.white},Fonts.style.tinyBold]}
            containerStyle={[{width:wh,height:wh,borderWidth:1.5,borderColor:"white",padding:0,backgroundColor:Colors.fire},style]}
        />
}

export default BadgeNotification