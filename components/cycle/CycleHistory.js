import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Text } from 'native-base';

export default class CycleHistory extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Container>
        <Text>Histórico</Text>
      </Container>
    )
  }
}
