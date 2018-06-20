import React, { Component } from 'react';
import moment from 'moment';
import CText from '../commons/CText';
import { Icon } from 'native-base';
import { getLog } from '../../utils/Logs';
import { formattedHour } from '../../utils/DateUtils';
import { View } from 'react-native';
import { grey, green, almostWhite } from '../../utils/Colors';

export default class Log extends Component {
  render() {
    let { log, last } = this.props;
    let msg = getLog(log.code);
    let hour = formattedHour(moment(log.ocurred_at));

    return (
      <View style={{ flexDirection: 'row', height: 50 }}>
        <View style={{ flex: 2, marginTop: 5 }} >
          <Icon type="FontAwesome" name="circle" style={{ color: grey, fontSize: 14, alignSelf: 'center' }} />
          { !last &&
            <View style={{ flex: 1, backgroundColor: almostWhite, width: 2, alignSelf: 'center' }}/>
          }
        </View>
        <View style={{ flex: 14, justifyContent: 'space-between', flexDirection: 'row' }}>
          <CText text={msg} />
          <CText text={hour} subtitle style={{ color: grey, paddingRight: 10 }} />
        </View>
      </View>
    )
  }
}