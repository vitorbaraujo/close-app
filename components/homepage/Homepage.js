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
  Card,
  CardItem,
  Content,
} from 'native-base';
import { StackNavigator } from 'react-navigation';
import { getToken } from '../../utils/TokenUtils';
import { goTo } from '../../utils/NavigationUtils';
import { get } from '../../utils/Api';
import moment from 'moment';
import TimeAgo from 'javascript-time-ago';
import pt from 'javascript-time-ago/locale/pt'

export default class Homepage extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      loading: true,
      currentUser: {},
      networkSsid: '',
      networkPass: '',
      cycles: [],
      beers: [],
    }

    this.navigation = props.navigation;
    TimeAgo.locale(pt);
    this.timeAgo = new TimeAgo('pt-BR')
  }

  async componentDidMount() {
    try {
      let user = await get('users/me/');
      this.setState({ currentUser: user })

      let cycles = await get('users/me/cycles/');
      this.setState({ cycles });

      let beers = await get('users/me/beers/');
      this.setState({ beers });
    } catch(error) {
      console.log('error on get', error);
    }
  }

  _getDuration = ({ start_time, end_time }) => {
    let start = moment(start_time);
    let end = moment(end_time);
    let diff = end.diff(start, 'minutes');
    let hours = Math.floor(diff / 60);
    let minutes = diff % 60;
    let hourString = hours > 0 ? `${hours} hora${hours !== 1 ? 's' : ''}` : '';
    let minuteString = minutes > 0 ? `${minutes} minuto${minutes !== 1 ? 's' : ''}` : '';
    let result = ''
    if (hourString && minuteString) {
      result = `${hourString} e ${minuteString} de duração`
    } else if (hourString) {
      result = `${hourString} de duração`
    } else if (minuteString) {
      result = `${minuteString} de duração`
    }

    return result;
  }

  _keyExtractor = (item) => item.id.toString();

  _renderItem = ({ item }) => {
    const beer = this.state.beers.find(b => b.id === item.beer) || {};
    let cycle = item || {};

    cycle = {
      ...cycle,
      beer,
    };

    return (
      <Card>
        <CardItem
          header
          button
          onPress={() => goTo(this.navigation, 'Cycle', { cycle })}
        >
          <Body>
            <Text style={{ fontWeight: 'normal' }}>{cycle.beer.name}</Text>
          </Body>
        </CardItem>
        <CardItem
          style={{ paddingTop: 0 }}
          button
          onPress={() => goTo(this.navigation, 'Cycle', { cycle })}
        >
          <Body>
            <Text style={{ fontSize: 12, color: 'grey' }}>{this._getDuration(cycle)}</Text>
            <Text style={{ fontWeight: 'normal' }}>{cycle.beer_count} garrafa{cycle.beer_count == 1 ? '' : 's'}</Text>
          </Body>
          <Right>
            <Text>{moment(cycle.start_time).format('DD/MM/YY')}</Text>
            <Text style={{ fontSize: 10, color: 'grey' }}>{this.timeAgo.format(moment(cycle.start_time).toDate())}</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }

  render() {
    let { currentUser } = this.state;

    return (
      <Container>
        <View style={styles.container}>
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
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Text style={styles.profileText} uppercase={false}>{currentUser.first_name} {currentUser.last_name}</Text>
                  <Icon style={styles.profileIcon} type="FontAwesome" name="user" />
                </View>
              </Button>
            </Right>
          </Header>
          <Content contentContainerStyle={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#eca72c' }}>
            </View>
            <View style={styles.timeline}>
              <FlatList
                data={this.state.cycles}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>
          </Content>
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
    flex: 3,
    padding: 10,
    paddingBottom: 0,
  },
});
