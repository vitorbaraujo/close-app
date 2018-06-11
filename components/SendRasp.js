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
} from 'native-base';
import { ZeroMQ } from 'react-native-zeromq';
import { goTo } from '../utils/NavigationUtils';

export default class SendRasp extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      ssid: '',
      password: '',
      ip: "tcp://192.168.4.1:5544",
      error: '',
      showPassword: false,
      connected: false,
      socket: null,
      sent: false,
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
      this.setState({ connected: false, socket: null, sent: false, });

      goTo(this.navigation, 'Cycle', {
        cycle: {
          "beer": 'ALAA',
          "start_time": "2018-05-29T01:05:47.751081Z",
          "end_time": "2018-05-29T01:05:40.579459Z",
          "beer_count": 0,
          "logs": []
        }
      });
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content padder contentContainerStyle={styles.content}>
          <View>
            <Text style={styles.welcomeText}>Insira a nome e senha da rede wi-fi para sincronizar com a Raspberry PI da máquina</Text>
            <Form>
              <Item floatingLabel>
                <Label>Nome de usuário</Label>
                <Input onChangeText={(text) => this.setState({ ssid: text })} />
              </Item>
              <Item floatingLabel last>
                <Label>Senha</Label>
                <Input
                  secureTextEntry={!this.state.showPassword}
                  onChangeText={(text) => this.setState({ password: text })}
                  />
                <Icon
                  type="Entypo"
                  name='eye-with-line'
                  onPress={() => this.setState({ showPassword: !this.state.showPassword })}
                />
              </Item>
            </Form>

            <Button
              full
              success
              style={styles.formButton}
              onPress={() => this._sendInfo()}
            >
              <View>
                <Text>Enviar</Text>
              </View>
            </Button>

            <Text style={{ color: 'red', alignSelf: 'center' }}>
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
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'green',
  },
  formButton: {
    marginTop: 50
  },
  newUser: {
    fontSize: 10,
    color: '#567bb7',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  }
})