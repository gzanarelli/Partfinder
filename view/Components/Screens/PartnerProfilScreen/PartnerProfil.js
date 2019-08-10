import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class PartnerProfil extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        
    }


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text> Partner Profil </Text>
            </View>
        )
    }
}

export default PartnerProfil
