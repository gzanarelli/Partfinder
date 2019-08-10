import {
    StyleSheet,
    Dimensions
} from 'react-native';
let {
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
        height: height * 0.4,
        width: width * 0.8,
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 5,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 45
    },
    btnContinue: {
        width: '100%',
        padding: 20,
        width: width * 0.8,
        borderRadius: 52,
        backgroundColor: '#4790ED',
        borderColor: '#665EFF',
        borderWidth: 1,
        marginTop: 20
    },
    text: {
        textAlign: 'center',
        color: '#fff'
    },
    btnNone: {
        borderRadius: 52,
        backgroundColor: '#4790ED',
        marginLeft: 20
    },
    btnTextNone: {
        fontSize: 12,
        fontWeight: '800',
        color: '#fff',
        borderRadius: 52,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    btnActive: {
        borderRadius: 52,
    },
    btnTextActive: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '800',
        opacity: 0.6,
        borderRadius: 52,
        paddingHorizontal: 15,
        paddingVertical: 10,
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
})