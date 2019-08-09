import React, { Component } from 'react';
import { Dimensions, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import Styles from './Styles';
// let {height, width} = Dimensions.get('window');

class Home extends Component {

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

export default Home;