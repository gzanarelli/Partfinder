import React, { Component } from 'react'
import { View, Dimensions } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
const { width, height } = Dimensions.get('screen');

export default class Toasts extends Component {
    render() {
        return(
            <View style={{flex: 1}}>
                <Toast
                    ref="errorsSport"
                    style={{backgroundColor: 'red' , width: width * 0.6}}
                    position='top'
                    positionValue={10}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white'}}
                />
                <Toast
                    ref="errorsDay"
                    style={{backgroundColor: 'red' , width: width * 0.6}}
                    position='top'
                    positionValue={10}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white'}}
                />
                <Toast
                    ref="addSport"
                    style={{backgroundColor:'green', width: width * 0.6}}
                    position='top'
                    positionValue={10}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white', textAlign: 'center'}}
                />
            </View>
        )
    }
}