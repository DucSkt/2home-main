import React, { Component } from "react";
import { Alert, Text, View, TouchableOpacity, Image } from "react-native";
import { Card, Avatar } from "react-native-elements";
import { itemStyles } from "./Styles";
import I18n from "../../../../localization";
import { Images, Fonts, Metrics, Colors } from "../../../../themes";
import TextIcon from "./TextIcon";
import { currencyTranslate } from "../../../../common/currencyTranslate";
import Constants from "../../../../common/Constants";
import CallMethod from "react-native-phone-call";
import _ from "lodash";
export default class RoomItem extends Component {
  onPressItem = () => {
    const { item, index } = this.props;
    this.props.onPressItem(item, index);
  };

  render() {
    const { item, lang = Constants.defaultLanguage } = this.props;
    const {
      address,
      bathRooms,
      bedRooms,
      cost,
      imageUrl,
      occupied,
      squareMeters,
      title,
      unitId,
      manager,
      views,
    } = item;

    const colorBanner = occupied ? Colors.green : Colors.red;
    const bannerText = occupied ? I18n.t("occupy") : I18n.t("vacant");
    const bigImage = imageUrl ? { uri: imageUrl } : Images.picture;
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={this.onPressItem}>
        <Card containerStyle={[itemStyles.container, this.props.style]}>
          <View style={itemStyles.containerImage}>
            <Image style={{ flex: 1 }} source={bigImage} />
            <View
              style={[
                itemStyles.containerBanner,
                { backgroundColor: colorBanner },
              ]}
            >
              <Text style={[Fonts.style.smallBold, itemStyles.bannerText]}>
                {bannerText}
              </Text>
            </View>
          </View>
          <View style={itemStyles.containerInformation}>
            <View style={itemStyles.containerTitle}>
              <Text style={[Fonts.style.headerTitle, itemStyles.title]}>
                {title || "---"}
              </Text>
              <Text style={[Fonts.style.smallSemiBold, itemStyles.viewAmount]}>
                {views} {I18n.t("views")}
              </Text>
            </View>
            {/* <Text
              style={[Fonts.style.smallItalic, itemStyles.address]}
            >
              • {address}
            </Text> */}
            <View style={itemStyles.containerRoomInfo}>
              <View style={itemStyles.containerRoomInfoDetail}>
                <TextIcon
                  text={`${squareMeters} m2`}
                  iconSource={Images.size}
                />
                <TextIcon
                  text={`${bathRooms}`}
                  iconSource={Images.bathroom}
                  style={{ marginLeft: 12 }}
                  imageStyle={{ alignSelf: "flex-start" }}
                />
                <TextIcon
                  text={`${bedRooms}`}
                  iconSource={Images.bedroom}
                  style={{ marginLeft: 12 }}
                  imageStyle={{ alignSelf: "flex-start" }}
                />
              </View>
              <Text style={[itemStyles.price, Fonts.style.regularBold]}>
                {currencyTranslate(cost, lang, I18n.t("currency"))}
              </Text>
            </View>
            {this.renderManagerInfo(manager)}
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
  renderManagerInfo = manager => {
    if (!manager || _.isEmpty(manager)) return null;
    const name =
      manager.name && manager.name.length > 0
        ? manager.name
        : I18n.t("noneName");
    const phone =
      manager.phone && manager.phone.length > 0
        ? manager.phone
        : I18n.y("nonePhoneNumber");
    return (
      <View style={itemStyles.containerUserInfo}>
        <Avatar
          avatarStyle={{ backgroundColor: Colors.white }}
          width={Metrics.avatars.medium}
          height={Metrics.avatars.medium}
          rounded
          source={Images.user}
        />
        <View style={itemStyles.containerUser}>
          <Text style={[Fonts.style.mediumBold, itemStyles.userName]}>
            {name}
          </Text>
          <Text style={[Fonts.style.small, itemStyles.phoneNumber]}>
            {phone}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={this.onPressCall}>
          <Image style={itemStyles.callButton} source={Images.call} />
        </TouchableOpacity>
      </View>
    );
  };
  onPressCall = () => {
    const { manager } = this.props.item;
    if (!manager.phone && manager.phone.length < 0) return;
    const cancelText = I18n.t("cancel");
    const callText = I18n.t("call");
    Alert.alert(
      manager.name || I18n.t("noneName"),
      manager.phone,
      [
        { text: cancelText, onPress: () => {}, style: "cancel" },
        {
          text: callText,
          onPress: () => {
            this.onCall(manager.phone);
          },
        },
      ],
      //{ cancelable: true }
    );
  };
  onCall = phoneNumber => {
    const args = {
      number: phoneNumber, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    CallMethod(args).catch(error =>
      Alert.alert(I18n.t("error"), error.message),
    );
  };
}
