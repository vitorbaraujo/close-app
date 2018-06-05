import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import {
  Container,
  Content,
  Button,
  Text,
} from 'native-base'

export default class Register extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ paddingVertical: 20 }}>
            <Button
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text>Login</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}