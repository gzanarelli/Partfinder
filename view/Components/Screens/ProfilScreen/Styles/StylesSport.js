import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {
    width,
    height
} = Dimensions.get('screen');

export default StyleSheet.create({
    pipeSport: {
        color: 'rgba(0,0,0, .3)',
        fontSize: 40,
        fontWeight: '100'
    },
    availabilitytext: {
        fontSize: 12,
        color: '#fff'
    },
    availabilityView: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        justifyContent: 'flex-start',
        width: '100%'
    },
    availabilityList: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingLeft: 5
    },
    sportText: {
        fontSize: 18,
        color: '#fff'
    },
    sportView: {
        width: '40%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sportList: {
        borderColor: '#423050',
        width: '100%',
        borderBottomLeftRadius: 90,
        borderLeftWidth: 0.5,
        borderBottomWidth: 0.5,
        height: height * 0.15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '10%'
    },
    sportListAdd: {
        width: '100%',
        height: height * 0.3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }

})