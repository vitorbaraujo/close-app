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
import { dark, light, white } from '../../utils/Colors'

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
    let { currentUser, cycles } = this.state;

    return (
      <Container>
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
        <Content contentContainerStyle={styles.content}>
          <View style={styles.main}>
          </View>
          <View style={styles.timeline}>
            {
             cycles.length ?
                (
                  <FlatList
                    data={cycles}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                ) :
                (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <CText
                      style={{ color: light, fontSize: 25, textAlign: 'center' }}
                      text="Você ainda não tem ciclos de produção"
                    />
                  </View>
                )
            }
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: dark
  },
  content: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: dark
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  profileIcon: {
    color: 'white',
    marginLeft: 10,
  },
  timeline: {
    flex: 3,
    backgroundColor: white,
    padding: 10,
    paddingBottom: 0,
  },
});
