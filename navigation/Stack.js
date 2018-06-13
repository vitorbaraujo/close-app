import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation'
import Homepage from '../components/homepage/Homepage'
import Profile from '../components/profile/Profile'
import Cycle from '../components/cycle/Cycle'
import Login from '../components/login/Login'
import Register from '../components/login/Register'
import SendRasp from '../components/SendRasp'

const mapNavigationStateParamsToProps = (SomeComponent) => {
  return class extends React.Component {
    static navigationOptions = SomeComponent.navigationOptions;
    render() {
      const { navigation: { state: { params } } } = this.props;
      return <SomeComponent {...params} {...this.props} />
    }
  }
}

export const SignedOut = createStackNavigator(
  {
  Register: {
    screen: mapNavigationStateParamsToProps(Register),
  },
    Login: {
      screen: mapNavigationStateParamsToProps(Login),
    },
  },
  {
    initialRouteName: 'Login',
  }
);

export const SignedIn = createStackNavigator(
  {
    SendRasp: {
      screen: mapNavigationStateParamsToProps(SendRasp),
    },
    Homepage: {
      screen: mapNavigationStateParamsToProps(Homepage),
    },
    Profile: {
      screen: mapNavigationStateParamsToProps(Profile),
    },
    Cycle: {
      screen: mapNavigationStateParamsToProps(Cycle),
    },
  },
  {
    initialRouteName: 'Homepage',
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  );
};