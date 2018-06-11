import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Button,
  Text,
  Header,
  Body,
  Left,
  Right,
  Icon,
  Title,
  Form,
  Item,
  Content,
  Input,
  Label,
} from 'native-base';
import { removeToken } from '../../utils/TokenUtils';
import { goTo } from '../../utils/NavigationUtils';

export default class Profile extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
    }

    this.navigation = props.navigation;
  }

  _doLogout() {
    let result = removeToken();
    console.log(result);
    if (result) {
      this.setState({ token: null });
    }

    goTo(this.navigation, 'SignedOut')
  }

  render() {
    let { user } = this.state;

    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => goTo(this.navigation, 'Homepage')}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Right>
            <Button
              transparent
              onPress={() => this._doLogout()}
            >
              <Text>Sair</Text>
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          <View style={styles.main}>
            <Text>Nome de usuário: {user.username}</Text>
            <Text>E-mail: {user.email}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Item stackedLabel disabled>
              <Label>Nome</Label>
              <Input disabled value={user.first_name} />
            </Item>
            <Item stackedLabel disabled>
              <Label>Sobrenome</Label>
              <Input disabled value={user.last_name} />
            </Item>
            <Item stackedLabel disabled>
              <Label>Nome de usuário</Label>
              <Input disabled value={user.username} />
            </Item>
            <Item stackedLabel disabled>
              <Label>E-mail</Label>
              <Input disabled value={user.email} />
            </Item>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#eca72c',
    elevation: 0
  },
  main: {
    flex: 1,
    backgroundColor: '#eca72c',
    paddingLeft: 10,
    paddingRight: 10,
  },
  profileInfo: {
    flex: 2,
    paddingLeft: 10,
    paddingRight: 10,
  }
});
