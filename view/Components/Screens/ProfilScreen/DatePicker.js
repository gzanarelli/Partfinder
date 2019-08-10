import React, { PureComponent } from 'react'
import { Text, View, Alert, ScrollView, Dimensions, TouchableHighlight, Button, Picker } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import ipAddress from '../../../config';
import Toast, {DURATION} from 'react-native-easy-toast';
import Sport from '../../../utils/sportList';
import Day from '../../../utils/dayList';
const { width, height } = Dimensions.get('screen');


class DatePicker extends PureComponent {
    constructor(props) {
        super(props);
        this.state =({
            sport: '',
            day: '',
            startH: '',
            startM: '',
            stopH: '',
            stopM: '',
            errors: {},
            message: ''
        })
    }


    renderList() {
        var list = [];
        for (var i=0;i<Sport.length;i++) {
          list.push(<Picker.Item label={Sport[i]} value={Sport[i]} color={'#fff'} key={i} />);
        }
        return list
    }
    

    renderListDay() {
        var list = [];
        for (var i=0;i<Day.length;i++) {
          list.push(<Picker.Item color={'#fff'} label={Day[i]} value={Day[i]} key={i} />);
        }
    
        return list;
    }

    renderListHours() {
        var list = [];
    
        for (var i=0;i<25;i++) {
          list.push(<Picker.Item color={'#fff'} label={i} value={i} key={i} />);
        }
    
        return list;
    }

    renderListMinutes() {
        var list = [];
    
        for (var i=0;i<4;i++) {
          list.push(<Picker.Item color={'#fff'} label={i * 15} value={i * 15} key={i} />);
        }
    
        return list;
    }

