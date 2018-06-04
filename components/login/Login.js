import React from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
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
} from 'native-base';

const ACCESS_TOKEN = 'access_token';

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

  componentWillMount() {
    this.getToken();
  }

  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();
    } catch(error) {
      console.log('error storing token: ', error)
    }
  }

  async getToken() {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log('token is: ', token);
      this.setState({ token: token });
    } catch (error) {
      console.log('error storing token: ', error)
    }
  }

  async removeToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.getToken();
    } catch(error) {
      console.log('error while removing token', error)
    }
  }

  async _doLogin() {
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
        this.storeToken(accessToken);
        // console.log('res token: ', accessToken);
      } else {
        let error = JSON.stringify(res);
        throw error;
      }
    } catch(error) {
      this.setState({ error: error });
      console.log('error: ', error);
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content padder contentContainerStyle={styles.content}>
          <View>
            <Text>Token: {this.state.token} </Text>
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
              style={styles.formButton}
              onPress={() => this._doLogin()}
            >
              <Text>Entrar</Text>
            </Button>

            <Button
              full
              danger
              style={styles.formButton}
              onPress={() => this.removeToken()}
            >
              <Text>Sair</Text>
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
  formButton: {
    marginTop: 50
  }
})