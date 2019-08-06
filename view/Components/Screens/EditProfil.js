import React, { Component } from 'react';
import { Alert, StyleSheet, Text, Dimensions, Button, ScrollView, View, ImageBackground, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ipAddress from '../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

const {width, height} = Dimensions.get('window');

//Data for Edit Profil: username, gender, city, address, zipcode, email

export class EditProfil extends Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            username: '',
            gender: '',
            city: '',
            address: '',
            zipcode: '',
            user: {},
            errors: {},
            offset: 0,
            message: ''
        };
    }

    componentDidMount() {
        fetch(`http://${ipAddress}:3000/profil`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({token: this.props.user.token})
           }).then(res => res.json())
           .then(data => {
               this.setState({user: data.user})
            });
    }

    render() {

        // const showPassword = () => {
        //     this.setState({
        //         hide: !this.state.hide
        //     });
        // };

        // const showPassword2 = () => {
        //     this.setState({
        //         hide2: !this.state.hide2
        //     });
        // };

        const handleSubmit = () => {
            const data = {
                email: this.state.email,
                username: this.state.username,
                gender: this.state.gender,
                city: this.state.city,
                address: this.state.address,
                zipcode: this.state.zipcode,
                token: this.props.user.token
            };

            
            fetch(`http://${ipAddress}:3000/profil/edit`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
           }).then(res => res.json())
           .then( res => {
               if (res.errors) this.setState({ errors : res.errors });
               if (res.error) this.setState({ errors : res });
               if (res.message) {
                   this.setState({ message: res.message})
                   console.log(this.state.message);
               }
            })
           .catch(error => console.error(error));
        }


        // Gestion du formulaire et du clavier

        let { email, city, username, address, zipcode, gender, errors, user, message, offset } = this.state;
        return(
            <View style={styles.container}>

                <View style={styles.backBlue}></View>
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={this.state.offset}>
                <View style={styles.form}>
                    <TextField onFocus={() => this.setState({ offset: 0 })} error={errors.username} label='Username' placeholder={user.username ? user.username : ''} onChangeText={(username) => this.setState({username})} value={username}/>
                    <TextField onFocus={() => this.setState({ offset: 0 })} error={errors.email} label='Email' placeholder={user.email ? user.email : ''} onChangeText={(email) => this.setState({email})} value={email}/>
                    <TextField onFocus={() => this.setState({ offset: 0 })} error={errors.gender} label='Gender' placeholder={user.gender ? user.gender : ''} onChangeText={(gender) => this.setState({gender})} value={gender}/>
                    <TextField onFocus={() => this.setState({ offset: 0 })} error={errors.address} label='Address' placeholder={user.address ? user.address : ''} onChangeText={(address) => this.setState({address})} value={address}/>
                    <TextField onFocus={() => this.setState({ offset: 100 })} error={errors.city} label='City' placeholder={user.city ? user.city : ''} onChangeText={(city) => this.setState({city})} value={city}/>
                    <TextField onFocus={() => this.setState({ offset: 200 })} error={errors.zipcode} label='Zipcode' placeholder={user.zipcode ? user.zipcode : ''} onChangeText={(zipcode) => this.setState({zipcode})} value={zipcode}/>
                    { errors.general && (
                        <Text style={{color: 'rgb(213, 0, 0)', fontSize: 12, textAlign: 'center'}}>{ errors.general }</Text>
                    )}
                    { message !== '' && (
                    <Text style={{color: '#4790ED', fontSize: 12, textAlign: 'center', marginTop: 8, fontWeight: '800' }}>{message}</Text>
                    )}
                </View>
                </KeyboardAvoidingView>
                <TouchableOpacity onPress={handleSubmit} style={styles.btnContinue}><Text style={styles.text}>CONTINUE</Text></TouchableOpacity>
            </View>
        )
    }
  }
  
const styles = StyleSheet.create({
    container: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F1F0F2'},
    backBlue: {position: 'absolute', width: width, height: height * 0.3, backgroundColor: '#4790ED', borderBottomLeftRadius: 90},
    sign: { display: 'flex', flexDirection: 'row', justifyContent: 'center', width: width, marginTop: 50, marginBottom: 10 },
    form: { width: width * 0.8, paddingTop: 5, paddingHorizontal: 15, marginTop: 5, paddingBottom: 30, backgroundColor: '#fff', borderRadius: 45 },
    btnContinue: {width: width * 0.8, padding: 20, width: width*0.8, borderRadius: 52, backgroundColor: '#4790ED', borderColor: '#665EFF', borderWidth: 0.5, marginTop: 20, },
    text: { textAlign: 'center', color: '#fff' },
    icon: {alignSelf: 'flex-end', paddingBottom: 12, fontSize: 25, zIndex: 2, position: 'absolute', right: '5%', },
    iconError: {alignSelf: 'flex-end', paddingBottom: 25, fontSize: 25, zIndex: 2, position: 'absolute', right: '5%'},
})

function mapStateToProps(state) {
    return { user: state.userToken }
};

export default connect(
    mapStateToProps,
    null
)(EditProfil);
