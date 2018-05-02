import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Button, Text, Header, Left, Body, Right, Title } from 'native-base';
import { StackNavigator } from 'react-navigation';

export default class CustomHeader extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    const { title } = this.props

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>{ title }</Title>
          </Body>
          <Right />
        </Header>
      </Container>
    )
  }
}