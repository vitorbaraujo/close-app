import React from 'react';
import { StyleSheet, View, TouchableHighlight, FlatList } from 'react-native';
import { Container, Text, Icon, Button, Header, Body, Left, Right, Title, Fab, ListItem } from 'native-base';
import { StackNavigator } from 'react-navigation';
// import Cycles from './Cycles';
import { ZeroMQ } from 'react-native-zeromq';


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

  constructor() {
    super();

    // change this ip to discovery
    this.state = {
      socket: null,
      loading: true,
      logs: [],
      ip: "tcp://192.168.15.5:5566",
      newIp: "tcp://192.168.15.5:5567",
    }

    // console.log('Creating socket...')
    // this._createSocket()
    //   .then((socket) => {
    //     console.log('Socket created');
    //     this.setState({ socket, loading: false })

    //     this._connect(socket, this.state.ip)
    //   })
    //   .catch((error) => {
    //     console.log('Error while creating socket', error)
    //   })
  }

  _goTo(path, params) {
    this.props.navigation.navigate(path, params)
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item }) => (
    <ListItem
      onPress={() => this._goTo('Cycle', { cycle: item })}
    >
      <Text>{item.id} oi - {item.beer} - {item.start_time}</Text>
    </ListItem>
  )

  _createSocket(ip) {
    console.log('CREATE SOCKET', ip);
    return new Promise((resolve, reject) => {
      ZeroMQ.socket(ZeroMQ.SOCKET.TYPE.DEALER)
        .then((socket) => {
          resolve(socket)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  _connect(socket, ip) {
    console.log(`Connecting to ip ${ip}`)
    socket.connect(ip)
      .then(() => {
        console.log(`Connected to ${ip}`)
        this.setState({ connected: true })

        let intervalId = setInterval(() => {
          if (socket && socket._addr === this.state.ip) {
            this._receiveMessage(socket);
          }
        }, 1000)

        if (socket == null || socket._addr !== this.state.ip) {
          clearInterval(intervalId);
        }
      })
      .catch((error) => {
        console.log(`Error while connecting to ${ip}`)
      })
  }

  _sendMessage(socket, message) {
    if (socket && socket._addr === this.state.ip) {
      socket.send(message)
        .then(() => {
          console.log('Message sent!')
        })
        .catch((error) => {
          console.log('Error while sending message', error)
        })
    }
  }

  _receiveMessage(socket) {
    if (socket && socket._addr === this.state.ip) {
      socket.recv()
        .then((msg) => {
          console.log(`Message received: ${msg}`)
          this.setState({ logs: [...this.state.logs, msg] })
        })
        .catch((error) => {
          console.log('Error while receiving message', error)
        })
    }
  }

  _swapIp() {
    if (this.state.socket) {
      this.state.socket.close(this.state.ip);
      let oldIp = this.state.ip;
      this.setState({ socket: null, ip: this.state.newIp, newIp: oldIp });
      this._createSocket()
        .then((socket) => {
          console.log('Socket created')
          this.setState({ socket, loading: false })

          this._connect(socket, this.state.ip)
        })
        .catch((error) => {
          console.log('Error while creating socket', error)
        })
    }
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

            <Button
              onPress={() => this._swapIp()}
            >
              <Text> Swap ip </Text>
            </Button>
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
