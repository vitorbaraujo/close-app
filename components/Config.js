import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { Container, Content, Button, Header, Left, Body, Icon, View } from 'native-base'
import CText from './commons/CText'
import { removeItem, getItem } from '../utils/TokenUtils'
import { goTo } from '../utils/NavigationUtils'
import { dark, darker, white, light, grey, green } from '../utils/Colors'

export default class Config extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      loading: false,
      removed: false,
      sent: false,
    }
  }

  async componentDidMount() {
    try {
      let sent = await getItem('rasp_sent');
      this.setState({ sent: (sent === 'true') })
    } catch(error) {
      console.log('error on get rasp_sent');
    }
  }

  async _removeRaspConfig() {
    try {
      let { sent } = this.state;

      if (sent) {
        this.setState({ loading: true })
        let r = await removeItem('rasp_sent')
        this.setState({ removed: true, loading: false })
      } else {
        goTo(this.navigation, 'Rasp')
      }

    } catch(error) {
      console.log('[configs] error on remove rasp config')
    }
  }

  render() {
    let { loading, removed, sent } = this.state;

    return (
      <Container>
        <Header
          androidStatusBarColor={darker}
          style={styles.header}
        >
          <Left>
            <Button
              transparent
              onPress={() => goTo(this.navigation, 'Profile')}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body />
        </Header>
        <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            full
            rounded
            style={{ backgroundColor: light, marginBottom: 20 }}
            onPress={() => this._removeRaspConfig()}
          >
            <View>
              <CText
                text={`${sent ? 'Remover' : 'Inserir'} configurações da Rasp`}
                style={{ color: white }}
              />
            </View>
          </Button>

          {
            loading ?
              (<CText
                text="Removendo..."
                style={{ color: grey }}
              />)
            :
              (<CText
                text={removed ? 'Configurações removidas!' : ''}
                style={{ color: green }}
              />)
          }
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