import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Button, Text } from 'native-base';
import { StackNavigator } from 'react-navigation';

export default class Homepage extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Container style={styles.container}>
        <Button>
          <Text>
            Homepage
          </Text>
        </Button>
        <Button
          onPress={() => this.props.navigation.navigate('Profile')}
        >
          <Text>
            Go to Details
          </Text>
        </Button>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
