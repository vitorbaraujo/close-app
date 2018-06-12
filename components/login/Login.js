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
import { goTo } from '../../utils/NavigationUtils';
import { login } from '../../utils/Api';

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
              onPress={() => this._login()}
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
              onPress={() => goTo(this.navigation, "Register")}
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