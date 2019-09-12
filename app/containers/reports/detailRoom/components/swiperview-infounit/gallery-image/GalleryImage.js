import React, { PureComponent } from "react";
import { Image, View } from "react-native";

export default class GalleryImage extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image style={{ flex: 1 }} source={{ uri: this.props.uri }} />
      </View>
    );
  }
}
