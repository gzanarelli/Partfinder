import React, { Component } from 'react';
import { Alert, StyleSheet, Dimensions, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

let {height, width} = Dimensions.get('window');

class Home extends Component {

    render() {

        return(
            <ImageBackground source={require('../../img/home_test.jpg')} style={styles.image} >
                <Text style={styles.title} > Welcome to PartFinder </Text>
                <Text style={styles.text} > The best way to meet people and try new activities. Let’s get started! </Text>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <TouchableOpacity style={styles.signin} onPress={ () => this.props.navigation.navigate('Signin')} title="SIGN IN" color="#9599B3" accessibilityLabel="Learn more about this purple button">
                        <Text style={styles.btnSignin}>
                            SIGN IN
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signup}  onPress={ () => this.props.navigation.navigate('Signup') } title="SIGN IN" color="#9599B3" accessibilityLabel="Learn more about this purple button">
                        <Text style={styles.btnText}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    title: { textAlign: 'center', color: '#fff', fontSize: 32, fontWeight: 'bold', paddingLeft: 100, paddingRight: 100, marginTop: height * 0.55 },
    text: { textAlign: 'center', color: '#fff', fontSize: 12, fontWeight: '500', paddingTop: 20, paddingLeft: 80, paddingRight: 80, marginBottom: 20 },
    signin: { bottom: '0%', backgroundColor: '#9599B3', width: width, height: height * 0.24, borderStyle: 'solid', borderColor: '#9599B3', borderTopLeftRadius: 70, justifyContent: 'center',  },
    signup: { bottom: '0%', backgroundColor: '#241332', width: width, height: height * 0.12, borderStyle: 'solid', borderColor: '#9599B3', borderTopLeftRadius: 70, position: 'absolute', justifyContent: 'center' },
    btnText: { textAlign: 'center', color: '#fff', fontSize: 14, fontWeight: '700' },
    btnSignin: { textAlign: 'center', color: '#fff', fontSize: 14, fontWeight: '700', top: '-25%' },
    image: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', resizeMode: 'stretch', width: '100%', height: '100%', },
});


export default Home;