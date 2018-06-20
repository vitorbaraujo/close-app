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
  Icon,
  Thumbnail,
  Spinner,
} from 'native-base';
import { goTo } from '../../utils/NavigationUtils';
import { saveItem, getItem } from '../../utils/TokenUtils';
import { login, get } from '../../utils/Api';
import CText from '../commons/CText';
import OfflineSign from '../commons/OfflineSign';
import { light, lighter, red, grey, medium, white } from '../../utils/Colors'
var logo = require('../../assets/images/logo.png')

export default class Cycle extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: '',
      token: null,
      showPassword: false,
      loading: false,
      form: [
        { label: 'Nome de usuário', field: 'username' },
        { label: 'Senha', field: 'password' },
      ]
    }

    this.navigation = props.navigation;
  }

  async _login() {
    try {
      this.setState({ loading: true })
      let result = await login({
        username: this.state.username,
        password: this.state.password,
      })

      if (result) {
        this.setState({ signedIn: true, loading: false })
        let me = await get('users/me/')
        await saveItem('username', me.username);
        goTo(this.navigation, 'SignedIn')
      } else {
        this.setState({ loading: false, error: 'Usuário e/ou senha inválido(s)' })
      }
    } catch(error) {
      console.log('[login screen] error log in', error)
    }
  }

  _updateText = (label, text) => {
    this.setState({ [label]: text })
  }

  render() {
    let { form, showPassword, loading } = this.state
    let { username, password } = this.state;

    let disabled = !username.length || !password.length;

    return (
      <Container style={styles.container}>
        <OfflineSign />
        <Content padder contentContainerStyle={styles.content}>
          <View>
            <Thumbnail
              large
              style={{ alignSelf: 'center' }}
              source={logo}
            />
            <CText
              text="Bem-vindo ao Close"
              style={styles.welcomeText}
            />
            <Form>
              {form.map((f, i) =>
                <Item key={i}>
                  <Input
                    placeholder={f.label}
                    style={styles.font}
                    secureTextEntry={f.field === 'password' && !showPassword}
                    onChangeText={(text) => this._updateText(f.field, text)}
                  />
                  {f.field === 'password' &&
                    <Icon
                      type="Entypo"
                      name={!showPassword ? 'eye' : 'eye-with-line'}
                      onPress={() => this.setState({ showPassword: !this.state.showPassword })}
                      style={{ color: grey }}
                    />
                  }
                </Item>
              )}
            </Form>

            <Button
              full
              disabled={disabled}
              style={!disabled ? styles.formButton : { marginTop: 50 }}
              onPress={() => this._login()}
            >
              <CText text={ loading ? 'Entrando...' : 'Entrar'} />
              {loading && <Spinner size="small" color={white} />}
            </Button>

            <Button
              transparent
              full
              style={styles.newUser}
              onPress={() => goTo(this.navigation, 'Register')}
            >
              <CText
                style={{ color: grey, textDecorationLine: 'underline' }}
                text="Registre-se aqui"
              />
            </Button>

            <CText
              text={this.state.error}
              style={{ color: red, alignSelf: 'center', marginTop: 20 }}
            />
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
    justifyContent: 'center',
    backgroundColor: white,
  },
  font: {
    fontFamily: 'Lato-Regular'
  },
  welcomeText: {
    fontSize: 30,
    textAlign: 'center',
    color: lighter,
  },
  formButton: {
    marginTop: 50,
    backgroundColor: light
  },
  newUser: {
    marginTop: 50,
  }
})