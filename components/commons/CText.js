import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';

export default class CText extends Component {
  render() {
    const { text, bold, style, subtitle, subsubtitle } = this.props;

    let textStyle = [{
      fontFamily: bold ? 'Lato-Bold' : 'Lato-Regular',
    }]

    if (subtitle) {
      textStyle = textStyle.concat(styles.subtitle)
    }
    if (subsubtitle) {
      textStyle = textStyle.concat(styles.subsubtitle)
    }
    return (
       <Text style={[...textStyle, style]}>{text}</Text>
    )
  }
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 12,
    color: 'grey',
  },
  subsubtitle: {
    fontSize: 10,
    color: 'grey',
  }
})