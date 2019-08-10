import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {
    width,
    height
} = Dimensions.get('screen');

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: height * 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 90,
        backgroundColor: '#fff'
    },
    txtName: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    txtCity: {
        fontSize: 14,
        textAlign: 'center'
    }
})