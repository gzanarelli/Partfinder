import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ipAddress from '../../../config';
import Icon from 'react-native-vector-icons/Ionicons';
// import {AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import Styles from './Styles';
// const ACCESS_TOKEN = 'access_token';


class Signup extends Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
            hide: true,
            hide2: true,
            errors: {}
        };
    }

    render() {

        const showPassword = () => {
            this.setState({
                hide: !this.state.hide
            });
        };

        const showPassword2 = () => {
            this.setState({
                hide2: !this.state.hide2
            });
        };

        const handleSubmit = () => {
            const data = {
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                username: this.state.username
            };

            fetch(`http://${ipAddress}:3000/users/signup`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
           }).then(res => res.json())
           .then( res => {
                console.log(res);
                if (res.result) this.props.navigation.navigate('Signin');
                if (res.errors) this.setState({ errors : res.errors });
                if (res.error) this.setState({ errors : res });
            })
           .catch(error => {
                console.error(error);               
            });
        }

        let { email, password, username, confirmPassword, errors } = this.state;
        return(
            <View style={Styles.container}>

                <View style={Styles.backBlue}></View>
                
                <View style={Styles.sign}>
                    <TouchableOpacity style={Styles.btnActive} onPress={ () => this.props.navigation.navigate('Signin')}>
                        <Text style={Styles.btnTextActive}>SIGN IN</Text>
                    </TouchableOpacity>
                    <View style={Styles.btnNone}>
                        <Text style={Styles.btnTextNone} >SIGN UP</Text>
                    </View>                
                </View>
                
                <View style={Styles.form}>
                    <TextField error={errors.username} label='Username' onChangeText={(username) => this.setState({username})} value={username}/>

                    <TextField error={errors.email} label='Email' onChangeText={(email) => this.setState({email})} value={email}/>

                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <TextField error={errors.password} secureTextEntry={this.state.hide} label='Password' onChangeText={(password) => this.setState({password})} value={password} containerStyle={{width: '100%', }} />
                        <Icon onPress={ showPassword } reverse name={
                            Platform.os === 'ios' ? this.state.hide ? 'ios-eye' : 'ios-eye-off' : this.state.hide ? 'md-eye' : 'md-eye-off'
                        } style={ typeof errors.password === 'undefined' ? Styles.icon : Styles.iconError} />
                    </View>
                    
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <TextField error={errors.confirmPassword} secureTextEntry={this.state.hide2} label='Confirm Password' onChangeText={(confirmPassword) => this.setState({confirmPassword})} value={confirmPassword} containerStyle={{width: '100%'}} />
                        <Icon onPress={ showPassword2 } reverse name={
                            Platform.os === 'ios' ? this.state.hide2 ? 'ios-eye' : 'ios-eye-off' : this.state.hide2 ? 'md-eye' : 'md-eye-off'
                        } style={ typeof errors.confirmPassword === 'undefined' ? Styles.icon : Styles.iconError} />
                    </View>    
                    
                    { errors.general && !errors.confirmPassword && (
                        <Text style={{color: 'rgb(213, 0, 0)', fontSize: 12, textAlign: 'center'}}>{ errors.general }</Text>
                    )}

                </View>

                <TouchableOpacity onPress={handleSubmit} style={Styles.btnContinue}>
                    <Text style={Styles.text}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Signup;