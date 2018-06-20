import React, { Component } from 'react';
import moment from 'moment';
import CText from '../commons/CText';
import { Card, CardItem, Body, Right } from 'native-base';
import { getLog } from '../../utils/Logs';
import { formattedHour } from '../../utils/DateUtils';

export default class Log extends Component {
  render() {
    let { log } = this.props;

    return (
      <Card>
        <CardItem>
          <Body>
            <CText text={getLog(log.code)} />
          </Body>
          <Right>
            <CText
              text={formattedHour(moment(log.ocurred_at))}
              style={{ fontSize: 12 }}
            />
          </Right>
        </CardItem>
      </Card>
    )
  }
}