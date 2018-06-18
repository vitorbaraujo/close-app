import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { View } from 'native-base'
import CloseBarChart from './CloseBarChart'
import { white } from '../../utils/Colors'

export default class CycleChart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { data } = this.props
        let parsedData = data.sort((a, b) => a.id - b.id).map((cycle, index) => ({ x: index + 1, y: cycle.beer_count }))

        return (
            <View style={styles.container}>
                <CloseBarChart data={parsedData} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});