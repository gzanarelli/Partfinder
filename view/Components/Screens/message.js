import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

export default class message extends PureComponent {
    render() {
        return (
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                <Text> Message Page </Text>
            </View>
        )
    }
}
