import React, { PureComponent } from 'react'
import { Text, View, Alert, ScrollView, Dimensions, TouchableOpacity, Button, Picker } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import ipAddress from '../config';
const { width, height } = Dimensions.get('screen');

export class DatePicker extends PureComponent {
    constructor(props) {
        super(props);
        this.state =({
            sport: '',
            day: '',
            start: '',
            stop: ''
        })
    }

    renderList() {
        var list = [];
        let sport = [
            'Tennis',
            'Football',
            'Badminton',
            'Sqaush',
            'Table-tennis',
            'Basket',
            'Rugby',
            'Handball',
            'Taekwondo',
            'Judo',
            'Danse',
            'Calisthenics',
            'Cross-fit',
            'Fitness'
        ].sort();
    
        for (var i=0;i<sport.length;i++) {
          list.push(<Picker.Item label={sport[i]} value={sport[i]} color={'#fff'} key={i} />);
        }
    
        return list;
    }

    renderListHours() {
        var list = [];
    
        // for (var i=0;i<25;i++) {
        //   list.push(<Picker.Item color={'#fff'} label={i} value={i} key={i} />);
        // }
    
        return list;
    }

    renderListDay() {
        var list = [];
        let dayList= [
            'Mon',
            'Thu',
            'Wed',
            'Tue',
            'Fri',
            'Sat',
            'Sun'
        ];

        // for (var i=0;i<dayList.length;i++) {
        //   list.push(<Picker.Item color={'#fff'} label={dayList[i]} value={dayList[i]} key={i} />);
        // }
    
        return list;
    }

    renderListMinutes() {
        var list = [];
    
        // for (var i=0;i<4;i++) {
        //   list.push(<Picker.Item color={'#fff'} label={i * 15} value={i * 15} key={i} />);
        // }
    
        return list;
    }

    handleSubmit = () => {

        let data = {
            sport: this.state.sport,
            day: this.state.day,
            start: this.state.start,
            stop: this.state.stop
        }

        console.log(data);
        // fetch(`http://${ipAddress}:3000/profil/sport-add`, {
        //     method: 'POST',
        //     headers: {'Content-Type':'application/json'},
        //     body: JSON.stringify({ token: this.props.user.token, data })
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data);
        // });
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Icons name={'plus-circle-outline'} size={50} color={'#fff'} onPress={ () => this.refs.modal6.open() } />
                <Modal style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.2, backgroundColor: '#241332', padding: 3 }} position={"top"} ref={"modal6"} swipeArea={20}>
                    <View style={{display: 'flex', flexDirection: 'column', width:'100%'}}>
                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', width: '100%', position: 'absolute', borderBottomColor: 'grey', opacity: 0.3, borderBottomWidth: 0.5 }}>
                            <Text style={{width: width* 0.35, textAlign: 'center', color: '#fff',fontSize: 20, fontWeight: 'bold' }} >SPORT</Text>
                            <Text style={{width: width* 0.15, textAlign: 'center', color: '#fff',fontSize: 20, fontWeight: 'bold' }} >DAY</Text>
                            <Text style={{width: width* 0.25, textAlign: 'center', color: '#fff',fontSize: 20, fontWeight: 'bold' }} >START</Text>
                            <Text style={{width: width* 0.25, textAlign: 'center', color: '#fff',fontSize: 20, fontWeight: 'bold' }} >STOP</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', marginVertical: 30, }} >
                            <ScrollView>
                                <Picker style={{width: width * 0.35, paddingLeft: 10}} selectedValue={this.state.sport} onValueChange={(itemValue, itemIndex) => this.setState({sport: itemValue})} >
                                    {this.renderList()}
                                </Picker>
                            </ScrollView>
                            <ScrollView>
                                <View style={{width: width * 0.15, paddingLeft: 10}}>
                                    {this.renderListDay()}
                                </View>
                            </ScrollView>
                            <ScrollView>
                                <View style={{width: width * 0.125, paddingLeft: 10}}>
                                    {this.renderListHours()}
                                </View>
                            </ScrollView>
                            <ScrollView>
                                <View style={{width: width * 0.125, paddingLeft: 10}}>
                                    {this.renderListMinutes()}
                                </View>
                            </ScrollView>
                            <ScrollView>
                                <View style={{width: width * 0.125, paddingLeft: 10}}>
                                    {this.renderListHours()}
                                </View>
                            </ScrollView>
                            <ScrollView>
                                <View style={{width: width * 0.125, paddingLeft: 10}}>
                                    {this.renderListMinutes()}
                                </View>
                            </ScrollView>
                        </View>
                        <TouchableOpacity onPress={this.handleSubmit} style={{backgroundColor: '#fff', width: '50%', height: 30, alignSelf: 'center', justifyContent: 'center'}} >
                            <Text style={{textAlign: 'center'}}>CONFIRM</Text>
                        </TouchableOpacity>
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
