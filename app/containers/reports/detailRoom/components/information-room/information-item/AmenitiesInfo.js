import React, { PureComponent } from 'react'
import {View,StyleSheet} from 'react-native'

import {Colors} from '../../../../../../themes';
import FeatureItem from './FeatureItem';

export default class AmenitiesItem extends PureComponent {

    renderFeatures = ()=>{
        const data = this.props.featureChildren
        return data.filter(element=>{
            return element.enabled
        }).map(
            (element,index)=>
            {
                return (
                    <FeatureItem 
                        titleStyle = {styles.title}
                        key ={index}
                        index = {index}
                        featureData = {element}
                    />    
                )
            }

        )
    }
    render() {
        if (!this.props.featureChildren) return <View />
        return (
            <View> 
                {this.renderFeatures()}
                <View style = {styles.underlined}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    underlined:{
        height:0.5 , 
        marginLeft:24,
        marginRight:24,
        backgroundColor:Colors.divider
      },
})