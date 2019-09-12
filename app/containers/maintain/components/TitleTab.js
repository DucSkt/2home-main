import {StyleSheet,View,Text} from 'react-native'
import React from 'react'
import {Fonts,Colors} from '../../../themes'

export default TitleTab = (props)=>{
    const {title,titleStyle,style,tintColor,focused} = props
	return (
        <View style = {[styles.container,style]}>
            <Text style ={[styles.title,{color:tintColor},titleStyle]}>
                {title}
            </Text>
        </View>

	)
}

const styles = StyleSheet.create({
	title:{
		fontSize: Fonts.size.medium-1,
    	fontFamily: Fonts.type.bold,
    },
    container:{
        padding:4
    }

})
