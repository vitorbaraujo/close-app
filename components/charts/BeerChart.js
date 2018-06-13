import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

export default class BeerChart extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
    }
    
    async _getData() {
        try {
            console.log('HUE1');
            let url = 'http://60bd4aa3.ngrok.io/' + 'users/me/cycles/';
    
            let response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InplemFvIiwiZXhwIjo0NjgyMDk2MTg3LCJlbWFpbCI6IiJ9.k_yM0yoj29jmaopvt1N2yGcninflw3rLiwtIQJqQUdc'
            }),
            })
            console.log('HUE2');

            let res = await response.json();
            console.log(res);

            return res;
        }
        catch(error) {
            this.setState({ error: JSON.stringify(error) });
        }
    }

    async componentDidMount() {
        let data = await this._getData();
        this.setState({ data: data });
        console.log(this.state.data)
    }

    render() {

        return (
            <VictoryChart
                theme={VictoryTheme.material}
                >
                    <VictoryLine
                        style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"}
                        }}
                        data={[]}
                    />
            </VictoryChart>
        )
    }


}