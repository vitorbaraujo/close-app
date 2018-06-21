import React, { Component } from 'react';
import { Card, CardItem, Body, Right, Badge } from 'native-base'
import CText from '../commons/CText';
import { getDuration } from '../../utils/CycleUtils';
import { humanize, formatted } from '../../utils/DateUtils';
import { white, grey } from '../../utils/Colors';
import { goTo } from '../../utils/NavigationUtils';

import moment from 'moment';

export default class CycleCard extends Component {
  render() {
    let { cycle, navigation } = this.props;

    let beerCount = Math.max(cycle.beer_count, cycle.logs.filter(l => l.code === 2).length)

    return (
      <Card>
        <CardItem
          header
          button
          onPress={() => goTo(navigation, 'Cycle', { cycle, beer: cycle.beer })}
        >
          <Body>
            {
              cycle.beer ?
                <CText text={`${cycle.beer.name} (${cycle.beer.type_name})`} />
                :
                <CText text="Sem cerveja selecionada" style={{ color: grey }} />
            }
          </Body>
          <Right>
            <Badge
              success={cycle.end_time === null}
            >
              <CText
                text={cycle.end_time ? 'Finalizado' : 'Em andamento'}
                style={{ color: white }}
              />
            </Badge>
          </Right>
        </CardItem>
        <CardItem
          style={{ paddingTop: 0 }}
          button
          onPress={() => goTo(navigation, 'Cycle', { cycle })}
        >
          <Body>
            <CText
              subtitle
              text={`${getDuration(cycle)}${getDuration(cycle) ? ' de duração' : ''}`}
            />
            <CText
              text={`${beerCount} garrafa${beerCount == 1 ? '' : 's'}`}
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
    )
  }
}