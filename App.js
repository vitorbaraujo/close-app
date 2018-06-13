import React, { Component } from 'react';
import { YellowBox, StatusBar } from 'react-native';
import { Root } from 'native-base';
import { createRootNavigator } from './navigation/Stack'
import { isSignedIn, getToken } from './utils/TokenUtils';
import { dark } from './utils/Colors';

const warningsToIgnore = [
  'Warning: componentWillReceiveProps is deprecated and will be removed in the next major version. Use static getDerivedStateFromProps instead.',
  'Warning: componentWillMount is deprecated and will be removed in the next major version. Use componentDidMount instead. As a temporary workaround, you can rename to UNSAFE_componentWillMount.',
  'Warning: componentWillUpdate is deprecated and will be removed in the next major version. Use componentDidUpdate instead. As a temporary workaround, you can rename to UNSAFE_componentWillUpdate.'
]

YellowBox.ignoreWarnings(warningsToIgnore);

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
        <StatusBar
          backgroundColor={dark}
        />
        <Layout />
      </Root>
    )
  }
}
