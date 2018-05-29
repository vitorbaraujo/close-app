import React from 'react';
import { StyleSheet, View, TouchableHighlight, FlatList } from 'react-native';
import { Container, Text, Icon, Button, Header, Body, Left, Right, Title, Fab, ListItem } from 'native-base';
import { StackNavigator } from 'react-navigation';
// import Cycles from './Cycles';

const cycles = [
  {
    "id": 1,
    "beer": 'OPA',
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 'IPA',
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 1,
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "id": 2,
    "beer": 1,
    "start_time": "2018-05-29T01:06:11.244656Z",
    "end_time": "2018-05-29T01:06:07.358545Z",
    "beer_count": 0,
    "logs": []
  }
];

export default class Homepage extends React.Component {
  static navigationOptions = {
    header: null
  }

  _goTo(path, params) {
    this.props.navigation.navigate(path, params)
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <ListItem
      key={item.id}
      onPress={() => this._goTo('Cycle', { cycle: item })}
    >
      <Text>{item.id} oi - {item.beer} - {item.start_time}</Text>
    </ListItem>
  )

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
            <FlatList
              data={cycles}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
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
