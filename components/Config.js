import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { Container, Content, Button, Header, Left, Body, Icon, View } from 'native-base'
import CText from './commons/CText'
import { removeItem } from '../utils/TokenUtils'
import { goTo } from '../utils/NavigationUtils'
import { dark, white, medium } from '../utils/Colors'

export default class Config extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  async _removeRaspConfig() {
    try {
      let r = await removeItem('rasp_sent')
      console.log('r ->', r)
      goTo(this.navigation, 'Rasp')
    } catch(error) {
      console.log('[configs] error on remove rasp config')
    }
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => goTo(this.navigation, 'Homepage')}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body />
        </Header>
        <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            full
            style={{ backgroundColor: medium }}
            onPress={() => this._removeRaspConfig()}
          >
            <View>
              <CText
                text="Remover configurações da Rasp"
                style={{ color: white }}
              />
            </View>
          </Button>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: dark,
    elevation: 0
  },
})