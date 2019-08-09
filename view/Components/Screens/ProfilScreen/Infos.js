import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from '../ProfilScreen/StylesInfos';

export default class Infos extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <View style={Styles.container}>
                <Avatar
                    size="xlarge"
                    rounded
                    source={require('../../../img/profil.jpg')}
                />
                <Text style={Styles.txtName} >
                    {this.props.userProfilFromParent.username} 
                    <Icons reverse name={'account-edit'} size={24} style={{color: '#4790ED'}}
                        onPress={ () => { this.props.editProfil() }}
                    /> 
                </Text>
                <Text style={Styles.txtCity} >
                    {
                        this.props.userProfilFromParent.city ?
                        this.props.userProfilFromParent.city + ', ' + 
                        (this.props.userProfilFromParent.zipcode ? this.props.userProfilFromParent.zipcode : '') : 
                        'Pays merveilleux, 90909'
                    }
                </Text>
            </View>
        )
    }
}