import React, { Component } from 'react';
import { Text, FlatList, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';

import styles from './styles';
import CustomCard from '../../HomeCards/CustomCard';
import { Colors } from '../../../themes';
import RowView from '../../RowView';
import { StackBar } from '../../charts';
import Button from '../../button';
import I18n from '../../../localization';
import { currencyTranslate } from '../../../common/currencyTranslate';

export default class CardWithListItems extends Component {
  static defaultProps = {
    stackStyleConfig: {},
    detailStyle: {},
    dateLineStyle: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      dateIcon: props.dateExpandIcon,
      isExpanding: false
    };
  }

  dateLineOnPress = () => {
    const { dateExpandIcon, dateCollapseIcon } = this.props;
    this.setState({
      dateIcon: this.state.isExpanding ? dateExpandIcon : dateCollapseIcon,
      isExpanding: !this.state.isExpanding
    });
  };

  rightDetailIconOnPress = id => {
    this.props.itemOnPress(id);
  };

  renderDateLineTitle = (date, leftValue, rightValue) => (
    <RowView >
      <Text
        style={[
          styles.dateLineTitleStyle,
          this.props.dateLineStyle.nameTextStyle
        ]}
      >
        {date}:
      </Text>
      <Text
        style={[
          styles.dateLineDetailStyle,
          this.props.dateLineStyle.contentTextStyle
        ]}
      >
        {currencyTranslate(leftValue, this.props.lang, I18n.t('currency'))} / {currencyTranslate(rightValue, this.props.lang, I18n.t('currency'))}
      </Text>
    </RowView>
  );

  renderExpendData = data => (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={this.renderExpendDataItem}
    />
  );

  renderExpendDataItem = ({ item }) => (
    <ListItem
      title={this.renderExpendDataItemTitle(item)}
      subtitle={this.renderExpendDataItemSubTitle(item)}
      rightIcon={
        <Button onPress={() => this.rightDetailIconOnPress(item.id)}>
          {this.props.detailIcon}
        </Button>
      }
    />
  );

  renderExpendDataItemTitle = item => (
    <RowView justifyContent="space-between">
      <Text
        style={[styles.detailNameText, this.props.detailStyle.nameTextStyle]}
      >
        {item.name}:
      </Text>
      <Text
        style={[
          styles.detailValueText,
          this.props.detailStyle.contentTextStyle
        ]}
      >
        {currencyTranslate(item.current, this.props.lang, I18n.t('currency'))} / {currencyTranslate(item.total, this.props.lang, I18n.t('currency'))}
      </Text>
    </RowView>
  );

  renderExpendDataItemSubTitle = item => {
    
    console.log('renderExpendDataItemSubTitle: item ',item);
    
    return (
      <StackBar
        leftStackValue={item.current}
        rightStackValue={item.total}
        stackStyle={[{ padding: 2 }, this.props.stackStyleConfig.stackStyle]}
        leftStackStyle={[
          {
            borderBottomLeftRadius: 3,
            borderTopLeftRadius: 3
          },
          this.props.stackStyleConfig.leftStackStyle
        ]}
        rightStackStyle={[
          {
            borderBottomRightRadius: 3,
            borderTopRightRadius: 3
          },
          this.props.stackStyleConfig.rightStackStyle
        ]}
        leftStackBackgroundColor={
          this.props.stackStyleConfig.leftStackBackgroundColor ||
          Colors.activeSubtitle
        }
      />
    )
  };

  render() {
    const {
      title,
      style,
      titleStyle,
      date,
      data,
      dateLeftValue,
      dateRightValue,
      dividerStyle,
      stackStyleConfig,
      dateLineDetailStyle,
      detailStyle
    } = this.props;

    const dateLineTitle = this.renderDateLineTitle(
      date,
      dateLeftValue,
      dateRightValue
    );

    const expendData = this.state.isExpanding
      ? this.renderExpendData(data)
      : null;

    return (
      <CustomCard
        title={title}
        style={[styles.container, style]}
        titleStyle={[styles.titleStyle, titleStyle]}
        dividerStyle={
          dividerStyle || {
            backgroundColor: Colors.divider,
            marginBottom: 0
          }
        }
      >
        <ListItem
          title={dateLineTitle}
          rightIcon={this.state.dateIcon}
          style={{ backgroundColor: 'black' }}
          onPress={this.dateLineOnPress}
        />
        {expendData}
      </CustomCard>
    );
  }
}
