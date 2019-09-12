import React, { PureComponent } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Divider } from 'react-native-elements';

import styles from './styles';
import { Colors } from '../../../../../themes';
import CloseButton from '../../../../../components/close-button';
import RowView from '../../../../../components/RowView';
import I18n from '../../../../../localization';
import { currencyTranslate } from '../../../../../common/currencyTranslate';

export default class DetailDialog extends PureComponent {
  cancelOnPress = () => {
    this.props.backScreen();
  };

  renderItem = ({ item, index }) => (
    <View
      style={{
        marginLeft: 20,
        marginRight: 20
      }}
      key={item.name}
    >
      <RowView justifyContent="space-between">
        <Text style={[styles.text, styles.name]}>{item.name}</Text>
        <Text style={[styles.text, styles.amount]}>
          {currencyTranslate(item.amount, this.props.lang, I18n.t('currency'))}
        </Text>
      </RowView>
      <RowView justifyContent="space-between">
        <Text style={[styles.text, styles.lateTitle]}>{I18n.t('late')}</Text>
        <Text style={[styles.text, styles.lateValue]}>
          {currencyTranslate(item.late, this.props.lang, I18n.t('currency'))}
        </Text>
      </RowView>
      {index < this.props.data.data.details.length - 1 ? (
        <Divider
          style={{
            backgroundColor: Colors.divider,
            margin: 5
          }}
        />
      ) : (
        <View style={{ marginBottom: 30 }} />
      )}
    </View>
  );

  render() {
    const { title, data, titleStyle, style } = this.props;
    return (
      <View style={[styles.container, style]}>
        <CloseButton style={styles.closeButton} onPress={this.cancelOnPress} />
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <FlatList
          data={data.data.details}
          renderItem={this.renderItem}
          keyExtractor={item => item.name.toString()}
        />
        <View style={{ padding: 20 }} />
      </View>
    );
  }
}
