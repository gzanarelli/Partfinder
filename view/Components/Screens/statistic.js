import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

export default class statistic extends PureComponent {
    render() {
        return (
            <View style={{width: '100%', height: '100%'}} forceInset={{ bottom: 'never' }}>
                <Text> Statistic Page </Text>
            </View>
        )
    }
}
