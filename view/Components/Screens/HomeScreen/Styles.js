import {
    StyleSheet,
    Dimensions,
    Platform,
    StatusBar
} from 'react-native';
let { height, width } = Dimensions.get('window');
if(Platform.OS === 'android')
    height -= StatusBar.currentHeight;
export default StyleSheet.create({
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        paddingLeft: 100,
        paddingRight: 100,
        marginTop: height * 0.55
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
        paddingTop: 20,
        paddingLeft: 80,
        paddingRight: 80,
        marginBottom: 20
    },
    signin: {
        bottom: '0%',
        backgroundColor: '#9599B3',
        width: width,
        height: height * 0.24,
        borderStyle: 'solid',
        borderColor: '#9599B3',
        borderTopLeftRadius: 70,
        justifyContent: 'center',
    },
    signup: {
        bottom: '0%',
        backgroundColor: '#241332',
        width: width,
        height: height * 0.12,
        borderStyle: 'solid',
        borderColor: '#9599B3',
        borderTopLeftRadius: 70,
        position: 'absolute',
        justifyContent: 'center'
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 14,
        fontWeight: '700'
    },
    btnSignin: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        top: '-25%'
    },
    viewBtn: {
        display: 'flex',
        flexDirection: 'column'
    },
    image: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        resizeMode: 'stretch',
        width: '100%',
        height: '100%',
    },
});