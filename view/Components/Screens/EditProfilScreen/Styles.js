import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {
    width,
    height
} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F1F0F2'
    },
    backBlue: {
        position: 'absolute',
        width: width,
        height: height * 0.3,
        backgroundColor: '#4790ED',
        borderBottomLeftRadius: 90
    },
    sign: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: width,
        marginTop: 50,
        marginBottom: 10
    },
    form: {
        width: width * 0.8,
        paddingTop: 5,
        paddingHorizontal: 15,
        marginTop: 5,
        paddingBottom: 30,
        backgroundColor: '#fff',
        borderRadius: 45,
        overflow: 'hidden'
    },
    btnContinue: {
        width: width * 0.8,
        padding: 20,
        width: width * 0.8,
        borderRadius: 52,
        backgroundColor: '#4790ED',
        borderColor: '#665EFF',
        borderWidth: 0.5,
        marginTop: 20,
    },
    text: {
        textAlign: 'center',
        color: '#fff'
    },
    icon: {
        alignSelf: 'flex-end',
        paddingBottom: 12,
        fontSize: 25,
        zIndex: 2,
        position: 'absolute',
        right: '5%',
    },
    iconError: {
        alignSelf: 'flex-end',
        paddingBottom: 25,
        fontSize: 25,
        zIndex: 2,
        position: 'absolute',
        right: '5%'
    },
    errorsMessage: {
        color: 'rgb(213, 0, 0)',
        fontSize: 12,
        textAlign: 'center'
    },
    successMessage: {
        color: '#4790ED',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 8,
        fontWeight: '800'
    }
})