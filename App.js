/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableHighlight
} from 'react-native';
import { ZeroMQ } from 'react-native-zeromq';
import { Container, Button, Text } from 'native-base';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
   constructor() {
    console.log('Initializing app...')

    super();

    // change this ip to discovery
    this.raspIp = "tcp://10.0.0.230:5566"
    this.state = {
      socket: null,
      loading: true,
      logs: []
    }

    console.log('Creating socket...')
    this._createSocket()
      .then((socket) => {
        console.log('Socket created')
        this.setState({ socket, loading: false })

        this._connect(socket, this.raspIp)
      })
      .catch((error) => {
        console.log('Error while creating socket', error)
      })
  }

  _createSocket() {
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

        let idx = 0

        setInterval(() => {
          this._receiveMessage(socket);
        }, 1000)
      })
      .catch((error) => {
        console.log(`Error while connecting to ${ip}`)
      })
  }

  _sendMessage(socket, message) {
    socket.send(message)
      .then(() => {
        console.log('Message sent!')
      })
      .catch((error) => {
        console.log('Error while sending message', error)
      })
  }

  _receiveMessage(socket) {
    socket.recv()
      .then((msg) => {
        console.log(`Message received: ${msg}`)
        this.setState({ logs: [...this.state.logs, msg]})
      })
      .catch((error) => {
        console.log('Error while receiving message', error)
      })
  }

  render() {
    if (this.state.connected) {
      if (this.state.loading) {
        return (
          <View style={styles.container}>
            <Text>{this.state.loading ? "loading" : "not loading"}</Text>
          </View>
        )
      } else {
        return (
          <Container>
            <Button>
              <Text>
                Connected: true
              </Text>
            </Button>

            {
              this.state.logs.map((log, idx) =>
                <Button key={idx}>
                  <Text>{log}</Text>
                </Button>
              )
            }

          </Container>
        )
      }
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.instructions}>
            To get started, edit App.js
          </Text>
          <Text style={styles.instructions}>
            {instructions}
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