    handleSubmit = async () => {

        let data = {
            sport: this.state.sport,
            day: this.state.day,
            start: (this.state.startH ? this.state.startH : '00') + ':' + (this.state.startM ? this.state.startM : '00') ,
            stop: (this.state.stopH ? this.state.stopH : '00') + ':' + (this.state.stopM ? this.state.stopM : '00') ,
        }

        // console.log(data);
        await fetch(`http://${ipAddress}:3000/profil/sport-add`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ token: this.props.user.token, data })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.errors) {
                this.setState({ errors: data.errors });
                console.log(this.state.errors.sport);
                this.state.errors.day ? this.refs.errors.show(this.state.errors.day, 5000) : '' ;
                this.state.errors.sport ? this.refs.errors.show(this.state.errors.sport, 5000) : '' ;
                this.state.errors.message ? this.refs.errors.show(this.state.errors.message, 5000) : '';
            }

            else {
                this.setState({ message: data.message });
                // Execute le toaster dans le parent Profil lors de l'ajout d'un sport
                this.refs.addSport.show(this.state.message);
            }
        });
        // Execute la function _onRefresh dans le parent Profil
        this.props._onRefresh();
        // console.log('existe t il', this.props.thisSport.thisProfil);
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>

                <Toast
                    ref="errors"
                    style={{backgroundColor: 'red' , width: width * 0.6}}
                    position='top'
                    positionValue={10}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white', textAlign: 'center'}}
                />
                <Toast
                        ref="addSport"
                        style={{backgroundColor:'green', width: width * 0.6}}
                        position='top'
                        positionValue={10}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{color:'white', textAlign: 'center'}}
                />
                <Icons name={'plus-circle-outline'} size={50} color={'#fff'} onPress={ () => {this.refs.modal1.open(); this.setState({errors: {}})} } />

                <Modal style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#241332', padding: 3, display: 'flex', flexDirection: 'row' }} position={"top"} ref={"modal1"} swipeArea={20}>
                    <View style={{display: 'flex', flexDirection: 'column', width:'50%'}}>
                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', width: '100%', borderBottomColor: 'grey', opacity: 0.3, borderBottomWidth: 0.5 }}>
                            <Text style={{width: '100%', textAlign: 'center', color: '#fff',fontSize: 20, fontWeight: 'bold', }} >SPORT</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, alignItems: 'center', justifyContent: 'center' }} >
                            <Picker style={{ width: width * 0.5,  }} selectedValue={this.state.sport} onValueChange={(itemValue, itemIndex) => this.setState({sport: itemValue})} >
                                {this.renderList()}
                            </Picker>
                        </View>
                    </View>
                    <View style={{width: '25%', height: '30%', position: 'absolute', justifyContent: 'center', right: 0, alignItems: 'center'}} >
                        <Icon name={'ios-arrow-forward'} color={'#fff'} size={40} onPress={() => {this.refs.modal2.open(); this.refs.modal1.close()}} />
                    </View>
                </Modal>
            
                <Modal style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#241332', padding: 3, display: 'flex', flexDirection: 'row' }} position={"top"} ref={"modal2"} swipeArea={20}>
                    <View style={{ width: '25%', height: '30%', position: 'absolute', justifyContent: 'center', left: 0, alignItems: 'center'}} >                
                        <Icon name={'ios-arrow-back'} color={'#fff'} size={40} onPress={() => {this.refs.modal1.open(); this.refs.modal2.close()}} />                
                    </View>
                    <View style={{display: 'flex', flexDirection: 'column', width:'50%'}}>
                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', width: '100%', borderBottomColor: 'grey', opacity: 0.3, borderBottomWidth: 0.5 }}>
                            <Text style={{width: '100%', textAlign: 'center', color: '#fff',fontSize: 20, fontWeight: 'bold', }} >DAY</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, alignItems: 'center', justifyContent: 'center' }} >
                            <Picker style={{ width: width * 0.5,  }} selectedValue={this.state.day} onValueChange={(itemValue, itemIndex) => this.setState({day: itemValue})} >
                                {this.renderListDay()}
                            </Picker>
                        </View>
                    </View>
                    <View style={{width: '25%', height: '30%', position: 'absolute', justifyContent: 'center', right: 0, alignItems: 'center'}} >
                        <Icon name={'ios-arrow-forward'} color={'#fff'} size={40} onPress={() => {this.refs.modal3.open(); this.refs.modal2.close()}} />
                    </View>
                </Modal>

                <Modal style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#241332', padding: 3, display: 'flex', flexDirection: 'row' }} position={"top"} ref={"modal3"} swipeArea={20}>
                    <View style={{ width: '25%', height: '30%', position: 'absolute', justifyContent: 'center', left: 0, alignItems: 'center'}} >
                        <Icon name={'ios-arrow-back'} color={'#fff'} size={40} onPress={() => {this.refs.modal2.open(); this.refs.modal3.close()}} />                
                    </View>
                    <View style={{display: 'flex', flexDirection: 'column', width:'50%'}}>
                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', width: '100%', borderBottomColor: 'grey', opacity: 0.3, borderBottomWidth: 0.5 }}>
                            <Text style={{width: '100%', textAlign: 'center', color: '#fff',fontSize: 20, fontWeight: 'bold', }} >START TIME</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, alignItems: 'center', justifyContent: 'center' }} >
                            <Picker style={{ width: width * 0.25,  }} selectedValue={this.state.startH} onValueChange={(itemValue, itemIndex) => this.setState({startH: itemValue})} >
                                {this.renderListHours()}
                            </Picker>
                            <Picker style={{ width: width * 0.25,  }} selectedValue={this.state.startM} onValueChange={(itemValue, itemIndex) => this.setState({startM: itemValue})} >
                                {this.renderListMinutes()}
                            </Picker>
                        </View>
                    </View>
                    <View style={{width: '25%', height: '30%', position: 'absolute', justifyContent: 'center', right: 0, alignItems: 'center'}} >
                        <Icon name={'ios-arrow-forward'} color={'#fff'} size={40} onPress={() => {this.refs.modal4.open(); this.refs.modal3.close()}} />
                    </View>
                </Modal>

                <Modal style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#241332', padding: 3, display: 'flex', flexDirection: 'row' }} position={"top"} ref={"modal4"} swipeArea={20}>
                    <View style={{ width: '25%', height: '30%', position: 'absolute', justifyContent: 'center', left: 0, alignItems: 'center'}} >                
                        <Icon name={'ios-arrow-back'} color={'#fff'} size={40} onPress={() => {this.refs.modal3.open(); this.refs.modal4.close()}} />                
                    </View>
                    <View style={{display: 'flex', flexDirection: 'column', width:'50%'}}>
                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', width: '100%', borderBottomColor: 'grey', opacity: 0.3, borderBottomWidth: 0.5 }}>
                            <Text style={{width: '100%', textAlign: 'center', color: '#fff',fontSize: 20, fontWeight: 'bold', }} >STOP TIME</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, alignItems: 'center', justifyContent: 'center' }} >
                            <Picker style={{ width: width * 0.25,  }} selectedValue={this.state.stopH} onValueChange={(itemValue, itemIndex) => this.setState({stopH: itemValue})} >
                                {this.renderListHours()}
                            </Picker>
                            <Picker style={{ width: width * 0.25,  }} selectedValue={this.state.stopM} onValueChange={(itemValue, itemIndex) => this.setState({stopM: itemValue})} >
                                {this.renderListMinutes()}
                            </Picker>
                        </View>
                    </View>
                    <View style={{width: '25%', height: '30%', position: 'absolute', justifyContent: 'center', right: 0, alignItems: 'center'}} >
                        <View style={{borderColor: '#fff', borderWidth: 0.5, borderRadius: 90, padding: 10 }}>
                            <Text style={{color: '#fff', fontSize: 20 }} onPress={() => {this.handleSubmit(); this.refs.modal4.close()}} > OK </Text>
                        </View>
                    </View>
                </Modal>

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
)(DatePicker);
