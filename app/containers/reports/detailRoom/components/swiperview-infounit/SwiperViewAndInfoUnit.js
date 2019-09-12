import React, { PureComponent } from "react";
import { View, Text, Dimensions, Image } from "react-native";
import { connect } from "react-redux";

import Styles from "./Styles";
import _ from "lodash";
import I18n from "../../../../../localization";
import { Images, Fonts } from "../../../../../themes";
import Swiper from "react-native-swiper";
import GalleryImage from "./gallery-image/GalleryImage";
import { currencyTranslate } from "../../../../../common/currencyTranslate";
class SwiperViewAndInfoUnit extends PureComponent {
  renderGallaryNull = () => {
    const height = Dimensions.get("window").height;
    const width = Dimensions.get("window").width;
    return (
      <Image style={{ width, height: height / 5 }} source={Images.picture} />
    );
  };

  renderGallary = gallery => {
    if (!gallery || gallery.length === 0) return this.renderGallaryNull();
    const height = Dimensions.get("window").height;
    const width = Dimensions.get("window").width;
    return (
      <View style={Styles.swiper}>
        <Swiper
          height={height / 4}
          autoplayDirection={true}
          autoplay={true}
          autoplayTimeout={3}
          paginationStyle={{ bottom: 4 }}
          showsButtons={false}
        >
          {gallery.map((element, index) => {
            return <GalleryImage uri={element} key={index} />;
          })}
        </Swiper>
      </View>
    );
  };
  renderInforUnit = data => {
    const { address, views, cost, title } = data;
    return (
      <View style={Styles.infoUnit}>
        <View style={Styles.moneyPerMonth}>
          <Text style={Styles.textmoneyPerMonth}>
            {currencyTranslate(cost, this.props.lang, I18n.t("currency"))}/{" "}
            {I18n.t("month")}
          </Text>
          <View style={Styles.totalView}>
            <Text style={Styles.texttotalView}>
              {views} {I18n.t("views")}
            </Text>
          </View>
        </View>

        <Text style={[Styles.textAddressBlock, Fonts.style.h3Bold]}>
          {title}
        </Text>
        <Text style={[Styles.textAddressRoom, Fonts.style.mediumItalic]}>
          • {address}
        </Text>
      </View>
    );
  };

  render() {
    if (!this.props.data) return <View />;
    const { gallery } = this.props.data;

    return (
      <View style={Styles.container}>
        {this.renderGallary(gallery)}
        {this.renderInforUnit(this.props.data)}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  data: state.RoomDetailReducer.data,
  lang: state.Language,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SwiperViewAndInfoUnit);
