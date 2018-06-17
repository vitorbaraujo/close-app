import React from 'react';
import { FlatList } from 'react-native';
import { Container, Card, CardItem, Body, Right } from 'native-base';
import { getLog } from '../../utils/Logs';
import moment from 'moment';
import CText from '../commons/CText';
import { formattedHour } from '../../utils/DateUtils';

export default class CycleHistory extends React.Component {
  static navigationOptions = {
    header: null
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item }) => {
    return (
      <Card>
        <CardItem>
          <Body>
            <CText text={getLog(item.code)} />
          </Body>
          <Right>
            <CText
              text={formattedHour(moment(item.ocurred_at))}
              style={{ fontSize: 12 }}
            />
          </Right>
        </CardItem>
      </Card>
    )
  }

  render() {
    let { logs } = this.props;
    console.log('hist logs', logs);

    return (
      <Container style={{ padding: 10 }}>
        <FlatList
          data={logs}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </Container>
    )
  }
}
