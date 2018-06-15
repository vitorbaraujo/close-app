import React from 'react';
import { getLog } from '../../utils/Logs';
import { StyleSheet, View } from 'react-native';
import { Container, Text } from 'native-base';
import PieChart from '../charts/PieChart';

export default class CycleStats extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
  }

  render() {
    let { cycle } = this.props
    let logs = cycle.logs.reduce((a, b) => {
      a[b.code] = (a[b.code] || 0) + 1
      return a
    }, {} )
    let data = Object.keys(logs).map((c, index) => ({x: index, label: getLog(parseInt(c)), y: logs[c]}))
    console.log(data)
    return (
      <Container>
        <Text>Estatísticas</Text>
        <PieChart data={data} />
      </Container>
    )
  }
}
