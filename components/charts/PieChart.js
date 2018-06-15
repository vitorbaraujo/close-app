import React from 'react';
import { VictoryPie, VictoryTheme} from "victory-native";
import { View } from 'react-native';

export default class PieChart extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        let { data } = this.props
        return (
            <VictoryPie
                theme={VictoryTheme.material}
                data={data}
            />
        )
    }
}
