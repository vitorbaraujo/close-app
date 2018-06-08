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
import TokenUtils from '../../utils/TokenUtils';
import Url from '../../utils/Url';

export default class Cycle extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      error: '',
      token: null,
    }
  }

  _goTo(path) {
    this.props.navigation.navigate(path)
  }

  async componentWillMount() {
    let token = await TokenUtils.getToken();
    this.setState({ token: token });
  }

  async _doLogin() {
    try {
      let url = Url.baseUrl + 'jwt-auth/';

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
        let token = await TokenUtils.storeToken(accessToken);

        if (token) {
          this.setState({ token });
          this._goTo('SignedIn');
        }
      } else {
        let error = JSON.stringify(res);
        throw error;
      }
    } catch(error) {
      this.setState({ error: JSON.stringify(error) });
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content padder contentContainerStyle={styles.content}>
          <View>
            {/* <Text>Token: {this.state.token} </Text> */}
            <Text style={styles.welcomeText}>Bem-vindo</Text>
            <Form>
              <Item floatingLabel>
                <Label>Nome de usuário</Label>
                <Input onChangeText={(text) => this.setState({ username: text })} />
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
              full
              success
              style={styles.formButton}
              onPress={() => this._doLogin()}
            >
              <View>
                <Text>Entrar</Text>
              </View>
            </Button>

            <Text style={styles.newUser}>
              Não tem uma conta? Clique no botão abaixo para se registrar
            </Text>

            <Button
              full
              onPress={() => this.props.navigation.navigate("Register")}
            >
              <View>
                <Text>Registrar</Text>
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
  newUser: {
    fontSize: 10,
    color: '#567bb7',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  }
})