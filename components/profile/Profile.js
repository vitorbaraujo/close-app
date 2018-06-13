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
  Thumbnail,
} from 'native-base';
import { removeToken } from '../../utils/TokenUtils';
import { goTo } from '../../utils/NavigationUtils';
import CText from '../commons/CText';
import gravatar from 'gravatar';

export default class Profile extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      avatar: null,
      editing: false,
    }

    this.navigation = props.navigation;
  }

  async componentDidMount() {
    try {
      let url = await gravatar.url(this.state.user.email);
      this.setState({ avatar: `https:${url}` })
    } catch(error) {
      console.log('[profile] error', error)
    }
  }

  async _doLogout() {
    try {
      let result = await removeToken();
      console.log(result);
      if (result) {
        this.setState({ token: null });
      }

      goTo(this.navigation, 'SignedOut')
    } catch(error) {
      console.log('error logging out')
    }
  }

  render() {
    let { user, editing } = this.state;

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
            <Thumbnail
              source={{ uri: this.state.avatar }}
              style={{ height: 120, width: 120}}
            />
            <CText
              bold
              text={`${user.first_name} ${user.last_name}`}
              style={{ color: 'white', fontSize: 20 }}
            />
          </View>
          <View style={styles.profileInfo}>
            <Item stackedLabel disabled>
              <Label>Nome</Label>
              <Input disabled={!editing} value={user.first_name} />
            </Item>
            <Item stackedLabel disabled>
              <Label>Sobrenome</Label>
              <Input disabled={!editing} value={user.last_name} />
            </Item>
            <Item stackedLabel disabled>
              <Label>Nome de usuário</Label>
              <Input disabled={!editing} value={user.username} />
            </Item>
            <Item stackedLabel disabled>
              <Label>E-mail</Label>
              <Input disabled={!editing} value={user.email} />
            </Item>
          </View>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 }}>
            {
              !editing ?
                (<Button
                  style={{ backgroundColor: '#ee5622' }}
                  onPress={() => this.setState({ editing: true })}
                  >
                  <View>
                    <Text>Editar</Text>
                  </View>
                </Button>) :
                (<Button
                  style={{ backgroundColor: '#ee5622' }}
                  onPress={() => this.setState({ editing: false })}
                >
                  <View>
                    <Text>Salvar</Text>
                  </View>
                </Button>)
            }
          </View> */}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 2,
    paddingLeft: 10,
    paddingRight: 10,
  }
});
