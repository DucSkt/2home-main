import {StyleSheet,View,Text} from 'react-native'
import React from 'react'
import {Fonts,Colors} from '../themes'
export default TextWithSubcribe = (props)=>{
	return (
		<View style={[styles.container,props.style]} >
           <Text style={[styles.title,props.titleStyle]}>{props.title}</Text>
           <Text style={[styles.subcribe,props.subcribeStyle]}>{props.subcribe}</Text>
        </View>
	)
}

const styles = StyleSheet.create({
	title:{
		fontSize: Fonts.size.medium-1,
    	color: Colors.darkGray,
    	fontFamily: Fonts.type.base,
	},
	subcribe:{
		marginTop:6,
	    fontSize: Fonts.size.regular,
	    fontFamily: Fonts.type.semiBold,
	    color: Colors.black
	},
	container:{

	},

})
