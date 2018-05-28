import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { Container, Text, Icon, Button, Header, Body, Left, Right, Title, Fab } from 'native-base';
import { StackNavigator } from 'react-navigation';

export default class Homepage extends React.Component {
  static navigationOptions = {
    header: null
  }

  _goTo(path) {
    this.props.navigation.navigate(path)
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <View style={styles.main}>
            <Header
              noShadow={true}
              style={styles.header}
            >
              <Left />
              <Body />
              <Right>
                <Button
                  transparent
                  onPress={() => this._goTo('Profile')}
                >
                  <Text style={styles.profileText} uppercase={false}>victornavarro</Text>
                  <Icon style={styles.profileIcon} type="FontAwesome" name="user" />
                </Button>
              </Right>
            </Header>
          </View>
          <View style={styles.timeline}>
            <Text>Timeline</Text>
            <Fab
              style={styles.addCycleButton}
              onPress={() => this._goTo('Cycle')}
            >
              <Icon type="Feather" name="plus" />
            </Fab>
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
    backgroundColor: '#eca72c'
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileIcon: {
    color: 'white',
  },
  timeline: {
    flex: 2,
  },
  addCycleButton: {
    backgroundColor: '#ee5622'
  }
});
