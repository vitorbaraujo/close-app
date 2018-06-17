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
import { login } from '../utils/Api';
import { saveItem, getItem, removeItem, isSignedIn } from '../utils/TokenUtils';
import CText from './commons/CText';
import { light, lighter, dark, red, grey, white } from '../utils/Colors'

export default class SendRasp extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      ip: "tcp://192.168.4.1:5544",
      ssid: '',
      ssidPassword: '',
      username: '',
      password: '',
      error: '',
      showSsidPassword: false,
      showPassword: false,
      connected: false,
      socket: null,
      sent: false,
      loading: false,
      logging: false,
      form: [
        { label: 'Nome da rede', field: 'ssid', password: false },
        { label: 'Senha da rede', field: 'ssidPassword', password: true, passField: 'showSsidPassword' },
        { label: 'Nome de usuário', field: 'username', password: false },
        { label: 'Senha', field: 'password', password: true, passField: 'showPassword' },
      ]
    }

    this.navigation = props.navigation;
  }

  async _createSocket() {
    try {
      let socket = await ZeroMQ.socket(ZeroMQ.SOCKET.TYPE.DEALER)
      if (socket) {
        console.log('socket', socket);
        let response = await socket.connect(this.state.ip)

        console.log('response', response);

        if (response && response.success) {
          this.setState({ connected: true, socket: socket, loading: false });
        } else {
          this.setState({ loading: false })
          console.log('[sendRasp] problem when sending message', response)
        }
      } else {
        console.log('[sendRasp] socket was not created')
      }
    } catch (error) {
      console.log('error while creating socket');
    }
  }

  async _sendInfo() {
    let message = JSON.stringify({
      ssid: this.state.ssid,
      ssid_password: this.state.ssidPassword,
      username: this.state.username,
      password: this.state.password,
    })

    this.setState({ loading: true })
    await this._createSocket();

    if (this.state.connected) {
      try {
        let response = await this.state.socket.send(message);

        if (response) {
          await saveItem('rasp_sent', 'true');
          this.setState({ sent: true, logging: true });
        } else {
          console.log('no response')
        }
      } catch(error) {
        console.log('error while sending network info', error);
      }

    } else {
      console.log('not connected');
      this.setState({ loading: false, logging: false })
    }

    if (this.state.sent) {
      let loginResult = await this._login();

      if (loginResult === false) {
        console.log('login result', loginResult)
        this.setState({ logging: false, error: 'Usuário e/ou senha inválido(s)' })
      }
    }
  }

  async _login() {
    try {
      let result = await login({
        username: this.state.username,
        password: this.state.password,
      })

      if (result) {
        this.setState({ signedIn: true })
        goTo(this.navigation, 'SignedIn')
      } else {
        return false;
      }
    } catch (error) {
      console.log('[send rasp screen] error log in', error)
    }
  }

  async _skip() {
    try {
      let signed = await isSignedIn();

      if (signed) {
        goTo(this.navigation, 'SignedIn')
      } else {
        goTo(this.navigation, 'SignedOut')
      }
    } catch(error) {
      console.log('error on skip', error)
    }
  }

  _updateText = (label, text) => {
    this.setState({ [label]: text })
  }

  render() {
    let { form, loading, logging } = this.state

    return (
      <Container style={styles.container}>
        <Content padder contentContainerStyle={styles.content}>
          <View>
            <CText
              text="Sincronize com a máquina"
              style={styles.welcomeText}
            />

            <CText
              text="Insira o nome a senha da sua rede Wi-Fi"
              style={{ color: light, textAlign: 'center', marginTop: 20 }}
            />

            <CText
              text="e seu usuário e senha para entrar na aplicação"
              style={{ color: light, textAlign: 'center' }}
            />
            <Form>
              {form.map((f, i) =>
                <Item key={i} floatingLabel>
                  <Label style={styles.font}>{f.label}</Label>
                  <Input
                    style={styles.font}
                    secureTextEntry={f.password && !this.state[f.passField]}
                    onChangeText={(text) => this._updateText(f.field, text)}
                  />
                  {f.password &&
                    <Icon
                      type="Entypo"
                      name={!this.state[f.passField] ? 'eye' : 'eye-with-line'}
                      onPress={() => this.setState({ [f.passField]: !this.state[f.passField] })}
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
                <CText text={loading ? 'Enviando...' : (logging ? 'Entrando...' : 'Enviar') } />
                { (loading || logging) && <Spinner size="small" color={white}/>}
              </View>
            </Button>

            <Button
              transparent
              full
              style={{ marginTop: 25 }}
              onPress={() => this._skip()}
            >
              <CText
                bold
                text="PULAR"
                style={{ color: grey }}
              />
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