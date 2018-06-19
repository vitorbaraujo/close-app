import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container, Button, Header,
  Body, Left, Icon,
  Tabs, Tab, Content, Right
} from 'native-base';
import moment from 'moment';
import PTRView from 'react-native-pull-to-refresh';
import CText from '../commons/CText';
import CycleHistory from './CycleHistory';
import CycleStats from './CycleStats';
import { get } from '../../utils/Api';
import { goTo } from '../../utils/NavigationUtils';
import { getDuration } from '../../utils/CycleUtils';
import { formatted } from '../../utils/DateUtils';
import { white, dark, darker } from '../../utils/Colors'

export default class Cycle extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      cycle: this.props.cycle,
      ongoing: this.props.ongoing || false,
    }

    this.navigation = props.navigation;
  }

  async componentDidMount() {
    try {
      await this._fetchData();
    } catch(error) {
      console.log('[cycle] Error on logs get', error);
    }
  }

  async _fetchData() {
    try {
      let beerId = this.props.cycle.beerId || this.props.cycle.beer;

      let newCycle = await get(`cycles/${this.props.cycle.id}/`)
      let beer = await get(`beers/${newCycle ? newCycle.beer : beerId}/`);
      this.setState({
        cycle: {
          ...this.props.cycle,
          beerId: beer.id,
          beer: beer,
        }
      })

      if (this.props.cycle.end_time === null) {
        let intervalId = setInterval(async () => {
          let cycle = await get(`cycles/${this.state.cycle.id}/`);
          let logs = await get(`cycles/${this.state.cycle.id}/cycle_logs/`);

          curLogs = {}

          this.state.cycle.logs.forEach(l => curLogs[l.id] = l)
          logs.forEach(l => curLogs[l.id] = l)

          let parsedLogs = Object.values(curLogs).sort((a, b) => b.id - a.id)

          this.setState({
            cycle: {
              ...cycle,
              logs: parsedLogs,
            },
          })

          if (this.state.cycle.end_time !== null) {
            clearInterval(intervalId);
          }
        }, 3000)
      }
    } catch(error) {
      console.log('error on fetch data', error)
    }
  }

  _refresh = () => {
    return new Promise(async (resolve) => {
      console.log('refresh on cycle', this.state)
      await this._fetchData();
      setTimeout(() => { resolve() }, 1000)
    });
  }

  _getDuration(cycle) {
    if (cycle.end_time === null) {
      let o = {
        start_time: cycle.start_time,
        end_time: new Date(),
      };
      return getDuration(o);
    }

    return getDuration(cycle);
  }

  render() {
    let { cycle } = this.state;

    return (
      <Container>
          <Header
              androidStatusBarColor={darker}
              style={styles.header}
          >
          <Left>
            <Button
              transparent
              onPress={() => goTo(this.navigation, 'Homepage')}
            >
              <View>
                <Icon name="arrow-back" />
              </View>
            </Button>
          </Left>
          <Body />
          <Right>
            <Button
              transparent
              onPress={() => goTo(this.navigation, 'NewBeer', { cycleId: cycle.id })}
            >
              <View>
                <Icon type="FontAwesome" name="pencil" />
              </View>
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          <View style={styles.main}>
            <PTRView onRefresh={this._refresh} style={{ flex: 1 }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <CText
                  text={cycle.beer_count}
                  style={{ color: white, fontSize: 60 }}
                  />
                <CText
                  text={`garrafa${cycle.beer_count !== 1 ? 's' : ''} fechada${cycle.beer_count !== 1 ? 's' : ''} nesse ciclo`}
                  style={{ color: white }}
                  />
                <CText
                  text={`${cycle.beer.name} (${cycle.beer.type_name})`}
                  style={{ color: white }}
                  />
              </View>
            </PTRView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <CText
                  text="Duração"
                  style={{ color: white }}
                  />
                <CText
                  text={this._getDuration(cycle)}
                  style={{ color: white }}
                />
              </View>
              <View>
                <CText
                  text={formatted(moment(cycle.start_time))}
                  style={{ color: white }}
                />
              </View>
            </View>

          </View>
          <View style={styles.tabs}>
            <Tabs
              initialPage={0}
            >
              <Tab
                heading="Eventos"
                tabStyle={styles.tab}
                activeTabStyle={styles.tab}
                textStyle={styles.tabText}
                activeTextStyle={styles.tabActiveText}
                >
                <CycleHistory logs={cycle.logs} cycleId={cycle.id} />
              </Tab>
              <Tab
                heading="Estatísticas"
                tabStyle={styles.tab}
                activeTabStyle={styles.tab}
                textStyle={styles.tabText}
                activeTextStyle={styles.tabActiveText}
              >
                <CycleStats cycle={cycle} />
              </Tab>
            </Tabs>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: dark,
    elevation: 0
  },
  main: {
    flex: 1,
    backgroundColor: dark,
    paddingLeft: 20,
    paddingRight: 20,
  },
  tabs: {
    flex: 2,
    backgroundColor: white,
  },
  tab: {
    backgroundColor: dark,
  },
  tabText: {
    color: white,
    fontFamily: 'Lato-Regular'
  },
  tabActiveText: {
    color: white,
    fontFamily: 'Lato-Bold'
  }
});
