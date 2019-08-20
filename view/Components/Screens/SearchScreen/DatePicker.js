import React, { PureComponent } from 'react'
import { Text, View, Dimensions, Picker, Platform } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import ipAddress from '../../../config';
import Toast from 'react-native-easy-toast';
import Sport from '../../../utils/sportList';
import Day from '../../../utils/dayList';
import Styles from './Styles/StylesDatePicker';
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
            users: []
        })
    }


    renderList() {
        var list = [];
        for (var i=0;i<Sport.length;i++) {
          list.push(<Picker.Item label={Sport[i]} value={Sport[i]} color={Platform.OS === 'ios' ? '#fff' : '#000'} key={i} />);
        }
        return list
    }
    

    renderListDay() {
        var list = [];
        for (var i=0;i<Day.length;i++) {
          list.push(<Picker.Item color={Platform.OS === 'ios' ? '#fff' : '#000'} label={Day[i]} value={Day[i]} key={i} />);
        }
    
        return list;
    }

    renderListHours() {
        var list = [];
    
        for (var i=0;i<25;i++) {
          list.push(<Picker.Item color={Platform.OS === 'ios' ? '#fff' : '#000'} label={i} value={i} key={i} />);
        }
    
        return list;
    }

    renderListMinutes() {
        var list = [];
    
        for (var i=0;i<4;i++) {
          list.push(<Picker.Item color={Platform.OS === 'ios' ? '#fff' : '#000'} label={i * 15} value={i * 15} key={i} />);
        }
    
        return list;
    }

    handleSubmit = async () => {

        let data = {
            sport: this.state.sport,
            day: this.state.day,
            start: parseInt((this.state.startH ? this.state.startH : '00')  + (this.state.startM ? this.state.startM : '00')) ,
            stop: parseInt((this.state.stopH ? this.state.stopH : '00') + (this.state.stopM ? this.state.stopM : '00')) ,
        }

        await fetch(`http://${ipAddress}:3000/search`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ token: this.props.user.token, data })
        })
        .then(res => res.json())
        .then(data => {
            if (data.errors) {
                this.setState({ errors: data.errors });
                console.log(this.state.errors.sport);
                this.state.errors.day ? this.refs.errors.show(this.state.errors.day, 5000) : '' ;
                this.state.errors.sport ? this.refs.errors.show(this.state.errors.sport, 5000) : '' ;
                this.state.errors.message ? this.refs.errors.show(this.state.errors.message, 5000) : '';
            }
            this.props.action(data.users);
        });
    }

    render() {

        iconSelect = (data) => {
            let icon = '';
            Platform.OS === 'ios' ? icon = 'ios' + data : icon = 'md' + data
            return icon; 

        }

        return (
            <View style={Styles.container}>
                <Icons name={'account-search'} size={50} color={'#4790ED'} onPress={ () => {this.refs.modal1.open(); this.setState({errors: {}})} } />

                <Toast
                    ref="errors"
                    style={{backgroundColor: 'red' , width: width * 0.6}}
                    position='top'
                    positionValue={10}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={Styles.txtToast}
                />

                <Modal backdropOpacity={0.9} backdropColor={'#4790ED'} style={Styles.containerModal} position={"top"} ref={"modal1"} swipeArea={20}>
                    <View style={Styles.viewModal}>
                        <View style={Styles.viewTitle}>
                            <Text style={Styles.txtTitle} >SPORT</Text>
                        </View>
                        <View style={Styles.viewPicker} >
                            <Picker style={{ width: width * 0.5 }} selectedValue={this.state.sport} onValueChange={(itemValue, itemIndex) => this.setState({sport: itemValue})} >
                                {this.renderList()}
                            </Picker>
                        </View>
                    </View>
                    <View style={Styles.viewArrowForward} >
                        <Icon name={iconSelect('-arrow-forward')} color={'#fff'} size={40} onPress={() => { this.refs.modal1.close(); this.refs.modal2.open() }} />
                    </View>
                </Modal>
            
                <Modal backdropOpacity={0.9} backdropColor={'#4790ED'} style={Styles.containerModal} position={"top"} ref={"modal2"} swipeArea={20}>
                    <View style={Styles.viewArrowBack} >                
                        <Icon name={iconSelect('-arrow-back')} color={'#fff'} size={40} onPress={() => { this.refs.modal2.close(); this.refs.modal1.open() }} />                
                    </View>
                    <View style={Styles.viewModal}>
                        <View style={Styles.viewTitle}>
                            <Text style={Styles.txtTitle} >DAY</Text>
                        </View>
                        <View style={Styles.viewPicker} >
                            <Picker style={{ width: width * 0.5 }} selectedValue={this.state.day} onValueChange={(itemValue, itemIndex) => this.setState({day: itemValue})} >
                                {this.renderListDay()}
                            </Picker>
                        </View>
                    </View>
                    <View style={Styles.viewArrowForward} >
                        <Icon name={iconSelect('-arrow-forward')} color={'#fff'} size={40} onPress={() => {this.refs.modal3.open(); this.refs.modal2.close()}} />
                    </View>
                </Modal>

                <Modal backdropOpacity={0.9} backdropColor={'#4790ED'} style={Styles.containerModal} position={"top"} ref={"modal3"} swipeArea={20}>
                    <View style={Styles.viewArrowBack} >
                        <Icon name={iconSelect('-arrow-back')} color={'#fff'} size={40} onPress={() => {this.refs.modal2.open(); this.refs.modal3.close()}} />                
                    </View>
                    <View style={Styles.viewModal}>
                        <View style={Styles.viewTitle}>
                            <Text style={Styles.txtTitle} >START TIME</Text>
                        </View>
                        <View style={Styles.viewPicker} >
                            <Picker style={{ width: width * 0.25 }} selectedValue={this.state.startH} onValueChange={(itemValue, itemIndex) => this.setState({startH: itemValue})} >
                                {this.renderListHours()}
                            </Picker>
                            <Picker style={{ width: width * 0.25 }} selectedValue={this.state.startM} onValueChange={(itemValue, itemIndex) => this.setState({startM: itemValue})} >
                                {this.renderListMinutes()}
                            </Picker>
                        </View>
                    </View>
                    <View style={Styles.viewArrowForward} >
                        <Icon name={iconSelect('-arrow-forward')} color={'#fff'} size={40} onPress={() => {this.refs.modal4.open(); this.refs.modal3.close()}} />
                    </View>
                </Modal>

                <Modal backdropOpacity={0.9} backdropColor={'#4790ED'} style={Styles.containerModal} position={"top"} ref={"modal4"} swipeArea={20}>
                    <View style={Styles.viewArrowBack} >                
                        <Icon name={iconSelect('-arrow-back')} color={'#fff'} size={40} onPress={() => {this.refs.modal3.open(); this.refs.modal4.close()}} />                
                    </View>
                    <View style={Styles.viewModal}>
                        <View style={Styles.viewTitle}>
                            <Text style={Styles.txtTitle} >STOP TIME</Text>
                        </View>
                        <View style={Styles.viewPicker} >
                            <Picker style={{ width: width * 0.25,  }} selectedValue={this.state.stopH} onValueChange={(itemValue, itemIndex) => this.setState({stopH: itemValue})} >
                                {this.renderListHours()}
                            </Picker>
                            <Picker style={{ width: width * 0.25,  }} selectedValue={this.state.stopM} onValueChange={(itemValue, itemIndex) => this.setState({stopM: itemValue})} >
                                {this.renderListMinutes()}
                            </Picker>
                        </View>
                    </View>
                    <View style={Styles.viewArrowForward} >
                        <View style={Styles.viewConfirm}>
                            <Text style={Styles.txtConfirm} onPress={() => { this.handleSubmit(); this.refs.modal4.close() }} > OK </Text>
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
