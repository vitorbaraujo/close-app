import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import {
  Container,
  Icon,
  Button,
  Header,
  Body,
  Left,
  Right,
  Card,
  CardItem,
  Content,
} from 'native-base';
import moment from 'moment';
import CText from '../commons/CText';
import { goTo } from '../../utils/NavigationUtils';
import { get } from '../../utils/Api';
import { getDuration } from '../../utils/CycleUtils';
import { humanize, formatted } from '../../utils/DateUtils';

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
            <CText
              text={cycle.beer.name}
              style={{ fontFamily: 'Lato-Regular' }}
            />
          </Body>
        </CardItem>
        <CardItem
          style={{ paddingTop: 0 }}
          button
          onPress={() => goTo(this.navigation, 'Cycle', { cycle })}
        >
          <Body>
            <CText
              text={`${getDuration(cycle)}${getDuration(cycle) ? ' de duração' : ''}`}
              style={{ fontSize: 12, color: 'grey' }}
            />
            <CText
              text={`${cycle.beer_count} garrafa${cycle.beer_count == 1 ? '' : 's'}`}
              style={{ fontWeight: 'normal' }}
            />
          </Body>
          <Right>
            <CText text={formatted(moment(cycle.start_time))} />
            <CText
              text={humanize(moment(cycle.start_time).toDate())}
              style={{ fontSize: 10, color: 'grey' }}
            />
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
                  <CText bold text={`${currentUser.first_name} ${currentUser.last_name}`} />
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
