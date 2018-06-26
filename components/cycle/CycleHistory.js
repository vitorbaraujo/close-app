import React from 'react';
import { FlatList } from 'react-native';
import { Container, Card, CardItem, Body, Right } from 'native-base';
import CText from '../commons/CText';
import Log from './Log';

export default class CycleHistory extends React.Component {
  static navigationOptions = {
    header: null
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = (obj) => {
    let { item, index } = obj;
    let isLast = index === this.props.logs.length - 1;
    let isDanger = [3, 4, 5].includes(item.code);

    return <Log log={item} last={isLast} danger={isDanger}/>
  }

  render() {
    let { logs } = this.props;

    return (
      <Container style={{ padding: 10, marginTop: 10 }}>
        {
          logs.length ?
          (
            <FlatList
              data={logs}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          ) :
          <CText
            text="Ainda não há eventos para este ciclo"
            style={{ textAlign: 'center' }}
          />
        }
      </Container>
    )
  }
}
