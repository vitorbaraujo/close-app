import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
  Spinner,
} from 'native-base'
import { saveToken } from '../../utils/TokenUtils';
import { goTo } from '../../utils/NavigationUtils';
import { register, login } from '../../utils/Api';
import CText from '../commons/CText';
import { light, lighter, red, grey, medium, white } from '../../utils/Colors'

export default class Register extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      loading: false,
      showPassword: false,
      form: [
        { label: 'Nome', field: 'firstName' },
        { label: 'Sobrenome', field: 'lastName' },
        { label: 'Nome de usuário', field: 'username' },
        { label: 'E-mail', field: 'email' },
        { label: 'Senha', field: 'password' },
      ]
    }

    this.navigation = props.navigation;
  }

  async _register() {
    try {
      this.setState({ loading: true })
      let result = await register({
        username: this.state.username,
        password: this.state.password,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
      })

      console.log('result', result);

      if (result) {
        await this._login();
      } else {
        this.setState({ loading: false })
      }
    } catch(error) {
      console.log('error on _register', error)
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
      }
    } catch (error) {
      console.log('[login screen] error log in', error)
    }
  }

  _updateText = (label, text) => {
    this.setState({ [label]: text })
  }

  render() {
    let { form, showPassword, loading } = this.state

    return (
      <Container>
        <Content padder contentContainerStyle={styles.content}>
          <View>
            <CText
              text="Registre-se"
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
              style={styles.formButton}
              onPress={() => this._register()}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <CText text={loading ? 'Registrando...' : 'Registrar'} />
                {loading && <Spinner size="small" color={white} />}
              </View>
            </Button>

            <CText
              style={styles.alreadyRegistered}
              subsubtitle
              text="Já tem uma conta? Clique no botão abaixo para entrar"
            />

            <Button
              style={{ backgroundColor: light }}
              full
              onPress={() => goTo(this.navigation, "Login")}
            >
              <View>
                <CText text="Entrar" />
              </View>
            </Button>

            <CText
              style={{ color: red, alignSelf: 'center' }}
              text={this.state.error}
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
  welcomeText: {
    fontSize: 30,
    textAlign: 'center',
    color: lighter,
  },
  font: {
    fontFamily: 'Lato-Regular'
  },
  formButton: {
    marginTop: 50,
    backgroundColor: medium
  },
  alreadyRegistered: {
    fontSize: 12,
    color: lighter,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
})