import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from "victory-native";
import { light, lighter, white } from '../../utils/Colors'

export default class App extends React.Component {
  render() {
    let { data } = this.props;

    let delta = 5
    let maxY = Math.max(...data.map(d => d.y)) + delta

    return (
      <VictoryBar
        data={data}
        x="x"
        y="y"
        cornerRadius={2}
        labels={(d) => d.y}
        height={200}
        style={{
          data: { fill: lighter },
          labels: { fill: white, fontSize: 8, fontFamily: 'Lato-Regular' }
        }}
        padding={{ left: 25, right: 25, top: 20, bottom: 30 }}
      />
    );
  }
}


