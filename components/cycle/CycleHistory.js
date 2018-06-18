import React from 'react';
import { FlatList } from 'react-native';
import { Container, Card, CardItem, Body, Right } from 'native-base';
import { getLog } from '../../utils/Logs';
// import { get } from '../../utils/Api';
import moment from 'moment';
// import PTRView from 'react-native-pull-to-refresh';
import CText from '../commons/CText';
import { formattedHour } from '../../utils/DateUtils';

export default class CycleHistory extends React.Component {
  static navigationOptions = {
    header: null
  }

  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     logs: [],
  //   }
  // }

  // async componentDidMount() {
  //   try {
  //     console.log('did mount/')
  //     await this.fetchData();
  //   } catch (error) {
  //     console.log('error on fetch data');
  //   }
  // }

  // _refresh = () => {
  //   return new Promise(async (resolve) => {
  //     await this.fetchData();
  //     setTimeout(() => (resolve()), 1000)
  //   })
  // }

  // async fetchData() {
  //   try {
  //     let { cycleId } = this.props;
  //     let logs = await get(`cycles/${cycleId}/cycle_logs/`)
  //     console.log('logs', logs);
  //   } catch(error) {
  //     console.log('error fetch data')
  //   }
  // }

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

    return (
      <Container style={{ padding: 10 }}>
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
