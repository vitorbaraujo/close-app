import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Header,
  Left,
  Icon,
  Body,
  Spinner,
} from 'native-base';
import { ZeroMQ } from 'react-native-zeromq';
import { goTo } from '../utils/NavigationUtils';
import CText from './commons/CText';
import { light, lighter, dark, red, grey, white } from '../utils/Colors'

export default class SendRasp extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      ssid: '',
      password: '',
      // ip: "tcp://192.168.4.1:5544",
      ip: 'tcp://0.tcp.ngrok.io:19402',
      error: '',
      showPassword: false,
      connected: false,
      socket: null,
      sent: false,
      loading: false,
      form: [
        { label: 'Nome da rede', field: 'ssid' },
        { label: 'Senha', field: 'password' },
      ]
    }

    this.navigation = props.navigation;
  }

  async _createSocket() {
    try {
      let socket = await ZeroMQ.socket(ZeroMQ.SOCKET.TYPE.DEALER)

      if (socket) {
        let response = await socket.connect(this.state.ip)

        if (response && response.success) {
          this.setState({ connected: true, socket: socket });
        }
      }
    } catch (error) {
      console.log('error while creating socket');
    }
  }

  async _sendInfo() {
    this.setState({ loading: true })
    await this._createSocket();

    if (this.state.connected) {
      let message = `${this.state.ssid}$${this.state.password}`;

      try {
        let response = await this.state.socket.send(message);

        if (response) {
          this.setState({ sent: true });
        }
      } catch(error) {
        console.log('error while sending network info');
      }

    } else {
      console.log('not connected');
    }

    if (this.state.sent) {
      this.state.socket.close();
      this.setState({ connected: false, socket: null, sent: false, loading: false});
      goTo(this.navigation, 'Homepage');
    }
  }

  _updateText = (label, text) => {
    this.setState({ [label]: text })
  }

  render() {
    let { form, showPassword, loading } = this.state

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
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
        <Content padder contentContainerStyle={styles.content}>
          <View>
            <CText
              text="Insira a nome e senha da rede wi-fi para sincronizar com a Raspberry PI da máquina"
              style={styles.welcomeText}
            />
            <Form>
              {form.map((f, i) =>
                <Item key={i} floatingLabel>
                  <Label style={styles.font}>{f.label}</Label>
                  <Input
                    style={styles.font}
                    secureTextEntry={f.field === 'password' && !showPassword}
                    onChangeText={(text) => this._updateText(f.field, text)}
                  />
                  {f.field === 'password' &&
                    <Icon
                      type="Entypo"
                      name='eye-with-line'
                      onPress={() => this.setState({ showPassword: !this.state.showPassword })}
                      style={{ color: grey }}
                    />
                  }
                </Item>
              )}
            </Form>

            <Button
              full
              style={styles.formButton}
              onPress={() => this._sendInfo()}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <CText text={loading ? 'Enviando...' : 'Enviar'} />
                { loading && <Spinner size="small" color={white}/>}
              </View>
            </Button>

            <Text style={{ color: red, alignSelf: 'center' }}>
              {this.state.error}
            </Text>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  font: {
    fontFamily: 'Lato-Regular'
  },
  header: {
    backgroundColor: dark,
    elevation: 0
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  welcomeText: {
    fontSize: 30,
    textAlign: 'center',
    color: lighter,
  },
  formButton: {
    marginTop: 50,
    backgroundColor: light
  }
})