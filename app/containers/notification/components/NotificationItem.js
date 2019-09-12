import React, { Component } from "react";
import { Text, StyleSheet, View, AlertIOS, TouchableOpacity, Image, Dimensions } from "react-native";
import moment from 'moment';
import I18n from '../../../localization'
import { Metrics, Images, Fonts, Colors } from '../../../themes'
import CustomCard from '../../../components/HomeCards/CustomCard'
import Swipeout from "react-native-swipeout";
import DeleteComponent from "./DeleteComponent";
import NotifyConstant from '../Constant'

export default class NotificationItem extends Component {
    state ={
        isExpandedText:false,
    }
    onClickItem=()=>{
        this.props.onPressItem(this.props.item,this.props.index)

        this.setState(oldState => ({isExpandedText:!oldState.isExpandedText}))  
    }
    onDetete =()=>{
        this.props.onDeleteItem(this.props.item,this.props.index)
    }
    
    renderDeleteComponent =()=>{

        return ( <DeleteComponent 

            textButton={I18n.t("delete")}/>)
    }
    render() {
        //status:Read or New
        const {content,createdDate,notificationId,title,type,status} = this.props.item
        const date = moment(createdDate).format("MMM DD YYYY, HH:mmA")
        const icon = type === NotifyConstant.typeContract ?Images.renew:Images.withdraw // Contract or Payment
        const iconSize = type === NotifyConstant.typeContract ?26:Metrics.icons.medium
        const contentNormalSetting = {
            numberOfLines: 2,
            ellipsizeMode:'tail'
        }
        const contentExpandSetting ={

        }
        const backgroundColor = status === NotifyConstant.statusRead?Colors.silver:Colors.white // read || unread
        const contentSetting = this.state.isExpandedText?contentExpandSetting:contentNormalSetting

        const settingSwipe = {
            backgroundColor: 'transparent',
            autoClose:true,
            right:[
                {
                    onPress:this.onDetete,
                    backgroundColor:"transparent",
                    component:this.renderDeleteComponent()
                }
            ]
        }
        return (
            <Swipeout {...settingSwipe}>
                <TouchableOpacity activeOpacity={0.9} onPress={this.onClickItem}>
                    <CustomCard
                        title={title}
                        titleStyle={[styles.title, Fonts.style.regularSemiBold]}
                        style={[styles.container,{backgroundColor:backgroundColor}]}>
                        <View style={styles.contentContainer}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.content, Fonts.style.mediumBase]} {...contentSetting} >{content}</Text>
                                <Text style={[styles.date, Fonts.style.small]}>{date}</Text>
                            </View>
                            <Image style={[styles.image,{width:iconSize,height:iconSize}]} resizeMode="stretch" source={icon} />
                        </View>
                    </CustomCard>
                </TouchableOpacity>
            </Swipeout>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    title: {

    },
    contentContainer: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        marginLeft:30
    },
    content: {

    },
    date: {
        marginTop: 8,
        color: Colors.steel
    }
})