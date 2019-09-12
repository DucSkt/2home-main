import React, { Component } from "react";
import { View, Text, Alert, Image } from "react-native";
import { connect } from "react-redux";
import { Divider } from "react-native-elements";
import styles from "./Styles";
import ImageSource from "../../themes/Images";
import I18n from "../../localization";
import TextButton from "../../components/button/index";
import { Fonts, Images } from "../../themes";

class ReportsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({

    headerTitle:()=>{
       return (
           <Text style = {Fonts.style.headerTitle}>
             {I18n.t("reports")}
           </Text>
       )
     },
    headerBackTitle: null

  });

  propertiesOnpress = () => {
    this.props.navigation.navigate("Properties");
  };

  tenantsOnPress = () => {
    this.props.navigation.navigate("Tenants");
  };

  render() {
    return (
      <View style={styles.container}>
        <TextButton
          imageSource={ImageSource.properties}
          imageStyle={styles.iconButton}
          style={styles.button}
          onPress={this.propertiesOnpress}
        >
          <Text style={[Fonts.style.buttonReport, styles.textButton]}>
            {I18n.t("properties")}
          </Text>
        </TextButton>
        <View style={styles.lineContainer}>
          <Divider style={styles.line} />
          <Text style={styles.textMiddleLine}>{I18n.t("or")}</Text>
          <Divider style={styles.line} />
        </View>
        <TextButton
          imageSource={ImageSource.tenants}
          imageStyle={styles.iconButton}
          style={styles.button}
          onPress={this.tenantsOnPress}
        >
          <Text style={[Fonts.style.buttonReport, styles.textButton]}>
            {I18n.t("tenants")}
          </Text>
        </TextButton>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.Language
  }
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps
)(ReportsScreen);
