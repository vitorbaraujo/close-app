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
import Url from '../../utils/Url';
import { goTo } from '../../utils/NavigationUtils';

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
    }

    this.navigation = props.navigation;
  }

  async _doRegister() {
    try {
      let url = Url.baseUrl + 'users/new/';

      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
        }),
      })

      let res = await response.json();

      if (response.status >= 200 && response.status < 300) {
        this.setState({ error: '' });

        this._doLogin();
      } else {
        let error = JSON.stringify(res);
        console.log('status zoado: ', res);
        throw error;
      }
    } catch (error) {
      this.setState({ error: JSON.stringify(error) });
    }
  }

  async _doLogin() {
    console.log('do login');
    try {
      let url = `http://10.0.3.2:8000/jwt-auth/`

      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      })

      let res = await response.json();

      if (response.status >= 200 && response.status < 300) {
        this.setState({ error: '' });
        let accessToken = res.token;
        let token = saveToken(accessToken);

        console.log('token', token)

        if (token) {
          console.log('lets bora')
          this.setState({ token });
          goTo(this.navigation, 'SignedIn');
        }
      } else {
        let error = JSON.stringify(res);
        throw error;
      }
    } catch (error) {
      console.log('errou', error)
      this.setState({ error: JSON.stringify(error) });
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
              onPress={() => this._doRegister()}
            >
              <View>
                <Text>Registrar</Text>
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