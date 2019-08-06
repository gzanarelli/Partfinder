import React, { Component } from 'react';
import { Alert, StyleSheet, Text, Dimensions, Button, TextInput, View, ImageBackground, TouchableOpacity, Platform } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ipAddress from '../../config';
import Icon from 'react-native-vector-icons/Ionicons';

let {width, height} = Dimensions.get('window');

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

        let { email, password, username, confirmPassword, errors } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.backBlue}></View>
                <View style={styles.sign}>
                    <TouchableOpacity style={styles.btnActive} onPress={ () => this.props.navigation.navigate('Signin')}>
                        <Text style={styles.btnTextActive}>SIGN IN</Text>
                    </TouchableOpacity>
                    <View style={styles.btnNone}>
                        <Text style={styles.btnTextNone} >SIGN UP</Text>
                    </View>                
                </View>
                <View style={styles.form}>
                    <TextField error={errors.username} label='Username' onChangeText={(username) => this.setState({username})} value={username}/>
                    <TextField error={errors.email} label='Email' onChangeText={(email) => this.setState({email})} value={email}/>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <TextField error={errors.password} secureTextEntry={this.state.hide} label='Password' onChangeText={(password) => this.setState({password})} value={password} containerStyle={{width: '100%', }} />
                        <Icon onPress={ showPassword } reverse name={
                            Platform.os === 'ios' ? this.state.hide ? 'ios-eye' : 'ios-eye-off' : this.state.hide ? 'md-eye' : 'md-eye-off'
                        } style={ typeof errors.password === 'undefined' ? styles.icon : styles.iconError} />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <TextField error={errors.confirmPassword} secureTextEntry={this.state.hide2} label='Confirm Password' onChangeText={(confirmPassword) => this.setState({confirmPassword})} value={confirmPassword} containerStyle={{width: '100%'}} />
                        <Icon onPress={ showPassword2 } reverse name={
                            Platform.os === 'ios' ? this.state.hide2 ? 'ios-eye' : 'ios-eye-off' : this.state.hide2 ? 'md-eye' : 'md-eye-off'
                        } style={ typeof errors.confirmPassword === 'undefined' ? styles.icon : styles.iconError} />
                    </View>    
                    { errors.general && !errors.confirmPassword && (
                        <Text style={{color: 'rgb(213, 0, 0)', fontSize: 12, textAlign: 'center'}}>{ errors.general }</Text>
                    )}
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.btnContinue}><Text style={styles.text}>CONTINUE</Text></TouchableOpacity>
            </View>
        )
    }
  }
  
const styles = StyleSheet.create({
    container: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F1F0F2'},
    backBlue: {position: 'absolute', width: width, height: height * 0.3, backgroundColor: '#4790ED', borderBottomLeftRadius: 90},
    sign: { display: 'flex', flexDirection: 'row', justifyContent: 'center', width: width, marginTop: 50, marginBottom: 10 },
    form: {height: height*0.4, width: width*0.8, marginLeft: 20, marginRight: 20, paddingTop: 5, paddingHorizontal: 15, backgroundColor: '#fff', borderRadius: 45 },
    btnContinue: {width: '100%', padding: 20, width: width*0.8, borderRadius: 52, backgroundColor: '#4790ED', borderColor: '#665EFF', borderWidth: 1, marginTop: 20 },
    text: { textAlign: 'center', color: '#fff' },
    btnNone: {borderRadius: 52, backgroundColor: '#4790ED', marginLeft: 20 },
    btnTextNone: { fontSize: 12, fontWeight: '800', color: '#fff', borderRadius: 52, paddingHorizontal: 15, paddingVertical: 10},
    btnActive: { borderRadius: 52, },
    btnTextActive: { fontSize: 12, color: '#fff', fontWeight: '800', opacity: 0.6, borderRadius: 52, paddingHorizontal: 15, paddingVertical: 10, },
    icon: {alignSelf: 'flex-end', paddingBottom: 12, fontSize: 25, zIndex: 2, position: 'absolute', right: '5%', },
    iconError: {alignSelf: 'flex-end', paddingBottom: 25, fontSize: 25, zIndex: 2, position: 'absolute', right: '5%'},
})
export default Signup;