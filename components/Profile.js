import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Button, Text } from 'native-base';

export default class Profile extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Container style={styles.container}>
        <Button
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text>
            Profile
          </Text>
        </Button>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});