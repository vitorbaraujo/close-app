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
  }

  _doRegister() {
    console.log('do register');
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
              <Text>Registrar</Text>
            </Button>

            <Text style={styles.alreadyRegistered}>
              Já tem uma conta? Clique no botão abaixo para entrar
            </Text>

            <Button
              full
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text>Entrar</Text>
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