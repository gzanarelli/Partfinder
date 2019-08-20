import {
    StyleSheet,
    Platform
} from 'react-native';

export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    txtToast: {
        color: 'white',
        textAlign: 'center'
    },
    containerModal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4790ED',
        padding: 3,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 10
    },
    viewModal: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%'
    },
    viewTitle: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderBottomColor: 'grey',
        opacity: 0.3,
        borderBottomWidth: 0.5
    },
    txtTitle: {
        width: '100%',
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewPicker: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewArrowForward: {
        width: '25%',
        height: '30%',
        position: 'absolute',
        justifyContent: 'center',
        right: 0,
        alignItems: 'center'
    },
    viewArrowBack: {
        width: '25%',
        height: '30%',
        position: 'absolute',
        justifyContent: 'center',
        left: 0,
        alignItems: 'center'
    },
    viewConfirm: {
        borderColor: '#fff',
        borderWidth: 0.5,
        borderRadius: 90,
        padding: 10
    },
    txtConfirm: {
        color: '#fff',
        fontSize: 20
    },
})