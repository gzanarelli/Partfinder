import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {
    width,
    height
} = Dimensions.get('screen');

export default StyleSheet.create({
    scrollView: {
        backgroundColor: "#241332"
    },
    bloc2: {
        display: 'flex',
        flexDirection: 'row',
        height: height * 0.15,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottomLeftRadius: 90,
        backgroundColor: '#4790ED',
        paddingHorizontal: 70
    },
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
    },
})