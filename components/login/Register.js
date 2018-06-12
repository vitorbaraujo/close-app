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
  Text,
} from 'native-base'
import { saveToken } from '../../utils/TokenUtils';
import { goTo } from '../../utils/NavigationUtils';
import { register, login } from '../../utils/Api';

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

  render() {
    return (
      <Container>
        <Content padder contentContainerStyle={styles.content}>
          <View>
            <Text style={styles.welcomeText}>Registre-se</Text>
            <Form>
              <Item floatingLabel>
                <Label>Nome</Label>
                <Input onChangeText={(text) => this.setState({ firstName: text })} />
              </Item>
              <Item floatingLabel>
                <Label>Sobrenome</Label>
                <Input onChangeText={(text) => this.setState({ lastName: text })} />
              </Item>
              <Item floatingLabel>
                <Label>Nome de usuário</Label>
                <Input onChangeText={(text) => this.setState({ username: text })} />
              </Item>
              <Item floatingLabel>
                <Label>E-mail</Label>
                <Input onChangeText={(text) => this.setState({ email: text })} />
              </Item>
              <Item floatingLabel last>
                <Label>Senha</Label>
                <Input
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({ password: text })}
                />
              </Item>
            </Form>

            <Button
              success
              full
              style={styles.formButton}
              onPress={() => this._register()}
            >
              <View>
                <Text>{this.state.loading ? 'Registrando...' : 'Registrar' }</Text>
              </View>
            </Button>

            <Text style={styles.alreadyRegistered}>
              Já tem uma conta? Clique no botão abaixo para entrar
            </Text>

            <Button
              full
              onPress={() => goTo(this.navigation, "Login")}
            >
              <View>
                <Text>Entrar</Text>
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
    fontSize: 30,
    textAlign: 'center',
    color: 'green',
  },
  formButton: {
    marginTop: 50
  },
  alreadyRegistered: {
    fontSize: 10,
    color: '#567bb7',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  }
})