import { StackNavigator } from 'react-navigation'
import Homepage from '../components/homepage/Homepage'
import Profile from '../components/profile/Profile'
import Cycle from '../components/cycle/Cycle'

export default StackNavigator(
  {
    Homepage: {
      screen: Homepage,
    },
    Profile: {
      screen: Profile,
    },
    Cycle: {
      screen: Cycle,
    }
  },
  {
    initialRouteName: 'Homepage',
  }
)