import React, { Component } from 'react';
import { Alert, StyleSheet, Text, Dimensions, Button, TextInput, View, ImageBackground, TouchableOpacity, Platform } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ipAddress from '../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import {AsyncStorage} from 'react-native';
import { connect } from 'react-redux';


const ACCESS_TOKEN = 'access_token';
let {width, height} = Dimensions.get('window');

class Signin extends Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            hide: true,
            errors: {}
        };
    }

    async storeToken(accessToken) {
        try{
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            this.getToken();
        } catch(error) {
            console.error(error);
        }
    }

    async getToken() {
        try{
            let token = await AsyncStorage.getItem(ACCESS_TOKEN);
        } catch(error) {
            console.error(error);
        }
    }

    componentDidMount() {
        this.props.view();
    }

    render() {

        const showPassword = () => {
            this.setState({
                hide: !this.state.hide
            });
        }

        const handleSubmit = () => {
            const data = {email: this.state.email, password: this.state.password};
            fetch(`http://${ipAddress}:3000/users/login`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
           }).then(res => res.json())
           .then( res => {
                if (res.result) {
                    this.storeToken(res.token);
                    this.props.userToken(res.token);
                    this.props.navigation.navigate('Accueil');
                }
                if (res.errors) {
                    this.setState({
                        errors : res.errors
                    });
               }
               if (res.error) {
                    this.setState({
                        errors : res
                    });
               }
            })
           .catch(error => {
                console.error(error);               
            });
        }

        let { email, password, errors, hide } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.sign}>
                    <View style={styles.btnNone}>
                        <Text style={styles.btnTextNone}>SIGN IN</Text>
                    </View>
                    <TouchableOpacity style={styles.btnActive} onPress={ () => this.props.navigation.navigate('Signup')}>
                        <Text style={styles.btnTextActive} >SIGN UP</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.form}>
                    <TextField error={errors.email} label='Email' onChangeText={(email) => this.setState({email})} value={email} />
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <TextField error={errors.password} secureTextEntry={hide} label='Password' onChangeText={(password) => this.setState({password})} value={password} containerStyle={{width: '100%'}} />
                        <Icon onPress={ showPassword } reverse name={
                            Platform.os === 'ios' ? this.state.hide ? 'ios-eye' : 'ios-eye-off' : this.state.hide ? 'md-eye' : 'md-eye-off'
                            }
                            style={ typeof errors.password === 'undefined' ? styles.icon : styles.iconError} />
                    </View>
                    { errors.error && (
                        <Text style={{color: 'rgb(213, 0, 0)', fontSize: 12, textAlign: 'center'}}>{ errors.error }</Text>
                    )}
                    <TouchableOpacity onPress={handleSubmit} style={styles.btnContinue}><Text style={styles.text}>CONTINUE</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btnForgot}><Text style={styles.text2}>FORGOT PASSWORD</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
  }
  
const styles = StyleSheet.create({
    container: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFF'},
    sign: { display: 'flex', flexDirection: 'row', justifyContent: 'center', width: width, marginTop: 50 },
    form: {height: height*0.4, width: width*0.8, marginLeft: 20, marginRight: 20, marginTop: 50, padding: 15 },
    btnContinue: {width: '100%', padding: 20, borderRadius: 52, backgroundColor: '#4790ED', borderColor: '#665EFF', borderWidth: 1, marginTop: 50 },
    btnForgot: { width: '100%', marginTop: 20 },
    text: { textAlign: 'center', color: '#fff' },
    text2: { textAlign: 'center', color: '#4790ED' },
    btnNone: {borderRadius: 52, backgroundColor: '#4790ED', marginRight: 20 },
    btnTextNone: { fontSize: 12, color: '#fff', fontWeight: '800', borderRadius: 52, paddingHorizontal: 15, paddingVertical: 10},
    btnActive: { borderRadius: 52, },
    btnTextActive: { fontSize: 12, color: '#998FA2', fontWeight: '800', opacity: 0.6, borderRadius: 52, paddingHorizontal: 15, paddingVertical: 10, },
    icon: {alignSelf: 'flex-end', paddingBottom: 10, fontSize: 25, zIndex: 2, position: 'absolute', right: '5%'},
    iconError: {alignSelf: 'flex-end', paddingBottom: 25, fontSize: 25, zIndex: 2, position: 'absolute', right: '5%'},
})

function mapDispatchToProps(dispatch) {
    return {
        userToken: function(token) {
            dispatch({
                type: 'addToken',
                token: token
            })
        }, 
        view: function() {
            dispatch({
                type: 'areaView',
                page: true
            })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Signin);
