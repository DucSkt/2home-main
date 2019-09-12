import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from '../../../../themes'

export default TextIcon = ({ iconSource, text, textStyle, imageStyle, style }) => {

    return (
        <View style={[styles.container, style]}>
            <Image style={[styles.image, imageStyle]} source={iconSource} />
            <Text style={[Fonts.style.small, textStyle, styles.text]}>{text}</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        height: Metrics.icons.small + 8,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    image: {
        marginRight: 4,
        tintColor: Colors.black,
        width: Metrics.icons.small,
        height: Metrics.icons.small,
        resizeMode: 'stretch'
    },
    text: {
        alignSelf: 'center'
    }
})
