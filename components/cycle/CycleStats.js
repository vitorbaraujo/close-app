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
    let revenue = cycle.beer && cycle.beer.price ? cycle.beer_count * cycle.beer.price : null;

    return (
      <Container>
        <Content padder>
          {
            revenue !== null ?
            <CText
              text={`Retorno esperado: R$ ${revenue.toFixed(2)}`}
              style={{ textAlign: 'center' }}
            />
            : null
          }
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
