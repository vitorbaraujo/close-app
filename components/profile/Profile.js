import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Button, Text, Header, Body, Left, Right, Icon, Title } from 'native-base';
import TokenUtils from '../../utils/TokenUtils';

export default class Profile extends React.Component {
  static navigationOptions = {
    header: null
  }

  _goTo(path) {
    this.props.navigation.navigate(path)
  }

  async _doLogout() {
    let result = await TokenUtils.removeToken();
    if (result) {
      this.setState({ token: null });
    }

    this._goTo('SignedOut')
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <View style={styles.main}>
            <Header style={styles.header}>
              <Left>
                <Button
                  transparent
                  onPress={() => this._goTo('Homepage')}
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
            <Text>Profile photo and name</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text>Info</Text>
          </View>
        </View>
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
  main: {
    flex: 1,
    backgroundColor: '#eca72c'
  },
  header: {
    backgroundColor: '#eca72c',
    elevation: 0
  },
  profileInfo: {
    flex: 2,
  }
});
