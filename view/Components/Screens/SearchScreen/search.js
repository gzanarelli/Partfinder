import React, { PureComponent } from 'react'
import { Text, View, Dimensions, ScrollView, Platform } from 'react-native'
import ipAddress from '../../../config';
import { connect } from 'react-redux';
import { Slider } from 'react-native-elements';
import DatePicker from './DatePicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { ListItem, Avatar } from 'react-native-elements';
import Styles from './Styles/Styles';
const { width, height } = Dimensions.get('screen');

class Search extends PureComponent {
    constructor(props) {
        super(props);
        this.state=({
            value: 0,
            users: []
        })
    }

    viewProfil = (data) => {
      this.props.partnerID(data)
      this.props.navigation.navigate('PartnerProfil');
    }

  // List les personnes compatible avec le profil connecté
    updateState = (users) => {
      let usersList = [];
      
      const toUpp = (data) => {
          return (data[0].toUpperCase() + data.slice(1).toLowerCase());
        };
    
      const toDate = (data) => {
          if (data.length === 3)
              return data[0] + ':' + data.slice(1) + 'H';
          else
              return data[0] + data[1] + ':' + data.slice(2) + 'H';
      }
  
    if (users) {
      usersList = users.map((user, i) => {
  
        return (
          <View key={i}
            style={{ backgroundColor: i % 2 !== 0 ? '#fff' : '#4790ED', opacity: i % 2 !== 0 ? 1 : 0.8 }}>
  
          <ListItem 
            containerStyle={[ Styles.listItem, { backgroundColor: i % 2 === 0 ? '#fff' : '#4790ED', opacity: i % 2 === 0 ? 1 : 0.8 }]}
            leftAvatar={
              <Avatar
                size="large"
                rounded
                title={user.username[0].toUpperCase()}
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
                    <Text style={{ color: i % 2 === 0 ?'grey' : '#fff', fontSize: 16}}>
                      {' ' + toUpp(user.sport[0].sport)}
                    </Text>
                  </View>
                  <Text style={{ color: i % 2 === 0 ?'grey' : '#fff',fontSize: 16,}}>
                    {toUpp(user.sport[0].availability[0].day)+ ' => ' + toDate(user.sport[0].availability[0].start.toString()) + ' - ' + toDate(user.sport[0].availability[0].stop.toString())}
                  </Text>
                </View>
                <View style={{right: 15}}>
                  <Icon onPress={() => this.viewProfil(user._id)} name={Platform.os === 'ios' ? 'ios-arrow-round-forward' : 'md-arrow-round-forward'} size={25} color={ i % 2 === 0 ? '#000' : '#fff'} />
                </View>
              </View>
            }
          />
          </View>
        )
      });
    }
    this.setState({ users: usersList });
  }

    render() {
  
      return (
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: height, width: width, paddingTop: 10 }} >
                <Text style={{textAlign: 'center'}} >
                    Distance (en Km)
                </Text>
                <View style={{ alignItems: 'stretch', justifyContent: 'center', width: width * 0.5 }}>
                    <Slider
                        value={this.state.value}
                        onValueChange={value => this.setState({ value })}
                        minimumValue={0}
                        maximumValue={200}
                        step={1}
                        minimumTrackTintColor={'#4790ED'}
                        thumbStyle={{backgroundColor: '#4790ED'}}
                    />
                    <Text style={{textAlign: 'center'}} >{this.state.value} Km</Text>
                </View>

                <View style={{ width: width, height: height * 0.3, borderRadius: 10 }}>
                    <DatePicker action={ this.updateState } />
                </View>
                <ScrollView style={{height: height * 0.6, width: width }} >
                    { this.state.users }
                </ScrollView>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return {
      partnerID: function(iD) {
          dispatch({
              type: 'addID',
              iD: iD
          })
      }
  }
}

function mapStateToProps(state) {
    return { user: state.userToken }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);