import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';

import CustomCard from '../CustomCard';
import I18n from '../../../localization';
import { Colors } from '../../../themes';
import ContractContentItem from './ContractContentItem';

export class ContractCard extends Component {
  static defaultProps = {
    chartConfig: {}
  };

  renderContractItem = ({ item, index }) => {
    const { chartConfig, dateTextStyle, data } = this.props;
    const dataChart = [
      { x: I18n.t('new'), y: item.newContractCount },
      {
        x: I18n.t('exp'),
        y: item.expiresContractCount
      }
    ];

    if (index < data.length - 1)
      return (
        <View style={{ marginBottom: 10 }}>
          <ContractContentItem
            data={dataChart}
            date={item.month}
            chartConfig={chartConfig}
            dateTextStyle={dateTextStyle}
          />
          <Divider style={{ backgroundColor: Colors.divider, margin: 5 }} />
        </View>
      );

    return (
      <ContractContentItem
        data={dataChart}
        date={item.month}
        chartConfig={chartConfig}
        dateTextStyle={dateTextStyle}
      />
    );
  };

  render() {
    const { title, data, style } = this.props;
    const flatlistContract = data ? (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderContractItem}
        data={data}
      />
    ) : (
      <Text>Loading...</Text>
    );
    return (
      <CustomCard
        title={title}
        style={style}
        dividerStyle={{
          backgroundColor: Colors.divider
        }}
      >
        {flatlistContract}
      </CustomCard>
    );
  }
}

export default ContractCard;
