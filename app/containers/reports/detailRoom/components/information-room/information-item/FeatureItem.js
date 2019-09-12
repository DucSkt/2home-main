import {StyleSheet,View,Image,LayoutAnimation} from 'react-native'
import React,{PureComponent} from 'react'
import {Fonts,Colors,Images, Metrics} from '../../../../../../themes'
import TitleItem from './TitleItem'
export default class FeatureItem extends PureComponent{
    
    state ={
        isPress:false
    }

    onPressRight =()=>{
        LayoutAnimation.easeInEaseOut();
        this.setState(oldState=>({isPress:!oldState.isPress}))
    }

    renderRightIcon = ()=>{
        const {children} = this.props.featureData
        if (children.length <= 0) return (<View />)
        const icon = this.state.isPress?Images.angle_arrow_up:Images.angle_arrow_down
        return (
            <View style={styles.imageRight} >
                <Image style={styles.icon} source={icon}/>
            </View>
        )
    }

    renderChildren = ()=>{
        if (!this.state.isPress) return <View/>
        const {children} = this.props.featureData
        
        return children.filter(element=>{
            return element.enabled
        }).map((element,index)=>{
            return (
                <TitleItem 
                    key = {index}
                    style = {{paddingLeft:4,paddingRight:4}}
                    bodyStyle ={{paddingTop:0}}
                    title = {element.description}
                    hasDividerBottom ={false}
                    hasDividerTop ={false}
                />
            )
        })
    }
	render(){
		const {
            index,
            featureData
        } = this.props     
        if (!featureData) return <View/>
        const backgroundColor = this.state.isPress?Colors.steel:Colors.white
        const hasDividerTop = (index === 0) || this.state.isPress ? false:true
        
		return (
			<View style={[styles.container]} >
                <TitleItem
                    hasDividerBottom ={false}
                    hasDividerTop = {hasDividerTop}
                    onPress={this.onPressRight}
                    childrenContainerStyle ={{paddingLeft:32,paddingRight:32}}
                    bodyStyle = {{backgroundColor,paddingLeft:24,paddingRight:16}}
                    title = {featureData.description}
                    rightComponent = {this.renderRightIcon()}
                    dividerStyle = {{marginLeft:24,marginRight:24}}
                >
                    {this.renderChildren()}
                </TitleItem>
	        </View>
		)
	}

}

const styles = StyleSheet.create({
    title: {
        flex:5,
        fontSize: Fonts.size.medium,
        fontFamily: Fonts.type.light,
        color: Colors.black
    },
    imageRight: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    icon: {
        padding:4,
        width: Metrics.rightItemIcon.medium,
        height: Metrics.rightItemIcon.medium,
        marginLeft:4
    },
    container:{
        paddingLeft:2,
        paddingRight:2
    }

})
