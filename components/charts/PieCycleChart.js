import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { View } from 'native-base'
import ClosePieChart from './ClosePieChart'
import CText from '../commons/CText';
import { getLog } from '../../utils/Logs';

export default class PieCycleChart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { data } = this.props

        let dataObj = data.logs.reduce(
            (acc, val) => {
                acc[val.code] = (acc[val.code] || 0) + 1
                return acc
            }, {})

        let parsedData = Object.keys(dataObj).map(key => (
                                        {x: parseFloat(((dataObj[key]/data.logs.length)*100)).toFixed(2) + "%",
                                         y: dataObj[key],
                                         code: getLog(parseInt(key))
                                        }))

        return (
            <View style={styles.container}>
                <CText text="Eventos neste ciclo" />
                <CText text={`Total de eventos: ${data.logs.length}`} />
                <ClosePieChart data={parsedData} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
    }
});