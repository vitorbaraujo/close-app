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
  Spinner,
} from 'native-base';
import moment from 'moment';
import PTRView from 'react-native-pull-to-refresh';
import CText from '../commons/CText';
import CycleChart from '../charts/CycleChart';
import { get } from '../../utils/Api';
import { goTo } from '../../utils/NavigationUtils';
import { getDuration } from '../../utils/CycleUtils';
import { humanize, formatted } from '../../utils/DateUtils';
import { dark, light, white, green, lighter, medium } from '../../utils/Colors';

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
      lastCycle: null,
      beers: [],
      loading: true,
    }

    console.log('on constructor')

    this.navigation = props.navigation;
  }

  async componentDidMount() {
    try {
      await this._fetchData();
    } catch(error) {
      console.log('error on fetch data');
    }
  }

  _refresh = () => {
    return new Promise(async (resolve) => {
      console.log('heelo there', this.state)
      await this._fetchData();
      setTimeout(() => { resolve() }, 1000)
    });
  }

  async _fetchData() {
    this.setState({ lastCycle: null });

    try {
      let user = await get('users/me/');
      this.setState({ currentUser: user || {} })

      let cycles = await get('users/me/cycles/');
      this.setState({ cycles: cycles || {} });

      let beers = await get('users/me/beers/');
      this.setState({ beers: beers || {} });

      let intervalId = setInterval(async () => {
        let last = await get('users/me/last_cycle/');

        if (last && last.end_time === null) {
          this.setState({ lastCycle: last });
          clearInterval(intervalId);
        }
      }, 3000)

      this.setState({ loading: false })
    } catch(error) {
      console.log('[homepage] error on some get', error);
    }
  }

  _keyExtractor = (item) => item.id.toString();

  _renderItem = ({ item }) => {
    let beer = {};
    if (this.state && this.state.beers) {
      beer = this.state.beers.find(b => b.id === item.beer) || {};
    }
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
            <CText text={cycle.beer.name} />
          </Body>
        </CardItem>
        <CardItem
          style={{ paddingTop: 0 }}
          button
          onPress={() => goTo(this.navigation, 'Cycle', { cycle })}
        >
          <Body>
            <CText
              subtitle
              text={`${getDuration(cycle)}${getDuration(cycle) ? ' de duração' : ''}`}
            />
            <CText
              text={`${cycle.beer_count} garrafa${cycle.beer_count == 1 ? '' : 's'}`}
            />
          </Body>
          <Right>
            <CText text={formatted(moment(cycle.start_time))} />
            <CText
              subsubtitle
              text={humanize(moment(cycle.start_time).toDate())}
            />
          </Right>
        </CardItem>
      </Card>
    );
  }

  render() {
    let { currentUser, cycles, lastCycle, loading } = this.state;

    if (loading) {
      return (
        <Container style={{ backgroundColor: dark }}>
          <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner color={lighter} size="large" />
          </Content>
        </Container>
      )
    }

    return (
      <Container style={{ backgroundColor: dark }}>
        <PTRView onRefresh={this._refresh}>
          {
            lastCycle &&
            <Button
              style={{ backgroundColor: green }}
              onPress={() => goTo(this.navigation, 'Cycle', { cycle: lastCycle, ongoing: true })}
            >
              <CText
                text="Um ciclo está em andamento"
                style={{ color: white, flex: 1 }}
              />
              <Icon
                style={{ color: white }}
                name="arrow-forward"
              />
            </Button>
          }
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
                <View style={styles.profile}>
                  <CText bold text={`${currentUser.first_name} ${currentUser.last_name}`} />
                  <Icon style={styles.profileIcon} type="FontAwesome" name="user" />
                </View>
              </Button>
            </Right>
          </Header>

            {
              cycles.length ?
              (
                <Content padder contentContainerStyle={styles.content}>
                  <CText text="Garrafas fechadas por ciclo" style={{ color: 'white' }} />
                  <CycleChart data={cycles} />
                  <CText text="Últimos ciclos" style={{ color: 'white', marginBottom: 20 }} />
                  <View style={{ flex: 1 }}>
                    <FlatList
                      data={cycles}
                      extraData={this.state}
                      keyExtractor={this._keyExtractor}
                      renderItem={this._renderItem}
                    />
                  </View>
                </Content>
              )
              :
              (
                <Content padder contentContainerStyle={styles.content}>
                  <CText
                    style={{ color: light, fontSize: 25, textAlign: 'center' }}
                    text="Você ainda não tem ciclos de produção"
                  />
                </Content>
              )
            }
        </PTRView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: dark
  },
  content: {
    backgroundColor: dark,
  },
  main: {
    flex: 1,
    backgroundColor: dark,
    justifyContent: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  profileIcon: {
    color: 'white',
    marginLeft: 10,
  },
});
