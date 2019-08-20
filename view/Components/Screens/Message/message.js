import React, { PureComponent } from 'react';
import { Text, ScrollView, View, Platform } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import ipAddress from '../../../config';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from './Styles/messageStyles';

class Message extends PureComponent {
    constructor(){
        super();
        this.state={
            data: [],
            userID: '',
        }
    }

    async componentDidMount() {
            await fetch(`http://${ipAddress}:3000/message`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({token: this.props.token})
        })
        .then(res => res.json())
        .then(data => {
            this.setState({data: data.data, userID: data.userID});
            // console.log(this.state.data);
        })
    }

    messagerie = (data) => {
        this.props.partnerID(data);
        this.props.navigation.navigate('Conversation');
    }

    render() {

        // FUNCTION UpperCase the first letter
    const toUpp = (data) => {
        return (data[0].toUpperCase() + data.slice(1).toLowerCase());
      };
  
      const toDate = (data) => {
        if (data.length === 3)
            return data[0] + ':' + data.slice(1) + 'H';
        else
            return data[0] + data[1] + ':' + data.slice(2) + 'H';
    }
  
    //   List les personnes compatible avec le profil connecté
      if (this.state.data) {
        var usersList = this.state.data.map((users, i) => {
            return (
            users.users.map((user, j) => {
                if (user._id !== this.state.userID) {
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
                        rightIcon={
                            // <View style={Styles.viewInfos}>
                                <View>
                                    <Icon onPress={() => this.messagerie(user._id)} name={Platform.os === 'ios' ? 'ios-arrow-round-forward' : 'md-arrow-round-forward'} size={25} color={ i % 2 === 0 ? '#000' : '#fff'} />
                                </View>
                            // </View>
                        }
                        />
                        </View>
                    )
                } else {
                    return ;
                }
            }))
        })
    };
  
        return (
            <ScrollView style={ Styles.container } >
                { usersList }
            </ScrollView>
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
    return { token: state.userToken.token }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message);