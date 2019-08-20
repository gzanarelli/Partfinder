import React from 'react';
import {KeyboardAvoidingView, View, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import ipAddress from '../../../config';
import io from 'socket.io-client';

class Conversation extends React.Component {
  constructor() {
      super();
      this.state = {
        channelID: '',
        userID: '',
        messages: [],

      }
      this.socket = io(`http://${ipAddress}:3000`);
      this.socket.on('chatMessage', (msg) => {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, msg),
        }))
      })
  }


  componentDidMount() {
      fetch(`http://${ipAddress}:3000/message/conversation`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({token: this.props.token, partnerID: this.props.partnerID})
      })
      .then(res => res.json())
      .then(res => {
        console.log(res.data.message);
        let listMessage = res.data.message.map((data, i) => {
            return (
                key={i},
                {
                    text: data.message,
                    user: { _id: data.user },
                    createdAt: data.date,
                    _id: data._id
                }
            )
        });

        // Rajout a la fin du tableau dans la DB, il faut donc reverse pour avoir le bon sens de lecture.
        listMessage = listMessage.reverse();
        this.setState({ channelID: res.data._id, userID: res.userID, messages: listMessage });
        this.socket.emit('channel', res.data._id);
    })
  }

  //lors de la creation de la conversation creer pour les deux partners !!

  onSend(message = []) {
    this.socket.emit('chatMessage', ({msg: message, channelID: this.state.channelID }));
  }

  render() {
    return (
      <View style={{flex: 1}} >
        <GiftedChat
          messages={this.state.messages}
          onSend={message => this.onSend(message)}
          user={{
            _id: this.state.userID,
          }}
        />
        {/* Necessaire pour le TextInput sous android sinon il est caché paar le clavier */}
        <KeyboardAvoidingView behavior={ Platform.OS === 'android' ? 'padding' : null} keyboardVerticalOffset={190}/>
      </View>
    )
  }
}

function mapStateToProps(state) {
    return { token: state.userToken.token, partnerID: state.partnerID }
};


export default connect(
    mapStateToProps,
    null
)(Conversation);



// import React, { PureComponent } from 'react';
// import { Text, View, Dimensions, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
// import io from 'socket.io-client';
// import ipAddress from '../../../config';
// const { width, height } = Dimensions.get('screen');
// export class Conversation extends PureComponent {
//     constructor(){
//         super();
//         this.state = {
//             chatMessage: '',
//             chatMessages: []
//         }
//     }

//     componentDidMount() {
//         this.socket = io(`http://${ipAddress}:3000`);
//         this.socket.on('chatMessage', msg => {
//             this.setState({
//                 chatMessages: [...this.state.chatMessages, msg]
//             });
//         })
//     }

// 	submitChatMessage = () => {
//         this.socket.emit('chatMessage', this.state.chatMessage);
//         this.setState({ chatMessage: '' })
// 	}

//     render() {

//         let chatMessages = this.state.chatMessages.map((msg, i) => {
//             return(
//                 <Text key={i} >{ msg }</Text>
//             )
//         })

//         return (
//             <View style={{justifyContent: 'center', alignItems: 'center', width: width, height: height}}>
//                 <View style={{flex: 1}}>
//                     <View style={{ backgroundColor: 'red'}} >
//                         {chatMessages}
//                     </View>
                    
//                     <KeyboardAvoidingView behavior='position' >
//                         <View style={{flex: 1, height: height * 0.1, bottom: -height * 0.72, display: 'flex', flexDirection: 'row' }}>
//                             <TextInput
//                             style={{ padding: 10, height: 40, width: width * 0.8, borderTopWidth: 0.5, borderColor: '#b1b1b1' }}
//                             placeholder={'Type your message...'}
//                             value={this.state.chatMessage}
//                             onChangeText={ chatMessage => { this.setState({ chatMessage }) } }
//                             />
//                             <TouchableOpacity 
//                                 style={{ height: 40, width: width * 0.2, backgroundColor: '#4790ED', justifyContent: 'center', alignItems: 'center' }}
//                                 onPress={() => this.submitChatMessage()} >
//                                 <Text>SEND</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </KeyboardAvoidingView>
//                 </View>
//             </View>
//         )
//     }
// }

// export default Conversation;
