import React, { PureComponent } from 'react'
import { Text, View, ScrollView, Dimensions, StyleSheet, Platform, Picker, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import ipAddress from '../../config';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from '../DatePicker';

// Mettre en place des variables pour les couleurs principales.
// Check une lib d'icones pour les sports

const {width, height} = Dimensions.get('screen');

class Profil extends PureComponent {
    constructor() {
        super();
        this.state = {
            userProfil: {},
            sportList: [],
            user: 'Sport'
        }
    }

    async componentDidMount () {
        // console.log(this.props.user.token);
        await fetch(`http://${ipAddress}:3000/profil`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({token: this.props.user.token}) 
        })
        .then(res => res.json())
        .then(data => {
            // console.log('Mes infos sur mon user: ', data);
            this.setState({userProfil: data.user, sportList: data.user.sport});
            console.log(this.state.userProfil);
        })
        this.props.view();
    }

    updateUser = (user) => {
        this.setState({ user: user })
     }

    promptSport = () => {
        const title = 'Time to choose!';
        const message = 'Please make your selection.';
        const buttons = [
            { text: 'Cancel', type: 'cancel' },
            { text: 'Option A', onPress: () => this.setState({userSelection: 'Option A'}) },
            { text: 'Option B', onPress: () => this.setState({userSelection: 'Option B'}) }
        ];
        Alert.alert(title, message, buttons);
    }

    render() {

        const toUpp = (data) => {
            return (data[0].toUpperCase() + data.slice(1).toLowerCase());
        };

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

        let sportList = this.state.sportList.map((sport, i) => {
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
                <View key={i} style={Styles.sportList}>
                    <View style={Styles.sportView}>
                        <Text style={Styles.sportText}>
                            {toUpp(sport.sport)}
                        </Text>
                        {/* <Avatar
                            containerStyle={{backgroundColor: '#241332', opacity: 0.4}}
                            size="small"
                            rounded
                            icon={{name: `ios-${sport.sport}`, type: 'ionicon', color: '#7f8c8d'}}
                        /> */}
                        {/* <View>{selectIcon(sport.sport)}</View> */}
                    </View>
                    <Text style={Styles.pipeSport}> | </Text>
                    <View style={Styles.availabilityList}>
                        {avaiList}
                    </View>
                </View>
            )
        })

        let lengthList = sportList.length;
        return (
            <ScrollView style={Styles.scrollView}>
                <View style={{maxHeight: height * 0.5 + height * 0.15 * (lengthList + 2)}}>
                    
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
                                <Text style={Styles.textNumber}>6</Text>
                                <Text style={Styles.text}>SPORTS</Text>
                            </View>
                            <Text style={Styles.pipe}> | </Text>
                            <View>
                                <Text style={Styles.textNumber}>1537</Text>
                                <Text style={Styles.text}>LIKES</Text>
                            </View>                        
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'column', height: height, width: width, borderBottomLeftRadius: 90, color: '#fff'}}>
                        { sportList }
                        <View style={Styles.sportListAdd}>
                            <DatePicker />
                            {/* <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}>
                                <Picker.Item label = "Steve" value = "steve" />
                                <Picker.Item label = "Ellen" value = "ellen" />
                                <Picker.Item label = "Maria" value = "maria" />
                            </Picker>
                            <Text style = {{alignSelf: 'center', fontSize: 25, color: '#fff'}}>{this.state.user}</Text> */}
                        </View>
                    </View>
                </View>
            </ScrollView>
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
    sportListAdd: { borderColor: '#423050', width: '100%', borderBottomLeftRadius: 90, borderLeftWidth: 0.5, borderBottomWidth: 0.5, height: height * 0.3, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }
})

function mapStateToProps(state) {
    return { user: state.userToken }
};
  

function mapDispatchToProps(dispatch) {
    return {
        view: function() {
            dispatch({
                type: 'areaView',
                page: false
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profil);

