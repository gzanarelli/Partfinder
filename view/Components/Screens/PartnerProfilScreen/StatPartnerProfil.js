import React, { PureComponent } from 'react'
import { Text, View } from 'react-native';
import Styles from './Styles/StylesStatProfil';

class StatisticProfil extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{display: 'flex', flexDirection: 'row' }}>
                <View>
                    <Text style={Styles.textNumber}>156</Text>
                    <Text style={Styles.text}>FRIENDS</Text>
                </View>
                <Text style={Styles.pipe}> | </Text>
                <View>
                    <Text style={Styles.textNumber}>{ this.props.lengthList }</Text>
                    <Text style={Styles.text}>SPORTS</Text>
                </View>
                <Text style={Styles.pipe}> | </Text>
                <View>
                    <Text style={Styles.textNumber}>1537</Text>
                    <Text style={Styles.text}>LIKES</Text>
                </View>
            </View>
        )
    }
}

export default StatisticProfil