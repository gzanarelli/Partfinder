import React, {Component} from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet, Platform, Picker, Alert, RefreshControl, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from './DatePicker';
import Styles from './StylesSport';
const {width, height} = Dimensions.get('screen');

export default class Sport extends Component {
    constructor(props) {
        super(props);
        this.state ={
            deleteSport: null
        }
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

        // // Rajouter les sports et ses dispo provenant de la DB.

        let sportList = this.props.sportListFromParent.map((sport, i) => {

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
                <TouchableHighlight key={i} onLongPress={() => {this.props.thisProfil.refs.modalDelete.open(); this.props.parentCallBack(i)} } delayLongPress={500} activeOpacity={1} style={{borderBottomLeftRadius: 90}} >
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
        });


        return (
            <View style={{ display: 'flex', flexDirection: 'column', width: width, borderBottomLeftRadius: 90, color: '#fff'}}>
                { sportList }
                <View style={Styles.sportListAdd}>
                    <DatePicker thisSport={this} _onRefresh={this.props.onRefresh} />
                </View>
            </View>
        )
    }
}
