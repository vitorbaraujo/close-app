import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Text } from 'native-base';
import PieCycleChart from '../charts/PieCycleChart';

export default class CycleStats extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Container>
        <PieCycleChart data={this.props.cycle}/>
      </Container>
    )
  }
}
