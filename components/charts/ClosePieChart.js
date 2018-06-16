import React from "react";
import { VictoryTheme, VictoryPie } from "victory-native";

export default class ClosePieChart extends React.Component {
  render() {
    let { data } = this.props;
    
    return (
      <VictoryPie
        width={300}
        height={300}
        theme={VictoryTheme.material}
        data={data}
      />
    );
  }
}


