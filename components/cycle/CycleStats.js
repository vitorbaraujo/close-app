import React from 'react';
import { Container, Content, View } from 'native-base';
import PieCycleChart from '../charts/PieCycleChart';
import CText from '../commons/CText';
import InfoCard from '../commons/InfoCard'
import { green, red } from '../../utils/Colors'

export default class CycleStats extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    let { cycle, average } = this.props;
    let revenue = cycle.beer && cycle.beer.price ? cycle.beer_count * cycle.beer.price : null;

    return (
      <Container>
        <Content padder>
          {
            revenue !== null ?
            <View style={{ flexDirection: 'row' }}>
              <InfoCard
                icon="attach-money"
                type="MaterialIcons"
                text={`R$ ${revenue.toFixed(2)}`}
                iconColor={green}
                subtitle="retorno esperado"
              />
              <InfoCard
                icon={revenue > average ? 'md-arrow-up' : 'md-arrow-down'}
                type="Ionicons"
                  text={`${((revenue > average ? (average ? revenue / average - 1 : 1) : (revenue ? average / revenue - 1 : 1)) * 100).toFixed(2)} %`}
                iconColor={revenue > average ? green : red }
                subtitle="em relação à renda média"
              />
            </View>
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
