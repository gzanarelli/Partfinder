import React, { Component } from 'react'
import { Text, View, ScrollView, Dimensions, StyleSheet, Platform, Picker, Alert, RefreshControl, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import ipAddress from '../../../config';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from './DatePicker';
import Toast, {DURATION} from 'react-native-easy-toast';
import Modal from 'react-native-modalbox';
import Sport from './Sport';
import Styles from './Styles/StyleProfil';
import Infos from './Infos';
import StatisticProfil from './StatisticProfil';

// Mettre en place des variables pour les couleurs principales.
// Check une lib d'icones pour les sports
const {width, height} = Dimensions.get('screen');

class Profil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfil: {},
            sportList: [],
            user: 'Sport',
            refreshing: false,
            message: '',
            deleteId: null,
        }
    }

    async componentDidMount () {
        await fetch(`http://${ipAddress}:3000/profil`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({token: this.props.user.token}) 
        })
        .then(res => res.json())
        .then(data => {
            this.setState({userProfil: data.user, sportList: data.user.sport });
        })
    }


    callBackFunction = (childData) => {
        this.setState({deleteId: childData});
    }

    // Reactualise la page Profil
    _onRefresh = () => {
        console.log('Enter function refresh');
        fetch(`http://${ipAddress}:3000/profil`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({token: this.props.user.token}) 
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ userProfil: data.user, sportList: data.user.sport, message: '' });
        });
    }

    // Suppression d'un sport
    deleteSport = async () => {
        this.refs.modalDelete.close();
        console.log('Enter deleteSport', this.state.deleteId);
        await fetch(`http://${ipAddress}:3000/profil/delete-sport/${this.state.deleteId}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({token: this.props.user.token}) 
        })
        .then(res => res.json())
        .then(data => {
            if (data.message) this.setState({ message: data.message });
            this.refs.toast.show(this.state.message, 5000);
        });
        this.setState({ deleteId: null });
        this._onRefresh();
    }

    sportListLength = () => {
        return this.state.sportList.length !== 0 ? this.state.sportList.length : 0;
    }

    toUpp = (data) => {
        return (data[0].toUpperCase() + data.slice(1).toLowerCase());
    };

    render() {

        // Stylisme de l'affichage: First Letter Up then LowerCase


        return (
            <View>
                <Modal style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#241332', padding: 3, display: 'flex', flexDirection: 'column' }} position={"top"} ref={"modalDelete"} swipeArea={20}>
                    <View style={{width:'50%'}}>
                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', width: '100%', borderBottomColor: 'grey', opacity: 0.3, borderBottomWidth: 0.5 }}>
                            <Text style={{width: '100%', textAlign: 'center', color: '#fff',fontSize: 20, fontWeight: 'bold', }} >Would you delete this sport ?</Text>
                        </View>
                    </View>
                    <View style={{width: '100%', height: '30%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20}} >
                        <TouchableHighlight onPress={() => this.deleteSport()} ><Text style={{color: '#fff', fontSize: 25}} >YES</Text></TouchableHighlight>
                        <TouchableHighlight onPress={() => this.refs.modalDelete.close()} ><Text style={{color: '#fff', fontSize: 25}} >NO</Text></TouchableHighlight>
                    </View>
                </Modal>
                <ScrollView style={Styles.scrollView}
                    refreshControl={
                        <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        />
                }>
                    <Toast
                        ref="toast"
                        style={{backgroundColor:'red', width: width * 0.6}}
                        position='center'
                        positionValue={200}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{color:'white', textAlign: 'center'}}
                    />
                        <View style={{backgroundColor: '#4790ED'}}>
                            <Infos
                                userProfilFromParent={ this.state.userProfil }
                                editProfil={ () => this.props.navigation.navigate('EditProfil') }
                                deconnexion={ () => this.props.navigation.navigate('Home') }
                            />
                        </View>
                        
                        <View style={Styles.bloc2}>
                            <StatisticProfil lengthList={this.sportListLength()} />
                        </View>
                        
                        <View style={{ display: 'flex', flexDirection: 'column', width: width, borderBottomLeftRadius: 90, color: '#fff'}}>
                            <Sport sportListFromParent={this.state.sportList} thisProfil={this} parentCallBack={this.callBackFunction} onRefresh={this._onRefresh} />
                        </View>
                </ScrollView>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return { user: state.userToken }
};

export default connect(
    mapStateToProps,
    null
)(Profil);

