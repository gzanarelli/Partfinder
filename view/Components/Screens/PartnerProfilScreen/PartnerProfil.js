import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Toast, {DURATION} from 'react-native-easy-toast';
import ipAddress from '../../../config';
import StatisticProfil from './StatPartnerProfil';
import Infos from './InfosPartner';
import Sport from './SportPartner';
import Styles from './Styles/StyleProfil';
const {width, height} = Dimensions.get('screen');


export class PartnerProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfil: {},
            sportList: [],
            user: 'Sport',
        }
    }

    async componentDidMount(){
        await fetch(`http://${ipAddress}:3000/profil/partner`,
            {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({partnerID: this.props.ID, token: this.props.token})   
            }
        )
        .then(res => res.json())
        .then(data => {
            this.setState({userProfil: data.user, sportList: data.user.sport });
        })
        .catch(err => console.log(err))
    }
    sportListLength = () => {
        return this.state.sportList.length !== 0 ? this.state.sportList.length : 0;
    }

    toUpp = (data) => {
        return (data[0].toUpperCase() + data.slice(1).toLowerCase());
    };

    addConversation = async () => {
        await fetch(`http://${ipAddress}:3000/message/conversation-add`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({partnerID: this.props.ID, token: this.props.token})   
        }).then(res => res.json())
        .then(data => {
            if (data.result === true)
                this.refs.toast.show(data.message);
            console.log(data);
        })
    }

    render() {

        fctLetter = () => {
            return this.state.userProfil.username[0].toUpperCase();
        }

        return (
            <ScrollView style={Styles.scrollView}>
                <Toast
                    ref="toast"
                    style={{backgroundColor:'green', width: width * 0.6}}
                    position='center'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white', textAlign: 'center'}}
                />
        
                <View style={{backgroundColor: '#4790ED'}}>
                    <Infos
                        userProfilFromParent={ this.state.userProfil }
                        conversation={ this.addConversation }
                    />
                </View>
                
                <View style={Styles.bloc2}>
                    <StatisticProfil lengthList={this.sportListLength()} />
                </View>
                
                <View style={{ display: 'flex', flexDirection: 'column', width: width, borderBottomLeftRadius: 90, color: '#fff'}}>
                    <Sport sportListFromParent={this.state.sportList} thisProfil={this} />
                </View>
        
            </ScrollView>
        )
    }
}


function mapStateToProps(state) {
    return { ID: state.partnerID, token: state.userToken.token }
};


export default connect(
    mapStateToProps,
    null
)(PartnerProfil);
