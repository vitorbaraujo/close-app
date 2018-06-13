import React, { Component } from 'react';
import { Text } from 'native-base';

export default class CText extends Component {
  render() {
    const { text, bold, style } = this.props;

    return (
      <Text
        style={{ ...style, fontFamily: bold ? 'Lato-Bold' : 'Lato-Regular' }}
      >
        {text}
      </Text>
    )
  }
}