import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Container, Content, Icon, Button, Header, Body, Left, Right, Spinner } from 'native-base';
import PTRView from 'react-native-pull-to-refresh';
import CText from '../commons/CText';
import CycleChart from '../charts/CycleChart';
import { get } from '../../utils/Api';
import { goTo } from '../../utils/NavigationUtils';
import { dark, darker, light, white, green, lighter } from '../../utils/Colors';
import CycleCard from './CycleCard';
import InfoCard from '../commons/InfoCard';

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
      beerAverage: 0,
      revenueAverage: 0,
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
      console.log('refresh on homepage', this.state)
      await this._fetchData();
      setTimeout(() => { resolve() }, 1000)
    });
  }

  async _fetchData() {
    this.setState({ lastCycle: null });

    try {
      let user = await get('users/me/');
      let beers = await get('users/me/beers/');
      let cycles = await get('users/me/cycles/');

      cycles = cycles.map(c => {
        return {
          ...c,
          beerId: c.beer,
          beer: beers.find(b => b.id === c.beer)
        }
      })

      let beerAverage = cycles.reduce((a, b) => {
        a += b.beer_count
        return a
      }, 0)

      let revenueAverage = cycles.reduce((a, b) => {
        a += b.beer_count * (b.beer && b.beer.price ? b.beer.price : 0)
        return a
      }, 0)

      beerAverage = beerAverage / cycles.length;
      revenueAverage = revenueAverage / cycles.length;

      this.setState({ beers, cycles, currentUser: user, beerAverage, revenueAverage });

      let intervalId = setInterval(async () => {
        let last = await get('users/me/last_cycle/');

        if (last && last.end_time === null) {
          this.setState({ lastCycle: last });
          clearInterval(intervalId);
        }
      }, 2000)

      this.setState({ loading: false })
    } catch(error) {
      console.log('[homepage] error on some get', error);
    }
  }

  _keyExtractor = (item) => item.id.toString();

  _renderItem = ({ item }) => {
    let cycle = item || {};
    return <CycleCard cycle={cycle} navigation={this.navigation} average={this.state.revenueAverage} />
  }

  render() {
    let { currentUser, cycles, lastCycle, loading, beerAverage, revenueAverage } = this.state;

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
            androidStatusBarColor={darker}
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
                  <CycleChart data={[...cycles]} />

                  <View style={{ flexDirection: 'row' }}>
                    <InfoCard
                      icon="md-beer"
                      type="Ionicons"
                      text={Math.floor(beerAverage)}
                      iconColor={lighter}
                      subtitle="média de garrafas fechadas"
                    />
                    <InfoCard
                      icon="attach-money"
                      type="MaterialIcons"
                      text={`R$ ${revenueAverage.toFixed(2)}`}
                      iconColor={green}
                      subtitle="renda média"
                    />
                  </View>

                  <CText text="Últimos ciclos" style={{ color: 'white', marginTop: 20, marginBottom: 20 }} />
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
