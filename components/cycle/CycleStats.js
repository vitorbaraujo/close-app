import React from 'react';
import { Container, Content } from 'native-base';
import PieCycleChart from '../charts/PieCycleChart';

export default class CycleStats extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Container>
        <Content>
          <PieCycleChart data={this.props.cycle}/>
        </Content>
      </Container>
    )
  }
}
