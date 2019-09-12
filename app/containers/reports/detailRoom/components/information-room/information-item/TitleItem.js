import {StyleSheet,View,Text,TouchableOpacity} from 'react-native'
import React,{PureComponent} from 'react'
import {Fonts,Colors} from '../../../../../../themes'
import  PropType from 'prop-types'


export default class TitleItem extends PureComponent{
	static propTypes = {
		rightComponent:PropType.element,
		hasDividerBottom:PropType.bool,
		hasDividerTop:PropType.bool
	}
	static defaultProps={
		title:"",
		hasDividerBottom:false,
		hasDividerTop:true,
	}
	renderDivider=()=>{
		const {
			dividerStyle,
		} = this.props
		return (
			<View style ={[styles.divider,dividerStyle]}/>
		)
	}
	renderDividerTop=()=>{
		const {
			hasDividerTop
		} = this.props
		if (!hasDividerTop) return <View />
		return (this.renderDivider())
	}
	renderDividerBottom=()=>{
		const {
			hasDividerBottom
		} = this.props
		if (!hasDividerBottom) return <View />
		return (this.renderDivider())
	}
	render(){
		const {
			style,
			title,
			titleStyle,
			children,
			bodyStyle,
			rightContainerStyle,
			leftContainerStyle,
			rightComponent,
			childrenContainerStyle,
			onPress,
		} = this.props
		return (
			<View style={[styles.container,style]} >
				{this.renderDividerTop()}
				<TouchableOpacity onPress = {onPress} activeOpacity={0.8}>
					<View style = {[styles.bodyContainer,bodyStyle]}>
						<View style={[styles.leftContainer,leftContainerStyle]}>
							<Text style={[styles.textLeft,titleStyle]}>{title}</Text>						
						</View>
						<View style = {[styles.rightContainer,rightContainerStyle]}>
							{rightComponent}
						</View>
					</View>
				</TouchableOpacity>
				<View style = {[styles.childrenContainer,childrenContainerStyle]}>
				{children}
				</View>
	           {this.renderDividerBottom()}
	        </View>
		)
	}

}

const styles = StyleSheet.create({
	bodyContainer:{
        flex: 1,
        flexDirection: 'row',
		justifyContent: 'center',
		paddingTop: 18,
        paddingBottom:18,
	},
	childrenContainer:{
		paddingLeft:16,
		paddingRight:16,
	},
    textLeft: {
        fontSize: Fonts.size.medium,
        fontFamily: Fonts.type.light,
        color: Colors.black
    },
	rightContainer:{
		flex:1,
		alignItems:'flex-end'
	},
	leftContainer:{
		flex:5,
		alignItems:'flex-start'
	},
	container:{

	},

    divider:{
        height:0.5 , 
        backgroundColor:Colors.divider
      },
})
