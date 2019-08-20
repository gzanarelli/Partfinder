import React, { Component } from 'react';
import { Dimensions, Text, View, ImageBackground, TouchableOpacity,AsyncStorage } from 'react-native';
import Styles from './Styles';
import { connect } from 'react-redux';
const ACCESS_TOKEN = 'access_token';

// let {height, width} = Dimensions.get('window');

class Home extends Component {

    // handleSubmitSignin = () => {
    //     if (AsyncStorage.getItem('User'))
    //     this.props.navigation.navigate('Signin')
    // }

    async storeToken(accessToken, data) {
        try{
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
        } catch(error) {
            console.error(error);
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('User', (err, data)=>{
            var userJSON = JSON.parse(data);
            if (userJSON) {
                fetch(`http://${ipAddress}:3000/users/login`, {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(userJSON)
               }).then(res => res.json())
               .then( res => {
                    if (res.result) {
                        this.storeToken(res.token);
                        this.props.userToken(res.token);
                        this.props.navigation.navigate('Accueil');
                    }
                }
            )
        }
    })
}

    render() {

        return(
            <ImageBackground source={require('../../../img/home_test.jpg')} style={Styles.image} >

                <Text style={Styles.title} >
                    Welcome to PartFinder
                </Text>
                
                <Text style={Styles.text} >
                    The best way to meet people and try new activities. Let’s get started!
                </Text>
                
                <View style={Styles.viewBtn}>
                
                    <TouchableOpacity
                        style={Styles.signin}
                        onPress={ () => this.props.navigation.navigate('Signin')}
                        title="SIGN IN"
                        color="#9599B3"
                        accessibilityLabel="Learn more about this purple button" >
                        <Text style={Styles.btnSignin}>
                            SIGN IN
                        </Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity
                        style={Styles.signup}
                        onPress={ () => this.props.navigation.navigate('Signup') }
                        title="SIGN IN"
                        color="#9599B3"
                        accessibilityLabel="Learn more about this purple button">
                        <Text style={Styles.btnText}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>
                
                </View>

            </ImageBackground>
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
)(Home);