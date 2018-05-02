import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { Container, Button, Text, Header, Left, Body, Right, Title, Icon } from 'native-base';
import { StackNavigator } from 'react-navigation';
import CustomHeader from './CustomHeader';

export default class Homepage extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Container>
        {/* <Header style={styles.header}>
          <Left />
          <Body />
          <Right>
            <Button transparent>
              <Icon type="FontAwesome" name="user" />
            </Button>
          </Right>
        </Header> */}
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.header}>
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate('Profile')}
              >
                <View style={styles.profileContainer}>
                  <Text style={styles.profileText}>victornavarro</Text>
                  <Icon style={styles.profileIcon} type="FontAwesome" name="user" />
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.timeline}>
            <Text>Timeline</Text>
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 50,
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
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white'
  },
  timeline: {
    flex: 2,
  }
});