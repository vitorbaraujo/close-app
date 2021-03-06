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
  Button,
  Text,
  Icon,
  Spinner,
  Thumbnail,
} from 'native-base';
import { ZeroMQ } from 'react-native-zeromq';
import { goTo } from '../utils/NavigationUtils';
import { login, get } from '../utils/Api';
import { saveItem, getItem, removeItem, isSignedIn, getToken, removeToken } from '../utils/TokenUtils';
import CText from './commons/CText';
import OfflineSign from './commons/OfflineSign';
import { light, lighter, dark, red, grey, white, green } from '../utils/Colors'
var logo = require('../assets/images/logo.png')

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
      // savedUsername: '',
      // savedToken: '',
      // logged: false,
      readyToProceed: false,
      form: [
        { label: 'Nome da rede', field: 'ssid', password: false },
        { label: 'Senha da rede', field: 'ssidPassword', password: true, passField: 'showSsidPassword' },
      ],
      formNew: [
        { label: 'Nome de usuário', field: 'username', password: false },
        { label: 'Senha', field: 'password', password: true, passField: 'showPassword' },
      ]
    }

    this.navigation = props.navigation;
  }

  // async componentDidMount() {
  //   try {
  //     let savedUsername = await getItem('username');
  //     let savedToken = await getToken()
  //     this.setState({
  //       savedUsername,
  //       savedToken,
  //       // logged: savedUsername && !!savedUsername.length && savedToken && !!savedToken.length,
  //     });
  //   } catch(error) {
  //     console.log('error on get username token');
  //   }
  // }

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
    this.setState({ loading: true })

    let message = JSON.stringify({
      ssid: this.state.ssid,
      ssid_password: this.state.ssidPassword,
      username: this.state.username,
      password: this.state.password,
    })

    // let messageLogged = JSON.stringify({
    //   ssid: this.state.ssid,
    //   ssid_password: this.state.ssidPassword,
    //   token: this.state.savedToken,
    // })

    // console.log(this.state.logged, messageLogged);

    await this._createSocket();

    if (this.state.connected) {
      try {
        // let msgToSend = this.state.logged ? messageLogged : message;
        let msgToSend = message;
        let response = await this.state.socket.send(msgToSend);

        if (response) {
          await saveItem('rasp_sent', 'true');
          this.setState({ sent: true });
        } else {
          console.log('no response')
        }
      } catch(error) {
        console.log('error while sending network info', error);
      }

    } else {
      console.log('not connected');
      this.setState({ loading: false })
    }


    if (this.state.sent) {
      setTimeout(() => {
        this.setState({ readyToProceed: true, loading: false });
      }, 1500)
    }
  }

  async _proceed() {
    try {
      let signed = await isSignedIn();

      if (signed) {
        goTo(this.navigation, 'SignedIn')
      } else {
        goTo(this.navigation, 'SignedOut')
      }
    } catch(error) {
      console.log('error on proceed', error)
    }
  }

  _updateText = (label, text) => {
    this.setState({ [label]: text })
  }

  // async _logAsOtherUser() {
  //   try {
  //     await removeItem('username');
  //     await removeToken();
  //     this.setState({
  //       savedUsername: null,
  //       savedToken: null,
  //       // logged: false,
  //     })
  //   } catch(error) {
  //     console.log('error on remove username and token from asyncstorage')
  //   }
  // }

  render() {
    let { form, formNew, loading, readyToProceed, sent } = this.state
    let { ssid, ssidPassword, username, password } = this.state;

    let disabled = !ssid.length || !ssidPassword.length || !username.length || !password.length;
    // let loggedDisabled = !ssid.length || !ssidPassword.length;

    return (
      <Container style={styles.container}>
        { sent && <OfflineSign />}
        <Content padder contentContainerStyle={styles.content}>
          <View>
            <Thumbnail
              large
              style={{ alignSelf: 'center' }}
              source={logo}
            />
            <CText
              text="Sincronize com a máquina"
              style={styles.welcomeText}
            />

            <CText
              text="Insira o nome a senha da sua rede Wi-Fi"
              style={{ color: light, textAlign: 'center', marginTop: 20 }}
            />

            <CText
              text="e seu usuário e senha para sincronizar com a máquina"
              style={{ color: light, textAlign: 'center' }}
            />

            { !readyToProceed ?
              (
                <Form>
                  {form.map((f, i) =>
                    <Item key={i}>
                      <Input
                        placeholder={f.label}
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
                  {
                    // !logged ?
                    formNew.map((f, i) =>
                      <Item key={i}>
                        <Input
                          placeholder={f.label}
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
                    )
                    // :
                    // ( !readyToProceed &&
                    //   <View>
                    //     <Button
                    //       full
                    //       rounded
                    //       disabled={loggedDisabled}
                    //       style={ !loggedDisabled ? styles.loggedButton : { marginTop: 20 } }
                    //       onPress={() => this._sendInfo()}
                    //     >
                    //       <CText text={`Enviar como ${savedUsername}`} />
                    //     </Button>

                    //     {
                    //       <Button
                    //         transparent
                    //         onPress={() => this._logAsOtherUser()}
                    //         style={{ alignSelf: 'center' }}
                    //       >
                    //           <CText
                    //             text="Enviar como outro usuário"
                    //             style={{ color: grey, textDecorationLine: 'underline' }}
                    //           />
                    //       </Button>
                    //     }
                    //   </View>
                    // )
                  }
                </Form>
              ) : null
            }

            {/* {(!logged && !readyToProceed) && */}
            { !readyToProceed &&
               <Button
                full
                rounded
                disabled={disabled}
                style={!disabled ? styles.formButton : { marginTop: 50 }}
                onPress={() => this._sendInfo()}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <CText bold text={loading ? 'ENVIANDO...' : 'ENVIAR'} />
                  { loading && <Spinner size="small" color={white}/>}
                </View>
              </Button>
            }

            {
              readyToProceed &&
              <Button
                full
                rounded
                style={{ backgroundColor: green, marginTop: 50 }}
                onPress={() => this._proceed()}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <CText text="PROSSEGUIR" />
                </View>
              </Button>
            }

            { !readyToProceed &&
              <Button
                transparent
                full
                style={{ marginTop: 25 }}
                onPress={() => this._proceed()}
              >
                <CText
                  bold
                  text="PULAR"
                  style={{ color: grey }}
                />
              </Button>
            }

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
    backgroundColor: light,
  },
  loggedButton: {
    marginTop: 20,
    backgroundColor: light
  },
})