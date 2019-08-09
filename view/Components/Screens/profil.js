import React, { PureComponent } from 'react'
import { Text, View, ScrollView, Dimensions, StyleSheet, Platform, Picker, Alert, RefreshControl, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import ipAddress from '../../config';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from '../DatePicker';
import Toast, {DURATION} from 'react-native-easy-toast';
import Modal from 'react-native-modalbox';


// Mettre en place des variables pour les couleurs principales.
// Check une lib d'icones pour les sports

const {width, height} = Dimensions.get('screen');

class Profil extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userProfil: {},
            sportList: [],
            user: 'Sport',
            refreshing: false,
            message: '',
            deleteSport: null
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
            this.setState({userProfil: data.user, sportList: data.user.sport});
        })
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
            // console.log('Mes infos sur mon user: ', data);
            this.setState({ userProfil: data.user, sportList: data.user.sport, message: '' });
            // console.log(this.state.userProfil);
        });
    }

    addSport = (message) => {
        this.refs.addSport.show(message, 5000);
    }

    // Suppression d'un sport
    deleteSport = async () => {
        this.refs.modalDelete.close();
        console.log('Enter deleteSport', this.state.deleteSport);
        await fetch(`http://${ipAddress}:3000/profil/delete-sport/${this.state.deleteSport}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({token: this.props.user.token}) 
        })
        .then(res => res.json())
        .then(data => {
            if (data.message) this.setState({ message: data.message });
            this.refs.toast.show(this.state.message, 5000);
        });
        this.setState({ deleteSport: null });
        this._onRefresh();
    }

    sportListLength = () => {
        return this.state.sportList.length !== 0 ? this.state.sportList.length : 0;
    }

    render() {

        // Stylisme de l'affichage: First Letter Up then LowerCase
        const toUpp = (data) => {
            return (data[0].toUpperCase() + data.slice(1).toLowerCase());
        };


        // Selection de la biblioteque d'Icon pour Sports
        const selectIcon = (sport) => {
            switch (sport){
                case 'football' : return <Icon name={Platform.os === 'ios' ? `ios-${sport}` : `md-${sport}`} size={30} color={'#fff'} />
                    break; 
                case 'tennis' : return <Icons name={sport} size={30} color={'#fff'} />
                    break;
                case 'table-tennis' : return <Icons name={sport} size={30} color={'#fff'} />
                    break;
                default: return <Icon name={Platform.os === 'ios' ? `ios-fitness` : `md-fitness`} size={30} color={'#fff'} />;
            }
        }

        // Rajouter les sports et ses dispo provenant de la DB.
        let sportList = this.state.sportList.map((sport, i) => {

            // Rajout des dispos de chacuns des sports
            let avaiList = sport.availability.map((avai, i) => {
                return (
                    <View key={i} style={Styles.availabilityView} >
                        <Text style={Styles.availabilitytext}>{toUpp(avai.day) + ': '}</Text>
                        <Text style={Styles.availabilitytext}>{toUpp(avai.start) + 'H '}</Text>
                        <Text style={Styles.availabilitytext}>{toUpp(avai.stop) + 'H'}</Text>                    
                    </View>
                )
            })

            return (
                <TouchableHighlight key={i} onLongPress={() => {this.refs.modalDelete.open(); this.setState({ deleteSport: i })} } delayLongPress={500} activeOpacity={1} style={{borderBottomLeftRadius: 90}} >
                <View style={Styles.sportList}  >
                    <View style={Styles.sportView}>
                        <Text style={Styles.sportText}>
                            {toUpp(sport.sport)}
                        </Text>
                    </View>
                    <Text style={Styles.pipeSport}> | </Text>
                    <View style={Styles.availabilityList}>
                        {avaiList}
                    </View>
                </View>
                </TouchableHighlight>
            )
        })

        return (
            <View>
                <Modal style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#241332', padding: 3, display: 'flex', flexDirection: 'column' }} position={"top"} ref={"modalDelete"} swipeArea={20}>
                    <View style={{width:'50%'}}>
                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', width: '100%', borderBottomColor: 'grey', opacity: 0.3, borderBottomWidth: 0.5 }}>
                            <Text style={{width: '100%', textAlign: 'center', color: '#fff',fontSize: 20, fontWeight: 'bold', }} >Would you delete this sport ?</Text>
                        </View>
                    </View>
                    <View style={{width: '100%', height: '30%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20}} >
                        <TouchableHighlight onPress={this.deleteSport} ><Text style={{color: '#fff', fontSize: 25}} >YES</Text></TouchableHighlight>
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
                    <Toast
                        ref="addSport"
                        style={{backgroundColor:'green', width: width * 0.6}}
                        position='center'
                        positionValue={200}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{color:'white', textAlign: 'center'}}
                    />
                        <View style={{backgroundColor: '#4790ED'}}>
                            <View style={{display: 'flex', flexDirection: 'column', height: height * 0.35, alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 90, backgroundColor: '#fff'}}>
                                <Avatar
                                    size="xlarge"
                                    rounded
                                    source={require('../../img/profil.jpg')}
                                />
                                <Text style={{ marginTop: 10, fontSize: 24, fontWeight: 'bold', textAlign: 'center'}} >
                                    {this.state.userProfil.username} 
                                    <Icons reverse name={'account-edit'} size={24} style={{color: '#4790ED'}}
                                        onPress={ () => {
                                            console.log(this.props.navigation);
                                            this.props.navigation.navigate('EditProfil')
                                        }} 
                                    /> 
                                </Text>
                                <Text style={{ fontSize: 14, textAlign: 'center'}} >
                                    {
                                        this.state.userProfil.city ?
                                        this.state.userProfil.city + ', ' + 
                                        (this.state.userProfil.zipcode ? this.state.userProfil.zipcode : '') : 
                                        'Pays merveilleux, 90909'
                                    }
                                </Text>
                            </View>

                        </View>
                        
                        <View style={Styles.bloc2}>
                                <View>
                                    <Text style={Styles.textNumber}>156</Text>
                                    <Text style={Styles.text}>FRIENDS</Text>
                                </View>
                                <Text style={Styles.pipe}> | </Text>
                                <View>
                                    <Text style={Styles.textNumber}>{this.sportListLength()}</Text>
                                    <Text style={Styles.text}>SPORTS</Text>
                                </View>
                                <Text style={Styles.pipe}> | </Text>
                                <View>
                                    <Text style={Styles.textNumber}>1537</Text>
                                    <Text style={Styles.text}>LIKES</Text>
                                </View>                        
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'column', width: width, borderBottomLeftRadius: 90, color: '#fff'}}>
                            { sportList }
                            <View style={Styles.sportListAdd}>
                                <DatePicker refresh={this} addSport={this} />
                            </View>
                        </View>
                </ScrollView>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    scrollView: { backgroundColor: "#241332" },
    bloc2: { display: 'flex', flexDirection: 'row', height: height * 0.15, justifyContent: 'space-evenly', alignItems: 'center', borderBottomLeftRadius: 90, backgroundColor: '#4790ED', paddingHorizontal: 70 },
    textNumber: {color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
    text: {color: '#fff', fontSize: 11, textAlign: 'center'},
    pipe: {color: 'rgba(0,0,0, .1)', fontSize: 40, fontWeight: '100' },
    pipeSport: {color: 'rgba(0,0,0, .3)', fontSize: 40, fontWeight: '100' },
    availabilitytext: {fontSize: 12, color: '#fff'},
    availabilityView: {display: 'flex', flexDirection: 'row', paddingLeft: 10,justifyContent: 'flex-start', width: '100%'},
    availabilityList: {display: 'flex', flexDirection: 'column', width: '100%', paddingLeft: 5},
    sportText: {fontSize: 18, color: '#fff'},
    sportView: {width: '40%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    sportList: {borderColor: '#423050', width: '100%', borderBottomLeftRadius: 90, borderLeftWidth: 0.5, borderBottomWidth: 0.5, height: height * 0.15, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '10%' },
    sportListAdd: { width: '100%', height: height * 0.3, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }
})

function mapStateToProps(state) {
    return { user: state.userToken }
};
  

export default connect(
    mapStateToProps,
    null
)(Profil);

