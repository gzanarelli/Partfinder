import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './Styles/StylesInfos';
//import ImagePicker from 'react-native-image-picker';

export default class Infos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: ''
        }
    }

    modifyPicture = () => {
        // More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  
  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */
    }

    render () {
        return (
            <View style={Styles.container}>
                {/* Lien de Deconnexion */}
                <Icons name={'exit-to-app'} size={30} style={{ color: '#c0392b', alignSelf: 'flex-end', paddingRight: 5, top: -10 }}
                    onPress={ () => this.props.deconnexion() }
                />
                <Avatar
                    size="xlarge"
                    rounded
                    onLongPress={() => this.modifyPicture()}
                    source={require('../../../img/profil.jpg')}
                    source={this.state.avatarSource}
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