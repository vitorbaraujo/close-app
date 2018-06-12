import React from 'react';
import { StyleSheet, View, TouchableHighlight, FlatList } from 'react-native';
import {
  Container,
  Text,
  Icon,
  Button,
  Header,
  Body,
  Left,
  Right,
  Title,
  Fab,
  ListItem,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import { StackNavigator } from 'react-navigation';
import { getToken } from '../../utils/TokenUtils';
import { goTo } from '../../utils/NavigationUtils';
import { get } from '../../utils/Api';

const cycles = [
  {
    "beer": 'OPA',
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 'IPA',
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
    "beer": 1,
    "start_time": "2018-05-29T01:05:47.751081Z",
    "end_time": "2018-05-29T01:05:40.579459Z",
    "beer_count": 0,
    "logs": []
  },
  {
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

  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      loading: true,
      logs: [],
      currentUser: {},
      networkSsid: '',
      networkPass: '',
    }

    this.navigation = props.navigation;
  }

  async componentDidMount() {
    try {
      let user = await get('users/me/');
      if (user) {
        this.setState({ currentUser: user })
      }
    } catch(error) {
      console.log('error on get', error);
    }
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item }) => {
    return <ListItem
      onPress={() => goTo(this.navigation, 'Cycle', { cycle: item })}
    >
      <Text>{item.id} oi - {item.start_time}</Text>
    </ListItem>
  }

  render() {
    let { currentUser } = this.state;

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
                  onPress={() => goTo(this.navigation, 'Profile', { user: currentUser })}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.profileText} uppercase={false}>{currentUser.username}</Text>
                    <Icon style={styles.profileIcon} type="FontAwesome" name="user" />
                  </View>
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
              onPress={() => goTo(this.navigation, 'SendRasp')}
            >
              <Icon type="Entypo" name="plus" />
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
