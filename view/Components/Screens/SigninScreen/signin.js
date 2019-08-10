import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ipAddress from '../../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import {AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import Styles from './Styles';
const ACCESS_TOKEN = 'access_token';


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

    render() {

        const showPassword = () => {
            this.setState({
                hide: !this.state.hide
            });
        }

        const handleSubmit = () => {
            const data = {
                email: this.state.email,
                password: this.state.password
            };
            
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
            <View style={Styles.container}>
                <View style={Styles.sign}>
                    <View style={Styles.btnNone}>
                        <Text style={Styles.btnTextNone}>SIGN IN</Text>
                    </View>
                    <TouchableOpacity style={Styles.btnActive} onPress={ () => this.props.navigation.navigate('Signup')}>
                        <Text style={Styles.btnTextActive} >SIGN UP</Text>
                    </TouchableOpacity>
                </View>
                <View style={Styles.form}>
                    <TextField error={errors.email} label='Email' onChangeText={(email) => this.setState({email})} value={email} />
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <TextField error={errors.password} secureTextEntry={hide} label='Password' onChangeText={(password) => this.setState({password})} value={password} containerStyle={{width: '100%'}} />
                        <Icon onPress={ showPassword } reverse name={
                            Platform.os === 'ios' ? 
                                this.state.hide ? 'ios-eye' : 'ios-eye-off' :
                                this.state.hide ? 'md-eye' : 'md-eye-off'
                            }
                            style={ typeof errors.password === 'undefined' ? Styles.icon : Styles.iconError} />
                    </View>
                    { errors.error && (
                        <Text style={{color: 'rgb(213, 0, 0)', fontSize: 12, textAlign: 'center'}}>{ errors.error }</Text>
                    )}
                    <TouchableOpacity onPress={handleSubmit} style={Styles.btnContinue}><Text style={Styles.text}>CONTINUE</Text></TouchableOpacity>
                    <TouchableOpacity style={Styles.btnForgot}><Text style={Styles.text2}>FORGOT PASSWORD</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
  }

function mapDispatchToProps(dispatch) {
    return {
        userToken: function(token) {
            dispatch({
                type: 'addToken',
                token: token
            })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Signin);
