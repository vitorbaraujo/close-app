import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Body, Right } from 'native-base';

import moment from 'moment';
import { goTo } from '../../utils/NavigationUtils';
import { getDuration } from '../../utils/CycleUtils';
import { humanize, formatted } from '../../utils/DateUtils';

export default class Cycles extends Component {
  _renderItem = ({ item }) => {
    const beer = this.state.beers.find(b => b.id === item.beer) || {};
    let cycle = item || {};

    cycle = {
      ...cycle,
      beer,
    };

    return (
      <Card>
        <CardItem
          header
          button
          onPress={() => goTo(this.navigation, 'Cycle', { cycle })}
        >
          <Body>
            <CText text={cycle.beer.name} />
          </Body>
        </CardItem>
        <CardItem
          style={{ paddingTop: 0 }}
          button
          onPress={() => goTo(this.navigation, 'Cycle', { cycle })}
        >
          <Body>
            <CText
              subtitle
              text={`${getDuration(cycle)}${getDuration(cycle) ? ' de duração' : ''}`}
            />
            <CText
              text={`${cycle.beer_count} garrafa${cycle.beer_count == 1 ? '' : 's'}`}
            />
          </Body>
          <Right>
            <CText text={formatted(moment(cycle.start_time))} />
            <CText
              subsubtitle
              text={humanize(moment(cycle.start_time).toDate())}
            />
          </Right>
        </CardItem>
      </Card>
    );
  }

  render() {
    <FlatList
      data={cycles}
      extraData={this.state}
      keyExtractor={this._keyExtractor}
      renderItem={this._renderItem}
    />
  }
}