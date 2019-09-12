import React, { Component } from "react";
import { Alert, Text, View, TouchableOpacity, Image } from "react-native";
import { Card, Avatar } from "react-native-elements";
import { itemStyles } from "./Styles";
import I18n from "../../../../localization";
import { Metrics, Images, Fonts } from "../../../../themes";
export default class ResidenceItem extends Component {
  onPressItem() {
    const { item, index } = this.props;
    this.props.onPressItem(item, index);
  }
  render() {
    const {
      address,
      imageUrl,
      propertyId,
      title,
      unitCount,
      occupiedUnitCount,
    } = this.props.item;
    const bigImage = imageUrl ? { uri: imageUrl } : Images.picture;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={this.onPressItem.bind(this)}
      >
        <Card containerStyle={[itemStyles.container, this.props.style]}>
          <View style={itemStyles.containerImage}>
            <Image style={{ flex: 1 }} source={bigImage} />
            <View style={itemStyles.containerBanner}>
              <Text style={[Fonts.style.mediumBold, itemStyles.bannerText]}>
                {I18n.t("occupiedUnits")}: {occupiedUnitCount}/{unitCount}
              </Text>
            </View>
          </View>
          <View style={itemStyles.containerInformation}>
            <Text style={[Fonts.style.headerTitle, itemStyles.title]}>
              {title}
            </Text>
            <Text style={[Fonts.style.smallItalic, itemStyles.address]}>
              • {address}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}
