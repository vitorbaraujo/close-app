import React from 'react';
import { Container, Content } from 'native-base';
import PieCycleChart from '../charts/PieCycleChart';
import CText from '../commons/CText';

export default class CycleStats extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    let { cycle } = this.props;

    return (
      <Container>
        <Content padder>
          {
            cycle.logs.length ?
              (<PieCycleChart data={cycle} />) :
              (
                <CText
                  text="Ainda não há eventos para este ciclo"
                  style={{ textAlign: 'center' }}
                />
              )
          }
        </Content>
      </Container>
    )
  }
}
