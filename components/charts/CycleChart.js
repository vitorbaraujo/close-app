import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

export default class CycleChart extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        let { data } = this.props
        let data1 = data.map(cycle => ({ x: data.indexOf(cycle)+1, y: cycle.beer }))
        console.log(data1)
        return (
            <VictoryChart
                height={230}
                width={300}
                >
                    <VictoryLine
                        style={{
                        data: { stroke: "#a00" },
                        parent: { border: "1px solid #ccc"}
                        }}
                        data={data1}
                        
                    />
            </VictoryChart>
        )
    }


}
