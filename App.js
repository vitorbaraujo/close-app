import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableHighlight,
  YellowBox
} from 'react-native';
import { Root } from 'native-base';
import { Container, Button, Text } from 'native-base';
import { createRootNavigator } from './navigation/Stack'
import Login from './components/login/Login'
import { isSignedIn, getToken } from './utils/TokenUtils';

const warningsToIgnore = [
  'Warning: componentWillReceiveProps is deprecated and will be removed in the next major version. Use static getDerivedStateFromProps instead.',
  'Warning: componentWillMount is deprecated and will be removed in the next major version. Use componentDidMount instead. As a temporary workaround, you can rename to UNSAFE_componentWillMount.',
  'Warning: componentWillUpdate is deprecated and will be removed in the next major version. Use componentDidUpdate instead. As a temporary workaround, you can rename to UNSAFE_componentWillUpdate.'
]

YellowBox.ignoreWarnings(warningsToIgnore);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
    }
  }

  async componentDidMount() {
    try {
      let signed = await isSignedIn();
      if (signed) {
        let token = await getToken();
        console.log('token', token);
        this.setState({ signedIn: true })
      } else {
        console.log('not signed in')
      }
    } catch(error) {
      console.log('error', error);
    }
  }

  render() {
    const Layout = createRootNavigator(this.state.signedIn);

    return (
      <Root>
        <Layout />
      </Root>
    )
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
