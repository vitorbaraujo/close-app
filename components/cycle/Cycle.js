import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container, Button, Text, Header,
  Body, Left, Right, Icon,
  Tabs, Tab
} from 'native-base';
import CycleHistory from './CycleHistory';
import CycleStats from './CycleStats';

export default class Cycle extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor() {
    super();
  }

  componentWillMount() {
    console.log('PROOOOOPS', this.props);
  }

  _goTo(path) {
    this.props.navigation.navigate(path)
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <View style={styles.main}>
            <Header style={styles.header}>
              <Left>
                <Button
                  transparent
                  onPress={() => this._goTo('Homepage')}
                >
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body />
            </Header>
            <Text>{this.props.cycle.beer}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Tabs
              initialPage={0}
            >
              <Tab
                heading="Estatísticas"
                tabStyle={styles.tab}
                activeTabStyle={styles.tab}
                textStyle={{ color: 'white' }}
              >
                <CycleStats />
              </Tab>
              <Tab
                heading="Histórico"
                tabStyle={styles.tab}
                activeTabStyle={styles.tab}
                textStyle={{ color: 'white' }}
              >
                <CycleHistory />
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
  }
});
