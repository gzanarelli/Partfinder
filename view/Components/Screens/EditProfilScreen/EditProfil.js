import React, { Component } from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ipAddress from '../../../config';
import { connect } from 'react-redux';
import Styles from './Styles';

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

            <View style={Styles.container}>

                <View style={Styles.backBlue}></View>

                <KeyboardAvoidingView behavior="position" style={Styles.form} keyboardVerticalOffset={offset} >
                

                    <TextField
                        onFocus={() => this.setState({ offset: 0 })}
                        error={errors.username}
                        label='Username'
                        placeholder={user.username ? user.username : ''}
                        onChangeText={(username) => this.setState({username})}
                        value={username}
                    />
                    
                    <TextField
                        onFocus={() => this.setState({ offset: 0 })}
                        error={errors.email}
                        label='Email'
                        placeholder={user.email ? user.email : ''}
                        onChangeText={(email) => this.setState({email})}
                        value={email}
                    />
                    
                    <TextField
                        onFocus={() => this.setState({ offset: 0 })}
                        error={errors.gender}
                        label='Gender'
                        placeholder={user.gender ? user.gender : ''}
                        onChangeText={(gender) => this.setState({gender})}
                        value={gender}
                    />
                    
                    <TextField
                        onFocus={() => this.setState({ offset: 0 })}
                        error={errors.address}
                        label='Address'
                        placeholder={user.address ? user.address : ''}
                        onChangeText={(address) => this.setState({address})}
                        value={address}
                    />
                    
                    <TextField
                        onFocus={() => this.setState({ offset: 100 })}
                        error={errors.city}
                        label='City'
                        placeholder={user.city ? user.city : ''}
                        onChangeText={(city) => this.setState({city})}
                        value={city}
                    />
                    
                    <TextField
                        onFocus={() => this.setState({ offset: 200 })}
                        error={errors.zipcode}
                        label='Zipcode'
                        placeholder={user.zipcode ? user.zipcode : ''}
                        onChangeText={(zipcode) => this.setState({zipcode})}
                        value={zipcode}
                    />
                    
                    { errors.general && (
                        <Text style={Styles.errorsMessage}>{ errors.general }</Text>
                    )}
                    
                    { message !== '' && (
                    <Text style={Styles.successMessage}>{message}</Text>
                    )}
                </KeyboardAvoidingView>
                <TouchableOpacity onPress={handleSubmit} style={Styles.btnContinue}><Text style={Styles.text}>CONTINUE</Text></TouchableOpacity>
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
)(EditProfil);
