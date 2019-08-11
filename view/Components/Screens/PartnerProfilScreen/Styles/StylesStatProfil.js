import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {
    width,
    height
} = Dimensions.get('screen');

export default StyleSheet.create({
    textNumber: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 11,
        textAlign: 'center'
    },
    pipe: {
        color: 'rgba(0,0,0, .1)',
        fontSize: 40,
        fontWeight: '100'
    }
});