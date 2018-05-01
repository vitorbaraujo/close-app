import { StackNavigator } from 'react-navigation'
import Homepage from '../components/Homepage'
import Profile from '../components/Profile'

export default StackNavigator(
  {
    Home: {
      screen: Homepage,
    },
    Profile: {
      screen: Profile,
    }
  },
  {
    initialRouteName: 'Home',
  }
)