import React from "react";
import { VictoryTheme, VictoryPie, VictoryLegend } from "victory-native";
import { View, Badge } from "native-base";
import CText from '../commons/CText'

export default class ClosePieChart extends React.Component {
  render() {
    let { data, legendData } = this.props;
    const colors = ["tomato", "orange", "gold", "cyan", "navy", "red", "blue", "brown" ]

    return (
      <View pointerEvents="none">
        <VictoryPie
          width={300}
          height={300}
          padding={{left: 60, right: 60}}
          theme={VictoryTheme.material}
          colorScale={colors}
          data={data}
        />
        {
          data.map((d, i) => {
            return (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 74 }}>
                <Badge style={{ height: 15, width: 15, backgroundColor: colors[i] }} />
                <CText
                  subtitle
                  text={`${d.code} (${d.y})`}
                  style={{ marginLeft: 5 }}
                />
              </View>
            )
          })
        }
      </View>
    );
  }
}


