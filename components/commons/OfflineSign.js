import React, { PureComponent } from 'react';
import { NetInfo } from 'react-native';
import { Button } from 'native-base';
import CText from './CText'
import { white } from '../../utils/Colors'

export default class OfflineSign extends PureComponent {
  state = {
    isConnected: true,
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected })
  }

  render() {
    if (!this.state.isConnected) {
      return (
        <Button
          disabled
          style={{ backgroundColor: 'red' }}
        >
          <CText
            text="Sem conexão à internet"
            style={{ color: white, flex: 1, textAlign: 'center' }}
          />
        </Button>
      )
    }

    return null;
  }
} ;