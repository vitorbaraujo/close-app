import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, List, Card, CardItem, Body, Right } from 'native-base';
import { getLog } from '../../utils/Logs';
import moment from 'moment';
import CText from '../commons/CText';
import { formattedHour } from '../../utils/DateUtils';

export default class CycleHistory extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      cycle: props.cycle,
    }
  }

  render() {
    let { cycle: { logs } } = this.state;
    return (
      <Container style={{ padding: 10 }}>
          <List
            dataArray={logs.sort((a, b) => b.id - a.id)}
            renderRow={(item) =>
              <Card>
                <CardItem>
                  <Body>
                    <CText text={getLog(item.code)} />
                  </Body>
                  <Right>
                    <CText
                      text={formattedHour(moment(item.ocurred_at))}
                      style={{ fontSize: 12 }}
                    />
                  </Right>
                </CardItem>
              </Card>
            }
          >
          </List>
      </Container>
    )
  }
}
