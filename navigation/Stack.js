import React from 'react';
import { StackNavigator } from 'react-navigation'
import Homepage from '../components/homepage/Homepage'
import Profile from '../components/profile/Profile'
import Cycle from '../components/cycle/Cycle'

const mapNavigationStateParamsToProps = (SomeComponent) => {
  return class extends React.Component {
    static navigationOptions = SomeComponent.navigationOptions;
    render() {
      const { navigation: { state: { params } } } = this.props;
      return <SomeComponent {...params} {...this.props} />
    }
  }
}

export default StackNavigator(
  {
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
)