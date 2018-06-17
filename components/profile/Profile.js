import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Button,
  Header,
  Left,
  Right,
  Icon,
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
import { white, dark, orange } from '../../utils/Colors';

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
      form: [
        { label: 'Nome', field: 'first_name' },
        { label: 'Sobrenome', field: 'last_name' },
        { label: 'Nome de usuário', field: 'username' },
        { label: 'E-mail', field: 'email' },
      ],
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

  _updateText = (label, text) => {
    this.setState({ [label]: text })
  }

  render() {
    let { user, editing, avatar, form } = this.state;

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
              onPress={() => goTo(this.navigation, 'Config')}
            >
              <Icon
                type="FontAwesome"
                name="gear"
                style={{ color: white }}
              />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ flex: 1, backgroundColor: white }}>
          <View style={styles.main}>
            <Thumbnail
              source={{ uri: avatar }}
              style={{ height: 120, width: 120}}
            />
            <CText
              bold
              text={`${user.first_name} ${user.last_name}`}
              style={{ color: white, fontSize: 20 }}
            />
          </View>
          <View style={styles.profileInfo}>
            {form.map((f, i) =>
              <Item key={i} stackedLabel disabled={!editing}>
                <Label style={styles.font}>{f.label}</Label>
                <Input
                  style={styles.font}
                  disabled={!editing}
                  value={user[f.field]}
                />
              </Item>
            )}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 }}>
            <Button
              style={{ backgroundColor: orange }}
              onPress={() => this._doLogout()}
            >
              <CText text="SAIR" />
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: dark,
    elevation: 0
  },
  font: {
    fontFamily: 'Lato-Regular'
  },
  main: {
    flex: 1,
    backgroundColor: dark,
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
