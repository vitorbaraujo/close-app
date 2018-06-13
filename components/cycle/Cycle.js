import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container, Button, Header,
  Body, Left, Icon,
  Tabs, Tab
} from 'native-base';
import moment from 'moment';
import CText from '../commons/CText';
import CycleHistory from './CycleHistory';
import CycleStats from './CycleStats';
import { goTo } from '../../utils/NavigationUtils';
import { getDuration } from '../../utils/CycleUtils';
import { formatted } from '../../utils/DateUtils';

export default class Cycle extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      cycle: this.props.cycle || defaultCycle,
    }

    this.navigation = props.navigation;
  }

  render() {
    let { cycle } = this.state;

    return (
      <Container>
        <View style={styles.container}>
          <View style={styles.main}>
            <Header style={styles.header}>
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
            </Header>
            <CText text={cycle.beer_count} />
            <CText
              text={`garrafa${cycle.beer_count !== 1 ? 's' : ''} fechada${cycle.beer_count !== 1 ? 's' : ''} nesse ciclo`}
            />
            <CText text={formatted(moment(cycle.start_time))} />
            <CText text="Duração" />
            <CText text={getDuration(cycle)} />
          </View>
          <View style={styles.profileInfo}>
            <Tabs
              initialPage={0}
            >
              <Tab
                heading="Estatísticas"
                tabStyle={styles.tab}
                activeTabStyle={styles.tab}
                textStyle={styles.tabText}
                activeTextStyle={styles.tabActiveText}
              >
                <CycleStats cycle={cycle} />
              </Tab>
              <Tab
                heading="Histórico"
                tabStyle={styles.tab}
                activeTabStyle={styles.tab}
                textStyle={styles.tabText}
                activeTextStyle={styles.tabActiveText}
              >
                <CycleHistory cycle={cycle} />
              </Tab>
            </Tabs>
          </View>
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
    backgroundColor: '#eca72c',
    elevation: 0
  },
  profileInfo: {
    flex: 2,
  },
  tab: {
    backgroundColor: '#eca72c'
  },
  tabText: {
    color: 'white',
    fontFamily: 'Lato-Regular'
  },
  tabActiveText: {
    color: 'white',
    fontFamily: 'Lato-Bold'
  }
});
