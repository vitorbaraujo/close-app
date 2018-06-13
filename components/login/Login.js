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
  Icon,
} from 'native-base';
import { goTo } from '../../utils/NavigationUtils';
import { login } from '../../utils/Api';
import CText from '../commons/CText';
import { light, lighter, red, grey, medium, white } from '../../utils/Colors'

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
      form: [
        { label: 'Nome de usuário', field: 'username' },
        { label: 'Senha', field: 'password' },
      ]
    }

    this.navigation = props.navigation;
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
    } catch(error) {
      console.log('[login screen] error log in', error)
    }
  }

  _updateText = (label, text) => {
    this.setState({ [label]: text })
  }

  render() {
    let { form, showPassword } = this.state

    return (
      <Container style={styles.container}>
        <Content padder contentContainerStyle={styles.content}>
          <View>
            <CText
              text="Bem-vindo ao Close"
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
              style={styles.formButton}
              full
              onPress={() => this._login()}
            >
              <View>
                <CText text="Entrar" />
              </View>
            </Button>

            <CText
              style={styles.newUser}
              subsubtitle
              text="Não tem uma conta? Clique no botão abaixo para se registrar"
            />

            <Button
              full
              style={{ backgroundColor: medium }}
              onPress={() => goTo(this.navigation, 'Register')}
            >
              <View>
                <CText text="Registrar" />
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
    fontSize: 12,
    color: lighter,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  }
})