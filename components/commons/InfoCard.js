import React, { Component } from 'react';
import CText from './CText';
import { Card, CardItem, Body, Icon, View } from 'native-base';

export default class InfoCard extends Component {
    render() {
        let { icon, text, subtitle, type, iconColor } = this.props;

        return (
            <Card>
                <CardItem>
                    <Body style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon type={type} name={icon} style={{ color: iconColor, marginRight: 5 }} />
                            <CText text={text} />
                        </View>
                        <View>
                            <CText subsubtitle text={subtitle} />
                        </View>
                    </Body>
                </CardItem>
            </Card>
        )
    }
}
