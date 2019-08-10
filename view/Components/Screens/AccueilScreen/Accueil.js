import React, { PureComponent } from 'react';
import { Text, View, ScrollView, Dimensions, Platform } from 'react-native';
import ipAddress from '../../../config';
import { ListItem, Avatar } from 'react-native-elements';
import {AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './Styles';


const {width, height} = Dimensions.get('screen');          
const ACCESS_TOKEN = 'access_token';


class Accueil extends PureComponent {
  constructor(){
    super();
    this.state = {
      users: []
    }
  }

  async getToken() {
    try{
        let token = await AsyncStorage.getItem(ACCESS_TOKEN);
        let parseToken = JSON.stringify({token: token});
        fetch(`http://${ipAddress}:3000/search/home`,
        {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: parseToken
        })
        .then(res => res.json())
        .then(data => { this.setState({users: data.users}) })
        .catch(err => console.error(err));
    } catch(error) {
        console.error(error);
    }
  }

  componentDidMount() {
    this.getToken();
  }
    
  render() {

    // FUNCTION UpperCase the first letter
    const toUpp = (data) => {
      return (data[0].toUpperCase() + data.slice(1).toLowerCase());
    };

    // List les personnes compatible avec le profil connecté
    if (this.state.users) {
      var usersList = this.state.users.map((user, i) => {

        return (
          <View key={i}
            style={{ backgroundColor: i % 2 !== 0 ? '#fff' : '#4790ED', opacity: i % 2 !== 0 ? 1 : 0.8 }}>

          <ListItem 
            containerStyle={[ Styles.listItem, { backgroundColor: i % 2 === 0 ? '#fff' : '#4790ED', opacity: i % 2 === 0 ? 1 : 0.8 }]}
            leftAvatar={
              <Avatar
                size="large"
                rounded
                title={!user.picture && user.username[0].toUpperCase()}
                titleStyle={{color: '#4790ED', opacity: 0.8}}
                source={user.picture && require('../../../img/profil.jpg')}
                overlayContainerStyle={ Styles.avatarContainer }
              />
            }
            title={ toUpp(user.username) }
            titleStyle={{color: i % 2 === 0 ? '#4790ED' : '#fff', fontSize: 25, fontWeight: '500' }}
            contentContainerStyle={{justifyContent: 'space-around', alignItems: 'center', }}
            subtitle={
              <View style={Styles.viewInfos}>
                <View style={Styles.subtitle}>
                  <View style={Styles.viewIcon}>
                    { 
                      user.sport[0].sport === 'tennis' || user.sport[0].sport === 'table-tennis' ? 
                      <Icons name={`${user.sport[0].sport}`} size={16} /> : 
                      <Icon name={Platform.os === 'ios' ? `ios-${user.sport[0].sport}` : `md-${user.sport[0].sport}`} size={16} />
                    }
                    <Text style={{ color: i % 2 === 0 ?'grey' : '#fff', fontSize: 16}}>
                      {' ' + toUpp(user.sport[0].sport)}
                    </Text>
                  </View>
                  <Text style={{ color: i % 2 === 0 ?'grey' : '#fff',fontSize: 16,}}>
                    {toUpp(user.sport[0].availability[0].day)+ ' ' + user.sport[0].availability[0].start + 'H à ' + user.sport[0].availability[0].stop + 'H'}
                  </Text>
                </View>
                <View style={{right: 15}}>
                  <Icon onPress={() => console.log('Add Profil Page')} name={Platform.os === 'ios' ? 'ios-arrow-round-forward' : 'md-arrow-round-forward'} size={25} color={ i % 2 === 0 ? '#000' : '#fff'} />
                </View>
              </View>
            }
          />
          </View>
        )
      });
    }

    return (
      <ScrollView style={Styles.container}>
          {usersList}
      </ScrollView>
    );
  }
}

export default Accueil;
